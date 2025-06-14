import React from 'react';
import { motion } from 'framer-motion';
import { riskComparison } from './chartData';

interface GaugeProps {
  percentage: number;
  color: string;
  size: number;
}

const Gauge: React.FC<GaugeProps> = ({ percentage, color, size }) => {
  const radius = size / 2 - 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth="8"
          fill="transparent"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset }}
          transition={{ duration: 2, ease: "easeInOut" }}
          viewport={{ once: true }}
        />
      </svg>
      {/* Center text */}
      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <span 
          className="text-3xl font-bold"
          style={{ color }}
        >
          {percentage}%
        </span>
        <span className="text-xs text-gray-500">at risk</span>
      </motion.div>
    </div>
  );
};

const RiskComparisonChart: React.FC = () => {
  return (
    <motion.div 
      className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
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
          Risk Assessment Comparison
        </motion.h3>
        <motion.p 
          className="text-gray-600 text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Multiple pathways to depression risk
        </motion.p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {riskComparison.map((risk, index) => (
          <motion.div
            key={risk.type}
            className="text-center"
            initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.2, duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <Gauge 
                percentage={risk.percentage} 
                color={risk.color} 
                size={200} 
              />
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">
              {risk.type}
            </h4>
            <p className="text-gray-600 mb-2">{risk.description}</p>
            <p className="text-sm text-gray-500">
              Sample: {risk.sample.toLocaleString()} people
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="mt-8 text-center p-4 bg-gradient-to-r from-rose-50 to-purple-50 rounded-xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
      >
        <p className="text-lg font-semibold text-gray-800 mb-2">
          Key Insight
        </p>
        <p className="text-gray-600">
          Both clinical assessment and lifestyle factors reveal concerning levels of depression risk, 
          highlighting the need for comprehensive support systems.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default RiskComparisonChart;
