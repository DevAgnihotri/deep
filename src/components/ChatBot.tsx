
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Bot, User, Navigation, BookOpen, Calendar, Users, Target } from "lucide-react";

interface NavigationAction {
  type: 'navigate' | 'scroll' | 'info';
  target?: string;
  section?: string;
}

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your Mindhaven Companion. How can I support your mental health journey today?\n\n🔹 Type 'help' to see what I can do\n🔹 Ask me about our features\n🔹 Let me guide you around the platform",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [conversationContext, setConversationContext] = useState<string[]>([]);
  const [showQuickActions, setShowQuickActions] = useState(true);

  const quickActions = [
    { label: "📚 Courses", value: "courses", icon: BookOpen },
    { label: "📅 Book Therapy", value: "book therapist", icon: Calendar },
    { label: "👥 Communities", value: "communities", icon: Users },
    { label: "📊 My Metrics", value: "wellness metrics", icon: Target }
  ];

  const handleQuickAction = (action: string) => {
    setInputMessage(action);
    setShowQuickActions(false);
    // Trigger send message
    setTimeout(() => {
      const event = new Event('submit');
      handleSendMessage();
    }, 100);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    const userInput = inputMessage.toLowerCase().trim();
    setConversationContext([...conversationContext, userInput]);
    setInputMessage("");

    // Simulate bot response with navigation capabilities
    setTimeout(() => {
      const { response, action } = getBotResponseWithAction(userInput);
      const botResponse = {
        id: messages.length + 2,
        text: response,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);

      // Execute navigation action if provided
      if (action) {
        executeNavigationAction(action);
      }
    }, 1000);
  };

  const executeNavigationAction = (action: NavigationAction) => {
    switch (action.type) {
      case 'navigate':
        if (action.target) {
          // Trigger navigation to specific page
          const event = new CustomEvent('chatbot-navigate', { detail: action.target });
          window.dispatchEvent(event);
        }
        break;
      case 'scroll':
        if (action.section) {
          const element = document.getElementById(action.section);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
        break;
    }
  };

  const getBotResponseWithAction = (message: string): { response: string; action?: NavigationAction } => {
    // Help and navigation commands
    if (message.includes('help') || message.includes('what can you do')) {
      return {
        response: "🤖 Here's how I can help you navigate Mindhaven:\n\n📚 **Courses**: Say 'courses' or 'learn' to explore mental health courses\n📅 **Book Therapy**: Say 'book' or 'therapist' to schedule sessions\n👥 **Communities**: Say 'community' to join support groups\n📊 **Metrics**: Say 'metrics' to view your wellness data\n💬 **Chat**: I'm here for emotional support anytime\n🏠 **Home**: Say 'home' to return to dashboard\n\nJust ask me anything about mental health or tell me how you're feeling!"
      };
    }

    // Navigation commands
    if (message.includes('course') || message.includes('learn') || message.includes('education')) {
      return {
        response: "📚 Great choice! Our courses cover anxiety management, depression support, mindfulness, stress reduction, and general wellness. I'll take you to our courses section where you can:\n\n• Browse 5+ comprehensive courses\n• Watch expert-led videos\n• Track your progress\n• Learn evidence-based techniques\n\nNavigating to courses now...",
        action: { type: 'navigate', target: 'courses' }
      };
    }

    if (message.includes('book') || message.includes('therapist') || message.includes('therapy') || message.includes('appointment')) {
      return {
        response: "👨‍⚕️ I'll help you book a session with our licensed therapists! You can choose from:\n\n• Video sessions with Google Meet\n• Phone consultations\n• Text-based therapy chat\n\nOur therapists specialize in anxiety, depression, trauma, and relationship counseling. Let me take you to the booking page...",
        action: { type: 'navigate', target: 'booking' }
      };
    }

    if (message.includes('community') || message.includes('support group') || message.includes('connect')) {
      return {
        response: "👥 Our communities are amazing for peer support! Join discussions about:\n\n• Anxiety & stress management\n• Depression support\n• Mindfulness practices\n• General wellness\n\nConnect with others on similar journeys. Taking you to communities...",
        action: { type: 'navigate', target: 'communities' }
      };
    }

    if (message.includes('metric') || message.includes('progress') || message.includes('data') || message.includes('wellness')) {
      return {
        response: "📊 Your wellness metrics show personalized insights about your mental health journey. Let me show you your current metrics including mood, stress levels, sleep quality, and more...",
        action: { type: 'scroll', section: 'wellness-metrics' }
      };
    }

    if (message.includes('home') || message.includes('dashboard') || message.includes('main')) {
      return {
        response: "🏠 Taking you back to your main dashboard where you can see your wellness overview, mental health score, and quick access to all features.",
        action: { type: 'navigate', target: 'home' }
      };
    }

    if (message.includes('quiz') || message.includes('personalization') || message.includes('assessment')) {
      return {
        response: "📝 Our personalization quiz helps tailor your experience! It assesses your current mental health needs and customizes recommendations. Let me take you there...",
        action: { type: 'navigate', target: 'quiz' }
      };
    }

    // Mental health support responses
    if (message.includes('anxious') || message.includes('anxiety') || message.includes('worried') || message.includes('nervous')) {
      return {
        response: "I understand you're feeling anxious. That's completely normal and you're not alone. Here are some immediate techniques that can help:\n\n🌬️ **Try the 4-7-8 breathing**: Inhale for 4, hold for 7, exhale for 8\n🎯 **5-4-3-2-1 grounding**: Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste\n\nWould you like me to show you our anxiety management courses? They have proven techniques and expert guidance."
      };
    }

    if (message.includes('depressed') || message.includes('sad') || message.includes('down') || message.includes('hopeless')) {
      return {
        response: "I hear that you're going through a difficult time. Your feelings are valid, and reaching out shows incredible strength. Remember:\n\n💚 You matter and your life has value\n🤝 You're not alone in this journey\n🌱 Small steps can lead to meaningful change\n\nOur depression support courses and therapist booking might be helpful. Would you like me to guide you there?"
      };
    }

    if (message.includes('stressed') || message.includes('overwhelmed') || message.includes('pressure')) {
      return {
        response: "Feeling overwhelmed is tough, but there are ways to manage stress effectively:\n\n⏸️ **Take a moment**: Pause and breathe deeply\n📋 **Break it down**: Divide big tasks into smaller steps\n🚶 **Movement helps**: Even a short walk can reduce stress\n\nOur stress management courses have practical tools and techniques. Want me to show you?"
      };
    }

    if (message.includes('sleep') || message.includes('insomnia') || message.includes('tired') || message.includes('exhausted')) {
      return {
        response: "Sleep is crucial for mental health. Here are some tips:\n\n🌙 **Sleep hygiene**: Keep consistent bedtime routines\n📱 **Screen time**: Limit devices 1 hour before bed\n🧘 **Relaxation**: Try guided meditation or deep breathing\n\nYour wellness metrics can track your sleep patterns. Want me to show you?"
      };
    }

    // Motivational and supportive responses
    if (message.includes('thank') || message.includes('helpful') || message.includes('appreciate')) {
      return {
        response: "You're so welcome! I'm here whenever you need support. Remember, taking care of your mental health is one of the most important things you can do. Is there anything else I can help you with today? 💚"
      };
    }

    if (message.includes('how are you') || message.includes('how do you feel')) {
      return {
        response: "Thank you for asking! As an AI, I don't have feelings, but I'm functioning perfectly and ready to support you. More importantly, how are YOU feeling today? I'm here to listen and help with whatever you're experiencing. 🤗"
      };
    }

    // General mental health support
    const supportiveResponses = [
      "I understand you're going through something difficult. Mindhaven is here to support you - seeking help is a sign of strength. 💪\n\nWould you like me to guide you to our courses, therapist booking, or communities for additional support?",
      
      "It sounds like you're dealing with some challenging emotions. Remember that your feelings are valid and it's okay to not be okay sometimes. 🤗\n\nOur platform has many resources - would you like to explore breathing exercises, mindfulness courses, or connect with a therapist?",
      
      "Thank you for sharing that with me. You're incredibly brave for reaching out. 🌟\n\nConsider speaking with one of our licensed therapists - I can help you book a session right now if you'd like.",
      
      "Those feelings are completely valid. Many in our Mindhaven community experience similar challenges - you're not alone in this journey. 👥\n\nWould you like me to take you to our support communities or show you some helpful courses?",
      
      "I can help you break this down into smaller, manageable steps. Taking one small action today can make a difference. 🌱\n\nWhat feels like the most pressing concern right now? I can guide you to the right resources.",
      
      "Your mental health matters, and I'm glad you're here taking steps to care for yourself. That takes courage. 💚\n\nLet me know how I can best support you - whether that's finding resources, booking therapy, or just having someone to talk to."
    ];

    return {
      response: supportiveResponses[Math.floor(Math.random() * supportiveResponses.length)]
    };
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg transition-all z-50 ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
      >
        <img src="/logo.png" alt="Mindhaven Logo" className="w-6 h-6 object-contain" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-80 h-[520px] shadow-2xl z-50 bg-white border-0 flex flex-col overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg p-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center text-base">
                <img src="/logo.png" alt="Mindhaven Logo" className="w-5 h-5 mr-2 object-contain" />
                Mindhaven Companion
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-green-500 text-white'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.isBot && (
                      <Bot className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
                    )}
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    {!message.isBot && (
                      <User className="w-4 h-4 mt-0.5 text-white flex-shrink-0" />
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Quick Actions */}
            {showQuickActions && messages.length <= 1 && (
              <div className="mt-4">
                <p className="text-xs text-gray-500 mb-2">Quick actions:</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction(action.value)}
                      className="text-xs h-8 justify-start"
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 flex-shrink-0 bg-white">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message or ask for help..."
                className="flex-1 border-gray-300 focus:border-green-500 focus:ring-green-500"
              />
              <Button
                onClick={handleSendMessage}
                size="sm"
                className="bg-green-500 hover:bg-green-600 px-3"
                disabled={!inputMessage.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Reset conversation button */}
            {messages.length > 2 && (
              <div className="mt-2 flex justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setMessages([{
                      id: 1,
                      text: "Hello! I'm your Mindhaven Companion. How can I support your mental health journey today?\n\n🔹 Type 'help' to see what I can do\n🔹 Ask me about our features\n🔹 Let me guide you around the platform",
                      isBot: true,
                      timestamp: new Date()
                    }]);
                    setConversationContext([]);
                    setShowQuickActions(true);
                  }}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  🔄 New conversation
                </Button>
              </div>
            )}
          </div>
        </Card>
      )}
    </>
  );
};
