'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';

export default function HelpWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([]);
  const [input, setInput] = useState('');

  const predefinedResponses: { [key: string]: string } = {
    features: 'We offer employment tracking, skill gap analysis, and AI-powered insights to measure skilling programme impact.',
    'how does it work':
      'Skill Saarthi tracks students from training through employment, analyzing outcomes at 3, 6, 12, and 24-month intervals.',
    login: 'You can login as a Student, Government Officer, or Admin. Click the Sign In button in the navbar.',
    cost: 'For pricing information, please contact our team at hello@skillsaarthi.gov.in',
    help: 'You can navigate through the landing page using the menu. Try clicking on "How It Works" or "Features".',
    default: 'Thank you for your question! For more information, please contact hello@skillsaarthi.gov.in',
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = input;
    setMessages((prev) => [...prev, { text: userMessage, sender: 'user' }]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let response = predefinedResponses.default;

      for (const [key, value] of Object.entries(predefinedResponses)) {
        if (lowerInput.includes(key)) {
          response = value;
          break;
        }
      }

      setMessages((prev) => [...prev, { text: response, sender: 'bot' }]);
    }, 500);
  };

  const handleQuickQuestion = (question: string) => {
    setMessages((prev) => [...prev, { text: question, sender: 'user' }]);
    
    setTimeout(() => {
      const lowerQuestion = question.toLowerCase();
      let response = predefinedResponses.default;

      for (const [key, value] of Object.entries(predefinedResponses)) {
        if (lowerQuestion.includes(key)) {
          response = value;
          break;
        }
      }

      setMessages((prev) => [...prev, { text: response, sender: 'bot' }]);
    }, 500);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-br from-primary-blue to-primary-navy rounded-full shadow-xl flex items-center justify-center text-white hover:shadow-2xl transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue"
        aria-label="Open help widget"
      >
        <MessageCircle size={24} />
      </motion.button>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-40 w-96 max-w-[calc(100vw-24px)] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-blue to-primary-navy p-4 text-white">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-lg">Ask Saarthi</h3>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setMessages([]);
                    setInput('');
                  }}
                  className="hover:bg-white hover:bg-opacity-20 rounded-lg p-1 transition-colors"
                  aria-label="Close chat"
                >
                  <X size={20} />
                </button>
              </div>
              <p className="text-sm text-blue-100">
                Prototype Assistant - Demo responses
              </p>
            </div>

            {/* Messages Area */}
            <div className="h-80 overflow-y-auto p-4 bg-light-blue space-y-4">
              {messages.length === 0 ? (
                <div className="text-center py-8">
                  <MessageCircle
                    size={40}
                    className="text-text-muted opacity-50 mx-auto mb-3"
                  />
                  <p className="text-text-muted text-sm mb-4">
                    Hi! How can I help you today?
                  </p>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleQuickQuestion('What are the main features?')}
                      className="w-full text-left bg-white p-3 rounded-lg text-sm hover:bg-gray-100 transition-colors text-text-dark font-medium border border-gray-200"
                    >
                      What are the main features?
                    </button>
                    <button
                      onClick={() => handleQuickQuestion('How does it work?')}
                      className="w-full text-left bg-white p-3 rounded-lg text-sm hover:bg-gray-100 transition-colors text-text-dark font-medium border border-gray-200"
                    >
                      How does it work?
                    </button>
                    <button
                      onClick={() => handleQuickQuestion('How do I login?')}
                      className="w-full text-left bg-white p-3 rounded-lg text-sm hover:bg-gray-100 transition-colors text-text-dark font-medium border border-gray-200"
                    >
                      How do I login?
                    </button>
                  </div>
                </div>
              ) : (
                messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
                        msg.sender === 'user'
                          ? 'bg-primary-blue text-white rounded-br-none'
                          : 'bg-white text-text-dark border border-gray-200 rounded-bl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-200 flex gap-2">
              <input
                type="text"
                placeholder="Type your question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent text-sm"
              />
              <motion.button
                onClick={handleSendMessage}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary-blue text-white p-2 rounded-lg hover:bg-deep-navy transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue"
                aria-label="Send message"
              >
                <Send size={18} />
              </motion.button>
            </div>

            {/* Disclaimer */}
            <div className="px-4 py-2 bg-yellow-50 border-t border-yellow-200 text-xs text-yellow-900">
              This is a prototype demo. For real support, email hello@skillsaarthi.gov.in
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
