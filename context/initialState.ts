import { InitialState } from "./types";

export const initialState: InitialState = {
  globalState: {
    age: 0,
    dataFilms: { page: 1, scrollTop: 0, films: [], category: "" },
  },
};
