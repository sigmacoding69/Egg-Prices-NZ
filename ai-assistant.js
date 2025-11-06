// AI Assistant Handler for EggPrices NZ
// OpenAI GPT-4o mini integration for egg information

class AIEggAssistant {
    constructor() {
        this.isOpen = false;
        this.chatHistory = [];
        this.isLoading = false;
        this.initializeAssistant();
    }

    initializeAssistant() {
        this.createFloatingButton();
        this.createChatModal();
        this.addWelcomeMessage();
    }

    // Create floating AI assistant button
    createFloatingButton() {
        const button = document.createElement('div');
        button.id = 'ai-assistant-button';
        button.innerHTML = `
            <div class="ai-button-content">
                <i class="fas fa-robot"></i>
                <span class="ai-button-text">Egg AI</span>
            </div>
        `;
        
        // Add styles
        button.style.cssText = `
            position: fixed;
            bottom: 24px;
            right: 24px;
            width: 64px;
            height: 64px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            color: white;
            font-size: 20px;
            border: 3px solid rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
        `;
        
        button.addEventListener('click', () => this.toggleChat());
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.15)';
            button.style.boxShadow = '0 12px 40px rgba(102, 126, 234, 0.4)';
        });
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
            button.style.boxShadow = '0 8px 32px rgba(102, 126, 234, 0.3)';
        });
        
        document.body.appendChild(button);
    }

    // Create chat modal
    createChatModal() {
        const modal = document.createElement('div');
        modal.id = 'ai-chat-modal';
        modal.className = 'ai-chat-modal hidden';
        modal.innerHTML = `
            <div class="ai-chat-container">
                <div class="ai-chat-header">
                    <div class="ai-chat-title">
                        <i class="fas fa-robot"></i>
                        <span>Egg AI Assistant</span>
                    </div>
                    <button class="ai-chat-close" onclick="window.aiEggAssistant.closeChat()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="ai-chat-messages" id="ai-chat-messages">
                    <!-- Messages will be added here -->
                </div>
                <div class="ai-chat-input-container">
                    <div class="ai-chat-input-wrapper">
                        <input type="text" id="ai-chat-input" placeholder="Ask me anything about eggs..." />
                        <button id="ai-chat-send" onclick="window.aiEggAssistant.sendMessage()">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                    <div class="ai-chat-loading hidden" id="ai-chat-loading">
                        <div class="ai-loading-dots">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <span>AI is thinking...</span>
                    </div>
                </div>
            </div>
        `;
        
        // Add styles
        modal.style.cssText = `
            position: fixed;
            bottom: 90px;
            right: 20px;
            width: 350px;
            height: 500px;
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 1001;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        `;
        
        document.body.appendChild(modal);
        
        // Add input event listeners
        const input = document.getElementById('ai-chat-input');
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
    }

    // Add welcome message
    addWelcomeMessage() {
        this.addMessage('assistant', window.AI_ASSISTANT_CONFIG.welcomeMessage);
        this.addQuickActions();
    }

    // Add quick action buttons
    addQuickActions() {
        const messagesContainer = document.getElementById('ai-chat-messages');
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'ai-quick-actions';
        actionsDiv.innerHTML = `
            <div class="ai-actions-title">Quick questions:</div>
            <div class="ai-actions-buttons">
                <button class="ai-action-btn" onclick="window.aiEggAssistant.sendQuickMessage('What are the health benefits of eggs?')">
                    <i class="fas fa-heart"></i> Health Benefits
                </button>
                <button class="ai-action-btn" onclick="window.aiEggAssistant.sendQuickMessage('How should I store eggs?')">
                    <i class="fas fa-thermometer-half"></i> Storage Tips
                </button>
                <button class="ai-action-btn" onclick="window.aiEggAssistant.sendQuickMessage('What is the difference between free-range and cage-free eggs?')">
                    <i class="fas fa-egg"></i> Egg Types
                </button>
                <button class="ai-action-btn" onclick="window.aiEggAssistant.sendQuickMessage('Give me a simple egg recipe')">
                    <i class="fas fa-utensils"></i> Recipe
                </button>
            </div>
        `;
        
        messagesContainer.appendChild(actionsDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Send quick message
    sendQuickMessage(message) {
        const input = document.getElementById('ai-chat-input');
        input.value = message;
        this.sendMessage();
    }

    // Toggle chat modal
    toggleChat() {
        const modal = document.getElementById('ai-chat-modal');
        const button = document.getElementById('ai-assistant-button');
        
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }

    openChat() {
        const modal = document.getElementById('ai-chat-modal');
        modal.classList.remove('hidden');
        this.isOpen = true;
        
        // Focus input
        setTimeout(() => {
            document.getElementById('ai-chat-input').focus();
        }, 100);
    }

    closeChat() {
        const modal = document.getElementById('ai-chat-modal');
        modal.classList.add('hidden');
        this.isOpen = false;
    }

    // Add message to chat
    addMessage(sender, content) {
        const messagesContainer = document.getElementById('ai-chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `ai-message ai-message-${sender}`;
        
        const timestamp = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        messageDiv.innerHTML = `
            <div class="ai-message-content">
                <div class="ai-message-text">${content}</div>
                <div class="ai-message-time">${timestamp}</div>
            </div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Send message to AI
    async sendMessage() {
        const input = document.getElementById('ai-chat-input');
        const message = input.value.trim();
        
        if (!message || this.isLoading) return;
        
        // Clear quick actions on first message
        this.clearQuickActions();
        
        // Add user message
        this.addMessage('user', message);
        input.value = '';
        
        // Show loading
        this.setLoading(true);
        
        try {
            const response = await this.callOpenAI(message);
            this.addMessage('assistant', response);
        } catch (error) {
            console.error('AI Assistant Error:', error);
            this.addMessage('assistant', this.getErrorMessage(error));
        } finally {
            this.setLoading(false);
        }
    }

    // Clear quick action buttons
    clearQuickActions() {
        const quickActions = document.querySelector('.ai-quick-actions');
        if (quickActions) {
            quickActions.remove();
        }
    }

    // Call OpenAI API
    async callOpenAI(message) {
        const config = window.AI_ASSISTANT_CONFIG;
        
        // Add to chat history
        this.chatHistory.push({ role: 'user', content: message });
        
        // Prepare messages for API
        const messages = [
            { role: 'system', content: config.systemPrompt },
            ...this.chatHistory.slice(-10) // Keep last 10 messages for context
        ];
        
        const response = await fetch(config.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${config.apiKey}`
            },
            body: JSON.stringify({
                model: config.model,
                messages: messages,
                max_tokens: 500,
                temperature: 0.7
            })
        });
        
        if (!response.ok) {
            if (response.status === 401) {
                throw new Error('invalidKey');
            } else if (response.status === 429) {
                throw new Error('rateLimit');
            } else {
                throw new Error('apiError');
            }
        }
        
        const data = await response.json();
        const aiResponse = data.choices[0].message.content;
        
        // Add AI response to chat history
        this.chatHistory.push({ role: 'assistant', content: aiResponse });
        
        return aiResponse;
    }

    // Set loading state
    setLoading(loading) {
        this.isLoading = loading;
        const loadingDiv = document.getElementById('ai-chat-loading');
        const sendButton = document.getElementById('ai-chat-send');
        const input = document.getElementById('ai-chat-input');
        
        if (loading) {
            loadingDiv.classList.remove('hidden');
            sendButton.disabled = true;
            input.disabled = true;
        } else {
            loadingDiv.classList.add('hidden');
            sendButton.disabled = false;
            input.disabled = false;
            input.focus();
        }
    }

    // Get error message
    getErrorMessage(error) {
        const config = window.AI_ASSISTANT_CONFIG;
        return config.errorMessages[error.message] || config.errorMessages.apiError;
    }
}

// Initialize AI assistant when page loads
document.addEventListener('DOMContentLoaded', function() {
    window.aiEggAssistant = new AIEggAssistant();
});

// Make functions globally accessible
window.openAIAssistant = () => window.aiEggAssistant.openChat();
window.closeAIAssistant = () => window.aiEggAssistant.closeChat();
