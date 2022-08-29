export type InitialState = {
  globalState: {
    age: number;
    dataFilms: { page: number; scrollPos: number; results: any[] };
  };
};

export type Action = {
  type: string;
  payload: any;
};
