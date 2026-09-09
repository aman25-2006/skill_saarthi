'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function HelpWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([]);
  const [input, setInput] = useState('');
  const { language, t } = useLanguage();

  const predefinedResponses: Record<string, string> = {
    features:
      language === 'hi'
        ? 'हम बहु-स्रोत सत्यापन, एआई कौशल अंतर विश्लेषण और सतत आजीविका ट्रैकिंग प्रदान करते हैं।'
        : language === 'mr'
        ? 'आम्ही बहु-स्त्रोत पडताळणी, एआय कौशल्य तफावत विश्लेषण आणि शाश्वत उपजीविका मागोवा प्रदान करतो.'
        : 'Skill Saarthi provides multi-source evidence triangulation, AI skill-gap diagnosis, and longitudinal retention tracking.',
    'how it works':
      language === 'hi'
        ? 'हम 3, 6, 12 और 24 महीनों में व्हाट्सएप माइक्रो-सर्वे और डिजिलॉकर रिकॉर्ड के माध्यम से आउटकम ट्रैक करते हैं।'
        : language === 'mr'
        ? 'आम्ही ३, ६, १२ आणि २४ महिन्यांत व्हॉट्सअ‍ॅप सर्वेक्षण आणि डिजिलॉकर नोंदींद्वारे निकाल तपासतो.'
        : 'We track post-certification milestones at Month 3, 6, 12, and 24 via automated micro-surveys and DigiLocker salary verifications.',
    login:
      language === 'hi'
        ? 'आप छात्र (/login/student), सरकारी अधिकारी (/login/government) या एडमिन (/login/admin) के रूप में लॉगिन कर सकते हैं।'
        : language === 'mr'
        ? 'तुम्ही विद्यार्थी (/login/student), शासकीय अधिकारी (/login/government) किंवा अ‍ॅडमिन (/login/admin) म्हणून लॉगिन करू शकता.'
        : 'You can access the Student Portal (/login/student), Government Portal (/login/government), or Admin Console (/login/admin).',
    default:
      language === 'hi'
        ? 'नमस्ते! अधिक जानकारी या सहायता के लिए hello@skillsaarthi.gov.in पर संपर्क करें।'
        : language === 'mr'
        ? 'नमस्कार! अधिक माहितीसाठी किंवा मदतीसाठी hello@skillsaarthi.gov.in वर संपर्क साधा.'
        : 'Thank you for your question! Skill Saarthi is compliant with Section 20 Synthetic Data Protocol & DPDP Act 2023.',
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { text: userMessage, sender: 'user' }]);
    setInput('');

    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let response = predefinedResponses.default;

      if (lowerInput.includes('feature') || lowerInput.includes('कौशल') || lowerInput.includes('वैशिष्ट्य')) {
        response = predefinedResponses.features;
      } else if (lowerInput.includes('work') || lowerInput.includes('काम') || lowerInput.includes('कार्य')) {
        response = predefinedResponses['how it works'];
      } else if (lowerInput.includes('login') || lowerInput.includes('लॉगिन') || lowerInput.includes('साइन')) {
        response = predefinedResponses.login;
      }

      setMessages((prev) => [...prev, { text: response, sender: 'bot' }]);
    }, 400);
  };

  const handleQuickQuestion = (question: string) => {
    setMessages((prev) => [...prev, { text: question, sender: 'user' }]);

    setTimeout(() => {
      const lowerQuestion = question.toLowerCase();
      let response = predefinedResponses.default;

      if (lowerQuestion.includes('feature') || lowerQuestion.includes('कौशल') || lowerQuestion.includes('वैशिष्ट्य')) {
        response = predefinedResponses.features;
      } else if (lowerQuestion.includes('work') || lowerQuestion.includes('काम') || lowerQuestion.includes('कार्य')) {
        response = predefinedResponses['how it works'];
      } else if (lowerQuestion.includes('login') || lowerQuestion.includes('लॉगिन') || lowerQuestion.includes('साइन')) {
        response = predefinedResponses.login;
      }

      setMessages((prev) => [...prev, { text: response, sender: 'bot' }]);
    }, 400);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-40 w-13 h-13 w-12 h-12 bg-gradient-to-br from-primary-blue to-primary-navy rounded-full shadow-xl flex items-center justify-center text-white hover:shadow-2xl transition-all focus:outline-none focus:ring-2 focus:ring-primary-blue"
        aria-label="Open help widget"
      >
        <MessageCircle size={22} />
      </motion.button>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-22 right-6 z-40 w-96 max-w-[calc(100vw-24px)] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-blue to-primary-navy p-4 text-white">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold text-base">Ask Saarthi Assistant</h3>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setMessages([]);
                    setInput('');
                  }}
                  className="hover:bg-white/20 rounded-lg p-1 transition-colors"
                  aria-label="Close chat"
                >
                  <X size={18} />
                </button>
              </div>
              <p className="text-xs text-blue-100">
                {t('portal.demoWatermark', 'DEMO / SYNTHETIC DATA (Section 20 Protocol)')}
              </p>
            </div>

            {/* Messages Area */}
            <div className="h-72 overflow-y-auto p-4 bg-slate-50 dark:bg-slate-950 space-y-3">
              {messages.length === 0 ? (
                <div className="text-center py-4 space-y-3">
                  <MessageCircle size={32} className="text-slate-400 mx-auto opacity-60" />
                  <p className="text-slate-500 dark:text-slate-400 text-xs">
                    {language === 'hi'
                      ? 'नमस्ते! आज मैं आपकी क्या मदद कर सकता हूँ?'
                      : language === 'mr'
                      ? 'नमस्कार! आज मी आपल्याला कशी मदत करू शकतो?'
                      : 'Hi! How can I help you explore Skill Saarthi?'}
                  </p>
                  <div className="space-y-1.5 text-xs text-left">
                    <button
                      onClick={() =>
                        handleQuickQuestion(
                          language === 'hi' ? 'मुख्य विशेषताएं क्या हैं?' : language === 'mr' ? 'प्रमुख वैशिष्ट्ये कोणती आहेत?' : 'What are the main features?'
                        )
                      }
                      className="w-full bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-gray-200 dark:border-slate-700 font-medium text-slate-700 dark:text-slate-200 hover:border-primary-blue transition-all"
                    >
                      {language === 'hi' ? '💡 मुख्य विशेषताएं क्या हैं?' : language === 'mr' ? '💡 प्रमुख वैशिष्ट्ये कोणती आहेत?' : '💡 What are the main features?'}
                    </button>
                    <button
                      onClick={() =>
                        handleQuickQuestion(
                          language === 'hi' ? 'यह कैसे कार्य करता है?' : language === 'mr' ? 'हे कसे चालते?' : 'How does it work?'
                        )
                      }
                      className="w-full bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-gray-200 dark:border-slate-700 font-medium text-slate-700 dark:text-slate-200 hover:border-primary-blue transition-all"
                    >
                      {language === 'hi' ? '🔍 यह कैसे कार्य करता है?' : language === 'mr' ? '🔍 हे कसे चालते?' : '🔍 How does it work?'}
                    </button>
                    <button
                      onClick={() =>
                        handleQuickQuestion(
                          language === 'hi' ? 'लॉगिन कैसे करें?' : language === 'mr' ? 'लॉगिन कसे करावे?' : 'How do I login?'
                        )
                      }
                      className="w-full bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-gray-200 dark:border-slate-700 font-medium text-slate-700 dark:text-slate-200 hover:border-primary-blue transition-all"
                    >
                      {language === 'hi' ? '🔐 लॉगिन कैसे करें?' : language === 'mr' ? '🔐 लॉगिन कसे करावे?' : '🔐 How do I login?'}
                    </button>
                  </div>
                </div>
              ) : (
                messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] px-3.5 py-2 rounded-2xl text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-primary-blue text-white rounded-br-none'
                          : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-gray-200 dark:border-slate-700 rounded-bl-none shadow-xs'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 flex gap-2">
              <input
                type="text"
                placeholder={
                  language === 'hi'
                    ? 'अपना प्रश्न टाइप करें...'
                    : language === 'mr'
                    ? 'आपला प्रश्न टाइप करा...'
                    : 'Type your question...'
                }
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
                className="flex-1 px-3 py-2 border border-gray-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-850 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:border-primary-blue"
              />
              <button
                onClick={handleSendMessage}
                className="bg-primary-blue text-white p-2 rounded-xl hover:bg-deep-navy transition-colors"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
