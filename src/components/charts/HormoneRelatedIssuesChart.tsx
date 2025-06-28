import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { hormoneRelatedIssues } from './chartData';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    dataKey: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const phaseData = hormoneRelatedIssues.find(item => item.phase === label);
    return (
      <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-gray-200">
        <p className="font-semibold text-gray-800 mb-2">{label}</p>
        <div className="space-y-1">
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey === 'moodScore' && 'Mood Score: '}
              {entry.dataKey === 'energyLevel' && 'Energy Level: '}
              {entry.dataKey === 'anxietyLevel' && 'Anxiety Level: '}
              {entry.value.toFixed(1)}/10
            </p>
          ))}
          <p className="text-xs text-gray-500 mt-2">
            {phaseData?.women.toLocaleString()} women tracked
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const HormoneRelatedIssuesChart: React.FC = () => {
  return (
    <motion.div 
      className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div className="text-center mb-8">
        <motion.h3 
          className="text-3xl font-bold text-gray-800 mb-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          Menstrual Cycle Mood Tracking
        </motion.h3>
        <motion.p 
          className="text-gray-600 text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          How hormones affect mood, energy, and anxiety levels
        </motion.p>
      </div>
      
      <motion.div 
        className="h-80"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        viewport={{ once: true }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={hormoneRelatedIssues} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis 
              dataKey="phase" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <YAxis 
              domain={[0, 10]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="moodScore"
              stroke="#10B981"
              strokeWidth={3}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
              name="Mood Score (1-10)"
            />
            <Line
              type="monotone"
              dataKey="energyLevel"
              stroke="#06B6D4"
              strokeWidth={3}
              dot={{ fill: '#06B6D4', strokeWidth: 2, r: 6 }}
              name="Energy Level (1-10)"
            />
            <Line
              type="monotone"
              dataKey="anxietyLevel"
              stroke="#EF4444"
              strokeWidth={3}
              dot={{ fill: '#EF4444', strokeWidth: 2, r: 6 }}
              name="Anxiety Level (1-10)"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        viewport={{ once: true }}
      >
        {hormoneRelatedIssues.map((item, index) => (
          <div key={index} className="text-center p-4 rounded-lg bg-gray-50">
            <div className="text-sm font-medium text-gray-600 mb-2">{item.phase}</div>
            <div className="space-y-1">
              <div className="text-xs text-green-600">Mood: {item.moodScore}/10</div>
              <div className="text-xs text-blue-600">Energy: {item.energyLevel}/10</div>
              <div className="text-xs text-red-600">Anxiety: {item.anxietyLevel}/10</div>
            </div>
          </div>
        ))}
      </motion.div>
      
      <motion.div 
        className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        viewport={{ once: true }}
      >
        <p className="text-sm text-gray-700 text-center">
          <span className="font-semibold text-blue-600">Cycle Insight:</span> Ovulation brings peak mood 
          and energy (8.1/10), while menstrual phase shows lowest scores. Cycle awareness can improve wellbeing.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default HormoneRelatedIssuesChart;
