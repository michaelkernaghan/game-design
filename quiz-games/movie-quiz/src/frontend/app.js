class QuizGame {
    constructor() {
        // Initialize arrays and state
        this.questions = [];  // Initialize this first
        this.roundResults = [];
        this.llmQueue = ['GPT-4', 'Claude-3', 'Gemini-Pro'];
        this.currentLLM = null;
        this.currentQuestionIndex = 0;
        this.currentScore = 0;
        
        // DOM Elements
        this.startScreen = document.getElementById('start-screen');
        this.quizScreen = document.getElementById('quiz-screen');
        this.resultsScreen = document.getElementById('results-screen');
        this.startButton = document.getElementById('start-button');
        this.currentLLMDisplay = document.getElementById('current-llm');
        this.questionCounter = document.getElementById('question-counter');
        this.questionText = document.getElementById('question-text');
        this.answersGrid = document.getElementById('answers-grid');
        this.statsTable = document.getElementById('llm-stats');

        // Create and insert score display into quiz header
        this.scoreDisplay = document.createElement('div');
        this.scoreDisplay.id = 'score-display';
        this.scoreDisplay.textContent = 'Score: 0/0';
        const quizHeader = document.getElementById('quiz-header');
        quizHeader.insertBefore(this.scoreDisplay, this.timer);

        // Bind methods to ensure correct 'this' context
        this.loadQuestions = this.loadQuestions.bind(this);
        this.initialize = this.initialize.bind(this);
        this.startCompetition = this.startCompetition.bind(this);
        this.playLLMRound = this.playLLMRound.bind(this);
        this.playQuestion = this.playQuestion.bind(this);
        this.showResults = this.showResults.bind(this);

        // Event Listeners
        this.startButton.addEventListener('click', this.startCompetition);

        this.config = null;  // Will store config once loaded

        // Add stop button and competition state
        this.stopButton = document.getElementById('stop-button');
        this.isRunning = false;
        this.stopButton.addEventListener('click', () => this.stopCompetition());

        // Add score color tracking
        this.lastAnswerCorrect = false;

        // Remove timer-related elements
        const timerElement = document.getElementById('timer');
        if (timerElement) {
            timerElement.remove();
        }
    }

    async loadQuestions() {
        try {
            console.log('Starting to load questions...'); // Debug log
            const response = await fetch('http://localhost:3000/api/llm-questions');
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            console.log('Received data:', data); // Debug log
            this.questions = data.questions || [];
            console.log(`Loaded ${this.questions.length} questions`);
        } catch (error) {
            console.error('Failed to load questions:', error);
            this.questions = [];
        }
    }

    async initialize() {
        try {
            // First load config
            const configResponse = await fetch('http://localhost:3000/api/config');
            if (!configResponse.ok) throw new Error('Failed to load config');
            this.config = await configResponse.json();
            
            // Then load questions
            await this.loadQuestions();
            
            // Update display to show total questions
            this.updateDisplay();
        } catch (error) {
            console.error('Initialization failed:', error);
            alert('Failed to initialize game. Please refresh and try again.');
        }
    }

    updateDisplay() {
        // Update initial display to show how many questions will be asked
        const totalQuestions = this.config.questionsPerRound;
        const totalLLMs = this.config.llms.length;
        document.getElementById('start-screen').innerHTML = `
            <h1>LLM Movie Quiz Competition</h1>
            <p>Each LLM will answer ${totalQuestions} questions</p>
            <p>Total questions: ${totalQuestions * totalLLMs}</p>
            <button id="start-button">Start Competition</button>
        `;
        
        // Reattach event listener since we replaced the HTML
        document.getElementById('start-button')
            .addEventListener('click', () => this.startCompetition());
    }

    async startCompetition() {
        this.isRunning = true;
        this.startScreen.style.display = 'none';
        this.quizScreen.style.display = 'block';
        this.roundResults = [];  // Clear previous results
        
        try {
            for (const llm of this.llmQueue) {
                if (!this.isRunning) break;  // Check if stopped
                this.currentLLM = llm;
                this.currentScore = 0;
                this.updateLLMDisplay();
                await this.playLLMRound();
                // Add delay between LLMs
                if (this.isRunning) {
                    await new Promise(resolve => setTimeout(resolve, 2000));
                }
            }
            
            if (this.isRunning) {  // Only show results if not stopped
                this.showResults();
            }
        } catch (error) {
            console.error('Competition error:', error);
            this.resetGame();
        }
    }

    stopCompetition() {
        this.isRunning = false;
        this.resetGame();
    }

    resetGame() {
        // Clear current state
        this.currentScore = 0;
        this.currentQuestionIndex = 0;
        this.roundResults = [];
        
        // Reset displays
        this.scoreDisplay.textContent = 'Score: 0/0';
        this.questionCounter.textContent = '';
        this.currentLLMDisplay.textContent = '';
        this.questionText.textContent = '';
        this.answersGrid.innerHTML = '';
        
        // Show start screen
        this.quizScreen.style.display = 'none';
        this.resultsScreen.style.display = 'none';
        this.startScreen.style.display = 'block';
        
        // Update display with fresh config
        this.updateDisplay();
    }

    async playLLMRound() {
        for (let i = 0; i < this.questions.length; i++) {
            if (!this.isRunning) break;
            this.currentQuestionIndex = i;
            await this.playQuestion(this.questions[i]);
            this.updateProgress();
            // Add delay between questions
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
    
    async playQuestion(question) {
        if (!this.isRunning) return;
        
        this.displayQuestion(question);
        this.updateQuestionCounter();
        
        try {
            const result = await Promise.race([
                this.getLLMResponse(this.currentLLM, question),
                new Promise((_, reject) => 
                    setTimeout(() => reject(new Error('timeout')), this.config.questionTimeout)
                )
            ]);
            
            if (!this.isRunning) return;
            
            console.log('Got LLM response:', result);
            this.lastAnswerCorrect = result.correct;  // Track if answer was correct
            
            // Show LLM's selection and wait for animation
            await this.showLLMSelection(result, question);
            
            // Wait for the specified delay (5 seconds)
            console.log('Waiting for answer delay...');
            await new Promise(resolve => setTimeout(resolve, 5000));
            
            // Show the final result
            console.log('Showing final result...');
            await this.showFinalResult(result, question);
            
            this.recordResult(result);
            
        } catch (error) {
            if (!this.isRunning) return;
            
            console.log(`${this.currentLLM} failed to answer in time`);
            this.lastAnswerCorrect = false;
            this.recordResult({
                correct: false,
                responseTime: this.config.questionTimeout,
                confidence: 0
            });
        }
    }

    displayQuestion(question) {
        this.questionText.textContent = question.question;
        this.answersGrid.innerHTML = '';
        
        question.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.className = 'answer-option';
            button.textContent = answer.answer;
            this.answersGrid.appendChild(button);
        });
        
        console.log('Answer grid updated with', this.answersGrid.children.length, 'options');
    }

    updateQuestionCounter() {
        this.questionCounter.textContent = 
            `Question ${this.currentQuestionIndex + 1}/${this.config.questionsPerRound}`;
    }

    updateLLMDisplay() {
        this.currentLLMDisplay.textContent = `Current LLM: ${this.currentLLM}`;
    }

    showResults() {
        this.quizScreen.style.display = 'none';
        this.resultsScreen.style.display = 'block';
        this.updateStatsTable(this.calculateStats());
    }

    calculateStats() {
        const stats = {};
        for (const llm of this.llmQueue) {
            const llmResults = this.roundResults.filter(r => r.llm === llm);
            stats[llm] = {
                total: llmResults.length,
                correct: llmResults.filter(r => r.correct).length,
                avgTime: llmResults.reduce((sum, r) => sum + r.responseTime, 0) / llmResults.length,
                avgConfidence: llmResults.reduce((sum, r) => sum + r.confidence, 0) / llmResults.length
            };
            stats[llm].accuracy = stats[llm].correct / stats[llm].total;
        }
        return stats;
    }

    updateStatsTable(stats) {
        this.statsTable.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>LLM</th>
                        <th>Questions</th>
                        <th>Correct</th>
                        <th>Accuracy</th>
                        <th>Avg Time</th>
                        <th>Avg Confidence</th>
                    </tr>
                </thead>
                <tbody>
                    ${Object.entries(stats).map(([llm, data]) => `
                        <tr>
                            <td>${llm}</td>
                            <td>${data.total}</td>
                            <td>${data.correct}</td>
                            <td>${(data.accuracy * 100).toFixed(1)}%</td>
                            <td>${data.avgTime.toFixed(0)}ms</td>
                            <td>${data.avgConfidence.toFixed(1)}%</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    recordResult(result) {
        this.roundResults.push({
            llm: this.currentLLM,
            questionIndex: this.currentQuestionIndex,
            correct: result.correct,
            responseTime: result.responseTime,
            confidence: result.confidence
        });
        this.updateScore(result.correct);
    }

    async showLLMSelection(result, question) {
        console.log('Showing LLM selection:', result.chosenAnswerIndex);
        const answerElements = this.answersGrid.children;
        // First clear any existing classes
        for (let element of answerElements) {
            element.classList.remove('selected', 'correct', 'incorrect');
        }
        // Show LLM's selection in yellow
        const selectedElement = answerElements[result.chosenAnswerIndex];
        if (selectedElement) {
            console.log('Adding selected class to element:', selectedElement);
            selectedElement.classList.add('selected');
        } else {
            console.error('Could not find element for index:', result.chosenAnswerIndex);
        }
    }

    async showFinalResult(result, question) {
        console.log('Showing final result:', result);
        const answerElements = this.answersGrid.children;
        const correctIndex = question.answers.findIndex(a => a.correct);
        console.log('Correct index:', correctIndex);
        
        if (result.correct) {
            console.log('LLM was correct');
            // If LLM was correct, change yellow to green
            const correctElement = answerElements[result.chosenAnswerIndex];
            if (correctElement) {
                correctElement.classList.remove('selected');
                correctElement.classList.add('correct');
            }
        } else {
            console.log('LLM was incorrect');
            // If LLM was wrong, keep yellow on wrong answer and show correct in green
            const correctElement = answerElements[correctIndex];
            const incorrectElement = answerElements[result.chosenAnswerIndex];
            
            if (correctElement) {
                correctElement.classList.add('correct');
            }
            if (incorrectElement) {
                incorrectElement.classList.remove('selected');
                incorrectElement.classList.add('incorrect');
            }
        }
    }

    updateProgress() {
        const progress = ((this.currentQuestionIndex + 1) / this.questions.length) * 100;
        this.questionCounter.textContent = 
            `Question ${this.currentQuestionIndex + 1}/${this.questions.length}`;
    }

    async getLLMResponse(llm, question) {
        try {
            const response = await fetch('http://localhost:3000/api/llm-answer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    llm,
                    question: {
                        text: question.question,
                        correctAnswerIndex: question.answers.findIndex(a => a.correct),
                    },
                    answers: question.answers.map(a => a.answer)
                })
            });

            if (!response.ok) {
                throw new Error('API response was not ok');
            }

            return await response.json();
        } catch (error) {
            console.error('Failed to get LLM response:', error);
            throw error;
        }
    }

    updateScore(correct) {
        if (correct) {
            this.currentScore++;
        }
        const scoreText = `Score: ${this.currentScore}/${this.currentQuestionIndex + 1}`;
        this.scoreDisplay.textContent = scoreText;
        
        // Update score color based on last answer
        this.scoreDisplay.className = correct ? 'score-correct' : 'score-incorrect';
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded'); // Debug log
    const game = new QuizGame();
    game.initialize();
});