import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { motion } from 'framer-motion';

const demographicData = [
  { x: 22, y: 87.2, size: 2890, group: 'Young Adults (18-24)', color: '#EF4444', risk: 'Critical' },
  { x: 30, y: 84.1, size: 4523, group: 'Career Women (25-34)', color: '#F59E0B', risk: 'High' },
  { x: 40, y: 79.3, size: 3867, group: 'Established (35-44)', color: '#FB923C', risk: 'Moderate' },
  { x: 50, y: 76.8, size: 2945, group: 'Midlife (45-54)', color: '#F59E0B', risk: 'Moderate' },
  { x: 60, y: 72.4, size: 1925, group: 'Mature (55-64)', color: '#10B981', risk: 'Lower' },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      x: number;
      y: number;
      size: number;
      group: string;
      color: string;
      risk: string;
    };
  }>;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-gray-200">
        <p className="font-semibold text-gray-800" style={{ color: data.color }}>
          {data.group}
        </p>
        <p className="text-sm text-gray-600 mb-2">{data.risk} Risk Level</p>
        <div className="space-y-1">
          <p className="text-sm">
            <span className="font-medium">Average Age:</span> {data.x} years
          </p>
          <p className="text-sm">
            <span className="font-medium">Risk Percentage:</span> {data.y}%
          </p>
          <p className="text-sm">
            <span className="font-medium">Population:</span> {data.size.toLocaleString()} women
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const DemographicRiskChart: React.FC = () => {
  return (
    <motion.div 
      className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
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
          Demographic Risk Correlation
        </motion.h3>
        <motion.p 
          className="text-gray-600 text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          Age vs Mental Health Risk (Bubble size = Population)
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
          <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <XAxis 
              type="number"
              dataKey="x"
              domain={[15, 65]}
              tickCount={6}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              label={{ value: 'Average Age', position: 'bottom', offset: 0 }}
            />
            <YAxis 
              type="number"
              dataKey="y"
              domain={[65, 90]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              label={{ value: 'Risk Percentage (%)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Scatter data={demographicData}>
              {demographicData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  r={Math.sqrt(entry.size) / 10}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mt-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        viewport={{ once: true }}
      >
        {demographicData.map((item, index) => (
          <div key={index} className="text-center p-3 rounded-lg bg-gray-50">
            <div className="text-xs font-medium text-gray-600 mb-1">{item.group}</div>
            <div className="text-lg font-bold" style={{ color: item.color }}>
              {item.y}%
            </div>
            <div className="text-xs text-gray-500">{item.size.toLocaleString()}</div>
          </div>
        ))}
      </motion.div>
      
      <motion.div 
        className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        viewport={{ once: true }}
      >
        <p className="text-sm text-gray-700 text-center">
          <span className="font-semibold text-blue-600">Population Insight:</span> Career women (25-34) 
          represent the largest demographic at risk, with 4,523 women showing high mental health concerns
        </p>
      </motion.div>
    </motion.div>
  );
};

export default DemographicRiskChart;
