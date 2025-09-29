import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/components/auth/AuthProvider";
import { LoginForm } from "@/components/auth/LoginForm";
import { AppLayout } from "@/components/layout/AppLayout";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { ImageUpload } from "@/components/upload/ImageUpload";
import Reports from "./pages/Reports";
import Leaderboard from "./pages/Leaderboard";
import DiseaseDetection from "./pages/DiseaseDetection";
import BullMatching from "./pages/BullMatching";
import Chatbot from "./pages/Chatbot";
import GeoMapping from "./pages/GeoMapping";
import Tutorials from "./pages/Tutorials";
import AdminAnalytics from "./pages/AdminAnalytics";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4">
            <div className="w-8 h-8 bg-primary-foreground rounded-lg animate-pulse"></div>
          </div>
          <p className="text-center text-muted-foreground">Loading PashuMitra AI...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/upload" element={<ImageUpload />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/disease-detection" element={<DiseaseDetection />} />
        <Route path="/bull-matching" element={<BullMatching />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/mapping" element={<GeoMapping />} />
        <Route path="/community" element={<div className="p-8 text-center">Community - Coming Soon</div>} />
        <Route path="/tutorials" element={<Tutorials />} />
        <Route path="/admin" element={<AdminAnalytics />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppLayout>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
