import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import backIcon from "../assets/back.svg";
import "../styles/button.css";

export const BackButton = () => {
  const history = useHistory();
  const [showButton, setShowButton] = useState(false);

  history.listen((listener) => {
    setShowButton(listener.pathname !== "/");
  });

  return showButton ? (
    <img
      src={backIcon}
      onClick={() => {
        history.goBack();
      }}
      className="back-button"
    />
  ) : null;
};
