
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/team-blog" element={<Index />} />
          <Route path="/team/:teamId" element={<Index />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/create-team" element={<CreateTeam />} />
          <Route path="/team/:teamId/manage" element={<TeamManagement />} />
          <Route path="/team/:teamId/settings" element={<TeamSettings />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
