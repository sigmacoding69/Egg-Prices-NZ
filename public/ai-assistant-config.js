// AI Assistant Configuration for EggPrices NZ
// OpenAI integration for egg information and advice

const AI_ASSISTANT_CONFIG = {
    // Your OpenAI API key (Do NOT store real secrets in client code)
    apiKey: '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',
    
    // Model configuration
    model: 'gpt-4o-mini',
    
    // API endpoint
    apiUrl: 'https://api.openai.com/v1/chat/completions',
    
    // System prompt for egg-specific assistance
    systemPrompt: `You are an AI assistant specialized in providing information about eggs, egg prices, nutrition, cooking, and egg-related advice. You help users with:

1. Egg nutrition facts and health benefits
2. Cooking tips and recipes using eggs
3. Egg storage and safety information
4. Different types of eggs (free-range, organic, cage-free, etc.)
5. Egg price trends and shopping advice
6. Egg quality assessment and selection tips
7. Egg-related cooking techniques and methods

Always provide helpful, accurate, and practical information about eggs. Keep responses concise but informative. If asked about topics unrelated to eggs, politely redirect the conversation back to egg-related topics.`,
    
    // Default messages
    welcomeMessage: "Hi! I'm your Egg Assistant. I can help you with egg nutrition, cooking tips, storage advice, and more! What would you like to know about eggs?",
    
    // Error messages
    errorMessages: {
        apiError: "Sorry, I'm having trouble connecting right now. Please try again later.",
        networkError: "Network error. Please check your connection and try again.",
        rateLimit: "I'm getting too many requests. Please wait a moment and try again.",
        invalidKey: "API configuration error. Please contact support."
    }
};

// Make AI config globally available
window.AI_ASSISTANT_CONFIG = AI_ASSISTANT_CONFIG;






