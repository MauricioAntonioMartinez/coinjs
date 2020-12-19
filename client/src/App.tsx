import React from "react";
import { Switch, Route } from "react-router-dom";
import { Login } from "./views/Login";
import "./styles/header.css";
import { SignUp } from "./views/SignUp";
import { LandingPage } from "./views/LandingPage";

const App = () => {
  return (
    <div className="App">
      <div className="main">
        <div className="header">
          <h1>Welcome to Coinjs by mcuve.</h1>
        </div>
        <main className="content">
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/login" exact component={Login} />
          </Switch>
        </main>
      </div>
    </div>
  );
};

export default App;
