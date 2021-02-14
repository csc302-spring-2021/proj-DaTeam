import { Switch, Redirect, Route, useHistory } from "react-router-dom";
import { Responses } from "../Responses";
import { Forms } from "../Forms";
import { Home } from "../Home";

function Nav() {
    const history = useHistory();

    return (
        <div className="App">
            <div className="flex">
                <div className="flex-shrink-0 flex-col w-16 h-screen bg-black">
                    <svg className="hover:text-purple-500 text-white m-4 py-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <svg onClick={() => { history.push("/home") }} className="hover:text-purple-500 text-white m-4 py-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <svg onClick={() => { history.push("/responses") }} className="hover:text-purple-500 text-white m-4 py-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                    <svg onClick={() => { history.push("/forms") }} className="hover:text-purple-500 text-white m-4 py-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                </div>
                <div className="flex-shrink-0">
                    <Switch>
                        <Route exact path="/responses" component={Responses} />
                        <Route exact path="/home" component={Home} />
                        <Route exact path="/forms" component={Forms} />
                        <Route exact path="/">
                            <Redirect to="/responses" /> // Change to home later
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    );
}

export default Nav;
