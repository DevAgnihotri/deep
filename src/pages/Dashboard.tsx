import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, Users, AlertTriangle, Heart, Brain, Activity, Shield, Target, BarChart3, PieChart, LineChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import {
  MentalHealthCrisisChart,
  SilentStruggleChart,
  RiskComparisonChart,
  SeveritySpectrumChart,
  EarlyWarningChart,
  MentalHealthTrendChart,
  InterventionEffectivenessChart,
  AgeGroupRiskChart,
  MaternalMentalHealthChart,
  MenstrualHealthImpactChart,
  WorkLifeBalanceChart,
  HormoneRelatedIssuesChart,
  RelationshipImpactChart,
  SleepQualityImpactChart,
  FinancialStressChart,
  insights,
  advancedInsights
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
      title: "Maternal Mental Health",
      value: `${advancedInsights.maternalMentalHealthRate}%`,
      subtitle: "Mothers experiencing challenges",
      color: "bg-gradient-to-r from-pink-500 to-pink-600",
      trend: "Postpartum peak at 0-3 months"
    },
    {
      icon: Brain,
      title: "Menstrual Impact",
      value: `${advancedInsights.menstrualImpactRate}%`,
      subtitle: "Cycle affects mood",
      color: "bg-gradient-to-r from-purple-500 to-purple-600",
      trend: "82% report mood changes"
    },
    {
      icon: Activity,
      title: "Work-Life Stress",
      value: `${advancedInsights.workRelatedStressRate}%`,
      subtitle: "Career burnout reported",
      color: "bg-gradient-to-r from-orange-500 to-orange-600",
      trend: "Peak at ages 29-35"
    },
    {
      icon: Shield,
      title: "Sleep Quality Issues",
      value: `${advancedInsights.sleepDisorderRate}%`,
      subtitle: "Poor sleep quality",
      color: "bg-gradient-to-r from-indigo-500 to-indigo-600",
      trend: "Strongest mental health predictor"
    },
    {
      icon: TrendingUp,
      title: "Financial Stress",
      value: `${advancedInsights.financialStressRate}%`,
      subtitle: "Money worries affecting mental health",
      color: "bg-gradient-to-r from-yellow-500 to-yellow-600",
      trend: "Low income = 72% depression risk"
    },
    {
      icon: Heart,
      title: "Body Image Concerns",
      value: `${advancedInsights.bodyImageConcernRate}%`,
      subtitle: "Appearance-related stress",
      color: "bg-gradient-to-r from-rose-500 to-rose-600",
      trend: "Social media pressure high"
    },
    {
      icon: Users,
      title: "Social Support Deficit",
      value: `${advancedInsights.socialSupportDeficitRate}%`,
      subtitle: "Lacking strong support systems",
      color: "bg-gradient-to-r from-cyan-500 to-cyan-600",
      trend: "Family support most impactful"
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
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-800">Analytics Dashboard</span>
            </div>
            
            <Button 
              onClick={() => navigate("/home")}
              variant="outline" 
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 rounded-full text-purple-700 text-sm font-medium mb-8">
            <img src="/logo.png" alt="Mindhaven Logo" className="w-4 h-4 mr-2 object-contain" />
            Comprehensive ML-powered insights
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Mental Health
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              {" "}Analytics Dashboard
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Deep insights from machine learning analysis of mental health patterns and trends
          </p>
        </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Insights Banner -*/}
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
        </motion.div>        {/* Data Cards Grid */}
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
        </motion.div>        {/* Female-Specific Charts - Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Maternal Mental Health Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.45 }}
          >
            <div className="flex items-center mb-4">
              <Heart className="w-6 h-6 text-purple-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-800">Maternal Mental Health Journey</h2>
            </div>
            <MaternalMentalHealthChart />
          </motion.div>

          {/* Work-Life Balance Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5 }}
          >
            <div className="flex items-center mb-4">
              <BarChart3 className="w-6 h-6 text-purple-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-800">Work-Life Balance Impact</h2>
            </div>
            <WorkLifeBalanceChart />
          </motion.div>
        </div>

        {/* Female-Specific Charts - Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Relationship Impact Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.55 }}
          >
            <div className="flex items-center mb-4">
              <Users className="w-6 h-6 text-purple-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-800">Relationship Status & Mental Health</h2>
            </div>
            <RelationshipImpactChart />
          </motion.div>

          {/* Sleep Quality Impact */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.6 }}
          >
            <div className="flex items-center mb-4">
              <Activity className="w-6 h-6 text-purple-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-800">Sleep Quality vs Mental Health</h2>
            </div>
            <SleepQualityImpactChart />
          </motion.div>
        </div>

        {/* Financial Stress Chart - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.65 }}
          className="mb-8"
        >
          <div className="flex items-center mb-4">
            <TrendingUp className="w-6 h-6 text-purple-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-800">Financial Stress Impact by Income</h2>
          </div>
          <FinancialStressChart />
        </motion.div>

        {/* Menstrual Health Impact - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7 }}
          className="mb-8"
        >
          <div className="flex items-center mb-4">
            <Heart className="w-6 h-6 text-purple-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-800">Menstrual Cycle Mental Health Impact</h2>
          </div>
          <MenstrualHealthImpactChart />
        </motion.div>

        {/* Hormone Related Issues - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.75 }}
          className="mb-8"
        >
          <div className="flex items-center mb-4">
            <Activity className="w-6 h-6 text-purple-600 mr-2" />
            <h2 className="text-xl font-bold text-gray-800">Menstrual Cycle Mood Tracking</h2>
          </div>
          <HormoneRelatedIssuesChart />
        </motion.div>{/* Additional Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20"
        >          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Female-Specific Mental Health Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-pink-50 to-pink-100">
              <div className="text-3xl font-bold text-pink-600 mb-2">82.4%</div>
              <div className="text-pink-800 font-medium">Menstrual Cycle Impact</div>
              <div className="text-sm text-pink-600 mt-2">Mood changes during cycle</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100">
              <div className="text-3xl font-bold text-purple-600 mb-2">68.3%</div>
              <div className="text-purple-800 font-medium">Maternal Mental Health</div>
              <div className="text-sm text-purple-600 mt-2">Mothers experiencing challenges</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="text-3xl font-bold text-blue-600 mb-2">67.9%</div>
              <div className="text-blue-800 font-medium">Sleep Quality Issues</div>
              <div className="text-sm text-blue-600 mt-2">Poor sleep affecting mental health</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100">
              <div className="text-3xl font-bold text-orange-600 mb-2">74.8%</div>
              <div className="text-orange-800 font-medium">Work-Related Stress</div>
              <div className="text-sm text-orange-600 mt-2">Career burnout reported</div>
            </div>
          </div>
          
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-xl">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Critical Age Groups</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• <span className="font-semibold text-red-600">18-24 years:</span> 87.2% at risk - highest vulnerability</li>
                <li>• <span className="font-semibold text-orange-600">25-34 years:</span> 84.1% at risk - career pressure peak</li>
                <li>• <span className="font-semibold text-yellow-600">35-44 years:</span> 79.3% at risk - family/career balance</li>
              </ul>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Key Protective Factors</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• <span className="font-semibold text-green-600">Excellent Sleep:</span> 8.2/10 mental health score</li>
                <li>• <span className="font-semibold text-blue-600">Strong Relationships:</span> 50% lower depression risk</li>
                <li>• <span className="font-semibold text-purple-600">Financial Security:</span> 72% → 19% risk reduction</li>
              </ul>
            </div>
          </div>
        </motion.div>        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="text-center mt-12 mb-8"
        >
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white">            <h2 className="text-2xl font-bold mb-4">Transform Women's Mental Health</h2>
            <p className="text-lg mb-6 text-purple-100">
              From maternal wellness to menstrual health, from work-life balance to financial stress - 
              every woman's journey is unique. Mindhaven provides personalized support for every stage of life.
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
    </div>
  );
};

export default Dashboard;
