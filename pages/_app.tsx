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
      return { age: state.age + 1 };
    default:
      return state;
  }
}

export const RootContext = createContext({});
const Provider = RootContext.Provider;

function MyApp({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Provider value={{ state, dispatch }}>
      <Component {...pageProps} />
    </Provider>
  );
}

export const useUpdateAge = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return { state, updateAge: () => dispatch({ type: "UPDATE_AGE" }) };
};

export default MyApp;
