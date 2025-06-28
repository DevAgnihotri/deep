import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { mentalHealthCrisis, insights } from './chartData';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      name: string;
      value: number;
      count: number;
      color: string;
      description: string;
    };
  }>;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-gray-200 z-50 transform translate-x-4 translate-y-4">
        <p className="font-semibold text-gray-800" style={{ color: data.color }}>
          {data.name}
        </p>
        <p className="text-sm text-gray-600">{data.description}</p>
        <p className="text-lg font-bold text-gray-800">{data.value}%</p>
        <p className="text-sm text-gray-500">{data.count.toLocaleString()} women</p>
      </div>
    );
  }
  return null;
};

const MentalHealthCrisisChart: React.FC = () => {
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
          Women's Mental Health Crisis Reality
        </motion.h3>
        <motion.p 
          className="text-gray-600 text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {insights.keyMessage}
        </motion.p>
      </div>      <div className="h-96 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={mentalHealthCrisis}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={140}
              paddingAngle={2}
              dataKey="value"
              animationBegin={0}
              animationDuration={1500}
            >
              {mentalHealthCrisis.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              content={<CustomTooltip />}
              position={{ x: 420, y: 50 }}
              allowEscapeViewBox={{ x: true, y: true }}
              offset={20}
            />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center Statistics */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div className="text-center bg-white/80 backdrop-blur-sm rounded-full p-4">
            <p className="text-4xl font-bold text-rose-600">{insights.atRiskPercentage}%</p>
            <p className="text-sm text-gray-600 font-medium">Need Support</p>
            <p className="text-xs text-gray-500">{insights.totalWomenAssessed.toLocaleString()} assessed</p>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="mt-6 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
      >
        <p className="text-lg font-semibold text-rose-600 mb-2">
          {insights.urgencyMessage}
        </p>
        <p className="text-gray-600">
          {insights.callToAction}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default MentalHealthCrisisChart;
