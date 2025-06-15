import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, Users, AlertTriangle, Heart, Brain, Activity, Shield, Target, BarChart3, PieChart, LineChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  MentalHealthCrisisChart,
  SilentStruggleChart,
  RiskComparisonChart,
  SeveritySpectrumChart,
  EarlyWarningChart,
  MentalHealthTrendChart,
  InterventionEffectivenessChart,
  AgeGroupRiskChart,
  DemographicRiskChart,
  insights
} from '../components/charts';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const dataCards = [
    {
      icon: Users,
      title: "Total Women Assessed",
      value: insights.totalWomenAssessed.toLocaleString(),
      subtitle: "Across multiple studies",
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
      trend: "+12% from last quarter"
    },
    {
      icon: AlertTriangle,
      title: "At Risk Percentage",
      value: `${insights.atRiskPercentage}%`,
      subtitle: "Showing mental health concerns",
      color: "bg-gradient-to-r from-red-500 to-red-600",
      trend: "Urgent attention needed"
    },
    {
      icon: Heart,
      title: "Critical Cases",
      value: `${insights.criticalCasePercentage}%`,
      subtitle: "Requiring immediate intervention",
      color: "bg-gradient-to-r from-orange-500 to-orange-600",
      trend: "2 in 5 women affected"
    },
    {
      icon: Brain,
      title: "Lifestyle Analysis",
      value: insights.lifestyleSample.toLocaleString(),
      subtitle: "Women in lifestyle study",
      color: "bg-gradient-to-r from-purple-500 to-purple-600",
      trend: `${insights.lifestyleRiskPercentage}% at risk`
    },
    {
      icon: Activity,
      title: "Sleep Issues",
      value: "78.2%",
      subtitle: "Most common indicator",
      color: "bg-gradient-to-r from-indigo-500 to-indigo-600",
      trend: "Primary warning sign"
    },
    {
      icon: Shield,
      title: "Mentally Healthy",
      value: "18.7%",
      subtitle: "Thriving women",
      color: "bg-gradient-to-r from-green-500 to-green-600",
      trend: "Only 1 in 5 women"
    }
  ];

  const additionalMetrics = [
    {
      label: "Mild Depression",
      value: "18.0%",
      count: "2,902 women",
      color: "text-yellow-600"
    },
    {
      label: "Moderate Depression", 
      value: "22.2%",
      count: "3,585 women",
      color: "text-orange-600"
    },
    {
      label: "Severe Depression",
      value: "22.5%", 
      count: "3,635 women",
      color: "text-red-600"
    },
    {
      label: "Critical Depression",
      value: "17.2%",
      count: "2,783 women", 
      color: "text-red-800"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Mindhaven</span>
            </button>
            <div className="text-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Mental Health Analytics Dashboard
              </h1>
              <p className="text-gray-600 mt-1">Comprehensive insights from ML analysis</p>
            </div>
            <div className="w-32"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Insights Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold">{insights.keyMessage}</div>
              <div className="text-purple-100 mt-2">Based on 16,150 assessments</div>
            </div>
            <div>
              <div className="text-3xl font-bold">{insights.urgencyMessage}</div>
              <div className="text-purple-100 mt-2">Mental wellness crisis</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{insights.callToAction}</div>
              <div className="text-purple-100 mt-2">Our mission at Mindhaven</div>
            </div>
          </div>
        </motion.div>

        {/* Data Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {dataCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${card.color} text-white`}>
                  <card.icon className="w-6 h-6" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-800">{card.value}</div>
                  <div className="text-sm text-gray-600">{card.subtitle}</div>
                </div>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">{card.title}</h3>
              <p className="text-sm text-gray-500">{card.trend}</p>
            </motion.div>
          ))}
        </div>

        {/* Depression Severity Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-8"
        >
          <div className="flex items-center mb-4">
            <BarChart3 className="w-6 h-6 text-purple-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-800">Depression Severity Distribution</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {additionalMetrics.map((metric, index) => (
              <div key={index} className="text-center p-4 rounded-lg bg-gray-50">
                <div className={`text-2xl font-bold ${metric.color}`}>{metric.value}</div>
                <div className="text-sm font-medium text-gray-700 mt-1">{metric.label}</div>
                <div className="text-xs text-gray-500 mt-1">{metric.count}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Mental Health Crisis Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex items-center mb-4">
              <PieChart className="w-6 h-6 text-purple-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-800">Mental Health Crisis Distribution</h2>
            </div>
            <MentalHealthCrisisChart />
          </motion.div>

          {/* Silent Struggle Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center mb-4">
              <Target className="w-6 h-6 text-purple-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-800">Risk Zones Analysis</h2>
            </div>
            <SilentStruggleChart />
          </motion.div>

          {/* Risk Comparison Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <div className="flex items-center mb-4">
              <BarChart3 className="w-6 h-6 text-purple-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-800">Clinical vs Lifestyle Risk</h2>
            </div>
            <RiskComparisonChart />
          </motion.div>

          {/* Severity Spectrum Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <div className="flex items-center mb-4">
              <LineChart className="w-6 h-6 text-purple-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-800">Severity Spectrum Overview</h2>
            </div>
            <SeveritySpectrumChart />
          </motion.div>
        </div>        {/* Early Warning Indicators - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mb-8"
        >
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 text-purple-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-800">Early Warning Indicators</h2>
          </div>
          <EarlyWarningChart />
        </motion.div>

        {/* Additional Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Mental Health Trend Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 }}
          >
            <div className="flex items-center mb-4">
              <TrendingUp className="w-6 h-6 text-purple-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-800">2024 Mental Health Trends</h2>
            </div>
            <MentalHealthTrendChart />
          </motion.div>

          {/* Age Group Risk Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.3 }}
          >
            <div className="flex items-center mb-4">
              <Users className="w-6 h-6 text-purple-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-800">Risk by Age Group</h2>
            </div>
            <AgeGroupRiskChart />
          </motion.div>
        </div>        {/* Intervention Effectiveness - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mb-8"
        >
          <div className="flex items-center mb-4">
            <Target className="w-6 h-6 text-purple-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-800">Intervention Effectiveness Analysis</h2>
          </div>
          <InterventionEffectivenessChart />
        </motion.div>

        {/* Demographic Risk Analysis - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.45 }}
          className="mb-8"
        >
          <div className="flex items-center mb-4">
            <Activity className="w-6 h-6 text-purple-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-800">Demographic Risk Correlation</h2>
          </div>
          <DemographicRiskChart />
        </motion.div>{/* Additional Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Key Research Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-red-50 to-red-100">
              <div className="text-3xl font-bold text-red-600 mb-2">81.3%</div>
              <div className="text-red-800 font-medium">Clinical Depression Rate</div>
              <div className="text-sm text-red-600 mt-2">4 out of 5 women affected</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100">
              <div className="text-3xl font-bold text-orange-600 mb-2">65.7%</div>
              <div className="text-orange-800 font-medium">Lifestyle Risk Factor</div>
              <div className="text-sm text-orange-600 mt-2">Based on daily habits</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100">
              <div className="text-3xl font-bold text-green-600 mb-2">78.2%</div>
              <div className="text-green-800 font-medium">Sleep Issues Prevalent</div>
              <div className="text-sm text-green-600 mt-2">Primary warning indicator</div>
            </div>
          </div>
        </motion.div>        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="text-center mt-12 mb-8"
        >
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Take Action Today</h2>
            <p className="text-lg mb-6 text-purple-100">
              These insights show the urgent need for mental health support. At Mindhaven, we're committed to helping every woman thrive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/assessment')}
                className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                Take Assessment
              </button>
              <button
                onClick={() => navigate('/get-started')}
                className="bg-purple-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-400 transition-colors border-2 border-purple-300"
              >
                Get Started
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
