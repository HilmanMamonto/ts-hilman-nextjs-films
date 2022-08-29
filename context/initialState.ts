import { InitialState } from "./types";

export const initialState: InitialState = {
  globalState: {
    age: 0,
    dataFilms: { page: 0, scrollPos: 0, results: [] },
  },
};
