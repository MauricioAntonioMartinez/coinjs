import React from "react";
import { Route, Switch } from "react-router-dom";
import { BackButton } from "./components/BackButton";
import { Home } from "./views/Home";
import { LandingPage } from "./views/LandingPage";
import { Login } from "./views/Login";
import { SignUp } from "./views/SignUp";

const App = () => {
  return (
    <div className="App">
      <div className="main">
        <BackButton />
        <div className="header">
          <h1>Welcome to Coinjs by mcuve.</h1>
        </div>
        <main className="content">
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/login" exact component={Login} />
            <Route path="/home" exact component={Home} />
          </Switch>
        </main>
      </div>
    </div>
  );
};

export default App;
