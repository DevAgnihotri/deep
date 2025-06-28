interface QuizResultRecord {
  id: string;
  type: 'depression' | 'personality';
  timestamp: string;
  score: number;
  maxScore: number;
  severity: string;
  riskLevel?: string;
  keyMetrics: {
    phq9Score?: number;
    aiPrediction?: string;
    riskFactorsCount?: number;
    riskFactors?: string[];
  };
  userId?: string;
  sessionId: string;
}

interface QuizHistory {
  records: QuizResultRecord[];
  totalAssessments: number;
  lastAssessment?: string;
  trends?: {
    depressionTrend: 'improving' | 'stable' | 'worsening' | 'insufficient_data';
    lifestyleTrend: 'improving' | 'stable' | 'worsening' | 'insufficient_data';
  };
}

interface DepressionResult {
  phq9Score: number;
  severity: string;
  aiPrediction?: {
    class: string;
  };
}

interface PersonalityResult {
  riskScore: number;
  riskLevel: string;
  riskFactors: string[];
  aiPrediction?: {
    class: string;
  };
}

class ResultsTracker {
  private storageKey = 'mental_health_assessment_history';
  private sessionId: string;

  constructor() {
    this.sessionId = this.generateSessionId();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateResultId(): string {
    return `result_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  /**
   * Track a depression quiz result
   */
  trackDepressionResult(result: DepressionResult): void {
    const record: QuizResultRecord = {
      id: this.generateResultId(),
      type: 'depression',
      timestamp: new Date().toISOString(),
      score: result.phq9Score,
      maxScore: 27,
      severity: result.severity,
      keyMetrics: {
        phq9Score: result.phq9Score,
        aiPrediction: result.aiPrediction?.class,
      },
      sessionId: this.sessionId,
    };

    this.saveRecord(record);
    console.log('🧠 Depression result tracked:', record);
  }

  /**
   * Track a personality/lifestyle quiz result
   */
  trackPersonalityResult(result: PersonalityResult): void {
    const record: QuizResultRecord = {
      id: this.generateResultId(),
      type: 'personality',
      timestamp: new Date().toISOString(),
      score: result.riskScore,
      maxScore: 30, // Approximate max risk factors
      severity: result.riskLevel,
      riskLevel: result.riskLevel,
      keyMetrics: {
        riskFactorsCount: result.riskScore,
        riskFactors: result.riskFactors,
        aiPrediction: result.aiPrediction?.class,
      },
      sessionId: this.sessionId,
    };

    this.saveRecord(record);
    console.log('🎯 Lifestyle result tracked:', record);
  }

  /**
   * Save a record to localStorage
   */
  private saveRecord(record: QuizResultRecord): void {
    try {
      const history = this.getHistory();
      history.records.push(record);
      history.totalAssessments = history.records.length;
      history.lastAssessment = record.timestamp;
      
      // Calculate trends if we have enough data
      if (history.records.length >= 2) {
        history.trends = this.calculateTrends(history.records);
      }

      localStorage.setItem(this.storageKey, JSON.stringify(history));
      
      // Also save to a summary cache
      this.updateSummaryCache(history);
    } catch (error) {
      console.error('Failed to save quiz result:', error);
    }
  }

  /**
   * Get complete history
   */
  getHistory(): QuizHistory {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load quiz history:', error);
    }

    return {
      records: [],
      totalAssessments: 0,
    };
  }

  /**
   * Get recent results (last 10)
   */
  getRecentResults(limit = 10): QuizResultRecord[] {
    const history = this.getHistory();
    return history.records
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  }

  /**
   * Get results by type
   */
  getResultsByType(type: 'depression' | 'personality'): QuizResultRecord[] {
    const history = this.getHistory();
    return history.records
      .filter(record => record.type === type)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }

  /**
   * Calculate trends
   */
  private calculateTrends(records: QuizResultRecord[]): QuizHistory['trends'] {
    const depressionRecords = records.filter(r => r.type === 'depression').slice(-3);
    const personalityRecords = records.filter(r => r.type === 'personality').slice(-3);

    const calculateTrend = (results: QuizResultRecord[]): 'improving' | 'stable' | 'worsening' | 'insufficient_data' => {
      if (results.length < 2) return 'insufficient_data';
      
      const latest = results[results.length - 1];
      const previous = results[results.length - 2];
      
      const scoreDiff = latest.score - previous.score;
      
      // For depression: lower scores are better
      // For personality/lifestyle: lower risk scores are better
      if (Math.abs(scoreDiff) <= 1) return 'stable';
      if (latest.type === 'depression') {
        return scoreDiff < 0 ? 'improving' : 'worsening';
      } else {
        return scoreDiff < 0 ? 'improving' : 'worsening';
      }
    };

    return {
      depressionTrend: calculateTrend(depressionRecords),
      lifestyleTrend: calculateTrend(personalityRecords),
    };
  }

  /**
   * Update summary cache for quick access
   */
  private updateSummaryCache(history: QuizHistory): void {
    const summary = {
      totalAssessments: history.totalAssessments,
      lastAssessment: history.lastAssessment,
      depressionCount: history.records.filter(r => r.type === 'depression').length,
      personalityCount: history.records.filter(r => r.type === 'personality').length,
      trends: history.trends,
      averageScores: {
        depression: this.calculateAverageScore(history.records, 'depression'),
        personality: this.calculateAverageScore(history.records, 'personality'),
      }
    };

    localStorage.setItem('mental_health_summary', JSON.stringify(summary));
  }

  /**
   * Calculate average score for a type
   */
  private calculateAverageScore(records: QuizResultRecord[], type: 'depression' | 'personality'): number {
    const typeRecords = records.filter(r => r.type === type);
    if (typeRecords.length === 0) return 0;
    
    const totalScore = typeRecords.reduce((sum, record) => sum + record.score, 0);
    return Math.round((totalScore / typeRecords.length) * 100) / 100;
  }

  /**
   * Get summary statistics
   */
  getSummary() {
    try {
      const summary = localStorage.getItem('mental_health_summary');
      return summary ? JSON.parse(summary) : null;
    } catch (error) {
      console.error('Failed to load summary:', error);
      return null;
    }
  }

  /**
   * Clear all tracked results (for reset)
   */
  clearHistory(): void {
    try {
      localStorage.removeItem(this.storageKey);
      localStorage.removeItem('mental_health_summary');
      console.log('🗑️ Assessment history cleared');
    } catch (error) {
      console.error('Failed to clear history:', error);
    }
  }

  /**
   * Export data for backup/analysis
   */
  exportData(): string {
    const history = this.getHistory();
    return JSON.stringify(history, null, 2);
  }

  /**
   * Get statistics for display
   */
  getStatistics() {
    const history = this.getHistory();
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const thisWeek = history.records.filter(r => new Date(r.timestamp) > weekAgo);
    const thisMonth = history.records.filter(r => new Date(r.timestamp) > monthAgo);

    return {
      total: history.totalAssessments,
      thisWeek: thisWeek.length,
      thisMonth: thisMonth.length,
      byType: {
        depression: history.records.filter(r => r.type === 'depression').length,
        personality: history.records.filter(r => r.type === 'personality').length,
      },
      trends: history.trends,
      lastAssessment: history.lastAssessment,
    };
  }
}

// Export singleton instance
export const resultsTracker = new ResultsTracker();
export type { QuizResultRecord, QuizHistory };
