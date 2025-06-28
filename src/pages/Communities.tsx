import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, MessageCircle, Users, Instagram, Linkedin } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Custom Discord icon component
const DiscordIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

// Custom WhatsApp icon component
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.885 3.488"/>
  </svg>
);

export const Communities = () => {
  const navigate = useNavigate();  const communities = [
    {
      name: "WhatsApp Support",
      description: "Join our daily mental wellness check-ins and peer support group. Share experiences and get immediate support from our community.",
      icon: WhatsAppIcon,
      color: "from-green-500 to-green-600",
      link: "https://chat.whatsapp.com/example",
      members: "80+ members"
    },
    {
      name: "LinkedIn Network", 
      description: "Connect professionally with mental health advocates, therapists, and wellness practitioners. Share career-mental health balance tips.",
      icon: Linkedin,
      color: "from-blue-600 to-blue-700",
      link: "https://linkedin.com/groups/mental-wellness",
      members: "65+ professionals"
    },
    {
      name: "Discord Server",
      description: "Real-time conversations, voice chats, and community events. Join themed channels for anxiety, depression support, and mindfulness.",
      icon: DiscordIcon,
      color: "from-indigo-500 to-purple-600", 
      link: "https://discord.gg/mentalwellness",
      members: "95+ active users"
    },
    {
      name: "Instagram Community",
      description: "Daily motivation, mental health tips, and inspiring stories. Follow for uplifting content and connect with our visual community.",
      icon: Instagram,
      color: "from-pink-500 to-orange-500",
      link: "https://instagram.com/sereneself",
      members: "85+ followers"
    }
  ];

  const handleJoinCommunity = (link: string) => {
    window.open(link, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-green-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-800">Mindful Communities</span>
            </div>
            
            <Button 
              onClick={() => navigate(-1)}
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-8">
            <img src="/logo.png" alt="Mindhaven Logo" className="w-4 h-4 mr-2 object-contain" />
            Connect with Mindhaven community members
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Join Mindhaven
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
              {" "}Mental Wellness
            </span>
            <br />Communities
          </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect with the supportive Mindhaven community of individuals on their mental health journey. 
            Share experiences, find support, and grow together across multiple platforms.
          </p>
        </div>

        {/* Communities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {communities.map((community, index) => {
            const IconComponent = community.icon;
            return (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
                <CardHeader className="relative">
                  <div className={`w-16 h-16 bg-gradient-to-br ${community.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-green-600 group-hover:to-blue-600 transition-all duration-300">
                    {community.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {community.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 font-medium">
                      {community.members}
                    </span>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm text-green-600 font-medium">Active now</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => handleJoinCommunity(community.link)}
                    className={`w-full bg-gradient-to-r ${community.color} hover:opacity-90 text-white font-semibold py-3 rounded-xl transition-all duration-300 group-hover:scale-105`}
                  >
                    Join Community
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-green-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need Help Choosing?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Not sure which community fits you best? Start with WhatsApp for quick daily support, 
              or join Discord for real-time conversations with our most active community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => handleJoinCommunity("https://chat.whatsapp.com/example")}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-full font-semibold"
              >
                Start with WhatsApp
              </Button>
              <Button 
                onClick={() => handleJoinCommunity("https://discord.gg/mentalwellness")}
                variant="outline"
                className="border-2 border-purple-200 text-purple-700 hover:bg-purple-50 px-8 py-3 rounded-full font-semibold"
              >
                Explore Discord
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>
    </div>
  );
};

export default Communities;
