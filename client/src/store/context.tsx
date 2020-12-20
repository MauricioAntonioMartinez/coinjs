import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";
import { Action, Actions, CHANGE_BALANCE } from "./actions";
import { State, Store } from "./types";

const initialState = {
  balance: 0.0,
  authenticated: false,
};

export const MainContext = createContext<Store>({
  state: initialState,
  dispatcher: () => {},
});

function reducer<T extends Action>(state: State, action: T) {
  switch (action.type) {
    case Actions.CHANGE_BALANCE:
      return {
        ...state,
        balance: action.payload.balance,
        authenticated: true,
      };

    case Actions.LOGOUT:
      return {
        ...state,
        balance: 0.0,
        authenticated: false,
      };

    default:
      return state;
  }
}

export const Provider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [state, dispatcher] = useReducer(reducer, initialState);

  return (
    <MainContext.Provider value={{ state, dispatcher }}>
      {children}
    </MainContext.Provider>
  );
};

export const useStore = () => useContext(MainContext);
