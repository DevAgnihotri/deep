import React from 'react';
import { motion } from 'framer-motion';
import { severitySpectrum } from './chartData';

interface ProgressBarProps {
  level: string;
  percentage: number;
  women: string;
  color: string;
  action: string;
  index: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ 
  level, 
  percentage, 
  women, 
  color, 
  action, 
  index 
}) => {
  return (
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.2, duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-3">
          <div 
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: color }}
          />
          <span className="font-semibold text-gray-800">{level}</span>
        </div>
        <div className="text-right">
          <span className="text-lg font-bold" style={{ color }}>
            {percentage}%
          </span>
          <p className="text-xs text-gray-500">{women}</p>
        </div>
      </div>
      
      <div className="relative">
        <div className="w-full bg-gray-200 rounded-full h-3">
          <motion.div
            className="h-3 rounded-full"
            style={{ backgroundColor: color }}
            initial={{ width: 0 }}
            whileInView={{ width: `${percentage}%` }}
            transition={{ delay: 0.5 + index * 0.1, duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          />
        </div>
        
        <motion.div
          className="absolute -top-8 right-0 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg shadow-sm border text-xs"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 + index * 0.1 }}
          viewport={{ once: true }}
        >
          {action}
        </motion.div>
      </div>
    </motion.div>
  );
};

const SeveritySpectrumChart: React.FC = () => {
  const maxPercentage = Math.max(...severitySpectrum.map(item => item.percentage));

  return (
    <motion.div 
      className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="text-center mb-8">
        <motion.h3 
          className="text-3xl font-bold text-gray-800 mb-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Depression Severity Spectrum
        </motion.h3>
        <motion.p 
          className="text-gray-600 text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Where do you stand? Understanding the continuum of mental health
        </motion.p>
      </div>

      <div className="space-y-4 mb-8">
        {severitySpectrum.map((item, index) => (
          <ProgressBar
            key={item.level}
            level={item.level}
            percentage={item.percentage}
            women={item.women}
            color={item.color}
            action={item.action}
            index={index}
          />
        ))}
      </div>

      <motion.div 
        className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="text-center p-4 bg-green-50 rounded-xl">
          <p className="text-2xl font-bold text-green-600">18.7%</p>
          <p className="text-sm text-gray-600">Mentally Healthy</p>
        </div>
        <div className="text-center p-4 bg-yellow-50 rounded-xl">
          <p className="text-2xl font-bold text-yellow-600">40.2%</p>
          <p className="text-sm text-gray-600">Need Support</p>
        </div>
        <div className="text-center p-4 bg-red-50 rounded-xl">
          <p className="text-2xl font-bold text-red-600">39.7%</p>
          <p className="text-sm text-gray-600">Critical Cases</p>
        </div>
      </motion.div>

      <motion.div 
        className="text-center p-4 bg-gradient-to-r from-rose-50 to-purple-50 rounded-xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 2.0 }}
      >
        <p className="text-lg font-semibold text-gray-800 mb-2">
          Personal Connection
        </p>
        <p className="text-gray-600">
          Understanding where you are on this spectrum is the first step toward getting the right support. 
          Every level deserves compassionate, professional care.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default SeveritySpectrumChart;
