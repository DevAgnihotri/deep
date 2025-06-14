import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Clock,
  BarChart3,
  Download,
  Trash2,
  Brain,
  User,
  AlertCircle
} from 'lucide-react';
import { resultsTracker, QuizResultRecord } from '@/lib/resultsTracker';

interface AssessmentHistoryProps {
  className?: string;
}

const AssessmentHistory: React.FC<AssessmentHistoryProps> = ({ className = '' }) => {
  const [history, setHistory] = useState<QuizResultRecord[]>([]);  const [statistics, setStatistics] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [summary, setSummary] = useState<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    const recentHistory = resultsTracker.getRecentResults(20);
    const stats = resultsTracker.getStatistics();
    const summaryData = resultsTracker.getSummary();
    
    setHistory(recentHistory);
    setStatistics(stats);
    setSummary(summaryData);
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getScoreColor = (type: string, score: number) => {
    if (type === 'depression') {
      if (score <= 4) return 'bg-green-100 text-green-800';
      if (score <= 9) return 'bg-yellow-100 text-yellow-800';
      if (score <= 14) return 'bg-orange-100 text-orange-800';
      return 'bg-red-100 text-red-800';
    } else {
      if (score <= 5) return 'bg-green-100 text-green-800';
      if (score <= 15) return 'bg-yellow-100 text-yellow-800';
      if (score <= 25) return 'bg-orange-100 text-orange-800';
      return 'bg-red-100 text-red-800';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingDown className="w-4 h-4 text-green-600" />;
      case 'worsening': return <TrendingUp className="w-4 h-4 text-red-600" />;
      case 'stable': return <Minus className="w-4 h-4 text-gray-600" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const handleExportData = () => {
    const data = resultsTracker.exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mental-health-assessment-history-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all assessment history? This cannot be undone.')) {
      resultsTracker.clearHistory();
      loadData();
    }
  };

  if (!statistics) {
    return (
      <div className={`p-4 ${className}`}>
        <p className="text-gray-500">Loading assessment history...</p>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{statistics.total}</div>
                <div className="text-sm text-gray-600">Total Assessments</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold">{statistics.thisWeek}</div>
                <div className="text-sm text-gray-600">This Week</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{statistics.byType.depression}</div>
                <div className="text-sm text-gray-600">Depression Tests</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">{statistics.byType.personality}</div>
                <div className="text-sm text-gray-600">Lifestyle Tests</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trends */}
      {statistics.trends && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">Depression Trend</div>
                  <div className="text-sm text-gray-600 capitalize">{statistics.trends.depressionTrend.replace('_', ' ')}</div>
                </div>
                {getTrendIcon(statistics.trends.depressionTrend)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">Lifestyle Trend</div>
                  <div className="text-sm text-gray-600 capitalize">{statistics.trends.lifestyleTrend.replace('_', ' ')}</div>
                </div>
                {getTrendIcon(statistics.trends.lifestyleTrend)}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Assessment History */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>Assessment History</span>
          </CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={handleExportData}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm" onClick={handleClearHistory}>
              <Trash2 className="w-4 h-4 mr-2" />
              Clear
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {history.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No assessment history found. Complete some assessments to see your progress here.
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                      {record.type === 'depression' ? (
                        <Brain className="w-5 h-5 text-blue-600" />
                      ) : (
                        <User className="w-5 h-5 text-purple-600" />
                      )}
                    </div>
                    <div>
                      <div className="font-semibold">
                        {record.type === 'depression' ? 'Depression Assessment' : 'Lifestyle Assessment'}
                      </div>
                      <div className="text-sm text-gray-600">{formatDate(record.timestamp)}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Badge className={getScoreColor(record.type, record.score)}>
                      {record.score}/{record.maxScore}
                    </Badge>
                    <div className="text-sm text-gray-600">{record.severity}</div>
                    {record.keyMetrics.aiPrediction && (
                      <Badge variant="outline" className="text-xs">
                        AI: {record.keyMetrics.aiPrediction}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Insights */}
      {summary && summary.averageScores && (
        <Card>
          <CardHeader>
            <CardTitle>Quick Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-sm font-semibold text-blue-900 mb-1">Average Depression Score</div>
                <div className="text-2xl font-bold text-blue-600">{summary.averageScores.depression}</div>
                <div className="text-xs text-blue-700">Lower is better (0-27 scale)</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="text-sm font-semibold text-purple-900 mb-1">Average Risk Factors</div>
                <div className="text-2xl font-bold text-purple-600">{summary.averageScores.personality}</div>
                <div className="text-xs text-purple-700">Lower is better (risk factors)</div>
              </div>
            </div>
            
            {statistics.lastAssessment && (
              <div className="text-sm text-gray-600">
                Last assessment: {formatDate(statistics.lastAssessment)}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AssessmentHistory;
