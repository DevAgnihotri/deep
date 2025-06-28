import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  onClick: () => void;
  className?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ onClick, className = "" }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`absolute top-4 left-4 z-30 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-colors ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      title="Go Back"
    >
      <ArrowLeft className="w-5 h-5 text-gray-700" />
    </motion.button>
  );
};
