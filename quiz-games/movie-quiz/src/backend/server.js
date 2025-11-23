const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const OpenAI = require('openai');
const Anthropic = require('@anthropic-ai/sdk');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();
const config = require('./config');

const app = express();
const port = process.env.PORT || 3000;

// Update path to be relative to src/backend/server.js
const questionsPath = path.join(__dirname, '../../data/questions.json');
console.log('Loading questions from:', questionsPath);

let questions;
try {
    const rawData = fs.readFileSync(questionsPath);
    questions = JSON.parse(rawData);
    console.log(`Successfully loaded ${questions.questions.length} questions from file`);
} catch (error) {
    console.error('Error loading questions.json:', error);
    console.error('Current working directory:', process.cwd());
    questions = { questions: [] };
}

app.use(cors());
app.use(express.json());

// Initialize LLM clients
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Helper function to format question for LLMs
function formatQuestion(question, answers) {
    return `Question: ${question.text}

Possible answers:
${answers.map((a, i) => `${i + 1}. ${a}`).join('\n')}

Instructions:
1. Choose the most likely correct answer
2. Respond with ONLY the number (1-${answers.length}) of your chosen answer
3. Do not explain your reasoning`;
}

async function getGPT4Response(question, answers) {
    const start = Date.now();
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4-turbo-preview",
            messages: [{
                role: "user",
                content: formatQuestion(question, answers)
            }],
            max_tokens: 5,
            temperature: 0.3
        });
        
        const chosenAnswer = parseInt(response.choices[0].message.content.trim()) - 1;
        const responseTime = Date.now() - start;
        
        return {
            chosenAnswerIndex: chosenAnswer,
            correct: chosenAnswer === question.correctAnswerIndex,
            responseTime,
            confidence: response.choices[0].finish_reason === 'stop' ? 90 : 70
        };
    } catch (error) {
        console.error('GPT-4 error:', error);
        throw error;
    }
}

async function getClaudeResponse(question, answers) {
    const start = Date.now();
    try {
        const response = await anthropic.messages.create({
            model: "claude-3-opus-20240229",
            max_tokens: 5,
            temperature: 0.3,
            messages: [{
                role: "user",
                content: formatQuestion(question, answers)
            }]
        });
        
        const chosenAnswer = parseInt(response.content[0].text.trim()) - 1;
        const responseTime = Date.now() - start;
        
        return {
            chosenAnswerIndex: chosenAnswer,
            correct: chosenAnswer === question.correctAnswerIndex,
            responseTime,
            confidence: 85
        };
    } catch (error) {
        console.error('Claude error:', error);
        throw error;
    }
}

async function getGeminiResponse(question, answers) {
    const start = Date.now();
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const response = await model.generateContent(formatQuestion(question, answers));
        const chosenAnswer = parseInt(response.response.text().trim()) - 1;
        const responseTime = Date.now() - start;
        
        return {
            chosenAnswerIndex: chosenAnswer,
            correct: chosenAnswer === question.correctAnswerIndex,
            responseTime,
            confidence: 80
        };
    } catch (error) {
        console.error('Gemini error:', error);
        throw error;
    }
}

// Get all questions endpoint
app.get('/api/config', (req, res) => {
    res.json(config);
});

app.get('/api/llm-questions', (req, res) => {
    try {
        // Get random subset of questions
        const shuffled = [...questions.questions]
            .sort(() => 0.5 - Math.random());
        const selectedQuestions = shuffled.slice(0, config.questionsPerRound);
        
        console.log(`Sending ${selectedQuestions.length} questions`);
        res.json({
            questions: selectedQuestions
        });
    } catch (error) {
        console.error('Error serving questions:', error);
        res.status(500).json({
            error: 'Failed to load questions',
            questions: []
        });
    }
});

// Get a random question
app.get('/api/question', (req, res) => {
    const questionsList = questions.questions;
    const randomQuestion = questionsList[Math.floor(Math.random() * questionsList.length)];
    res.json(randomQuestion);
});

// Add LLM answer endpoint
app.post('/api/llm-answer', async (req, res) => {
    const { llm, question, answers } = req.body;
    
    try {
        let response;
        switch(llm) {
            case 'GPT-4':
                response = await getGPT4Response(question, answers);
                break;
            case 'Claude-3':
                response = await getClaudeResponse(question, answers);
                break;
            case 'Gemini-Pro':
                response = await getGeminiResponse(question, answers);
                break;
            default:
                throw new Error(`Unknown LLM: ${llm}`);
        }
        
        console.log(`${llm} response:`, response);
        res.json(response);
    } catch (error) {
        console.error(`Error getting ${llm} response:`, error);
        res.status(500).json({
            error: `Failed to get ${llm} response`,
            details: error.message
        });
    }
});

// Add test endpoints
app.get('/api/test-llm/:llm', async (req, res) => {
    const { llm } = req.params;
    const testQuestion = {
        text: "What is 2+2?",
        correctAnswerIndex: 2
    };
    const testAnswers = [
        "3",
        "5",
        "4",
        "6"
    ];

    try {
        let response;
        console.log(`Testing ${llm} connection...`);
        
        switch(llm) {
            case 'GPT-4':
                response = await getGPT4Response(testQuestion, testAnswers);
                break;
            case 'Claude-3':
                response = await getClaudeResponse(testQuestion, testAnswers);
                break;
            case 'Gemini-Pro':
                response = await getGeminiResponse(testQuestion, testAnswers);
                break;
            default:
                throw new Error(`Unknown LLM: ${llm}`);
        }
        
        console.log(`${llm} test response:`, response);
        res.json({
            success: true,
            llm,
            response
        });
    } catch (error) {
        console.error(`${llm} test failed:`, error);
        res.status(500).json({
            success: false,
            llm,
            error: error.message,
            details: error
        });
    }
});

app.listen(port, () => {
    console.log(`Movie Quiz Game running on port ${port}`);
    console.log(`Server has ${questions.questions.length} questions loaded`);
    if (questions.questions.length > 0) {
        console.log('First question:', JSON.stringify(questions.questions[0], null, 2));
    } else {
        console.log('No questions loaded!');
    }
});
