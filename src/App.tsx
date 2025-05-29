
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { SecurityProvider } from "@/components/SecurityProvider";
import Index from "./pages/Index";
import Patients from "./pages/Patients";
import Departments from "./pages/Departments";
import Analytics from "./pages/Analytics";
import Resources from "./pages/Resources";
import ProcessMining from "./pages/ProcessMining";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SecurityProvider>
          <TooltipProvider>
            <Toaster />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/patients" element={<Patients />} />
                <Route path="/departments" element={<Departments />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/process-mining" element={<ProcessMining />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </SecurityProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
