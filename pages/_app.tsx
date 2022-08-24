import "../styles/globals.css";
import type { AppProps } from "next/app";
import { createContext, useReducer } from "react";

interface InitialState {
  name: string;
  age: number;
}

const initialState = {
  name: "",
  age: 0,
};

export const RootContext = createContext({});
const Provider = RootContext.Provider;

function reducer(action: any, state: InitialState) {
  switch (action.type) {
    case "UPDATE_AGE":
      return { ...state, age: state.age + 1 };
    default:
      break;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Provider value={{ state, dispatch }}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
