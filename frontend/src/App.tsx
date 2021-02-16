import React, { Suspense } from "react";
import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";
import { Loading } from "./pages/Loading";
import { Notification } from "./components/Notification";
import { NotFound } from "./pages/NotFound";
import { Nav } from "./pages/Nav";

function App() {
    return (
        <div data-testid="app">
            <Notification />
            <Suspense fallback={<Loading />}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/" component={Nav} />
                        <Route exact path="/404" component={NotFound} />
                        <Redirect to="/404" />
                    </Switch>
                </BrowserRouter>
            </Suspense>
        </div>
    );
}

export default App;
