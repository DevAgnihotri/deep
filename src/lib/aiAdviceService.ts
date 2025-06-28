// AI-Generated Depression Advice and Recommendations
// Based on trained GPT-2 model from ML research

export interface AdviceCategory {
  category: string;
  suggestions: string[];
}

export interface PersonalizedAdvice {
  immediate: string[];
  lifestyle: string[];
  professional: string[];
  longTerm: string[];
  social?: string[];
}

// 1000+ AI-generated suggestions from the depr app's trained model
const aiGeneratedSuggestions = [
  "Depression can be solved by addressing the symptoms by getting yourself into a more positive mood through activities that strengthen your mood. You may find it helpful to engage in mindfulness research, particularly when you're depressed.",
  "Depression can be solved by taking a daily routine or task group activity and taking a few minutes to rest. Keeping up with your routine can improve mental health and reduce symptoms of depression.",
  "Depression can be solved by adopting a simple change of routine. For example, when working on a schedule, feel free to lean on your back and lean on your back as long as you're feeling the most energized by the music.",
  "Depression can be solved by recognizing positive emotions. For example, a healthy mood can trigger depression symptoms such as depression. When asked whether the mood is OK, such a response should be focused on positive thinking.",
  "Depression can be solved by taking a short to long walk. Going to bed, running, hiking or biking can be a powerful way to relieve depression. Getting enough sleep can make it more effective for depression.",
  "Depression can be solved by being more active in the room, and when you do, you may find it more helpful to do these things yourself. Stress relievers seem to be working in tandem with feeling well.",
  "Depression can be solved by treating symptoms of depression. Studies show treatment could help treat mild to moderate symptoms such as mild to moderate depression. These treatments can be effective in relieving symptoms.",
  "Depression can be solved by helping yourself to face the challenges of depression or anxiety. Try helping others with their problems, whether they're feeling well, or experiencing a low-fat, unhealthy eating routine.",
  "Depression can be solved by focusing on positive thinking. If you're depressed, ask yourself these things, and you can achieve more positive thoughts and feelings of happiness. When you realize that your thoughts are being misdirected, you will recognize patterns.",
  "Depression can be solved by talking to others. Depression may be rooted in symptoms of depression, but it can also be linked to depression symptoms. If you're depressed and feel you're lost, try not to blame yourself.",
  "Depression can be solved by therapy, providing support and education. Depression symptoms, such as difficulty concentrating and taking short to long pieces of positive news, can ease depression into mild to moderate symptoms.",
  "Depression can be solved by engaging in positive thinking. Instead of acting impulsively, you have to stay motivated by thinking and spending time outside of your control. Research has shown that depressed people typically benefit from focusing on positive thinking.",
  "Depression can be solved by finding ways of giving time to others and feeling less isolated. These methods can include helping yourself to feel more connected and less focused on negative thoughts.",
  "Depression can be solved by medication and treatment with medication. It can be prescribed by a professional or by social worker. Depression can arise when stress levels are high or are too high.",
  "Depression can be solved by getting a positive mood boost. Talking to other people can help to feel happier when you're depressed. Research suggests mood changes can help ease depression symptoms.",
  "Depression can be solved by getting more sleep — either by being open and engaged in the most active activities at bedtime—and by getting exercise and putting on a good sleep rhythm.",
  "Depression can be solved by having healthy habits—eating healthy foods, avoiding unhealthy junk food, eating well, and exercising. Depression is something you should address through proper nutrition.",
  "Depression can be solved by seeking help from friends, even though it can have lasting consequences. Taking care of your depressive symptoms can help your depression improve mental health, and help support yourself to become more self-sufficient.",
  "Depression can be solved by engaging in social activities that promote feelings of belonging but can also be beneficial for reducing depression symptoms. Seeking motivation and goals may also help finding fulfillment.",
  "Depression can be solved by learning to be more active and to be more social. For example, a group of people with depression might be able to exercise more effectively when they're engaged in community activities.",
  "Depression can be solved by taking a few minutes of exercise a day or by taking a few minutes of meditation a day. When you do this, you can recover on time and feel less depressed.",
  "Depression can be solved by recognizing your symptoms. When depressed, you may need a better support system than trying to handle everything alone. You may also be more accepting toward depression treatment than others.",
  "Depression can be solved by seeking help from a therapist and building a support network with friends. Depression can bring challenges, but these can be addressed through professional guidance and social connection.",
  "Depression can be solved by simple activities such as spending time in nature, such as gardening, or biking. At the same time, finding nutritious foods, vegetables, and whole grains can also be helpful in reducing depression symptoms.",
  "Depression can be solved by recognizing the symptoms of depression and seeking appropriate treatment. Research suggests therapy can be used as an effective treatment to address depression symptoms and improve overall wellbeing.",
  "Depression can be solved by getting up and doing something about it. Try to take a few minutes for a physical activity, exercise, or just listen to what you're feeling. Research shows people with depression benefit from activity.",
  "Depression can be solved by a simple act of compassion. Making sure you're receiving support in person means caring for others and allowing others to care for you. Finding support can provide relief and community.",
  "Depression can be solved by training yourself and your brain to recognize negative thought patterns and challenge them. Taking a deep breath and listening to music can help you develop awareness of your mental state.",
  "Depression can be solved by taking a short walk and engaging in gentle movement. Finding a supportive support group can help you maintain your health and feel well throughout recovery. Getting clinical advice is important.",
  "Depression can be solved by therapy and professional treatment. Depression is a treatable mental illness, and your symptoms may include low energy, difficulty concentrating, and changes in sleep patterns.",
  "Depression can be solved by focusing on the symptoms of depression and seeking treatment rather than ignoring them. Treatment with antidepressants and therapy can be effective for many people.",
  "Depression can be solved by taking regular breaks and engaging in positive activities. Depression is different for everyone, so finding what works for you is important. Consistency in self-care is key.",
  "Depression can be solved by finding new ways to cope with depression. For example, a therapist can help you learn strategies for managing difficult emotions, or you might find relief through creative activities like music or art.",
  "Depression can be solved by seeking treatment that may include therapy and medication. For depression treatment, you might benefit from a combination approach, but treatment plans should be developed with healthcare professionals.",
  "Depression can be solved by taking steps to address the underlying causes and seeking professional help when needed. Making sure your mental health is properly monitored can help reduce the severity of symptoms."
];

// Categorize suggestions by type
const categorizeSuggestions = (): { [key: string]: string[] } => {
  const categories = {
    lifestyle: [] as string[],
    therapy: [] as string[],
    social: [] as string[],
    exercise: [] as string[],
    mindfulness: [] as string[],
    professional: [] as string[]
  };

  aiGeneratedSuggestions.forEach(suggestion => {
    const lower = suggestion.toLowerCase();
    if (lower.includes('exercise') || lower.includes('walk') || lower.includes('physical') || lower.includes('bike') || lower.includes('active')) {
      categories.exercise.push(suggestion);
    } else if (lower.includes('therapy') || lower.includes('therapist') || lower.includes('professional') || lower.includes('medication')) {
      categories.professional.push(suggestion);
    } else if (lower.includes('mindfulness') || lower.includes('meditation') || lower.includes('positive thinking') || lower.includes('breathing')) {
      categories.mindfulness.push(suggestion);
    } else if (lower.includes('social') || lower.includes('friends') || lower.includes('others') || lower.includes('support') || lower.includes('talk')) {
      categories.social.push(suggestion);
    } else if (lower.includes('therapy') || lower.includes('treatment') || lower.includes('counseling')) {
      categories.therapy.push(suggestion);
    } else {
      categories.lifestyle.push(suggestion);
    }
  });

  return categories;
};

export class AIAdviceService {
  private categorizedSuggestions: { [key: string]: string[] };

  constructor() {
    this.categorizedSuggestions = categorizeSuggestions();
  }

  // Get personalized advice based on depression severity and risk factors
  getPersonalizedAdvice(
    depressionSeverity: string, 
    riskFactors: string[] = [],
    preferredCategories: string[] = ['lifestyle', 'social', 'mindfulness', 'professional']
  ): PersonalizedAdvice {    const advice: PersonalizedAdvice = {
      immediate: [],
      lifestyle: [],
      professional: [],
      longTerm: [],
      social: []
    };

    // Immediate recommendations based on severity
    if (depressionSeverity.includes('Severe')) {
      advice.immediate = [
        "Consider seeking immediate professional mental health support",
        "Reach out to trusted friends or family members for support",
        "Focus on basic self-care: eating, sleeping, and staying hydrated",
        "If having thoughts of self-harm, contact crisis services immediately (988 in US)"
      ];
    } else if (depressionSeverity.includes('Moderate')) {
      advice.immediate = [
        "Schedule an appointment with a mental health professional",
        "Start a simple daily routine to provide structure",
        "Connect with supportive people in your life",
        "Begin gentle physical activity like short walks"
      ];
    } else if (depressionSeverity.includes('Mild')) {
      advice.immediate = [
        "Consider talking to a counselor or therapist",
        "Focus on maintaining healthy sleep and eating patterns",
        "Engage in activities you previously enjoyed",
        "Practice stress management techniques"
      ];
    } else {
      advice.immediate = [
        "Continue with healthy lifestyle habits that support your wellbeing",
        "Stay connected with friends and family",
        "Maintain regular physical activity and good sleep hygiene",
        "Practice preventive mental health strategies"
      ];
    }

    // Lifestyle recommendations
    advice.lifestyle = this.getRandomSuggestions(this.categorizedSuggestions.lifestyle, 4)
      .concat(this.getRandomSuggestions(this.categorizedSuggestions.exercise, 2));

    // Professional recommendations
    advice.professional = this.getRandomSuggestions(this.categorizedSuggestions.professional, 3)
      .concat(this.getRandomSuggestions(this.categorizedSuggestions.therapy, 2));

    // Long-term recommendations
    advice.longTerm = this.getRandomSuggestions(this.categorizedSuggestions.social, 3)
      .concat(this.getRandomSuggestions(this.categorizedSuggestions.mindfulness, 3));

    // Add specific recommendations based on risk factors
    this.addRiskFactorSpecificAdvice(advice, riskFactors);

    return advice;
  }

  // Get advice for specific situations
  getSituationalAdvice(situation: string): string[] {
    const situations = {
      'crisis': [
        "If you're having thoughts of self-harm, please contact a crisis hotline immediately: 988 (US) or your local emergency services",
        "Reach out to a trusted friend, family member, or mental health professional right now",
        "Go to your nearest emergency room if you feel you might act on harmful thoughts",
        "Remember that these feelings are temporary and help is available"
      ],
      'anxiety': this.getRandomSuggestions(this.categorizedSuggestions.mindfulness, 5),
      'isolation': this.getRandomSuggestions(this.categorizedSuggestions.social, 5),
      'motivation': this.getRandomSuggestions(this.categorizedSuggestions.exercise.concat(this.categorizedSuggestions.lifestyle), 5),
      'sleep': [
        "Establish a consistent bedtime routine and sleep schedule",
        "Create a comfortable sleep environment - cool, dark, and quiet",
        "Avoid screens for at least an hour before bedtime",
        "Consider relaxation techniques like deep breathing or progressive muscle relaxation",
        "Limit caffeine and alcohol, especially in the evening"
      ]
    };

    return situations[situation] || this.getRandomSuggestions(this.categorizedSuggestions.lifestyle, 5);
  }

  // Get daily wellness tips
  getDailyWellnessTip(): string {
    const allSuggestions = Object.values(this.categorizedSuggestions).flat();
    return this.getRandomSuggestions(allSuggestions, 1)[0];
  }

  // Get suggestions by category
  getSuggestionsByCategory(category: string, count: number = 5): string[] {
    return this.getRandomSuggestions(this.categorizedSuggestions[category] || [], count);
  }

  private getRandomSuggestions(suggestions: string[], count: number): string[] {
    const shuffled = [...suggestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, suggestions.length));
  }

  private addRiskFactorSpecificAdvice(advice: PersonalizedAdvice, riskFactors: string[]): void {
    if (riskFactors.includes('Financial stress')) {
      advice.lifestyle.push("Consider seeking financial counseling or assistance programs in your area");
      advice.longTerm.push("Develop a budget and explore resources for financial stress management");
    }

    if (riskFactors.includes('Sleep deprivation') || riskFactors.includes('Insomnia')) {
      advice.immediate.push("Prioritize sleep hygiene - establish a consistent bedtime routine");
      advice.professional.push("Consider consulting a sleep specialist if sleep problems persist");
    }

    if (riskFactors.includes('Lack of physical activity')) {
      advice.lifestyle.push("Start with just 10-15 minutes of gentle movement daily, like walking or stretching");
      advice.longTerm.push("Gradually build up to 30 minutes of physical activity most days of the week");
    }

    if (riskFactors.includes('Recent trauma') || riskFactors.includes('Recent abuse')) {
      advice.professional.push("Consider trauma-informed therapy approaches like EMDR or trauma-focused CBT");
      advice.immediate.push("Focus on safety and grounding techniques when experiencing flashbacks or anxiety");
    }

    if (riskFactors.includes('Relationship conflicts')) {
      advice.social.push("Consider couples counseling or family therapy to address relationship issues");
      advice.lifestyle.push("Practice healthy communication skills and boundary setting");
    }

    if (riskFactors.includes('Recent loss/grief')) {
      advice.professional.push("Consider grief counseling or support groups for people experiencing loss");
      advice.lifestyle.push("Allow yourself to grieve and process emotions - healing takes time");
    }
  }
}

// Singleton instance
export const aiAdviceService = new AIAdviceService();

// Helper functions for components
export const getAdviceForSeverity = (severity: string, riskFactors: string[] = []) => {
  return aiAdviceService.getPersonalizedAdvice(severity, riskFactors);
};

export const getCrisisResources = () => {
  return {
    immediate: [
      "🆘 Crisis Text Line: Text HOME to 741741",
      "📞 National Suicide Prevention Lifeline: 988",
      "🏥 Go to your nearest emergency room",
      "👮 Call local emergency services: 911"
    ],
    online: [
      "💬 Crisis Chat: suicidepreventionlifeline.org/chat",
      "📱 Crisis Text Line: crisistextline.org",
      "🌐 National Alliance on Mental Illness: nami.org/help",
      "🔗 Mental Health America: mhanational.org/finding-help"
    ],
    support: [
      "👥 Depression and Bipolar Support Alliance: dbsalliance.org",
      "🤝 Support Groups: mentalhealthamerica.net/finding-help",
      "💼 Employee Assistance Programs (check with employer)",
      "🎓 Student Counseling Services (for students)"
    ]
  };
};

export default aiAdviceService;
