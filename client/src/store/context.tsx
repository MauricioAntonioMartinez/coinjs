import { createContext, Dispatch, PropsWithChildren, useReducer } from "react";

interface State {
  currentPage: string;
}

interface Store {
  dispatcher: Dispatch<Action>;
  state: State;
}

interface Action {
  type: string;
  payload: any;
}

export const MainContext = createContext<Store>({
  state: { currentPage: "" },
  dispatcher: () => {},
});

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "changeCurrentPage":
      return {
        ...state,
        currentPage: action.payload.currentPage,
      };
    default:
      return state;
  }
}
const initialState = {
  currentPage: "/",
};

export const Provider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [state, dispatcher] = useReducer(reducer, initialState);

  return (
    <MainContext.Provider value={{ state, dispatcher }}>
      {children}
    </MainContext.Provider>
  );
};
