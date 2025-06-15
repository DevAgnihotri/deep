import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { financialStressImpact } from './chartData';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      income: string;
      financialStress: number;
      mentalHealthImpact: number;
      anxietyLevel: number;
      depressionRisk: number;
      women: number;
      color: string;
      size: number;
    };
  }>;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-gray-200">
        <p className="font-semibold text-gray-800 mb-2">{data.income}</p>
        <div className="space-y-1">
          <p className="text-sm">
            <span className="font-medium">Financial Stress:</span> {data.financialStress}/10
          </p>
          <p className="text-sm">
            <span className="font-medium">Mental Health Impact:</span> {data.mentalHealthImpact}/10
          </p>
          <p className="text-sm">
            <span className="font-medium">Anxiety Level:</span> {data.anxietyLevel}/10
          </p>
          <p className="text-sm">
            <span className="font-medium">Depression Risk:</span> {data.depressionRisk}%
          </p>
          <p className="text-xs text-gray-500 mt-2">
            {data.women.toLocaleString()} women in this income bracket
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const FinancialStressChart: React.FC = () => {
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
          Financial Stress Impact by Income
        </motion.h3>
        <motion.p 
          className="text-gray-600 text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          How financial pressure affects women's mental health
        </motion.p>
      </div>
      
      <motion.div 
        className="h-80"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        viewport={{ once: true }}
      >        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={financialStressImpact} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <XAxis 
              dataKey="income" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 10 }}
              angle={-45}
              textAnchor="end"
            />
            <YAxis 
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="depressionRisk" 
              radius={[8, 8, 0, 0]}
            >
              {financialStressImpact.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-5 gap-3 mt-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        viewport={{ once: true }}
      >
        {financialStressImpact.map((item, index) => (
          <div key={index} className="text-center p-3 rounded-lg bg-gray-50">
            <div className="text-xs font-medium text-gray-600 mb-1">{item.income}</div>
            <div className="space-y-1">
              <div className="text-sm font-bold" style={{ color: item.color }}>
                {item.depressionRisk}%
              </div>
              <div className="text-xs text-gray-600">Stress: {item.financialStress}/10</div>
              <div className="text-xs text-red-600">Anxiety: {item.anxietyLevel}/10</div>
              <div className="text-xs text-gray-500">{item.women.toLocaleString()}</div>
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
          <span className="font-semibold text-red-600">Financial Impact:</span> Low-income women show 
          72% depression risk vs. 19% for high-income. Financial security is crucial for mental health.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default FinancialStressChart;
