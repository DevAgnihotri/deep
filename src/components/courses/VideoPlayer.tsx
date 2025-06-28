import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, ExternalLink, BookOpen } from 'lucide-react';
import { Module, VideoContent } from '@/data/coursesData';

interface VideoPlayerProps {
  module: Module;
  onComplete: () => void;
  isCompleted: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  module, 
  onComplete, 
  isCompleted 
}) => {
  const [showKeyPoints, setShowKeyPoints] = useState(false);
  const content = module.content as VideoContent;

  // Extract YouTube video ID from URL or use provided videoId
  const getYouTubeEmbedUrl = (videoId: string) => {
    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
  };

  return (
    <div className="space-y-6">
      {/* Video Player */}
      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
        <iframe
          src={getYouTubeEmbedUrl(content.videoId)}
          title={module.title}
          className="w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Video Info */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{module.title}</h3>
          <p className="text-sm text-gray-600">Duration: {module.duration}</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(content.videoUrl, '_blank')}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Watch on YouTube
          </Button>
          
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

      {/* Key Points Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-900">Key Learning Points</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowKeyPoints(!showKeyPoints)}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              {showKeyPoints ? 'Hide' : 'Show'} Notes
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
          
          {!showKeyPoints && (
            <p className="text-gray-600 text-sm">
              Click "Show Notes" to view the key learning points for this video.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Transcript Section (if available) */}
      {content.transcript && (
        <Card>
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Video Transcript</h4>
            <div className="prose prose-sm max-w-none text-gray-700">
              <p>{content.transcript}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
