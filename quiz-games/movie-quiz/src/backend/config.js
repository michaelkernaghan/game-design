const config = {
    questionsPerRound: 5,  // Number of questions per LLM
    questionTimeout: 10000,  // Timeout in milliseconds (10 seconds)
    showAnswerDelay: 3000,  // Time to show answer in milliseconds (5 seconds)
    llms: ['GPT-4', 'Claude-3', 'Gemini-Pro']
};

module.exports = config; 