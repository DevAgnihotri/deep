import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Activity, Moon, Zap, Brain, Smile, Users, Sun, Shield, AlertTriangle, Target, Battery } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { usePersonalization } from "@/contexts/PersonalizationContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";

export const WellnessMetrics = () => {
  const { user } = useAuth();
  const { insights: personalizationInsights, isQuizCompleted } = usePersonalization();
  const [healthData, setHealthData] = useState({
    // Psychological and mental wellness metrics
    positivity: { value: 7.2, unit: "/10", status: "good", icon: Sun, category: "mood" },
    stressLevel: { value: 3.1, unit: "/10", status: "low", icon: Zap, category: "stress" },
    mood: { value: 7.2, unit: "/10", status: "positive", icon: Smile, category: "mood" },
    mindfulness: { value: 15, unit: "min", status: "practiced", icon: Brain, category: "mindfulness" },
    sleepiness: { value: 2.8, unit: "/10", status: "alert", icon: Moon, category: "sleep" },
    anxietyLevel: { value: 2.5, unit: "/10", status: "low", icon: AlertTriangle, category: "anxiety" },
    
    // Sleep quality metrics (can be determined by quiz questions)
    sleepQuality: { value: 7.5, unit: "/10", status: "good", icon: Moon, category: "sleep" },
    sleepDuration: { value: 7.2, unit: "hrs", status: "adequate", icon: Moon, category: "sleep" },
    
    // Social and emotional wellness
    social: { value: 6.8, unit: "/10", status: "good", icon: Users, category: "social" },
    confidence: { value: 7.5, unit: "/10", status: "high", icon: Shield, category: "mood" },
    energyLevel: { value: 6.9, unit: "/10", status: "good", icon: Activity, category: "energy" },
    focusLevel: { value: 6.5, unit: "/10", status: "focused", icon: Target, category: "cognitive" }
  });
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Filter metrics based on personalization insights
  const getRecommendedMetrics = () => {
    if (!personalizationInsights || !isQuizCompleted) {
      // Show default psychological metrics if no personalization
      return ['mood', 'stressLevel', 'positivity', 'anxietyLevel', 'sleepQuality', 'mindfulness'];
    }

    const focusAreas = personalizationInsights.recommendations.metrics.focus;
    const recommendedMetricKeys: string[] = [];

    focusAreas.forEach(area => {
      switch (area) {
        case 'stress':
          recommendedMetricKeys.push('stressLevel', 'anxietyLevel', 'mindfulness');
          break;
        case 'mood':
          recommendedMetricKeys.push('mood', 'positivity', 'confidence');
          break;
        case 'sleep':
          recommendedMetricKeys.push('sleepQuality', 'sleepDuration', 'sleepiness');
          break;
        case 'energy':
        case 'activity':
          recommendedMetricKeys.push('energyLevel', 'focusLevel');
          break;
        case 'meditation':
        case 'mindfulness':
          recommendedMetricKeys.push('mindfulness', 'stressLevel', 'focusLevel');
          break;
        case 'social':
          recommendedMetricKeys.push('social', 'confidence', 'mood');
          break;
        case 'anxiety':
          recommendedMetricKeys.push('anxietyLevel', 'stressLevel', 'mindfulness');
          break;
        case 'focus':
          recommendedMetricKeys.push('focusLevel', 'energyLevel', 'mindfulness');
          break;
        default:
          recommendedMetricKeys.push('mood', 'stressLevel');
      }
    });

    // Remove duplicates and limit to 6 metrics for display
    const uniqueMetrics = [...new Set(recommendedMetricKeys)];
    return uniqueMetrics.slice(0, 6);
  };

  const recommendedMetricKeys = getRecommendedMetrics();
  const displayMetrics = Object.fromEntries(
    recommendedMetricKeys.map(key => [key, healthData[key as keyof typeof healthData]])
  );

  // Load user wellness data from Firestore
  useEffect(() => {
    const generatePersonalizedWellnessData = () => {
      // Generate realistic psychological data based on time of day and typical patterns
      const now = new Date();
      const hour = now.getHours();
      
      // Simulate realistic variations based on time of day
      const isWorkingHours = hour > 9 && hour < 17;
      const isEvening = hour > 18 && hour < 23;
      const isMorning = hour > 6 && hour < 12;
      
      return {
        // Psychological and mental wellness metrics
        positivity: { 
          value: Number((isMorning ? 7.5 : isEvening ? 6.8 : 6.2 + (Math.random() * 2)).toFixed(1)), 
          unit: "/10", 
          status: "good", 
          icon: Sun, 
          category: "mood" 
        },
        stressLevel: { 
          value: Number((isWorkingHours ? 4.2 : 2.8 + (Math.random() * 1.5)).toFixed(1)), 
          unit: "/10", 
          status: isWorkingHours ? "moderate" : "low", 
          icon: Zap, 
          category: "stress" 
        },
        mood: { 
          value: Number((6.5 + (Math.random() * 2.5)).toFixed(1)), 
          unit: "/10", 
          status: "positive", 
          icon: Smile, 
          category: "mood" 
        },
        mindfulness: { 
          value: Math.round(10 + (Math.random() * 25)), 
          unit: "min", 
          status: "practiced", 
          icon: Brain, 
          category: "mindfulness" 
        },
        sleepiness: { 
          value: Number((hour < 7 || hour > 22 ? 6.5 : 2.5 + (Math.random() * 2)).toFixed(1)), 
          unit: "/10", 
          status: hour < 7 || hour > 22 ? "sleepy" : "alert", 
          icon: Moon, 
          category: "sleep" 
        },
        anxietyLevel: { 
          value: Number((isWorkingHours ? 3.5 : 2.0 + (Math.random() * 1.5)).toFixed(1)), 
          unit: "/10", 
          status: "low", 
          icon: AlertTriangle, 
          category: "anxiety" 
        },
        
        // Sleep quality metrics (can be determined by quiz questions)
        sleepQuality: { 
          value: Number((7.0 + (Math.random() * 2)).toFixed(1)), 
          unit: "/10", 
          status: "good", 
          icon: Moon, 
          category: "sleep" 
        },
        sleepDuration: { 
          value: Number((6.5 + (Math.random() * 2)).toFixed(1)), 
          unit: "hrs", 
          status: "adequate", 
          icon: Moon, 
          category: "sleep" 
        },
        
        // Social and emotional wellness
        social: { 
          value: Number((6.0 + (Math.random() * 3)).toFixed(1)), 
          unit: "/10", 
          status: "good", 
          icon: Users, 
          category: "social" 
        },
        confidence: { 
          value: Number((6.8 + (Math.random() * 2.5)).toFixed(1)), 
          unit: "/10", 
          status: "high", 
          icon: Shield, 
          category: "mood" 
        },
        energyLevel: { 
          value: Number((isMorning ? 7.5 : isEvening ? 5.8 : 6.2 + (Math.random() * 2)).toFixed(1)), 
          unit: "/10", 
          status: "good", 
          icon: Battery, 
          category: "energy" 
        },
        focusLevel: { 
          value: Number((isWorkingHours ? 6.8 : 5.5 + (Math.random() * 2.5)).toFixed(1)), 
          unit: "/10", 
          status: "focused", 
          icon: Target, 
          category: "cognitive" 
        }
      };
    };

    const initializeUserWellnessData = async () => {
      if (!user?.uid) return;
      
      // Generate more realistic baseline data based on user
      const personalizedData = generatePersonalizedWellnessData();
      
      try {
        await setDoc(doc(db, "wellnessMetrics", user.uid), {
          metrics: personalizedData,
          lastUpdated: new Date(),
          userId: user.uid
        });
        setHealthData(personalizedData);
        setLastUpdated(new Date());
      } catch (error) {
        console.error("Error initializing wellness data:", error);
      }
    };    const loadWellnessData = async () => {
      if (user?.uid) {
        try {
          const wellnessDoc = await getDoc(doc(db, "wellnessMetrics", user.uid));
          if (wellnessDoc.exists()) {
            const data = wellnessDoc.data();
            setHealthData(data.metrics || generatePersonalizedWellnessData());
            setLastUpdated(data.lastUpdated?.toDate() || new Date());
          } else {
            // Initialize with personalized baseline data for new users
            await initializeUserWellnessData();
          }
        } catch (error) {
          console.error("Error loading wellness data:", error);
        }
      }
    };

    loadWellnessData();
  }, [user]);

  const generatePersonalizedWellnessData = () => {
    // Generate realistic psychological data based on time of day and typical patterns
    const now = new Date();
    const hour = now.getHours();
    
    // Simulate realistic variations based on time of day
    const isWorkingHours = hour > 9 && hour < 17;
    const isEvening = hour > 18 && hour < 23;
    const isMorning = hour > 6 && hour < 12;
    
    return {
      // Psychological and mental wellness metrics
      positivity: { 
        value: Number((isMorning ? 7.5 : isEvening ? 6.8 : 6.2 + (Math.random() * 2)).toFixed(1)), 
        unit: "/10", 
        status: "good", 
        icon: Sun, 
        category: "mood" 
      },
      stressLevel: { 
        value: Number((isWorkingHours ? 4.2 : 2.8 + (Math.random() * 1.5)).toFixed(1)), 
        unit: "/10", 
        status: isWorkingHours ? "moderate" : "low", 
        icon: Zap, 
        category: "stress" 
      },
      mood: { 
        value: Number((6.5 + (Math.random() * 2.5)).toFixed(1)), 
        unit: "/10", 
        status: "positive", 
        icon: Smile, 
        category: "mood" 
      },
      mindfulness: { 
        value: Math.round(10 + (Math.random() * 25)), 
        unit: "min", 
        status: "practiced", 
        icon: Brain, 
        category: "mindfulness" 
      },
      sleepiness: { 
        value: Number((hour < 7 || hour > 22 ? 6.5 : 2.5 + (Math.random() * 2)).toFixed(1)), 
        unit: "/10", 
        status: hour < 7 || hour > 22 ? "sleepy" : "alert", 
        icon: Moon, 
        category: "sleep" 
      },
      anxietyLevel: { 
        value: Number((isWorkingHours ? 3.5 : 2.0 + (Math.random() * 1.5)).toFixed(1)), 
        unit: "/10", 
        status: "low", 
        icon: AlertTriangle, 
        category: "anxiety" 
      },
      
      // Sleep quality metrics (can be determined by quiz questions)
      sleepQuality: { 
        value: Number((7.0 + (Math.random() * 2)).toFixed(1)), 
        unit: "/10", 
        status: "good", 
        icon: Moon, 
        category: "sleep" 
      },
      sleepDuration: { 
        value: Number((6.5 + (Math.random() * 2)).toFixed(1)), 
        unit: "hrs", 
        status: "adequate", 
        icon: Moon, 
        category: "sleep" 
      },
      
      // Social and emotional wellness
      social: { 
        value: Number((6.0 + (Math.random() * 3)).toFixed(1)), 
        unit: "/10", 
        status: "good", 
        icon: Users, 
        category: "social" 
      },
      confidence: { 
        value: Number((6.8 + (Math.random() * 2.5)).toFixed(1)), 
        unit: "/10", 
        status: "high", 
        icon: Shield, 
        category: "mood" 
      },
      energyLevel: { 
        value: Number((isMorning ? 7.5 : isEvening ? 5.8 : 6.2 + (Math.random() * 2)).toFixed(1)), 
        unit: "/10", 
        status: "good", 
        icon: Battery, 
        category: "energy" 
      },
      focusLevel: { 
        value: Number((isWorkingHours ? 6.8 : 5.5 + (Math.random() * 2.5)).toFixed(1)), 
        unit: "/10", 
        status: "focused", 
        icon: Target, 
        category: "cognitive" 
      }
    };
  };


  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "text-green-600";
      case "normal": return "text-blue-600";
      case "calm": return "text-green-600";
      case "stable": return "text-blue-600";
      case "active": return "text-green-600";
      case "positive": return "text-green-600";
      case "low": return "text-green-600";
      case "moderate": return "text-yellow-600";
      case "high": return "text-blue-600";
      case "practiced": return "text-green-600";
      case "alert": return "text-blue-600";
      case "sleepy": return "text-orange-600";
      case "adequate": return "text-blue-600";
      case "focused": return "text-cyan-600";
      default: return "text-gray-600";
    }
  };

  const generateRecommendation = () => {
    const wellnessInsights = [
      "Your Mindhaven psychological wellness metrics show positive patterns.",
      "Your stress and mood indicators suggest healthy emotional balance.",
      "Your mindfulness and focus levels align with Mindhaven's wellness goals."
    ];

    const recommendations = [
      "Continue your current wellness routine - Mindhaven suggests maintaining this positive trend",
      "Consider Mindhaven's mindfulness exercises to enhance emotional well-being",
      "Your psychological metrics indicate excellent mental health management with Mindhaven's support!"
    ];

    return { insights: wellnessInsights, recommendations };
  };

  const { insights: wellnessInsights, recommendations } = generateRecommendation();

  return (
    <div className="space-y-6">      {/* Header with personalization info */}
      <div className="space-y-2">
        <div className="flex items-center">
          <img 
            src="/logo.png" 
            alt="Mindhaven Logo" 
            className="w-8 h-8 object-contain mr-2" 
          />
          <h2 className="text-xl font-bold text-gray-900">
            {isQuizCompleted ? 'Your Mindhaven Personalized Metrics' : 'Mindhaven Wellness Metrics'}
          </h2>        </div>
        
        {lastUpdated && (
          <div className="flex items-center text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
            <span className="font-medium mr-2">Last Updated:</span>
            <span>{lastUpdated.toLocaleString()}</span>
          </div>
        )}
      </div>

      {/* Personalized Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Object.entries(displayMetrics).map(([key, metric]) => {
          if (!metric) return null;
          
          const IconComponent = metric.icon;
          const getMetricColor = (metricKey: string) => {
            switch (metricKey) {
              case 'positivity': return 'text-yellow-500';
              case 'stressLevel': return 'text-red-400';
              case 'mood': return 'text-blue-500';
              case 'mindfulness': return 'text-green-600';
              case 'sleepiness': return 'text-indigo-500';
              case 'anxietyLevel': return 'text-orange-500';
              case 'sleepQuality': 
              case 'sleepDuration': return 'text-indigo-500';
              case 'social': return 'text-pink-500';
              case 'confidence': return 'text-purple-500';
              case 'energyLevel': return 'text-green-500';
              case 'focusLevel': return 'text-cyan-500';
              default: return 'text-gray-500';
            }
          };

          const getMetricLabel = (metricKey: string) => {
            switch (metricKey) {
              case 'positivity': return 'Positivity';
              case 'stressLevel': return 'Stress Level';
              case 'mood': return 'Mood';
              case 'mindfulness': return 'Mindfulness';
              case 'sleepiness': return 'Sleepiness';
              case 'anxietyLevel': return 'Anxiety Level';
              case 'sleepQuality': return 'Sleep Quality';
              case 'sleepDuration': return 'Sleep Duration';
              case 'social': return 'Social Health';
              case 'confidence': return 'Confidence';
              case 'energyLevel': return 'Energy Level';
              case 'focusLevel': return 'Focus Level';
              default: return metricKey;
            }
          };

          return (
            <Card key={key} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <IconComponent className={`w-4 h-4 ${getMetricColor(key)}`} />
                  <span className="text-sm font-medium">{getMetricLabel(key)}</span>
                </div>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="text-xs text-gray-500">{metric.unit}</div>
                <div className={`text-xs ${getStatusColor(metric.status)}`}>
                  {metric.status}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Personalized Insights Section */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-lg text-green-800">
            {isQuizCompleted ? 'Your Personalized Wellness Insights' : 'Sample Wellness Insights'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isQuizCompleted && personalizationInsights ? (
            <>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Based on Your Goals:</h4>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Primary Focus:</strong> {personalizationInsights.primaryConcern}
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Current Mood:</strong> {personalizationInsights.mood}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Recommended Therapy:</strong> {personalizationInsights.recommendations.therapyType}
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Personalized Recommendations:</h4>
                <ul className="space-y-1">
                  {personalizationInsights.recommendations.metrics.priority.map((priority, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      Focus on {priority.replace('-', ' ')} based on your responses
                    </li>
                  ))}
                  <li className="text-sm text-gray-700 flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    Engage with {personalizationInsights.contentPreference.toLowerCase()} content during {personalizationInsights.preferredTime.toLowerCase()}
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Sample Insights:</h4>
                <ul className="space-y-1">
                  <li className="text-sm text-gray-700 flex items-start">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    Complete the personalization quiz to get tailored wellness insights
                  </li>
                  <li className="text-sm text-gray-700 flex items-start">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    These metrics will be customized based on your wellness goals
                  </li>
                </ul>
              </div>
                <div className="text-center pt-2">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-3">
                  <p className="text-sm text-yellow-800 font-medium mb-2">
                    🎯 Get Personalized Insights!
                  </p>
                  <p className="text-xs text-yellow-700">
                    Take the personalization quiz by clicking on "Share your day" to receive customized wellness metrics and recommendations based on your unique needs.
                  </p>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
