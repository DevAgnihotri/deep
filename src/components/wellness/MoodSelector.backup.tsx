import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Mood } from '../../types/wellness';
import { moods } from '../../data/moods';

interface MoodSelectorProps {
  onMoodSelect: (mood: Mood) => void;
  onBack: () => void;
}

export const MoodSelector: React.FC<MoodSelectorProps> = ({ onMoodSelect, onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-4xl mx-auto p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button 
          onClick={onBack}
          variant="outline" 
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Button>
      </div>

      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">How are you feeling right now?</h2>
        <p className="text-gray-600">Select the mood that best describes your current state</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {moods.map((mood) => (
          <motion.button
            key={mood.id}
            className="p-6 rounded-2xl border-2 border-emerald-200 bg-white hover:border-emerald-300 hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
            onClick={() => onMoodSelect(mood)}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="text-center relative z-10">
              <div className="text-4xl mb-3">{mood.icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1">{mood.name}</h3>
              <p className="text-sm text-gray-600">{mood.description}</p>
            </div>
            
            {/* Hover overlay with mood color */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl"
              style={{
                background: `linear-gradient(135deg, ${mood.color}40, ${mood.color}20)`
              }}
            />
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};
