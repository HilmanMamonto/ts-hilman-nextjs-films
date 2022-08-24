import type { AppProps } from "next/app";
import { createContext, useContext, useReducer } from "react";
import "../styles/globals.css";

type InitialState = {
  age: number;
};

type Action = {
  type: string;
  payload: any;
};

const initialState: InitialState = {
  age: 0,
};

function reducer(state: InitialState, action: Action) {
  const { type, payload } = action;
  switch (type) {
    case "UPDATE_AGE":
      return { ...state, age: state.age + payload };
    default:
      return state;
  }
}

type Dispatch = (action: Action) => void;

export const RootContext = createContext<{
  state: InitialState;
  dispatch: Dispatch;
}>({ state: initialState, dispatch: () => {} });

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
  const { state, dispatch } = useContext(RootContext);
  return {
    state,
    updateAge: (payload: number = 1) =>
      dispatch({ type: "UPDATE_AGE", payload }),
  };
};

export default MyApp;
