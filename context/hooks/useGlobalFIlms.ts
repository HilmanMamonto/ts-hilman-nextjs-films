import { RootContext } from "context";
import { TDataFilms } from "context/types";
import { useContext } from "react";

export const useGlobalFilms = () => {
  const { state, dispatch } = useContext(RootContext);
  return {
    DATA_FILMS: state.globalState.dataFilms,
    updateDataFilms: ({ films, category, page, scrollTop }: TDataFilms) =>
      dispatch({
        type: "UPDATE_DATA_FILMS",
        payload: { page, scrollTop, films, category },
      }),
  };
};
