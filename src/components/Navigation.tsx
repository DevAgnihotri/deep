import { Button } from "@/components/ui/button";
import { Menu, X, Heart, Calendar, Gamepad2, MessageCircle, UserCheck, LogOut, GraduationCap, Brain } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useNavigate } from "react-router-dom";

interface NavigationProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

export const Navigation = ({ currentSection, onSectionChange }: NavigationProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const menuItems = [
    { id: "home", label: "Home", icon: Heart },
    { id: "assessment", label: "Mental Health Assessment", icon: Brain },
    { id: "courses", label: "Courses", icon: GraduationCap },
    { id: "booking", label: "Book Therapist", icon: Calendar },
    { id: "mindgames", label: "MindGames", icon: Gamepad2 },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <img 
              src="/logo.png" 
              alt="Mindhaven Logo" 
              className="w-8 h-8 object-contain"
            />
            <span className="font-bold text-xl text-gray-800">Mindhaven</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === "mindgames") {
                    navigate("/mindgames");
                  } else {
                    onSectionChange(item.id);
                  }
                }}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                  currentSection === item.id
                    ? "bg-green-100 text-green-700"
                    : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}
            
            {/* User Info */}
            {user && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onSectionChange("profile")}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                    currentSection === "profile"
                      ? "bg-green-100 text-green-700"
                      : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                  }`}
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden">
                    {user.photoURL ? (
                      <img 
                        src={user.photoURL} 
                        alt={user.displayName || "User"} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {(user.displayName || user.email || "U").charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-medium hidden lg:block">
                    Profile
                  </span>
                </button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-gray-500 hover:text-red-600"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-green-100">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === "mindgames") {
                    navigate("/mindgames");
                    setIsMenuOpen(false);
                  } else {
                    onSectionChange(item.id);
                    setIsMenuOpen(false);
                  }
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                  currentSection === item.id
                    ? "bg-green-100 text-green-700"
                    : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            ))}
            
            {/* Mobile User Info and Logout */}
            {user && (
              <div className="mt-4 pt-4 border-t border-green-100">
                <button
                  onClick={() => {
                    onSectionChange("profile");
                    setIsMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    currentSection === "profile"
                      ? "bg-green-100 text-green-700"
                      : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                  }`}
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    {user.photoURL ? (
                      <img 
                        src={user.photoURL} 
                        alt={user.displayName || "User"} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                        {(user.displayName || user.email || "U").charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium">
                      {user.displayName || user.email?.split('@')[0] || 'User'}
                    </p>
                    <p className="text-xs text-gray-500">
                      View Profile
                    </p>
                  </div>
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all text-red-600 hover:bg-red-50 mt-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
