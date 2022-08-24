import { Action, InitialState } from "../types/types";

export default function reducer(state: InitialState, action: Action) {
  const { type, payload } = action;
  switch (type) {
    case "UPDATE_AGE":
      return { ...state, age: state.age + payload };
    default:
      return state;
  }
}
