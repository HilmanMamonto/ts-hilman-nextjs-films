import { RootContext } from "context";
import { useContext } from "react";

export const useGlobalFilms = () => {
  const { state, dispatch } = useContext(RootContext);
  return {
    DATA_FILMS: state.globalState.dataFilms,
    updateDataFilms: (
      dataFilms: any[],
      category: string | string[] | undefined,
      page: number,
      scrollPos: number
    ) =>
      dispatch({
        type: "UPDATE_DATA_FILMS",
        payload: { page, scrollPos, results: dataFilms, category },
      }),
  };
};
