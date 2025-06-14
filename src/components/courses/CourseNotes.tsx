import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, BookOpen, ExternalLink, Target, Clock } from 'lucide-react';
import { Module, ReadingContent, ExerciseContent } from '@/data/coursesData';

interface CourseNotesProps {
  module: Module;
  onComplete: () => void;
  isCompleted: boolean;
}

export const CourseNotes: React.FC<CourseNotesProps> = ({ 
  module, 
  onComplete, 
  isCompleted 
}) => {
  const [showKeyPoints, setShowKeyPoints] = useState(true);

  const renderReadingContent = (content: ReadingContent) => (
    <div className="space-y-6">
      {/* Main Content */}
      <Card>
        <CardContent className="p-6">
          <div className="prose prose-sm max-w-none">
            <div dangerouslySetInnerHTML={{ 
              __html: content.content.replace(/\n/g, '<br/>').replace(/###/g, '<h3>').replace(/##/g, '<h2>').replace(/#/g, '<h1>')
            }} />
          </div>
        </CardContent>
      </Card>

      {/* Key Points */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-900">Key Takeaways</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowKeyPoints(!showKeyPoints)}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              {showKeyPoints ? 'Hide' : 'Show'} Key Points
            </Button>
          </div>
          
          {showKeyPoints && (
            <div className="space-y-3">
              {content.keyPoints.map((point, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 flex-1">{point}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Resources */}
      {content.resources && content.resources.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Additional Resources</h4>
            <div className="space-y-2">
              {content.resources.map((resource, index) => (
                <div key={index} className="flex items-center space-x-2 text-green-600 hover:text-green-700">
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-sm">{resource}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderExerciseContent = (content: ExerciseContent) => (
    <div className="space-y-6">
      {/* Exercise Instructions */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Target className="w-6 h-6 text-orange-600" />
            <h4 className="text-lg font-semibold text-gray-900">Exercise Instructions</h4>
          </div>
          <p className="text-gray-700 mb-4">{content.instructions}</p>
          <div className="flex items-center space-x-2 text-sm text-orange-600">
            <Clock className="w-4 h-4" />
            <span>Estimated time: {content.duration}</span>
          </div>
        </CardContent>
      </Card>

      {/* Exercise Steps */}
      <Card>
        <CardContent className="p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Step-by-Step Guide</h4>
          <div className="space-y-4">
            {content.steps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-gray-700">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Practice Tips */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-6">
          <h4 className="text-lg font-semibold text-blue-900 mb-4">💡 Practice Tips</h4>
          <ul className="space-y-2 text-blue-800">
            <li>• Find a quiet, comfortable space without distractions</li>
            <li>• Practice regularly for best results</li>
            <li>• Don't worry if your mind wanders - it's normal</li>
            <li>• Start with shorter sessions and gradually increase duration</li>
            <li>• Be patient and kind with yourself</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{module.title}</h3>
          <p className="text-sm text-gray-600">Reading time: {module.duration}</p>
        </div>
        <div className="flex items-center space-x-3">
          {!isCompleted && (
            <Button
              onClick={onComplete}
              className="bg-green-600 hover:bg-green-700"
              size="sm"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark Complete
            </Button>
          )}
          
          {isCompleted && (
            <div className="flex items-center text-green-600 text-sm font-medium">
              <CheckCircle className="w-4 h-4 mr-2" />
              Completed
            </div>
          )}
        </div>
      </div>

      {/* Content Based on Type */}
      {module.type === 'reading' && renderReadingContent(module.content as ReadingContent)}
      {module.type === 'exercise' && renderExerciseContent(module.content as ExerciseContent)}
    </div>
  );
};
