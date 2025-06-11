import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // Prevent app timeout and maintain activity
  useEffect(() => {
    console.log("🚀 X-LiNk Application Started - Keep-Alive Mode");

    // Prevent any browser sleep/idle behavior
    const preventIdle = () => {
      // Keep a small interval running to prevent idle
      const activityTimer = setInterval(() => {
        // Update page activity indicator
        document.body.setAttribute(
          "data-last-activity",
          new Date().toISOString(),
        );
      }, 10000); // Every 10 seconds

      return activityTimer;
    };

    const activityTimer = preventIdle();

    // Prevent context loss
    const preventContextLoss = () => {
      // Keep requestAnimationFrame running
      const animate = () => {
        requestAnimationFrame(animate);
      };
      animate();
    };

    preventContextLoss();

    // Override any global timeout functions that might close the app
    const originalSetTimeout = window.setTimeout;
    window.setTimeout = ((callback: any, delay: any, ...args: any[]) => {
      // Only allow timeouts shorter than 5 minutes (300000ms)
      if (delay && delay > 300000) {
        console.warn("🚫 Blocked long timeout that could close app:", delay);
        return -1 as any;
      }
      return originalSetTimeout(callback, delay, ...args);
    }) as typeof setTimeout;

    // Cleanup
    return () => {
      clearInterval(activityTimer);
      window.setTimeout = originalSetTimeout;
      console.log("🛑 App cleanup completed");
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
