import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import { earlyWarning } from './chartData';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: {
      indicator: string;
      affected: number;
      critical: number;
      color: string;
    };
  }>;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-gray-200">
        <p className="font-semibold text-gray-800">{data.indicator}</p>
        <p className="text-sm text-gray-600 mb-2">Early warning indicator</p>
        <div className="space-y-1">
          <p className="text-sm">
            <span className="font-medium">Affected:</span> {data.affected}%
          </p>
          <p className="text-sm">
            <span className="font-medium">Critical:</span> {data.critical}%
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const EarlyWarningChart: React.FC = () => {
  return (
    <motion.div 
      className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20"
      initial={{ opacity: 0, rotate: -5 }}
      whileInView={{ opacity: 1, rotate: 0 }}
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
          Early Warning Indicators
        </motion.h3>
        <motion.p 
          className="text-gray-600 text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Recognizing the signs before crisis hits
        </motion.p>
      </div>

      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={earlyWarning} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <PolarGrid stroke="#E5E7EB" />
            <PolarAngleAxis 
              dataKey="indicator" 
              tick={{ fontSize: 12, fill: '#374151' }}
              tickSize={5}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 80]} 
              tickCount={5}
              tick={{ fontSize: 10, fill: '#6B7280' }}
            />
            <Radar
              name="Affected"
              dataKey="affected"
              stroke="#8B5CF6"
              fill="#8B5CF6"
              fillOpacity={0.3}
              strokeWidth={2}
              animationDuration={1500}
            />
            <Radar
              name="Critical"
              dataKey="critical"
              stroke="#EF4444"
              fill="#EF4444"
              fillOpacity={0.2}
              strokeWidth={2}
              animationDuration={1500}
              animationBegin={300}
            />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
      >
        <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
          <div className="w-4 h-4 bg-purple-500 rounded-full opacity-70" />
          <div>
            <p className="font-semibold text-purple-700">Affected Women</p>
            <p className="text-sm text-gray-600">Experiencing symptoms</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
          <div className="w-4 h-4 bg-red-500 rounded-full opacity-70" />
          <div>
            <p className="font-semibold text-red-700">Critical Cases</p>
            <p className="text-sm text-gray-600">Requiring immediate help</p>
          </div>
        </div>
      </motion.div>

      <motion.div 
        className="mt-6 space-y-3"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <h4 className="font-semibold text-gray-800 text-center mb-4">
          Most Common Warning Signs
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {earlyWarning.map((warning, index) => (
            <motion.div
              key={warning.indicator}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4 + index * 0.1 }}
            >
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: warning.color }}
                />
                <span className="text-sm font-medium text-gray-700">
                  {warning.indicator}
                </span>
              </div>
              <span className="text-sm font-bold" style={{ color: warning.color }}>
                {warning.affected}%
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div 
        className="mt-6 text-center p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 2.0 }}
      >
        <p className="text-lg font-semibold text-gray-800 mb-2">
          Early Detection Saves Lives
        </p>
        <p className="text-gray-600">
          Recognizing these warning signs early can prevent mental health crises. 
          If you identify with these symptoms, professional support is available.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default EarlyWarningChart;
