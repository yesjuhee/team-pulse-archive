
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Index from "./pages/Index";
import PostDetail from "./pages/PostDetail";
import CreateTeam from "./pages/CreateTeam";
import TeamManagement from "./pages/TeamManagement";
import TeamSettings from "./pages/TeamSettings";
import MyPage from "./pages/MyPage";
import MemberProfile from "./pages/MemberProfile";
import NotFound from "./pages/NotFound";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Dashboard from "./pages/Dashboard";
import Explore from "./pages/Explore";

const queryClient = new QueryClient();

const AppContent = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      <Route path="/" element={isLoggedIn ? <Dashboard /> : <Landing />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/team/smart-city-platform" element={<Index />} />
      <Route path="/team/smart-city-platform/member/:memberName" element={<MemberProfile />} />
      <Route path="/team/smart-city-platform/post/:id" element={<PostDetail />} />
      <Route path="/post/:id" element={<PostDetail />} />
      <Route path="/create-team" element={<CreateTeam />} />
      <Route path="/team/smart-city-platform/manage" element={<TeamManagement />} />
      <Route path="/team/smart-city-platform/settings" element={<TeamSettings />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
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
