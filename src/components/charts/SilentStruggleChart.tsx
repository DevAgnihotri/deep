import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { silentStruggle } from './chartData';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      zone: string;
      percentage: number;
      count: number;
      color: string;
      message: string;
    };
  }>;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-gray-200">
        <p className="font-semibold text-gray-800" style={{ color: data.color }}>
          {data.zone}
        </p>
        <p className="text-sm text-gray-600">{data.message}</p>
        <p className="text-lg font-bold text-gray-800">{data.percentage}%</p>
        <p className="text-sm text-gray-500">{data.count.toLocaleString()} women</p>
      </div>
    );
  }
  return null;
};

const SilentStruggleChart: React.FC = () => {
  return (
    <motion.div 
      className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
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
          The Hidden Mental Health Crisis
        </motion.h3>
        <motion.p 
          className="text-gray-600 text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Only 1 in 5 women are mentally healthy
        </motion.p>
      </div>      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={silentStruggle}
            margin={{ top: 20, right: 30, left: 120, bottom: 20 }}
            layout="vertical"
          >
            <XAxis 
              type="number" 
              domain={[0, 50]} 
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              type="category" 
              dataKey="zone" 
              width={100}
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip 
              content={<CustomTooltip />} 
              cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
            />
            <Bar 
              dataKey="percentage" 
              radius={[0, 8, 8, 0]}
              animationDuration={1500}
            >
              {silentStruggle.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <motion.div 
        className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        {silentStruggle.map((zone, index) => (
          <motion.div
            key={zone.zone}
            className="text-center p-4 rounded-xl"
            style={{ backgroundColor: `${zone.color}20` }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + index * 0.2 }}
          >
            <div 
              className="w-6 h-6 rounded-full mx-auto mb-2"
              style={{ backgroundColor: zone.color }}
            />
            <p className="font-semibold text-gray-800 text-sm">{zone.zone}</p>
            <p className="text-2xl font-bold" style={{ color: zone.color }}>
              {zone.percentage}%
            </p>
            <p className="text-xs text-gray-600">{zone.message}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default SilentStruggleChart;
