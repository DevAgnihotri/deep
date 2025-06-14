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
  callToAction: "Every woman deserves support and care"
};
