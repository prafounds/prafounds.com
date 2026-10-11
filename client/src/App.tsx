import { Suspense, lazy } from "react";
import { Switch, Route, useLocation } from "wouter";
import { AnimatePresence } from "framer-motion";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import PageTransition from "@/components/PageTransition";

/**
 * three.js is ~800kB — several times the rest of the app. The scene is
 * decorative, so it must never sit on the critical path: lazy() puts it in
 * its own chunk that loads after first paint. Content is readable and
 * interactive before a single byte of WebGL arrives.
 */
const SceneRoot = lazy(() => import("@/three/SceneRoot"));
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
        {/* Mounted outside the router on purpose: the WebGL context and all
            geometry persist across navigation, so the camera can fly between
            route stations instead of the scene rebuilding each time. */}
        <Suspense fallback={null}>
          <SceneRoot />
        </Suspense>
        <div className="relative z-10">
          <Router />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
