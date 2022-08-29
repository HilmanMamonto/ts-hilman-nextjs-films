import { createContext } from "react";
import { initialState } from "./initialState";
import { Action, InitialState } from "./types";

type Dispatch = (action: Action) => void;
type TRootContext = {
  state: InitialState;
  dispatch: Dispatch;
};

export const RootContext = createContext<TRootContext>({
  state: initialState,
  dispatch: () => {},
});

export const Provider = RootContext.Provider;
