import React, { Suspense } from "react";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import { Loading } from "./pages/Loading";
import { Notification } from "./components/Notification";
import { NotFound } from "./pages/NotFound";
import { Nav } from "./components/Nav";
import { Responses } from "./pages/Responses";
import { Forms } from "./pages/Forms";
import { Home } from "./pages/Home";
import { Patients } from "./pages/Patients";
import { AnimatePresence } from "framer-motion";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

export const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Loading />}>
        <BrowserRouter>
          <div data-testid="app" className="flex flex-row bg-gray-100">
            <Notification />
            <Nav />
            <div className="flex-1">
              <AnimatePresence>
                <Switch>
                  <Route path="/responses" component={Responses} />
                  <Route path="/home" component={Home} />
                  <Route path="/forms" component={Forms} />
                  <Route exact path="/404" component={NotFound} />
                  <Redirect exact path="/" to="/responses" />
                  <Redirect to="/404" />
                </Switch>
              </AnimatePresence>
            </div>
          </div>
        </BrowserRouter>
      </Suspense>
    </QueryClientProvider>
  );
}

export default App;
