import { createContext } from "react";
import { Action, InitialState } from "./types/types";

export const initialState: InitialState = {
  age: 0,
};
type Dispatch = (action: Action) => void;
export const RootContext = createContext<{
  state: InitialState;
  dispatch: Dispatch;
}>({ state: initialState, dispatch: () => {} });

export const Provider = RootContext.Provider;
