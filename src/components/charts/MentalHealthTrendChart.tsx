import React from 'react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';

const trendData = [
  { month: 'Jan', healthy: 19.2, atRisk: 80.8 },
  { month: 'Feb', healthy: 18.9, atRisk: 81.1 },
  { month: 'Mar', healthy: 18.5, atRisk: 81.5 },
  { month: 'Apr', healthy: 18.7, atRisk: 81.3 },
  { month: 'May', healthy: 18.4, atRisk: 81.6 },
  { month: 'Jun', healthy: 18.2, atRisk: 81.8 },
];

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
    return (
      <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-gray-200">
        <p className="font-semibold text-gray-800 mb-2">{label} 2024</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.dataKey === 'healthy' ? 'Mentally Healthy' : 'At Risk'}: {entry.value.toFixed(1)}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const MentalHealthTrendChart: React.FC = () => {
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
          Mental Health Trends 2024
        </motion.h3>
        <motion.p 
          className="text-gray-600 text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          Tracking mental wellness over time
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
          <AreaChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="healthyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="atRiskGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <YAxis 
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="atRisk"
              stackId="1"
              stroke="#EF4444"
              fill="url(#atRiskGradient)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="healthy"
              stackId="1"
              stroke="#10B981"
              fill="url(#healthyGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
      
      <motion.div 
        className="flex justify-center space-x-8 mt-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Mentally Healthy</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-500 rounded-full"></div>
          <span className="text-sm text-gray-600">At Risk</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MentalHealthTrendChart;
