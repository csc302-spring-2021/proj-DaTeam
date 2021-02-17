import React, { Suspense } from "react";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import { Loading } from "./pages/Loading";
import { Notification } from "./components/Notification";
import { NotFound } from "./pages/NotFound";
import { Nav } from "./components/Nav";
import { Responses } from "./pages/Responses";
import { Forms } from "./pages/Forms";
import { Home } from "./pages/Home";

function App() {
  return (
    <div data-testid="app">
      <Notification />
      <Suspense fallback={<Loading />}>
        <BrowserRouter>
          <div className="flex flex-row">
            <Nav />
            <div className="flex-1">
              <Switch>
                <Route exact path="/responses" component={Responses} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/forms" component={Forms} />
                <Route exact path="/404" component={NotFound} />
                <Redirect exact path="/" to="/responses" />
                <Redirect to="/404" />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
