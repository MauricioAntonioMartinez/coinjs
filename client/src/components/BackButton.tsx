import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import backIcon from "../assets/back.svg";
import { Actions, LOGOUT } from "../store/actions";
import { useStore } from "../store/context";
import "../styles/button.css";

export const BackButton = () => {
  const history = useHistory();
  const [showButton, setShowButton] = useState(false);
  const [pathName, setPathName] = useState("/");
  const { state, dispatcher } = useStore();
  history.listen((listener) => {
    setPathName(listener.pathname);
    setShowButton(listener.pathname !== "/");
  });

  // if (!state.authenticated && ['/login','/signup','/'].) return <Redirect to="/" />;

  return showButton ? (
    <>
      {pathName !== "/home" && state.authenticated && (
        <img
          src={backIcon}
          onClick={() => {
            history.goBack();
          }}
          className="back-button"
        />
      )}
      {state.authenticated && (
        <div
          className="back-button"
          onClick={() => {
            dispatcher<LOGOUT>({ type: Actions.LOGOUT, payload: null });
            history.push("/");
          }}
        >
          Log Out
        </div>
      )}
    </>
  ) : null;
};
