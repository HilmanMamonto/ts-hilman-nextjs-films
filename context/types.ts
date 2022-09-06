export type TDataFilms = {
  page: number;
  scrollTop: number;
  films: any[];
  category: string | string[] | undefined;
};

export type InitialState = {
  globalState: {
    age: number;
    dataFilms: TDataFilms;
  };
};

export type Action = {
  type: string;
  payload: any;
};
