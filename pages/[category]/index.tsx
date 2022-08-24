import { NextPage } from "next";
import { useUpdateAge } from "../_app";

const Category: NextPage = () => {
  const { state } = useUpdateAge();
  return <div>Hello {state.age}</div>;
};

export default Category;
