import React, { Suspense } from "react";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import { Loading } from "./components/Loading";
import { Notification } from "./components/Notification";
import { Home } from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Notification />
      <Suspense fallback={<Loading />}>
        <BrowserRouter>
          <Route exact path="/" component={Home} />
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
