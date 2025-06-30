
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Headphones, BookOpen, Youtube, Clock, Star, ChevronDown, ChevronUp, Gamepad2, Heart, Brain, Sparkles, Trophy, Users, Zap, Moon, Volume2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ContentRecommendationsProps {
  insights?: {
    primaryConcern?: string;
    [key: string]: unknown;
  };
}

export const ContentRecommendations = ({ insights }: ContentRecommendationsProps) => {
  const navigate = useNavigate();
  const [expandedPodcasts, setExpandedPodcasts] = useState<number | null>(null);
  const [expandedPlaylists, setExpandedPlaylists] = useState<number | null>(null);
  const [expandedVideos, setExpandedVideos] = useState<number | null>(null);
  const [expandedLectures, setExpandedLectures] = useState<number | null>(null);
  const [expandedGames, setExpandedGames] = useState<number | null>(null);
  const [expandedSleep, setExpandedSleep] = useState<number | null>(null);

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

  const sleepContent = [
    {
      title: "Sleep Stories Collection",
      category: "Sleep Stories",
      description: "Calming bedtime stories to help you drift off peacefully",
      duration: "20-45 min",
      tracks: 15,
      mood: "Relaxing",
      embedUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DWZd79rJ6a7lp?utm_source=generator",
      icon: "📚",
      gradient: "from-indigo-400 to-purple-600"
    },
    {
      title: "Deep Sleep Meditations",
      category: "Sleep Meditations", 
      description: "Guided meditations designed for better sleep quality",
      duration: "10-30 min",
      tracks: 20,
      mood: "Peaceful",
      embedUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DX9RwfGbeGQwP?utm_source=generator",
      icon: "🧘",
      gradient: "from-purple-400 to-pink-600"
    },
    {
      title: "Sleep Music & Lullabies",
      category: "Music",
      description: "Soft instrumental music and modern lullabies for sleep",
      duration: "1-8 hours",
      tracks: 30,
      mood: "Soothing",
      embedUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DWYcDQ1hSjOpY?utm_source=generator",
      icon: "🎵",
      gradient: "from-blue-400 to-teal-600"
    },
    {
      title: "Nature Soundscapes",
      category: "Soundscapes",
      description: "Rain, ocean waves, forest sounds for natural sleep aid",
      duration: "30 min - 10 hours",
      tracks: 25,
      mood: "Natural",
      embedUrl: "https://open.spotify.com/embed/playlist/37i9dQZF1DX8ymr6UES7vc?utm_source=generator",
      icon: "🌿",
      gradient: "from-green-400 to-blue-600"
    }
  ];

  const games = [
    {
      title: "LetsLove 13",
      subtitle: "Puzzle of Hearts",
      description: "A heartwarming puzzle game about connection and love that helps build emotional resilience through gentle challenges",
      difficulty: "Beginner Friendly",
      duration: "10-15 min",
      category: "Mindful Puzzle",
      benefits: "Promotes positive thinking and emotional connection",
      therapeuticFocus: "Emotional Wellness",
      gameUrl: "/games/letslove-13/index.html",
      image: "💝",
      bgGradient: "from-pink-400 via-rose-400 to-red-400",
      cardGradient: "from-pink-50 via-rose-50 to-red-50",
      hoverGradient: "from-pink-100 via-rose-100 to-red-100",
      iconColor: "text-pink-600",
      skills: ["Emotional Intelligence", "Problem Solving", "Mindfulness"],
      mood: "Uplifting",
      rating: 4.9,
      players: "210+ played"
    },
    {
      title: "Cute Pico",
      subtitle: "Adventure of Friendship",
      description: "A friendly adventure game that encourages exploration, friendship, and builds confidence through supportive gameplay mechanics",
      difficulty: "Intermediate", 
      duration: "15-20 min",
      category: "Social Adventure",
      benefits: "Builds confidence and social skills through gameplay",
      therapeuticFocus: "Social Confidence",
      gameUrl: "/games/mariobuddy/index.html",
      image: "�",
      bgGradient: "from-blue-400 via-purple-400 to-indigo-400",
      cardGradient: "from-blue-50 via-purple-50 to-indigo-50",
      hoverGradient: "from-blue-100 via-purple-100 to-indigo-100",
      iconColor: "text-blue-600",
      skills: ["Social Skills", "Confidence Building", "Creative Thinking"],
      mood: "Empowering",
      rating: 4.8,
      players: "180+ played"
    },
    {
      title: "Aura Bloom",
      subtitle: "Depression Recovery Platform",
      description: "A simple platform with activities specifically designed to tackle depression through mindful exercises and therapeutic games",
      difficulty: "All Levels", 
      duration: "5-30 min",
      category: "Depression Support",
      benefits: "Provides tools and activities to combat depression",
      therapeuticFocus: "Depression Recovery",
      gameUrl: "https://depremoval.vercel.app/",
      image: "🌸",
      bgGradient: "from-green-400 via-teal-400 to-cyan-400",
      cardGradient: "from-green-50 via-teal-50 to-cyan-50",
      hoverGradient: "from-green-100 via-teal-100 to-cyan-100",
      iconColor: "text-green-600",
      skills: ["Depression Management", "Mindfulness", "Self-Care"],
      mood: "Healing",
      rating: 4.7,
      players: "150+ helped"
    },
    {
      title: "Mindhaven Matchmaking",
      subtitle: "Connection & Wellness",
      description: "A retro-style matchmaking game that helps understand relationship compatibility while building social confidence through strategic thinking",
      difficulty: "Easy to Medium", 
      duration: "15-25 min",
      category: "Social Skills",
      benefits: "Improves social awareness and relationship understanding",
      therapeuticFocus: "Social Connection",
      gameUrl: "/games/mindhaven-matchmaking/index.html",
      image: "💕",
      bgGradient: "from-purple-400 via-pink-400 to-rose-400",
      cardGradient: "from-purple-50 via-pink-50 to-rose-50",
      hoverGradient: "from-purple-100 via-pink-100 to-rose-100",
      iconColor: "text-purple-600",
      skills: ["Social Awareness", "Strategic Thinking", "Emotional Intelligence"],
      mood: "Engaging",
      rating: 4.6,
      players: "90+ matched"
    },
    {
      title: "Mind Games",
      subtitle: "Mathematical Brain Training",
      description: "Challenge your mathematical thinking with progressive brain puzzles designed to enhance cognitive function and problem-solving skills",
      difficulty: "Beginner to Advanced", 
      duration: "10-20 min",
      category: "Cognitive Training",
      benefits: "Improves mathematical thinking and problem-solving abilities",
      therapeuticFocus: "Cognitive Enhancement",
      gameUrl: "/games/mind-games/index.html",
      image: "🧮",
      bgGradient: "from-indigo-400 via-blue-400 to-cyan-400",
      cardGradient: "from-indigo-50 via-blue-50 to-cyan-50",
      hoverGradient: "from-indigo-100 via-blue-100 to-cyan-100",
      iconColor: "text-indigo-600",
      skills: ["Mathematical Thinking", "Logic", "Problem Solving"],
      mood: "Challenging",
      rating: 4.5,
      players: "120+ challenged"
    },
    {
      title: "Havenshot",
      subtitle: "Therapeutic Action Experience",
      description: "A stress-relief action game that provides a safe space to release tension through focused gameplay in a therapeutic environment",
      difficulty: "Intermediate", 
      duration: "10-25 min",
      category: "Stress Relief",
      benefits: "Helps release stress and tension through controlled action gameplay",
      therapeuticFocus: "Stress Management",
      gameUrl: "/games/havenshot/index.html",
      image: "🎯",
      bgGradient: "from-orange-400 via-red-400 to-pink-400",
      cardGradient: "from-orange-50 via-red-50 to-pink-50",
      hoverGradient: "from-orange-100 via-red-100 to-pink-100",
      iconColor: "text-orange-600",
      skills: ["Stress Release", "Focus", "Hand-Eye Coordination"],
      mood: "Energizing",
      rating: 4.4,
      players: "80+ relieved"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-green-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-800">Mental Health Resources</span>
            </div>
            
            <Button 
              onClick={() => navigate("/home")}
              variant="outline" 
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-green-700 text-sm font-medium mb-8">
            <img src="/logo.png" alt="Mindhaven Logo" className="w-4 h-4 mr-2 object-contain" />
            Curated wellness content for your journey
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Mental Health <span className="text-green-600">Resources</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            Discover curated content, tools, and support materials for your mental wellness journey
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
          </CardContent>        </Card>

        {/* Sleep & Rest Section */}
        <Card className="bg-white/80 backdrop-blur-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center text-xl">
              <Moon className="w-5 h-5 mr-2 text-indigo-600" />
              Sleep & Relaxation Audio
            </CardTitle>
            <p className="text-sm text-gray-600 mt-2">
              Curated audio content to help you unwind and achieve better sleep quality
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sleepContent.map((content, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className={`w-16 h-16 bg-gradient-to-br ${content.gradient} rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
                      {content.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-lg">{content.title}</h4>
                      <p className="text-sm text-indigo-600 font-medium">{content.category}</p>
                      <p className="text-xs text-gray-600 mt-1">{content.description}</p>
                      <div className="flex items-center mt-2 space-x-3">
                        <div className="flex items-center space-x-1">
                          <Volume2 className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{content.tracks} tracks</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">{content.duration}</span>
                        </div>
                        <Badge variant="outline" className="text-xs bg-white/80">
                          {content.mood}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedSleep(expandedSleep === index ? null : index)}
                    >
                      {expandedSleep === index ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  {expandedSleep === index && (
                    <div className="w-full bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-medium text-gray-800">Listen on Spotify</h5>
                        <Button
                          size="sm"
                          onClick={() => window.open(content.embedUrl.replace('/embed/', '/'), '_blank')}
                          className={`bg-gradient-to-r ${content.gradient} text-white hover:shadow-lg transition-all duration-300`}
                        >
                          <Play className="w-3 h-3 mr-1" />
                          Open in Spotify
                        </Button>
                      </div>
                      <iframe 
                        src={content.embedUrl}
                        width="100%" 
                        height="352" 
                        frameBorder="0" 
                        allowTransparency={true}
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        className="rounded-lg shadow-sm"
                      ></iframe>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Sleep Tips Banner */}
            <div className="mt-6 bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 rounded-xl p-6 border border-indigo-100">
              <div className="text-center">
                <div className="flex justify-center items-center space-x-2 mb-3">
                  <Moon className="w-5 h-5 text-indigo-500" />
                  <h3 className="text-lg font-semibold text-gray-800">Better Sleep, Better Mental Health</h3>
                  <Moon className="w-5 h-5 text-indigo-500" />
                </div>
                <p className="text-sm text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Quality sleep is essential for mental well-being. These carefully curated audio experiences can help reduce anxiety, 
                  improve sleep quality, and support your overall mental health journey. Use headphones for the best experience. 🎧✨
                </p>
                <div className="flex justify-center items-center mt-4 space-x-6 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Heart className="w-3 h-3 text-red-400" />
                    <span>Sleep Quality</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Brain className="w-3 h-3 text-purple-400" />
                    <span>Stress Relief</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Sparkles className="w-3 h-3 text-blue-400" />
                    <span>Mental Restoration</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Games Section - SPECIAL EDITION */}
        <Card className="bg-white/90 backdrop-blur-sm lg:col-span-2 border-2 border-gradient-to-r from-purple-200 to-pink-200 shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white rounded-t-lg">
            <CardTitle className="flex items-center justify-center text-2xl font-bold">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Gamepad2 className="w-8 h-8 animate-pulse" />
                  <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-yellow-300 animate-bounce" />
                </div>
                <span className="bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent">
                  Therapeutic Gaming Zone
                </span>
                <Heart className="w-6 h-6 text-pink-200 animate-pulse" />
              </div>
            </CardTitle>
            <p className="text-center text-purple-100 mt-2 font-medium">
              🎮 Interactive wellness games designed to boost your mental health journey ✨
            </p>
          </CardHeader>
          <CardContent className="p-8 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {games.map((game, index) => (
                <div key={index} className="group relative">
                  {/* Main Game Card */}
                  <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${game.cardGradient} hover:${game.hoverGradient} transition-all duration-500 transform hover:scale-105 hover:shadow-2xl border-2 border-white/50 hover:border-white/80`}>
                    {/* Floating Elements */}
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <div className="bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-gray-700 flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-500" />
                        <span>{game.rating}</span>
                      </div>
                      <div className="bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-gray-700">
                        {game.players}
                      </div>
                    </div>

                    {/* Game Content */}
                    <div className="p-6">
                      {/* Header with Icon */}
                      <div className="flex items-start space-x-4 mb-4">
                        <div className={`w-20 h-20 bg-gradient-to-br ${game.bgGradient} rounded-2xl flex items-center justify-center text-3xl shadow-lg transform group-hover:rotate-12 transition-transform duration-300`}>
                          {game.image}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-xl text-gray-900 mb-1">{game.title}</h4>
                          <p className={`text-sm font-semibold ${game.iconColor} mb-2`}>{game.subtitle}</p>
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className={`bg-gradient-to-r ${game.bgGradient} text-white border-none text-xs`}>
                              {game.category}
                            </Badge>
                            <Badge variant="outline" className="text-xs bg-white/80">
                              {game.mood}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-700 mb-4 leading-relaxed">{game.description}</p>

                      {/* Stats Row */}
                      <div className="flex items-center justify-between mb-4 text-xs text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{game.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Trophy className="w-3 h-3" />
                          <span>{game.difficulty}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Brain className="w-3 h-3" />
                          <span>{game.therapeuticFocus}</span>
                        </div>
                      </div>

                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {game.skills.map((skill, skillIndex) => (
                          <span key={skillIndex} className="bg-white/70 backdrop-blur-sm text-xs px-2 py-1 rounded-full text-gray-700 border border-gray-200">
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Action Button */}
                      <div className="flex space-x-3">
                        <Button 
                          onClick={() => setExpandedGames(expandedGames === index ? null : index)}
                          variant="outline"
                          className="flex-1 bg-white/80 hover:bg-white transition-all duration-300"
                        >
                          {expandedGames === index ? (
                            <>
                              <ChevronUp className="w-4 h-4 mr-2" />
                              Less Info
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-4 h-4 mr-2" />
                              Learn More
                            </>
                          )}
                        </Button>
                        <Button 
                          onClick={() => window.open(game.gameUrl, '_blank')}
                          className={`flex-1 bg-gradient-to-r ${game.bgGradient} hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-white border-none`}
                        >
                          <Gamepad2 className="w-4 h-4 mr-2" />
                          Play Now
                        </Button>
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {expandedGames === index && (
                      <div className="border-t-2 border-white/50 bg-white/60 backdrop-blur-sm p-6 animate-in slide-in-from-top duration-300">
                        <div className="space-y-4">
                          {/* Therapeutic Benefits */}
                          <div className="bg-white/80 rounded-xl p-4">
                            <h5 className="font-bold text-gray-800 mb-3 flex items-center">
                              <Heart className="w-5 h-5 mr-2 text-pink-500" />
                              Therapeutic Benefits
                            </h5>
                            <p className="text-sm text-gray-700 leading-relaxed">{game.benefits}</p>
                          </div>

                          {/* How It Helps */}
                          <div className="bg-white/80 rounded-xl p-4">
                            <h5 className="font-bold text-gray-800 mb-3 flex items-center">
                              <Brain className="w-5 h-5 mr-2 text-purple-500" />
                              Mental Health Impact
                            </h5>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              {game.skills.map((skill, skillIndex) => (
                                <div key={skillIndex} className="bg-gradient-to-r from-white to-gray-50 rounded-lg p-3 text-center">
                                  <div className="text-lg mb-1">
                                    {skillIndex === 0 && <Heart className="w-5 h-5 mx-auto text-red-500" />}
                                    {skillIndex === 1 && <Zap className="w-5 h-5 mx-auto text-yellow-500" />}
                                    {skillIndex === 2 && <Users className="w-5 h-5 mx-auto text-blue-500" />}
                                  </div>
                                  <p className="text-xs font-medium text-gray-700">{skill}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Call to Action */}
                          <div className="flex justify-center space-x-4 pt-2">
                            <Button 
                              onClick={() => window.open(game.gameUrl, '_blank')}
                              size="lg"
                              className={`bg-gradient-to-r ${game.bgGradient} hover:shadow-xl transform hover:scale-110 transition-all duration-300 text-white border-none px-8`}
                            >
                              <Gamepad2 className="w-5 h-5 mr-2" />
                              Start Your Journey
                              <Sparkles className="w-4 h-4 ml-2 animate-pulse" />
                            </Button>
                            <Button 
                              variant="outline"
                              onClick={() => setExpandedGames(null)}
                              className="bg-white/80 hover:bg-white"
                            >
                              Close
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Banner */}
            <div className="mt-8 text-center bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 rounded-2xl p-6 border-2 border-white/50">
              <div className="flex justify-center items-center space-x-3 mb-3">
                <Sparkles className="w-6 h-6 text-purple-500 animate-pulse" />
                <h3 className="text-lg font-bold text-gray-800">Gamified Mental Wellness</h3>
                <Sparkles className="w-6 h-6 text-pink-500 animate-pulse" />
              </div>
              <p className="text-sm text-gray-600 max-w-2xl mx-auto">
                These games are specifically designed to support your mental health journey through interactive experiences that promote positive thinking, emotional regulation, and social connection. Play mindfully and enjoy the therapeutic benefits! 🌟
              </p>
              <div className="flex justify-center items-center mt-4 space-x-6 text-xs text-gray-500">
                <div className="flex items-center space-x-1">
                  <Heart className="w-4 h-4 text-red-400" />
                  <span>Wellness Focused</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Brain className="w-4 h-4 text-purple-400" />
                  <span>Evidence-Based</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span>Community Approved</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
    </div>
  );
};