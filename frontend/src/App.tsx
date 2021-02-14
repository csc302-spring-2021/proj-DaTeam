import React, { Suspense } from "react";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import { Loading } from "./pages/Loading";
import { Notification } from "./components/Notification";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Responses } from "./pages/Responses";

function App() {
  return (
    <div className="App">
      <Notification />
      <Suspense fallback={<Loading />}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/responses" component={Responses} />
            <Route exact path="/404" component={NotFound} />
            <Redirect to="/404" />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
