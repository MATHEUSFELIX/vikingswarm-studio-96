import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppShell from "@/components/AppShell";
import HomePage from "@/pages/HomePage";
import ProjectDetail from "@/pages/ProjectDetail";
import NewProjectPage from "@/pages/NewProjectPage";
import ConsultingPage from "@/pages/ConsultingPage";
import SocialPage from "@/pages/SocialPage";
import ResearchPage from "@/pages/ResearchPage";
import ReportsPage from "@/pages/ReportsPage";
import LearningPage from "@/pages/LearningPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppShell>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            <Route path="/projects/new" element={<NewProjectPage />} />
            <Route path="/consulting" element={<ConsultingPage />} />
            <Route path="/social" element={<SocialPage />} />
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/learning" element={<LearningPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppShell>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
