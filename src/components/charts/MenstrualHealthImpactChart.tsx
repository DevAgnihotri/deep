import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { menstrualHealthImpact } from './chartData';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      symptom: string;
      prevalence: number;
      severity: number;
      impact: string;
      color: string;
    };
  }>;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-gray-200">
        <p className="font-semibold text-gray-800" style={{ color: data.color }}>
          {data.symptom}
        </p>
        <p className="text-sm text-gray-600 mb-2">{data.impact} impact on daily life</p>
        <div className="space-y-1">
          <p className="text-sm">
            <span className="font-medium">Prevalence:</span> {data.prevalence}%
          </p>
          <p className="text-sm">
            <span className="font-medium">Severity:</span> {data.severity}/10
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const MenstrualHealthImpactChart: React.FC = () => {
  return (
    <motion.div 
      className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
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
          Menstrual Cycle Mental Health Impact
        </motion.h3>
        <motion.p 
          className="text-gray-600 text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          82% of women report mood changes during their cycle
        </motion.p>
      </div>
      
      <motion.div 
        className="h-96"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        viewport={{ once: true }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={menstrualHealthImpact} margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
            <PolarGrid stroke="#E5E7EB" />
            <PolarAngleAxis 
              dataKey="symptom" 
              tick={{ fill: '#6B7280', fontSize: 12 }}
              className="text-xs"
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]} 
              tick={{ fill: '#6B7280', fontSize: 10 }}
              tickCount={5}
            />
            <Tooltip content={<CustomTooltip />} />
            <Radar
              name="Prevalence Rate"
              dataKey="prevalence"
              stroke="#EC4899"
              fill="#EC4899"
              fillOpacity={0.3}
              strokeWidth={2}
              dot={{ fill: '#EC4899', strokeWidth: 2, r: 4 }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-2 lg:grid-cols-5 gap-3 mt-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        viewport={{ once: true }}
      >
        {menstrualHealthImpact.map((item, index) => (
          <div key={index} className="text-center p-3 rounded-lg bg-gray-50">
            <div className="text-xs font-medium text-gray-600 mb-1">{item.symptom}</div>
            <div className="text-lg font-bold" style={{ color: item.color }}>
              {item.prevalence}%
            </div>
            <div className="text-xs text-gray-500">Severity: {item.severity}/10</div>
          </div>
        ))}
      </motion.div>
      
      <motion.div 
        className="mt-6 p-4 bg-gradient-to-r from-pink-50 to-red-50 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        viewport={{ once: true }}
      >
        <p className="text-sm text-gray-700 text-center">
          <span className="font-semibold text-pink-600">Key Insight:</span> Fatigue affects 85% of women 
          during their cycle, followed by mood swings at 82%. Cycle tracking can help predict and manage symptoms.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default MenstrualHealthImpactChart;
