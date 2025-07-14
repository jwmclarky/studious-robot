// AI Chat Agent for customer support
const ChatAgent = {
  // Generate response using AI
  generateResponse: async (message, chatHistory = []) => {
    try {
      const systemPrompt = `You are a helpful customer service agent for Bytegeist, a creative growth studio that specializes in AI-powered marketing and brand strategy. 

About Bytegeist:
- We help businesses scale smarter with AI-driven growth strategies
- Services include: AI-Powered Growth, Brand Strategy & Design, AI Automation
- Based in Sydney, working globally
- Tagline: "Brand fuel for the next era"

Chat History: ${JSON.stringify(chatHistory)}

Respond helpfully and professionally. Keep responses concise and actionable.`;

      const response = await invokeAIAgent(systemPrompt, message);
      return response;
    } catch (error) {
      console.error('Chat agent error:', error);
      return "I'm sorry, I'm having trouble responding right now. Please try again or contact us directly.";
    }
  },

  // Save chat message to database
  saveChatMessage: async (message, isBot = false) => {
    try {
      await trickleCreateObject('chat_message', {
        message: message,
        is_bot: isBot,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Failed to save chat message:', error);
    }
  }
};