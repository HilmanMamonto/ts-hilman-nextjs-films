import type { NextPage } from "next";
import Head from "next/head";
import { useUpdateAge } from "../_app";

const Category: NextPage = () => {
  const { state } = useUpdateAge();
  return (
    <div>
      <Head>
        <title> Hilman App | Category</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Hello {state.age}
    </div>
  );
};

export default Category;
