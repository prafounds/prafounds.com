import { Switch, Route, useLocation } from "wouter";
import { AnimatePresence } from "framer-motion";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import PageTransition from "@/components/PageTransition";
import Home from "@/pages/Home";
import ThesisPage from "@/pages/ThesisPage";
import ProcessPage from "@/pages/ProcessPage";
import DispatchesPage from "@/pages/DispatchesPage";
import TeamPage from "@/pages/TeamPage";
import NotFound from "@/pages/not-found";

function Router() {
  const [location] = useLocation();

  return (
    // `mode="wait"` lets the outgoing page finish receding before the next
    // arrives, which is what makes the camera flight and the DOM motion read
    // as a single movement instead of two overlapping ones.
    <AnimatePresence mode="wait" initial={false}>
      <PageTransition routeKey={location}>
        <Switch location={location}>
          <Route path="/" component={Home} />
          <Route path="/thesis" component={ThesisPage} />
          <Route path="/process" component={ProcessPage} />
          <Route path="/dispatches" component={DispatchesPage} />
          <Route path="/team" component={TeamPage} />
          <Route component={NotFound} />
        </Switch>
      </PageTransition>
    </AnimatePresence>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        {/* The WebGL background scene was removed. The page sits on the
            flat --pf-bg instead; z-10 is kept so the existing stacking
            inside pages is undisturbed. */}
        <div className="relative z-10">
          <Router />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
