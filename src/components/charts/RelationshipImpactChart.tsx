import React from 'react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { relationshipImpact } from './chartData';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      status: string;
      depression: number;
      anxiety: number;
      loneliness: number;
      support: number;
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
        <p className="font-semibold text-gray-800 mb-2">{data.status}</p>
        <div className="space-y-1">
          <p className="text-sm text-red-600">Depression: {data.depression}%</p>
          <p className="text-sm text-orange-600">Anxiety: {data.anxiety}%</p>
          <p className="text-sm text-purple-600">Loneliness: {data.loneliness}%</p>
          <p className="text-sm text-green-600">Support: {data.support}%</p>
          <p className="text-xs text-gray-500 mt-2">
            {data.women.toLocaleString()} women in this category
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const RelationshipImpactChart: React.FC = () => {
  return (
    <motion.div 
      className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
      initial={{ opacity: 0, x: 20 }}
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
          Relationship Status & Mental Health
        </motion.h3>
        <motion.p 
          className="text-gray-600 text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          How relationship status affects women's mental wellbeing
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
          <BarChart data={relationshipImpact} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis 
              dataKey="status" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <YAxis 
              domain={[0, 80]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6B7280', fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="depression" 
              radius={[8, 8, 0, 0]}
            >
              {relationshipImpact.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        viewport={{ once: true }}
      >
        {relationshipImpact.map((item, index) => (
          <div key={index} className="text-center p-4 rounded-lg bg-gray-50">
            <div className="text-sm font-medium text-gray-600 mb-2">{item.status}</div>
            <div className="space-y-1">
              <div className="text-xs text-red-600">Depression: {item.depression}%</div>
              <div className="text-xs text-orange-600">Anxiety: {item.anxiety}%</div>
              <div className="text-xs text-purple-600">Loneliness: {item.loneliness}%</div>
              <div className="text-xs text-green-600">Support: {item.support}%</div>
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
          <span className="font-semibold text-red-600">Relationship Impact:</span> Single and divorced women 
          show 45-58% higher depression rates. Strong support networks are crucial for mental health.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default RelationshipImpactChart;
