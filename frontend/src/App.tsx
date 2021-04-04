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
import { Procedures } from "./pages/Procedures";

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
          <div data-testid="app" className="bg-gray-100 flex flex-row">
            <Notification />
            <Nav />
            <div className="flex-1">
              <AnimatePresence>
                <Switch>
                  <Route path="/home" component={Home} />
                  <Route exact path="/patients" component={Patients} />
                  <Route exact path="/procedures" component={Procedures} />
                  <Route path="/responses/manage" component={Responses} />
                  <Route path="/forms" component={Forms} />
                  <Route exact path="/404" component={NotFound} />
                  <Redirect exact path="/" to="/home" />
                  <Redirect exact path="/responses" to="/responses/manage" />
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
