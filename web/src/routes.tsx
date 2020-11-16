import React from "react";

import { BrowserRouter, Route } from "react-router-dom";

import LoginPage from "./pages/login";
import register from "./pages/register";
import dashboard from "./pages/dashboard";
import newevent from "./pages/newevent";
import funcionarios from "./pages/funcionarios";
import exames from "./pages/exames";
import conta from "./pages/conta";

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={LoginPage} />
            <Route path="/register" component={register} />
            <Route path="/dashboard" component={dashboard} />
            <Route path="/funcionarios" component={funcionarios} />
            <Route path="/exames" component={exames} />
            <Route path="/conta" component={conta} />
            <Route path="/newevent" component={newevent} />
        </BrowserRouter>
    );
}

export default Routes;
