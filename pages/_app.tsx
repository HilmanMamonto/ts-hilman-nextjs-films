import type { AppProps } from "next/app";
import { createContext, useReducer } from "react";

type InitialState = {
  age: number;
};

type Action = {
  type: string;
};

const initialState: InitialState = {
  age: 0,
};

function reducer(state: InitialState, action: Action) {
  switch (action.type) {
    case "UPDATE_AGE":
      return { age: state.age };
    default:
      return state;
  }
}

const RootContext = createContext({});
const Provider = RootContext.Provider;

function MyApp({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Provider value={{ state, dispatch }}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
