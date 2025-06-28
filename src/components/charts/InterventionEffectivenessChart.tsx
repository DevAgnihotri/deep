import React from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { motion } from 'framer-motion';

const interventionData = [
  { 
    stage: 'Early Detection', 
    effectiveness: 85, 
    cost: 20, 
    women: 3018,
    description: 'Preventive care'
  },
  { 
    stage: 'Mild Intervention', 
    effectiveness: 75, 
    cost: 45, 
    women: 2902,
    description: 'Therapy & counseling'
  },
  { 
    stage: 'Moderate Treatment', 
    effectiveness: 65, 
    cost: 80, 
    women: 3585,
    description: 'Medication + therapy'
  },
  { 
    stage: 'Intensive Care', 
    effectiveness: 55, 
    cost: 150, 
    women: 3635,
    description: 'Specialized treatment'
  },
  { 
    stage: 'Crisis Management', 
    effectiveness: 45, 
    cost: 300, 
    women: 2783,
    description: 'Emergency intervention'
  },
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
    const data = interventionData.find(item => item.stage === label);
    return (
      <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-gray-200">
        <p className="font-semibold text-gray-800 mb-2">{label}</p>
        <p className="text-sm text-gray-600 mb-2">{data?.description}</p>
        <div className="space-y-1">
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey === 'effectiveness' ? 'Success Rate' : 'Cost Index'}: {entry.value}
              {entry.dataKey === 'effectiveness' ? '%' : '/100'}
            </p>
          ))}
          <p className="text-sm text-gray-500">
            Affects: {data?.women.toLocaleString()} women
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const InterventionEffectivenessChart: React.FC = () => {
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
          Intervention Effectiveness vs Cost
        </motion.h3>
        <motion.p 
          className="text-gray-600 text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          Early intervention shows better outcomes at lower costs
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
          <ComposedChart data={interventionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
              domain={[0, 350]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              yAxisId="left"
              dataKey="effectiveness" 
              fill="#10B981" 
              name="Success Rate (%)"
              radius={[4, 4, 0, 0]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="cost"
              stroke="#EF4444"
              strokeWidth={3}
              dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
              name="Cost Index"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </motion.div>
      
      <motion.div 
        className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        viewport={{ once: true }}
      >
        <p className="text-sm text-gray-700 text-center">
          <span className="font-semibold text-green-600">Key Insight:</span> Early detection and intervention 
          is 85% effective at just 20% of the cost of crisis management
        </p>
      </motion.div>
    </motion.div>
  );
};

export default InterventionEffectivenessChart;
