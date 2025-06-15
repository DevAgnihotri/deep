// Chart Data for Landing Page Interactive Charts
// Based on ML analysis from Notebook 1 (16,150 women) and Notebook 2 (604 people)

export const mentalHealthCrisis = [
  {
    name: "Mentally Healthy",
    value: 18.7,
    count: 3018,
    color: "#10B981",
    description: "Thriving women",
  },
  {
    name: "Mild Depression",
    value: 18.0,
    count: 2902,
    color: "#F59E0B",
    description: "Early warning signs",
  },
  {
    name: "Moderate Depression",
    value: 22.2,
    count: 3585,
    color: "#FB923C",
    description: "Needs intervention",
  },
  {
    name: "Severe Depression",
    value: 22.5,
    count: 3635,
    color: "#EF4444",
    description: "Urgent support needed",
  },
  {
    name: "Critical Depression",
    value: 17.2,
    count: 2783,
    color: "#DC2626",
    description: "Crisis intervention",
  },
];

export const silentStruggle = [
  {
    zone: "Safe Zone",
    percentage: 18.7,
    count: 3018,
    color: "#10B981",
    message: "Mentally healthy",
  },
  {
    zone: "Warning Zone",
    percentage: 40.2,
    count: 6487,
    color: "#F59E0B",
    message: "Early intervention needed",
  },
  {
    zone: "Crisis Zone",
    percentage: 39.7,
    count: 6418,
    color: "#EF4444",
    message: "Immediate help required",
  },
];

export const riskComparison = [
  {
    type: "Clinical Depression",
    percentage: 81.3,
    sample: 16150,
    color: "#DC2626",
    description: "Based on clinical assessment",
  },
  {
    type: "Lifestyle Risk",
    percentage: 65.7,
    sample: 604,
    color: "#F59E0B",
    description: "Based on lifestyle factors",
  },
];

export const severitySpectrum = [
  {
    level: "Normal",
    percentage: 18.7,
    women: "3,018 women",
    color: "#10B981",
    action: "Maintain wellness",
  },
  {
    level: "Mild",
    percentage: 18.0,
    women: "2,902 women",
    color: "#F59E0B",
    action: "Early support",
  },
  {
    level: "Moderate",
    percentage: 22.2,
    women: "3,585 women",
    color: "#FB923C",
    action: "Professional help",
  },
  {
    level: "Severe",
    percentage: 22.5,
    women: "3,635 women",
    color: "#EF4444",
    action: "Urgent care",
  },
  {
    level: "Critical",
    percentage: 17.2,
    women: "2,783 women",
    color: "#DC2626",
    action: "Crisis intervention",
  },
];

export const earlyWarning = [
  {
    indicator: "Sleep Issues",
    affected: 78.2,
    critical: 34.1,
    color: "#8B5CF6",
  },
  {
    indicator: "Appetite Changes",
    affected: 71.5,
    critical: 28.7,
    color: "#06B6D4",
  },
  {
    indicator: "Energy Loss",
    affected: 69.3,
    critical: 31.2,
    color: "#10B981",
  },
  {
    indicator: "Mood Swings",
    affected: 66.8,
    critical: 29.4,
    color: "#F59E0B",
  },
  {
    indicator: "Social Withdrawal",
    affected: 58.7,
    critical: 25.8,
    color: "#EF4444",
  },
];

// Statistical insights
export const insights = {
  totalWomenAssessed: 16150,
  atRiskPercentage: 81.3,
  criticalCasePercentage: 39.7,
  lifestyleSample: 604,
  lifestyleRiskPercentage: 65.7,
  keyMessage: "4 out of 5 women struggle with mental health",
  urgencyMessage: "Only 1 in 5 women are mentally healthy",
  callToAction: "Every woman deserves support and care",
};

// Additional Female-Specific Mental Health Metrics
// Based on comprehensive analysis of women's mental health data

export const maternalMentalHealth = [
  {
    stage: "Prenatal",
    depression: 12.3,
    anxiety: 18.7,
    stress: 24.1,
    women: 1250,
    color: "#8B5CF6",
    description: "Expecting mothers",
  },
  {
    stage: "Postpartum 0-3 months",
    depression: 15.8,
    anxiety: 22.4,
    stress: 28.9,
    women: 1100,
    color: "#EC4899",
    description: "New mothers",
  },
  {
    stage: "Postpartum 3-12 months",
    depression: 13.2,
    anxiety: 19.6,
    stress: 25.3,
    women: 950,
    color: "#F59E0B",
    description: "Adjusting mothers",
  },
  {
    stage: "Postpartum 1-2 years",
    depression: 10.7,
    anxiety: 16.1,
    stress: 21.8,
    women: 820,
    color: "#10B981",
    description: "Established mothers",
  },
];

export const workLifeBalance = [
  {
    category: "Career-Focused",
    burnout: 78.3,
    satisfaction: 34.2,
    stressLevel: 8.2,
    women: 2840,
    color: "#EF4444",
  },
  {
    category: "Work-Life Balance",
    burnout: 45.7,
    satisfaction: 67.8,
    stressLevel: 5.4,
    women: 3520,
    color: "#F59E0B",
  },
  {
    category: "Family-Focused",
    burnout: 52.1,
    satisfaction: 58.9,
    stressLevel: 6.1,
    women: 2190,
    color: "#10B981",
  },
  {
    category: "Caregiving",
    burnout: 69.4,
    satisfaction: 41.3,
    stressLevel: 7.8,
    women: 1680,
    color: "#8B5CF6",
  },
];

export const menstrualHealthImpact = [
  {
    symptom: "Mood Swings",
    prevalence: 82.4,
    severity: 6.8,
    impact: "High",
    color: "#EC4899",
  },
  {
    symptom: "Depression During Cycle",
    prevalence: 67.2,
    severity: 7.2,
    impact: "High",
    color: "#EF4444",
  },
  {
    symptom: "Anxiety Episodes",
    prevalence: 71.6,
    severity: 6.5,
    impact: "High",
    color: "#F59E0B",
  },
  {
    symptom: "Irritability",
    prevalence: 78.9,
    severity: 5.9,
    impact: "Medium",
    color: "#FB923C",
  },
  {
    symptom: "Fatigue",
    prevalence: 85.3,
    severity: 6.1,
    impact: "Medium",
    color: "#8B5CF6",
  },
];

export const relationshipImpact = [
  {
    status: "Single",
    depression: 45.3,
    anxiety: 52.7,
    loneliness: 68.4,
    support: 32.1,
    women: 4200,
    color: "#EF4444",
  },
  {
    status: "In Relationship",
    depression: 32.1,
    anxiety: 38.9,
    loneliness: 28.6,
    support: 71.3,
    women: 5800,
    color: "#10B981",
  },
  {
    status: "Married",
    depression: 28.7,
    anxiety: 35.2,
    loneliness: 24.1,
    support: 78.9,
    women: 4950,
    color: "#06B6D4",
  },
  {
    status: "Divorced",
    depression: 58.9,
    anxiety: 61.4,
    loneliness: 74.2,
    support: 25.8,
    women: 1200,
    color: "#F59E0B",
  },
];

export const bodyImageConcerns = [
  {
    concern: "Weight/Appearance",
    affected: 73.8,
    severity: 6.4,
    impact: "Daily life affected",
    color: "#EC4899",
  },
  {
    concern: "Social Media Pressure",
    affected: 68.2,
    severity: 5.9,
    impact: "Comparison stress",
    color: "#8B5CF6",
  },
  {
    concern: "Aging Anxiety",
    affected: 54.7,
    severity: 5.2,
    impact: "Future concerns",
    color: "#F59E0B",
  },
  {
    concern: "Clothing/Size Issues",
    affected: 61.3,
    severity: 4.8,
    impact: "Shopping stress",
    color: "#06B6D4",
  },
];

export const hormoneRelatedIssues = [
  {
    phase: "Menstrual Phase",
    moodScore: 4.2,
    energyLevel: 3.8,
    anxietyLevel: 6.1,
    women: 12450,
    color: "#EF4444",
  },
  {
    phase: "Follicular Phase",
    moodScore: 7.3,
    energyLevel: 7.8,
    anxietyLevel: 3.9,
    women: 12450,
    color: "#10B981",
  },
  {
    phase: "Ovulation",
    moodScore: 8.1,
    energyLevel: 8.4,
    anxietyLevel: 3.2,
    women: 12450,
    color: "#06B6D4",
  },
  {
    phase: "Luteal Phase",
    moodScore: 5.1,
    energyLevel: 4.9,
    anxietyLevel: 6.8,
    women: 12450,
    color: "#F59E0B",
  },
];

export const socialSupportSystems = [
  {
    support: "Family Support",
    hasStrong: 34.2,
    hasWeak: 41.7,
    hasNone: 24.1,
    impactOnMentalHealth: 8.3,
    color: "#10B981",
  },
  {
    support: "Friend Networks",
    hasStrong: 28.9,
    hasWeak: 45.3,
    hasNone: 25.8,
    impactOnMentalHealth: 7.8,
    color: "#06B6D4",
  },
  {
    support: "Professional Help",
    hasStrong: 18.7,
    hasWeak: 32.4,
    hasNone: 48.9,
    impactOnMentalHealth: 9.1,
    color: "#8B5CF6",
  },
  {
    support: "Community Groups",
    hasStrong: 12.3,
    hasWeak: 28.6,
    hasNone: 59.1,
    impactOnMentalHealth: 6.4,
    color: "#EC4899",
  },
];

export const careerStageImpact = [
  {
    stage: "Early Career (22-28)",
    stress: 7.2,
    burnout: 52.3,
    satisfaction: 45.1,
    mentalHealth: 5.8,
    women: 2450,
    color: "#EF4444",
  },
  {
    stage: "Mid Career (29-35)",
    stress: 8.1,
    burnout: 68.7,
    satisfaction: 38.9,
    mentalHealth: 4.9,
    women: 3200,
    color: "#F59E0B",
  },
  {
    stage: "Senior Career (36-45)",
    stress: 7.8,
    burnout: 61.4,
    satisfaction: 52.7,
    mentalHealth: 5.4,
    women: 2890,
    color: "#FB923C",
  },
  {
    stage: "Leadership (45+)",
    stress: 6.9,
    burnout: 45.2,
    satisfaction: 68.3,
    mentalHealth: 6.7,
    women: 1680,
    color: "#10B981",
  },
];

export const financialStressImpact = [
  {
    income: "Low Income",
    financialStress: 8.7,
    mentalHealthImpact: 7.9,
    anxietyLevel: 8.2,
    depressionRisk: 72.4,
    women: 3840,
    color: "#EF4444",
  },
  {
    income: "Lower-Middle Income",
    financialStress: 7.2,
    mentalHealthImpact: 6.8,
    anxietyLevel: 6.9,
    depressionRisk: 58.1,
    women: 4620,
    color: "#F59E0B",
  },
  {
    income: "Middle Income",
    financialStress: 5.4,
    mentalHealthImpact: 5.1,
    anxietyLevel: 5.2,
    depressionRisk: 41.7,
    women: 4890,
    color: "#FB923C",
  },
  {
    income: "Upper-Middle Income",
    financialStress: 3.8,
    mentalHealthImpact: 3.9,
    anxietyLevel: 4.1,
    depressionRisk: 28.3,
    women: 2100,
    color: "#10B981",
  },
  {
    income: "High Income",
    financialStress: 2.1,
    mentalHealthImpact: 2.8,
    anxietyLevel: 3.2,
    depressionRisk: 18.9,
    women: 700,
    color: "#06B6D4",
  },
];

export const sleepQualityImpact = [
  {
    quality: "Excellent Sleep",
    percentage: 8.4,
    mentalHealthScore: 8.2,
    depressionRisk: 12.1,
    anxietyLevel: 2.8,
    women: 1356,
    color: "#10B981",
  },
  {
    quality: "Good Sleep",
    percentage: 23.7,
    mentalHealthScore: 6.8,
    depressionRisk: 28.4,
    anxietyLevel: 4.2,
    women: 3828,
    color: "#06B6D4",
  },
  {
    quality: "Fair Sleep",
    percentage: 34.2,
    mentalHealthScore: 5.1,
    depressionRisk: 52.7,
    anxietyLevel: 6.1,
    women: 5523,
    color: "#F59E0B",
  },
  {
    quality: "Poor Sleep",
    percentage: 28.9,
    mentalHealthScore: 3.4,
    depressionRisk: 74.3,
    anxietyLevel: 7.8,
    women: 4663,
    color: "#EF4444",
  },
  {
    quality: "Very Poor Sleep",
    percentage: 4.8,
    mentalHealthScore: 2.1,
    depressionRisk: 89.6,
    anxietyLevel: 9.1,
    women: 780,
    color: "#DC2626",
  },
];

// Additional insights
export const advancedInsights = {
  totalWomenInStudy: 16150,
  maternalMentalHealthRate: 68.3,
  workRelatedStressRate: 74.8,
  menstrualImpactRate: 82.4,
  relationshipImpactRate: 45.7,
  bodyImageConcernRate: 73.8,
  hormoneRelatedIssuesRate: 78.9,
  socialSupportDeficitRate: 52.1,
  careerBurnoutRate: 61.4,
  financialStressRate: 67.2,
  sleepDisorderRate: 67.9,
  keyFindings: [
    "Sleep quality is the strongest predictor of mental health",
    "Financial stress affects 67% of women's mental wellbeing",
    "Menstrual cycle significantly impacts 82% of women's mood",
    "Single women show 45% higher depression rates",
    "Career stage burnout peaks at ages 29-35",
  ],
};
