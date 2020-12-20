import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MainContext } from "../store/context";
import "../styles/button.css";

interface Props {}

export const LandingPage = (props: Props) => {
  const { dispatcher } = useContext(MainContext);

  return (
    <div className="lading-page-container">
      <blockquote className="quotation">
        “Every informed person needs to know about Bitcoin because it might be
        one of the world’s most important developments.” —Leon Luow, Nobel Peace
        Prize nominee
      </blockquote>
      <div className="button-container">
        <button className="btn outline">
          <Link to="/login">Login</Link>
        </button>
        <button className="btn fill">
          <Link to="/signup">Sign Up</Link>
        </button>
      </div>
    </div>
  );
};
