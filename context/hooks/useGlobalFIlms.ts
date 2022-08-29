import { RootContext } from "context";
import { useContext } from "react";

export const useGlobalFilms = () => {
  const { state, dispatch } = useContext(RootContext);
  return {
    DATA_FILMS: state.globalState.dataFilms,
    updateDataFilms: (dataFilms: any[], page: number, scrollPos: number) =>
      dispatch({
        type: "UPDATE_DATA_FILMS",
        payload: { page, scrollPos, results: dataFilms },
      }),
  };
};
