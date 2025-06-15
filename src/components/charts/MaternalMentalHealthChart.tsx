import React from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { maternalMentalHealth } from './chartData';

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
    const stageData = maternalMentalHealth.find(item => item.stage === label);
    return (
      <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-gray-200">
        <p className="font-semibold text-gray-800 mb-2">{label}</p>
        <p className="text-sm text-gray-600 mb-2">{stageData?.description}</p>
        <div className="space-y-1">
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey === 'depression' && 'Depression: '}
              {entry.dataKey === 'anxiety' && 'Anxiety: '}
              {entry.dataKey === 'stress' && 'Stress: '}
              {entry.value.toFixed(1)}%
            </p>
          ))}
          <p className="text-xs text-gray-500 mt-2">
            {stageData?.women.toLocaleString()} women studied
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const MaternalMentalHealthChart: React.FC = () => {
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
          Maternal Mental Health Journey
        </motion.h3>
        <motion.p 
          className="text-gray-600 text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          Mental health challenges across motherhood stages
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
          <AreaChart data={maternalMentalHealth} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="depressionGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EC4899" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#EC4899" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="anxietyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="stressGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="stage" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 11 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              domain={[0, 35]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Area
              type="monotone"
              dataKey="stress"
              stackId="1"
              stroke="#F59E0B"
              fill="url(#stressGradient)"
              strokeWidth={2}
              name="Stress Level (%)"
            />
            <Area
              type="monotone"
              dataKey="anxiety"
              stackId="1"
              stroke="#8B5CF6"
              fill="url(#anxietyGradient)"
              strokeWidth={2}
              name="Anxiety Rate (%)"
            />
            <Area
              type="monotone"
              dataKey="depression"
              stackId="1"
              stroke="#EC4899"
              fill="url(#depressionGradient)"
              strokeWidth={2}
              name="Depression Rate (%)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
      
      <motion.div 
        className="mt-6 p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        viewport={{ once: true }}
      >
        <p className="text-sm text-gray-700 text-center">
          <span className="font-semibold text-pink-600">Critical Finding:</span> Postpartum depression peaks 
          at 0-3 months (15.8%) - early intervention is crucial for new mothers
        </p>
      </motion.div>
    </motion.div>
  );
};

export default MaternalMentalHealthChart;
