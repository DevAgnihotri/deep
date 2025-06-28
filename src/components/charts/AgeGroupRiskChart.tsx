import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { motion } from 'framer-motion';

const ageGroupData = [
  { group: '18-24', percentage: 87.2, count: 2890, color: '#EF4444', severity: 'Critical Age' },
  { group: '25-34', percentage: 84.1, count: 4523, color: '#F59E0B', severity: 'High Risk' },
  { group: '35-44', percentage: 79.3, count: 3867, color: '#FB923C', severity: 'Moderate Risk' },
  { group: '45-54', percentage: 76.8, count: 2945, color: '#F59E0B', severity: 'Moderate Risk' },
  { group: '55-64', percentage: 72.4, count: 1925, color: '#10B981', severity: 'Lower Risk' },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      group: string;
      percentage: number;
      count: number;
      color: string;
      severity: string;
    };
  }>;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-gray-200">
        <p className="font-semibold text-gray-800" style={{ color: data.color }}>
          Age Group {data.group}
        </p>
        <p className="text-sm text-gray-600 mb-2">{data.severity}</p>
        <div className="space-y-1">
          <p className="text-lg font-bold text-gray-800">{data.percentage}%</p>
          <p className="text-sm text-gray-500">At risk for mental health issues</p>
          <p className="text-sm text-gray-500">{data.count.toLocaleString()} women assessed</p>
        </div>
      </div>
    );
  }
  return null;
};

const AgeGroupRiskChart: React.FC = () => {
  return (
    <motion.div 
      className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
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
          Mental Health Risk by Age Group
        </motion.h3>
        <motion.p 
          className="text-gray-600 text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          Younger women face higher mental health risks
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
          <BarChart data={ageGroupData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis 
              dataKey="group" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <YAxis 
              domain={[60, 90]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="percentage" 
              radius={[8, 8, 0, 0]}
            >
              {ageGroupData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-2 lg:grid-cols-5 gap-3 mt-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        viewport={{ once: true }}
      >
        {ageGroupData.map((item, index) => (
          <div key={index} className="text-center p-3 rounded-lg bg-gray-50">
            <div className="text-sm font-medium text-gray-600 mb-1">{item.group}</div>
            <div className="text-lg font-bold" style={{ color: item.color }}>
              {item.percentage}%
            </div>
            <div className="text-xs text-gray-500">{item.count.toLocaleString()}</div>
          </div>
        ))}
      </motion.div>
      
      <motion.div 
        className="mt-6 p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        viewport={{ once: true }}
      >
        <p className="text-sm text-gray-700 text-center">
          <span className="font-semibold text-red-600">Critical Finding:</span> Young women (18-24) 
          show the highest mental health risk at 87.2%, requiring urgent targeted interventions
        </p>
      </motion.div>
    </motion.div>
  );
};

export default AgeGroupRiskChart;
