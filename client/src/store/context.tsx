import { createContext, PropsWithChildren, useReducer } from "react";

interface Store {
  currentPage: string;
}

const Context = createContext<Store>({ currentPage: "/" });

function reducer(state: any, action: any) {
  switch (action) {
    case "increment":
      return {};
    case "decrement":
      return {};
    default:
      return {};
  }
}
const intialState = {
  products: [],
  shoppingCart: 0,
};

const Provider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [state, dispatcher] = useReducer(reducer, intialState);

  return (
    <Context.Provider value={{ currentPage: "/" }}>{children}</Context.Provider>
  );
};
