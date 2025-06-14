
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Headphones, BookOpen, Youtube, Clock, Star, ChevronDown, ChevronUp } from "lucide-react";

interface ContentRecommendationsProps {
  insights?: any;
}

export const ContentRecommendations = ({ insights }: ContentRecommendationsProps) => {
  const [expandedPodcasts, setExpandedPodcasts] = useState<number | null>(null);
  const [expandedPlaylists, setExpandedPlaylists] = useState<number | null>(null);
  const [expandedVideos, setExpandedVideos] = useState<number | null>(null);
  const [expandedLectures, setExpandedLectures] = useState<number | null>(null);

  const podcasts = [
    {
      title: "The Anxiety Toolkit",
      host: "Kimberley Quinlan",
      duration: "45 min",
      rating: 4.8,
      description: "How to stop overthinking every social interaction",
      embedUrl: "https://open.spotify.com/embed/episode/22rJGhJHLCliCCLgVIGhaj?utm_source=generator"
    },
    {
      title: "Mindful Conversations",
      host: "Ian Castiano, Madisen Baralis",
      duration: "32 min", 
      rating: 4.9,
      description: "Are you anxiously attached?",
      embedUrl: "https://open.spotify.com/embed/episode/33bIACxkPus2Yk4cPkTxfH/video?utm_source=generator"
    },
    {
      title: "Therapy for Today",
      host: "Emma McAdam",
      duration: "28 min",
      rating: 4.7,
      description: "How to stop fighting intrusive or negative thoughts-passengers on a bus exercise from ACT",
      embedUrl: "https://open.spotify.com/embed/episode/36FzNyp5TWyl9w5UqlKPSB?utm_source=generator"
    }
  ];

  const playlists = [
    {
      title: "Calm & Focus",
      tracks: 24,
      duration: "2h 15m",
      mood: "Relaxing",
      description: "Ambient sounds and gentle melodies for concentration",
      embedUrl: "https://open.spotify.com/embed/track/0P6e38oyINhz5NIhn1XKCZ?utm_source=generator"
    },
    {
      title: "Morning Motivation",
      tracks: 18,
      duration: "1h 30m", 
      mood: "Energizing",
      description: "Uplifting music to start your day with positivity",
      embedUrl: "https://open.spotify.com/embed/track/6f5ExP43esnvdKPddwKXJH?utm_source=generator"
    },
    {
      title: "Sleep Sounds",
      tracks: 12,
      duration: "8h 0m",
      mood: "Peaceful",
      description: "Nature sounds and white noise for better sleep",
      embedUrl: "https://open.spotify.com/embed/track/6z843DoYNjZbQdvl37vk4h?utm_source=generator"
    }
  ];

  const videos = [
    {
      title: "5-Minute Breathing Exercise",
      channel: "Mindful Moments",
      duration: "5:23",
      views: "2.1M",
      embedUrl: "https://www.youtube.com/embed/7Ep5mKuRmAA?si=3j0Xs__UL3E3nKJT"
    },
    {
      title: "Understanding Anxiety: A Gentle Guide",
      channel: "Mental Health Hub",
      duration: "12:45",
      views: "850K",
      embedUrl: "https://www.youtube.com/embed/XBCTpz0PkH0?si=_t9Weh-RA_koZQFe"
    },
    {
      title: "Progressive Muscle Relaxation",
      channel: "Wellness Corner",
      duration: "18:30",
      views: "1.5M",
      embedUrl: "https://www.youtube.com/embed/2IJUD-e14FY?si=g0HhRIngI4NVerIQ"
    }
  ];

  const lectures = [
    {
      title: "The Science of Happiness",
      speaker: "Tal Ben-Shahar",
      institution: "Harvard University",
      duration: "45 min",
      topic: "Positive Psychology",
      embedUrl: "https://www.youtube.com/embed/KB8Usl6aX2I?si=lZ6Pu5KKPglYb8ej"
    },
    {
      title: "Mindfulness and the Brain",
      speaker: "Richard J. Davidson",
      institution: "TEDxSanFrancisco",
      duration: "60 min",
      topic: "Neuroscience",
      embedUrl: "https://www.youtube.com/embed/7CBfCW67xT8?si=5OWz6J0uqlZM1ggy"
    },
    {
      title: "Cognitive Behavioral Therapy Basics",
      speaker: "Dr. Judith Beck",
      institution: "Beck Institute",
      duration: "38 min",
      topic: "Therapy Techniques",
      embedUrl: "https://www.youtube.com/embed/PrVRGFpC7mc?si=HlD7QPDRu9nFgG86"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Your Personalized Recommendations
        </h1>
        <p className="text-gray-600 text-lg">
          Curated content based on your preferences and goals
        </p>
        {insights && (
          <div className="flex justify-center mt-4">
            <Badge variant="secondary" className="text-sm">
              Focused on: {insights.primaryConcern}
            </Badge>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Podcasts Section */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Headphones className="w-5 h-5 mr-2 text-purple-600" />
              Recommended Podcasts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {podcasts.map((podcast, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                    <Play className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{podcast.title}</h4>
                    <p className="text-sm text-gray-600">{podcast.host}</p>
                    <p className="text-xs text-gray-500">{podcast.description}</p>
                    <div className="flex items-center mt-1 space-x-2">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{podcast.duration}</span>
                      <Star className="w-3 h-3 text-yellow-400" />
                      <span className="text-xs text-gray-500">{podcast.rating}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpandedPodcasts(expandedPodcasts === index ? null : index)}
                  >
                    {expandedPodcasts === index ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                {expandedPodcasts === index && (
                  <div className="w-full h-32">
                    <iframe 
                      src={podcast.embedUrl}
                      width="100%" 
                      height="152" 
                      frameBorder="0" 
                      allowTransparency={true}
                      allow="encrypted-media"
                      className="rounded-lg"
                    ></iframe>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Playlists Section */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Headphones className="w-5 h-5 mr-2 text-green-600" />
              Curated Playlists
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {playlists.map((playlist, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                    <Headphones className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{playlist.title}</h4>
                    <p className="text-xs text-gray-500">{playlist.description}</p>
                    <div className="flex items-center mt-1 space-x-2">
                      <span className="text-xs text-gray-500">{playlist.tracks} tracks</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{playlist.duration}</span>
                      <Badge variant="outline" className="text-xs">{playlist.mood}</Badge>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpandedPlaylists(expandedPlaylists === index ? null : index)}
                  >
                    {expandedPlaylists === index ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                {expandedPlaylists === index && (
                  <div className="w-full h-80">
                    <iframe 
                      src={playlist.embedUrl}
                      width="100%" 
                      height="352" 
                      frameBorder="0" 
                      allowTransparency={true}
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      className="rounded-lg"
                    ></iframe>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* YouTube Videos Section */}
        <Card className="bg-white/80 backdrop-blur-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Youtube className="w-5 h-5 mr-2 text-red-600" />
              Recommended Videos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {videos.map((video, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{video.title}</h4>
                    <p className="text-sm text-gray-600">{video.channel}</p>
                    <div className="flex items-center mt-1 space-x-2">
                      <span className="text-xs text-gray-500">{video.duration}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{video.views} views</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpandedVideos(expandedVideos === index ? null : index)}
                  >
                    {expandedVideos === index ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                {expandedVideos === index && (
                  <div className="w-full">
                    <iframe
                      width="100%"
                      height="315"
                      src={video.embedUrl}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="rounded-lg"
                    ></iframe>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Lectures Section */}
        <Card className="bg-white/80 backdrop-blur-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
              Educational Lectures
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {lectures.map((lecture, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{lecture.title}</h4>
                      <p className="text-sm text-gray-600">{lecture.speaker}</p>
                      <p className="text-xs text-gray-500">{lecture.institution}</p>
                      <div className="flex items-center mt-1 space-x-2">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500">{lecture.duration}</span>
                        <Badge variant="outline" className="text-xs">{lecture.topic}</Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedLectures(expandedLectures === index ? null : index)}
                    >
                      {expandedLectures === index ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  {expandedLectures === index && (
                    <div className="w-full">
                      <iframe
                        width="100%"
                        height="315"
                        src={lecture.embedUrl}
                        title={lecture.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="rounded-lg"
                      ></iframe>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};