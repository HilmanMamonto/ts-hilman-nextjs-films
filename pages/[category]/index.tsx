import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import { fetchData } from "../../fetch/fetchData";

const Category: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { data } = props;

  return (
    <div>
      <Head>
        <title> Hilman App | Category</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Hello
    </div>
  );
};

export default Category;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const results = await fetchData("movie");
  return { props: { data: results } };
};
