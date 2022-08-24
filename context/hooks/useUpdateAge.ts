import { useContext } from "react";
import { RootContext } from "..";

export const useUpdateAge = () => {
  const { state, dispatch } = useContext(RootContext);
  return {
    age: state.age,
    updateAge: (payload: number = 1) =>
      dispatch({ type: "UPDATE_AGE", payload }),
  };
};
