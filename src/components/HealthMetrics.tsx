
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Heart, Activity, Thermometer, Wind, Moon, Zap } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const HealthMetrics = () => {
  const { user } = useAuth();
  const [healthData, setHealthData] = useState({
    heartRate: { value: null, unit: "bpm", status: "no-data", icon: Heart },
    hrv: { value: null, unit: "ms", status: "no-data", icon: Activity },
    eda: { value: null, unit: "μS", status: "no-data", icon: Zap },
    bvp: { value: null, unit: "V", status: "no-data", icon: Activity },
    skinTemp: { value: null, unit: "°C", status: "no-data", icon: Thermometer },
    respirationRate: { value: null, unit: "bpm", status: "no-data", icon: Wind },
    sleepREM: { value: null, unit: "%", status: "no-data", icon: Moon },
    sleepDeep: { value: null, unit: "%", status: "no-data", icon: Moon },
    sleepLight: { value: null, unit: "%", status: "no-data", icon: Moon },
    movement: { value: null, unit: "steps", status: "no-data", icon: Activity }
  });
  const [isLoading, setIsLoading] = useState(true);

  // Function to determine status based on value and metric type
  const getMetricStatus = (metricKey: string, value: number) => {
    switch (metricKey) {
      case 'heartRate':
        if (value >= 60 && value <= 100) return 'normal';
        if (value >= 50 && value < 60) return 'low';
        if (value > 100 && value <= 120) return 'elevated';
        return 'concerning';
      
      case 'hrv':
        if (value >= 30 && value <= 70) return 'good';
        if (value >= 20 && value < 30) return 'fair';
        if (value > 70) return 'excellent';
        return 'low';
      
      case 'eda':
        if (value >= 1 && value <= 5) return 'calm';
        if (value > 5 && value <= 8) return 'moderate';
        return 'elevated';
      
      case 'bvp':
        if (value >= 0.5 && value <= 2.0) return 'stable';
        return 'variable';
      
      case 'skinTemp':
        if (value >= 30 && value <= 35) return 'normal';
        if (value < 30) return 'low';
        return 'elevated';
      
      case 'respirationRate':
        if (value >= 12 && value <= 20) return 'normal';
        if (value < 12) return 'low';
        return 'elevated';
      
      case 'sleepREM':
        if (value >= 20 && value <= 25) return 'good';
        if (value >= 15 && value < 20) return 'fair';
        if (value > 25 && value <= 30) return 'high';
        return 'low';
      
      case 'sleepDeep':
        if (value >= 15 && value <= 20) return 'good';
        if (value >= 10 && value < 15) return 'fair';
        if (value > 20) return 'high';
        return 'low';
      
      case 'sleepLight':
        if (value >= 55 && value <= 65) return 'normal';
        if (value < 55) return 'low';
        return 'high';
      
      case 'movement':
        if (value >= 8000) return 'active';
        if (value >= 5000) return 'moderate';
        if (value >= 2000) return 'light';
        return 'sedentary';
      
      default:
        return 'normal';
    }
  };
  // Load user health metrics from Firestore
  useEffect(() => {
    const loadHealthMetrics = async () => {
      if (user?.uid) {
        try {
          const healthDoc = await getDoc(doc(db, "userHealthMetrics", user.uid));
          if (healthDoc.exists()) {
            const userData = healthDoc.data();
            
            // Create initial health data structure
            const initialHealthData = {
              heartRate: { value: null, unit: "bpm", status: "no-data", icon: Heart },
              hrv: { value: null, unit: "ms", status: "no-data", icon: Activity },
              eda: { value: null, unit: "μS", status: "no-data", icon: Zap },
              bvp: { value: null, unit: "V", status: "no-data", icon: Activity },
              skinTemp: { value: null, unit: "°C", status: "no-data", icon: Thermometer },
              respirationRate: { value: null, unit: "bpm", status: "no-data", icon: Wind },
              sleepREM: { value: null, unit: "%", status: "no-data", icon: Moon },
              sleepDeep: { value: null, unit: "%", status: "no-data", icon: Moon },
              sleepLight: { value: null, unit: "%", status: "no-data", icon: Moon },
              movement: { value: null, unit: "steps", status: "no-data", icon: Activity }
            };

            // Update health data with user's actual values
            const updatedHealthData = { ...initialHealthData };
            
            Object.keys(updatedHealthData).forEach(key => {
              if (userData[key] && userData[key] !== "") {
                const numValue = parseFloat(userData[key]);
                if (!isNaN(numValue)) {
                  updatedHealthData[key] = {
                    ...updatedHealthData[key],
                    value: numValue,
                    status: getMetricStatus(key, numValue)
                  };
                }
              }
            });
            
            setHealthData(updatedHealthData);
          }
        } catch (error) {
          console.error("Error loading health metrics:", error);
        }
      }
      setIsLoading(false);
    };

    loadHealthMetrics();
  }, [user?.uid]);
  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "text-green-600";
      case "excellent": return "text-green-700";
      case "normal": return "text-blue-600";
      case "calm": return "text-green-600";
      case "stable": return "text-blue-600";
      case "active": return "text-green-600";
      case "moderate": return "text-yellow-600";
      case "fair": return "text-yellow-600";
      case "elevated": return "text-orange-600";
      case "high": return "text-orange-600";
      case "low": return "text-red-600";
      case "concerning": return "text-red-600";
      case "sedentary": return "text-red-600";
      case "no-data": return "text-gray-400";
      default: return "text-gray-600";
    }
  };
  const formatStatusText = (status: string) => {
    if (status === "no-data") return "No data";
    return status.charAt(0).toUpperCase() + status.slice(1);
  };
  const generateRecommendation = () => {
    const insights = [];
    const recommendations = [];

    // Check if user has data
    const hasData = Object.values(healthData).some(metric => metric.value !== null);
    
    if (!hasData) {
      insights.push("No health metrics data available yet.");
      recommendations.push("Start by entering your physiological metrics in the Profile section to get personalized insights.");
      return { insights, recommendations };
    }

    // Heart Rate insights
    if (healthData.heartRate.value) {
      const status = healthData.heartRate.status;
      if (status === "normal") {
        insights.push("Your heart rate is within the healthy range, indicating good cardiovascular fitness.");
      } else if (status === "elevated") {
        insights.push("Your heart rate is slightly elevated - this could indicate stress or recent physical activity.");
        recommendations.push("Consider relaxation techniques like deep breathing or meditation to lower your heart rate.");
      }
    }

    // HRV insights
    if (healthData.hrv.value) {
      const status = healthData.hrv.status;
      if (status === "good" || status === "excellent") {
        insights.push("Your heart rate variability indicates good stress recovery and autonomic nervous system balance.");
      } else if (status === "low") {
        recommendations.push("Low HRV may indicate stress or fatigue. Consider improving sleep quality and reducing stress.");
      }
    }

    // Sleep insights
    const sleepMetrics = [healthData.sleepREM, healthData.sleepDeep, healthData.sleepLight];
    const hasSleepData = sleepMetrics.some(metric => metric.value !== null);
    
    if (hasSleepData) {
      const goodSleepStages = sleepMetrics.filter(metric => 
        metric.value !== null && (metric.status === "good" || metric.status === "normal")
      ).length;
      
      if (goodSleepStages >= 2) {
        insights.push("Your sleep architecture shows healthy distribution across different sleep stages.");
      } else {
        recommendations.push("Consider optimizing your sleep environment and maintaining consistent sleep schedule for better sleep quality.");
      }
    }

    // Activity insights
    if (healthData.movement.value) {
      const status = healthData.movement.status;
      if (status === "active") {
        insights.push("Your daily movement level is excellent, supporting good physical and mental health.");
      } else if (status === "sedentary") {
        recommendations.push("Try to increase daily movement - even light walking can significantly benefit your health.");
      }
    }

    // EDA/Stress insights
    if (healthData.eda.value) {
      const status = healthData.eda.status;
      if (status === "calm") {
        insights.push("Your stress indicators suggest you're managing stress well.");
      } else if (status === "elevated") {
        recommendations.push("Consider stress management techniques like mindfulness or progressive muscle relaxation.");
      }
    }

    // Default recommendations if no specific issues
    if (recommendations.length === 0) {
      recommendations.push("Continue your current health practices to maintain optimal wellness.");
      recommendations.push("Regular monitoring of these metrics will help track your health trends over time.");
    }

    return { insights, recommendations };
  };

  const { insights, recommendations } = generateRecommendation();
  return (
    <div className="space-y-6">
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="text-lg text-gray-500">Loading health metrics...</div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-medium">Heart Rate</span>
                </div>
                <div className="text-2xl font-bold">
                  {healthData.heartRate.value || "No data"}
                </div>
                <div className="text-xs text-gray-500">{healthData.heartRate.unit}</div>
                <div className={`text-xs ${getStatusColor(healthData.heartRate.status)}`}>
                  {formatStatusText(healthData.heartRate.status)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Activity className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">HRV</span>
                </div>
                <div className="text-2xl font-bold">
                  {healthData.hrv.value || "No data"}
                </div>
                <div className="text-xs text-gray-500">{healthData.hrv.unit}</div>
                <div className={`text-xs ${getStatusColor(healthData.hrv.status)}`}>
                  {formatStatusText(healthData.hrv.status)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium">EDA/GSR</span>
                </div>
                <div className="text-2xl font-bold">
                  {healthData.eda.value || "No data"}
                </div>
                <div className="text-xs text-gray-500">{healthData.eda.unit}</div>
                <div className={`text-xs ${getStatusColor(healthData.eda.status)}`}>
                  {formatStatusText(healthData.eda.status)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Activity className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium">BVP/PPG</span>
                </div>
                <div className="text-2xl font-bold">
                  {healthData.bvp.value || "No data"}
                </div>
                <div className="text-xs text-gray-500">{healthData.bvp.unit}</div>
                <div className={`text-xs ${getStatusColor(healthData.bvp.status)}`}>
                  {formatStatusText(healthData.bvp.status)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Thermometer className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-medium">Skin Temp</span>
                </div>
                <div className="text-2xl font-bold">
                  {healthData.skinTemp.value || "No data"}
                </div>
                <div className="text-xs text-gray-500">{healthData.skinTemp.unit}</div>
                <div className={`text-xs ${getStatusColor(healthData.skinTemp.status)}`}>
                  {formatStatusText(healthData.skinTemp.status)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Wind className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">Respiration</span>
                </div>
                <div className="text-2xl font-bold">
                  {healthData.respirationRate.value || "No data"}
                </div>
                <div className="text-xs text-gray-500">{healthData.respirationRate.unit}</div>
                <div className={`text-xs ${getStatusColor(healthData.respirationRate.status)}`}>
                  {formatStatusText(healthData.respirationRate.status)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Moon className="w-4 h-4 text-indigo-500" />
                  <span className="text-sm font-medium">REM Sleep</span>
                </div>
                <div className="text-2xl font-bold">
                  {healthData.sleepREM.value || "No data"}
                </div>
                <div className="text-xs text-gray-500">{healthData.sleepREM.unit}</div>
                <div className={`text-xs ${getStatusColor(healthData.sleepREM.status)}`}>
                  {formatStatusText(healthData.sleepREM.status)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Moon className="w-4 h-4 text-indigo-700" />
                  <span className="text-sm font-medium">Deep Sleep</span>
                </div>
                <div className="text-2xl font-bold">
                  {healthData.sleepDeep.value || "No data"}
                </div>
                <div className="text-xs text-gray-500">{healthData.sleepDeep.unit}</div>
                <div className={`text-xs ${getStatusColor(healthData.sleepDeep.status)}`}>
                  {formatStatusText(healthData.sleepDeep.status)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Moon className="w-4 h-4 text-indigo-300" />
                  <span className="text-sm font-medium">Light Sleep</span>
                </div>
                <div className="text-2xl font-bold">
                  {healthData.sleepLight.value || "No data"}
                </div>
                <div className="text-xs text-gray-500">{healthData.sleepLight.unit}</div>
                <div className={`text-xs ${getStatusColor(healthData.sleepLight.status)}`}>
                  {formatStatusText(healthData.sleepLight.status)}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Activity className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium">Movement</span>
                </div>
                <div className="text-2xl font-bold">
                  {healthData.movement.value || "No data"}
                </div>
                <div className="text-xs text-gray-500">{healthData.movement.unit}</div>
                <div className={`text-xs ${getStatusColor(healthData.movement.status)}`}>
                  {formatStatusText(healthData.movement.status)}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-lg text-green-800">Health Insights & Recommendations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Current Status:</h4>
                <ul className="space-y-1">
                  {insights.map((insight, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start">
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Recommendations:</h4>
                <ul className="space-y-1">
                  {recommendations.map((rec, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-start">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};