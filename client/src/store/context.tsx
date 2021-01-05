import {
  createContext,
  PropsWithChildren,
  useContext,
  useReducer,
} from "react";
import { Action, Actions } from "./actions";
import { State, Store } from "./types";

const initialState = {
  balance: 0.0,
  authenticated: false,
  username: "",
};

export const MainContext = createContext<Store>({
  state: initialState,
  dispatcher: () => {},
});

function reducer<T extends Action>(state: State, action: T) {
  switch (action.type) {
    case Actions.AUTHENTICATED:
      return {
        balance: action.payload.balance,
        authenticated: true,
        username: action.payload.username,
      };

    case Actions.CHANGE_BALANCE:
      return {
        ...state,
        balance: action.payload.balance,
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
