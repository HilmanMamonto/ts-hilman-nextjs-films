import type { AppProps } from "next/app";
import { useReducer } from "react";
import { initialState, Provider } from "../context";
import reducer from "../context/reducer/reducer";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Provider value={{ state, dispatch }}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
