import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { sleepQualityImpact } from './chartData';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      quality: string;
      percentage: number;
      mentalHealthScore: number;
      depressionRisk: number;
      anxietyLevel: number;
      women: number;
      color: string;
    };
  }>;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-gray-200">
        <p className="font-semibold text-gray-800 mb-2">{data.quality}</p>
        <div className="space-y-1">
          <p className="text-sm">
            <span className="font-medium">Prevalence:</span> {data.percentage}%
          </p>
          <p className="text-sm">
            <span className="font-medium">Mental Health Score:</span> {data.mentalHealthScore}/10
          </p>
          <p className="text-sm">
            <span className="font-medium">Depression Risk:</span> {data.depressionRisk}%
          </p>
          <p className="text-sm">
            <span className="font-medium">Anxiety Level:</span> {data.anxietyLevel}/10
          </p>
          <p className="text-xs text-gray-500 mt-2">
            {data.women.toLocaleString()} women affected
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const SleepQualityImpactChart: React.FC = () => {
  return (
    <motion.div 
      className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
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
          Sleep Quality vs Mental Health
        </motion.h3>
        <motion.p 
          className="text-gray-600 text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          Sleep quality is the strongest predictor of mental wellbeing
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
          <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis 
              type="number"
              dataKey="mentalHealthScore"
              domain={[0, 10]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              name="Mental Health Score"
            />
            <YAxis 
              type="number"
              dataKey="depressionRisk"
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              name="Depression Risk %"
            />
            <Tooltip content={<CustomTooltip />} />
            <Scatter name="Sleep Quality Impact" data={sleepQualityImpact}>
              {sleepQualityImpact.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-5 gap-3 mt-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        viewport={{ once: true }}
      >
        {sleepQualityImpact.map((item, index) => (
          <div key={index} className="text-center p-3 rounded-lg bg-gray-50">
            <div className="text-xs font-medium text-gray-600 mb-1">{item.quality}</div>
            <div className="space-y-1">
              <div className="text-sm font-bold" style={{ color: item.color }}>
                {item.percentage}%
              </div>
              <div className="text-xs text-gray-600">MH: {item.mentalHealthScore}/10</div>
              <div className="text-xs text-red-600">Risk: {item.depressionRisk}%</div>
              <div className="text-xs text-gray-500">{item.women.toLocaleString()}</div>
            </div>
          </div>
        ))}
      </motion.div>
      
      <motion.div 
        className="mt-6 p-4 bg-gradient-to-r from-green-50 to-red-50 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        viewport={{ once: true }}
      >
        <p className="text-sm text-gray-700 text-center">
          <span className="font-semibold text-green-600">Sleep Impact:</span> Women with excellent sleep 
          have 8.2/10 mental health scores and only 12% depression risk. Poor sleep increases risk to 89%.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default SleepQualityImpactChart;
