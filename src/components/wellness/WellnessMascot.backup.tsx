import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, X } from 'lucide-react';

const messages = [
  "You're doing great! Keep up the amazing work! 💪",
  "Remember to take breaks and be kind to yourself! 🌸",
  "Every small step counts on your wellness journey! 🦋",
  "I believe in you! You've got this! ⭐",
  "Taking care of your mental health is so important! 🧠💚",
  "You're stronger than you know! 🌟"
];

export const WellnessMascot: React.FC = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("Welcome to MindGames! I'm here to support your wellness journey! 🌟");

  useEffect(() => {
    const interval = setInterval(() => {
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      setCurrentMessage(randomMessage);
    }, 30000); // Change message every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleMascotClick = () => {
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setCurrentMessage(randomMessage);
    setShowMessage(true);
    
    // Auto-hide message after 5 seconds
    setTimeout(() => {
      setShowMessage(false);
    }, 5000);
  };

  return (
    <>
      {/* Mascot */}
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 20,
          delay: 1 
        }}
      >
        <motion.button
          className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full shadow-lg flex items-center justify-center text-2xl hover:shadow-xl transition-shadow"
          onClick={handleMascotClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🌟
        </motion.button>
      </motion.div>

      {/* Message Bubble */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 max-w-xs"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="bg-white rounded-2xl shadow-xl p-4 border-2 border-emerald-200 relative">
              {/* Speech bubble arrow */}
              <div className="absolute bottom-0 right-8 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white transform translate-y-full"></div>
              <div className="absolute bottom-0 right-8 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-emerald-200 transform translate-y-full -mt-px"></div>
              
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-2">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {currentMessage}
                  </p>
                </div>
                <button
                  onClick={() => setShowMessage(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
