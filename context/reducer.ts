import { UPDATE_DATA_FILMS } from "./actions";
import { InitialState, Action } from "./types";

export default function reducer(state: InitialState, action: Action) {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_DATA_FILMS:
      return { globalState: { ...state.globalState, dataFilms: payload } };
    default:
      return state;
  }
}
