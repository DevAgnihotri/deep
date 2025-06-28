import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  BookOpen, 
  Clock, 
  Star, 
  Users, 
  Search, 
  Filter,
  Play,
  FileText,
  Target
} from 'lucide-react';
import { coursesData, Course } from '@/data/coursesData';
import { CourseDetail } from '@/components/courses/CourseDetail';

export const Courses = () => {
  const { user } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(coursesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Filter courses based on search and category
  useEffect(() => {
    let filtered = coursesData;

    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }

    setFilteredCourses(filtered);
  }, [searchTerm, selectedCategory]);

  // Category options
  const categories = [
    { value: 'all', label: 'All Courses', icon: BookOpen },
    { value: 'anxiety', label: 'Anxiety', icon: Target },
    { value: 'depression', label: 'Depression', icon: FileText },
    { value: 'mindfulness', label: 'Mindfulness', icon: Play },
    { value: 'stress', label: 'Stress', icon: Clock },
    { value: 'wellness', label: 'Wellness', icon: Star }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please log in to access courses</h1>
          <p className="text-gray-600">You need to be authenticated to view our mental health courses.</p>
        </div>
      </div>
    );
  }

  if (selectedCourse) {
    return (
      <CourseDetail 
        course={selectedCourse} 
        onBack={() => setSelectedCourse(null)} 
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Mental Health <span className="text-green-600">Courses</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Develop essential skills for mental wellness with our expert-led courses. 
          Learn at your own pace with video lessons, practical exercises, and evidence-based techniques.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.value}
                variant={selectedCategory === category.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.value)}
                className={selectedCategory === category.value ? "bg-green-600 hover:bg-green-700" : ""}
              >
                <Icon className="w-4 h-4 mr-2" />
                {category.label}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
            <div 
              onClick={() => setSelectedCourse(course)}
              className="h-full"
            >
              {/* Course Thumbnail */}
              <div className="relative h-48 bg-gradient-to-br from-green-400 to-green-600 overflow-hidden">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <Badge className={getDifficultyColor(course.difficulty)}>
                    {course.difficulty}
                  </Badge>
                </div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                </div>
              </div>

              {/* Course Content */}
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg line-clamp-2 group-hover:text-green-600 transition-colors">
                    {course.title}
                  </CardTitle>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{course.enrolledCount.toLocaleString()}</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {course.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    By {course.instructor}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-green-600">
                    <BookOpen className="w-4 h-4" />
                    <span>{course.modules.length} modules</span>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Stats Section */}
      <div className="mt-16 bg-green-50 rounded-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Start Your Mental Wellness Journey</h2>
          <p className="text-gray-600">Join thousands of users improving their mental health</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-green-600 mb-2">
              {coursesData.reduce((total, course) => total + course.enrolledCount, 0).toLocaleString()}+
            </div>
            <div className="text-gray-600">Members Enrolled</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600 mb-2">{coursesData.length}</div>
            <div className="text-gray-600">Expert-Led Courses</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600 mb-2">
              {coursesData.reduce((total, course) => total + course.modules.length, 0)}
            </div>
            <div className="text-gray-600">Learning Modules</div>
          </div>
        </div>
      </div>
    </div>
  );
};
