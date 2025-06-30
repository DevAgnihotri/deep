import { AuthProvider } from "@/contexts/AuthContext";
import { PersonalizationProvider } from "@/contexts/PersonalizationContext";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import AuthPage from "./pages/AuthPage";
import GetStarted from "./pages/GetStarted";
import Communities from "./pages/Communities";
import { Courses } from "./pages/Courses";
import Dashboard from "./pages/Dashboard";
import WellnessActivities from "./pages/WellnessActivities";
import { useAuth } from "@/contexts/AuthContext";
import {ContentRecommendations} from "./components/ContentRecommendations";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const App = () => (
  <AuthProvider>
    <PersonalizationProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/signup" element={<AuthPage />} />
              <Route path="/get-started" element={<GetStarted />} />
              <Route path="/communities" element={<Communities />} />
              <Route path="/mindgames" element={<WellnessActivities />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/courses" element={<ProtectedRoute><Courses /></ProtectedRoute>} />
              <Route path="/home" element={<ProtectedRoute><Index /></ProtectedRoute>} />
              <Route path="/ContentRecommendations" element={<ContentRecommendations />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </PersonalizationProvider>
  </AuthProvider>
);

export default App;
