import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import backIcon from "../assets/back.svg";
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
  if (state.authenticated) return null;

  return showButton ? (
    <>
      <img
        src={backIcon}
        onClick={() => {
          history.goBack();
        }}
        className="back-button"
      />
      {/* {pathName !== "/home" && state.authenticated && (
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
      )} */}
    </>
  ) : null;
};
