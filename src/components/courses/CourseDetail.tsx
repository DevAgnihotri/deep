import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  Play, 
  CheckCircle, 
  Clock, 
  Star, 
  Users, 
  BookOpen,
  FileText,
  Target
} from 'lucide-react';
import { Course, Module } from '@/data/coursesData';
import { VideoPlayer } from './VideoPlayer';
import { CourseNotes } from './CourseNotes';
import { useAuth } from '@/contexts/AuthContext';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface CourseDetailProps {
  course: Course;
  onBack: () => void;
}

interface UserProgress {
  completedModules: string[];
  lastAccessedModule?: string;
  enrolledAt: Date;
  lastAccessed: Date;
}

export const CourseDetail: React.FC<CourseDetailProps> = ({ course, onBack }) => {
  const { user } = useAuth();
  const [selectedModule, setSelectedModule] = useState<Module>(course.modules[0]);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    completedModules: [],
    enrolledAt: new Date(),
    lastAccessed: new Date()
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load user progress from Firestore
  useEffect(() => {
    const loadUserProgress = async () => {
      if (!user) return;
      
      try {
        const progressDoc = await getDoc(
          doc(db, "users", user.uid, "courseProgress", course.id)
        );
        
        if (progressDoc.exists()) {
          const data = progressDoc.data();
          setUserProgress({
            completedModules: data.completedModules || [],
            lastAccessedModule: data.lastAccessedModule,
            enrolledAt: data.enrolledAt?.toDate() || new Date(),
            lastAccessed: data.lastAccessed?.toDate() || new Date()
          });
          
          // Resume from last accessed module
          if (data.lastAccessedModule) {
            const lastModule = course.modules.find(m => m.id === data.lastAccessedModule);
            if (lastModule) {
              setSelectedModule(lastModule);
            }
          }
        } else {
          // First time enrollment
          await setDoc(
            doc(db, "users", user.uid, "courseProgress", course.id),
            {
              completedModules: [],
              enrolledAt: new Date(),
              lastAccessed: new Date(),
              lastAccessedModule: course.modules[0].id
            }
          );
        }
      } catch (error) {
        console.error("Error loading course progress:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserProgress();
  }, [user, course.id, course.modules]);

  // Mark module as completed
  const markModuleCompleted = async (moduleId: string) => {
    if (!user || userProgress.completedModules.includes(moduleId)) return;

    const updatedProgress = {
      ...userProgress,
      completedModules: [...userProgress.completedModules, moduleId],
      lastAccessed: new Date(),
      lastAccessedModule: moduleId
    };

    setUserProgress(updatedProgress);

    try {
      await setDoc(
        doc(db, "users", user.uid, "courseProgress", course.id),
        updatedProgress,
        { merge: true }
      );
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  // Update last accessed module
  const updateLastAccessed = async (moduleId: string) => {
    if (!user) return;

    try {
      await setDoc(
        doc(db, "users", user.uid, "courseProgress", course.id),
        {
          lastAccessed: new Date(),
          lastAccessedModule: moduleId
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Error updating last accessed:", error);
    }
  };

  const handleModuleSelect = (module: Module) => {
    setSelectedModule(module);
    updateLastAccessed(module.id);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getModuleIcon = (type: string) => {
    switch (type) {
      case 'video': return Play;
      case 'reading': return FileText;
      case 'exercise': return Target;
      default: return BookOpen;
    }
  };

  const completionPercentage = (userProgress.completedModules.length / course.modules.length) * 100;

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Courses
        </Button>
      </div>

      {/* Course Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-8 mb-8 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex items-center space-x-4 mb-4">
              <Badge className={getDifficultyColor(course.difficulty)}>
                {course.difficulty}
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white">
                {course.category}
              </Badge>
            </div>
            
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <p className="text-green-100 mb-6">{course.description}</p>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>{course.modules.length} modules</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{course.rating} rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>{course.enrolledCount.toLocaleString()} enrolled</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Your Progress</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Course Completion</span>
                  <span>{Math.round(completionPercentage)}%</span>
                </div>
                <Progress value={completionPercentage} className="h-2" />
              </div>
              <div className="text-sm">
                <div className="flex justify-between">
                  <span>Completed:</span>
                  <span>{userProgress.completedModules.length} / {course.modules.length} modules</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Module Content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {React.createElement(getModuleIcon(selectedModule.type), { 
                    className: "w-5 h-5 text-green-600" 
                  })}
                  <span>{selectedModule.title}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-500">{selectedModule.duration}</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedModule.type === 'video' ? (
                <VideoPlayer 
                  module={selectedModule} 
                  onComplete={() => markModuleCompleted(selectedModule.id)}
                  isCompleted={userProgress.completedModules.includes(selectedModule.id)}
                />
              ) : (
                <CourseNotes 
                  module={selectedModule} 
                  onComplete={() => markModuleCompleted(selectedModule.id)}
                  isCompleted={userProgress.completedModules.includes(selectedModule.id)}
                />
              )}
            </CardContent>
          </Card>
        </div>

        {/* Module Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Modules</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {course.modules.map((module, index) => {
                const Icon = getModuleIcon(module.type);
                const isCompleted = userProgress.completedModules.includes(module.id);
                const isSelected = selectedModule.id === module.id;
                
                return (
                  <div
                    key={module.id}
                    onClick={() => handleModuleSelect(module)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      isSelected 
                        ? 'bg-green-50 border-2 border-green-200' 
                        : 'hover:bg-gray-50 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        isCompleted ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Icon className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={`text-sm font-medium ${isSelected ? 'text-green-700' : 'text-gray-900'}`}>
                          {index + 1}. {module.title}
                        </h4>
                        <p className="text-xs text-gray-500">{module.duration}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Instructor Info */}
          <Card>
            <CardHeader>
              <CardTitle>Instructor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-3">
                  {course.instructor.split(' ').map(n => n[0]).join('')}
                </div>
                <h3 className="font-semibold text-gray-900">{course.instructor}</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Mental Health Professional with expertise in {course.category} management.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
