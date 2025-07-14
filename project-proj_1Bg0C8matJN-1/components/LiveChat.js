function LiveChat() {
  try {
    const [isOpen, setIsOpen] = React.useState(false);
    const [messages, setMessages] = React.useState([
      { id: 1, text: "Hi! I'm here to help you learn about Bytegeist's growth services. How can I assist you today?", isBot: true }
    ]);
    const [inputMessage, setInputMessage] = React.useState('');
    const [isTyping, setIsTyping] = React.useState(false);

    const handleSendMessage = async () => {
      if (!inputMessage.trim()) return;

      const userMessage = { id: Date.now(), text: inputMessage, isBot: false };
      setMessages(prev => [...prev, userMessage]);
      setInputMessage('');
      setIsTyping(true);

      try {
        const chatHistory = messages.map(m => ({ role: m.isBot ? 'ai' : 'user', content: m.text }));
        const response = await ChatAgent.generateResponse(inputMessage, chatHistory);
        
        const botMessage = { id: Date.now() + 1, text: response, isBot: true };
        setMessages(prev => [...prev, botMessage]);
        
        Analytics.trackFormSubmission('live_chat', { message: inputMessage });
      } catch (error) {
        console.error('Chat error:', error);
      } finally {
        setIsTyping(false);
      }
    };

    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleSendMessage();
      }
    };

    return (
      <div className="fixed bottom-4 right-4 z-50" data-name="live-chat" data-file="components/LiveChat.js">
        {isOpen ? (
          <div className="bg-white rounded-2xl shadow-2xl w-80 h-96 flex flex-col">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white p-4 rounded-t-2xl flex justify-between items-center">
              <h3 className="font-semibold">Chat with Bytegeist</h3>
              <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
                <div className="icon-x text-lg"></div>
              </button>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map(message => (
                <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-xs p-3 rounded-lg ${
                    message.isBot ? 'bg-gray-100 text-gray-800' : 'bg-blue-500 text-white'
                  }`}>
                    {message.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
                <button 
                  onClick={handleSendMessage}
                  className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                >
                  <div className="icon-send text-lg"></div>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <div className="icon-message-circle text-2xl"></div>
          </button>
        )}
      </div>
    );
  } catch (error) {
    console.error('LiveChat component error:', error);
    return null;
  }
}