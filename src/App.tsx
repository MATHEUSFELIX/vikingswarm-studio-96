import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppShell from "@/components/AppShell";

const HomePage = lazy(() => import("@/pages/HomePage"));
const ProjectDetail = lazy(() => import("@/pages/ProjectDetail"));
const NewProjectPage = lazy(() => import("@/pages/NewProjectPage"));
const ConsultingPage = lazy(() => import("@/pages/ConsultingPage"));
const SocialPage = lazy(() => import("@/pages/SocialPage"));
const ResearchPage = lazy(() => import("@/pages/ResearchPage"));
const ReportsPage = lazy(() => import("@/pages/ReportsPage"));
const LearningPage = lazy(() => import("@/pages/LearningPage"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const queryClient = new QueryClient();

const FallbackLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppShell>
          <Suspense fallback={<FallbackLoader />}>
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
          </Suspense>
        </AppShell>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
