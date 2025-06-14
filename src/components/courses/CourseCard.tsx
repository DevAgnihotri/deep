import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  Star, 
  Users, 
  BookOpen,
  Download
} from 'lucide-react';
import { Course } from '@/data/coursesData';

interface CourseCardProps {
  course: Course;
  onClick: (course: Course) => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onClick }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
      <div 
        onClick={() => onClick(course)}
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
            </div>            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{course.enrolledCount.toLocaleString()} members enrolled</span>
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
  );
};
