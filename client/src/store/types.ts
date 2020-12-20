import { Dispatch } from "react";
import { Action } from "./actions";

export interface State {
  balance: number;
  authenticated: boolean;
}

export interface Store {
  dispatcher: <T extends Action>({}: {
    type: T["type"];
    payload: T["payload"];
  }) => void;
  state: State;
}
