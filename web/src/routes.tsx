import React from "react";

import { BrowserRouter, Route } from "react-router-dom";

import LoginPage from "./pages/login";
import register from "./pages/register";
import dashboard from "./pages/dashboard";
import newevent from "./pages/newevent";

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={LoginPage} />
            <Route path="/register" component={register} />
            <Route path="/dashboard" component={dashboard} />
            <Route path="/newevent" component={newevent} />
        </BrowserRouter>
    );
}

export default Routes;
