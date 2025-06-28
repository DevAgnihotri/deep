import React from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { workLifeBalance } from './chartData';

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
    const categoryData = workLifeBalance.find(item => item.category === label);
    return (
      <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-gray-200">
        <p className="font-semibold text-gray-800 mb-2">{label}</p>
        <div className="space-y-1">
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey === 'burnout' && 'Burnout Rate: '}
              {entry.dataKey === 'satisfaction' && 'Job Satisfaction: '}
              {entry.dataKey === 'stressLevel' && 'Stress Level: '}
              {entry.value.toFixed(1)}
              {entry.dataKey === 'stressLevel' ? '/10' : '%'}
            </p>
          ))}
          <p className="text-xs text-gray-500 mt-2">
            {categoryData?.women.toLocaleString()} women in this category
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const WorkLifeBalanceChart: React.FC = () => {
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
          Work-Life Balance Impact
        </motion.h3>
        <motion.p 
          className="text-gray-600 text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          Career focus vs. personal satisfaction in women
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
          <ComposedChart data={workLifeBalance} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <XAxis 
              dataKey="category" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 11 }}
              angle={-45}
              textAnchor="end"
            />
            <YAxis 
              yAxisId="left"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              domain={[0, 100]}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              domain={[0, 10]}
            />            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }} 
              iconType="rect"
              layout="horizontal"
              align="center"
            />
            <Bar 
              yAxisId="left"
              dataKey="burnout" 
              fill="#EF4444" 
              name="Burnout Rate (%)"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              yAxisId="left"
              dataKey="satisfaction" 
              fill="#10B981" 
              name="Job Satisfaction (%)"
              radius={[4, 4, 0, 0]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="stressLevel"
              stroke="#F59E0B"
              strokeWidth={3}
              dot={{ fill: '#F59E0B', strokeWidth: 2, r: 6 }}
              name="Stress Level (/10)"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        viewport={{ once: true }}
      >
        {workLifeBalance.map((item, index) => (
          <div key={index} className="text-center p-4 rounded-lg bg-gray-50">
            <div className="text-sm font-medium text-gray-600 mb-2">{item.category}</div>
            <div className="space-y-1">
              <div className="text-xs text-red-600">Burnout: {item.burnout}%</div>
              <div className="text-xs text-green-600">Satisfaction: {item.satisfaction}%</div>
              <div className="text-xs text-orange-600">Stress: {item.stressLevel}/10</div>
              <div className="text-xs text-gray-500">{item.women.toLocaleString()} women</div>
            </div>
          </div>
        ))}
      </motion.div>
      
      <motion.div 
        className="mt-6 p-4 bg-gradient-to-r from-red-50 to-green-50 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        viewport={{ once: true }}
      >
        <p className="text-sm text-gray-700 text-center">
          <span className="font-semibold text-green-600">Balance Insight:</span> Women with work-life balance 
          show 45% lower burnout and 67% higher satisfaction. Caregiving roles create significant stress burden.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default WorkLifeBalanceChart;
