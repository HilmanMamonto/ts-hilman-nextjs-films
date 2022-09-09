/* eslint-disable react-hooks/exhaustive-deps */
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Card from "components/Card";
import Header from "components/Header";
import { fetchData } from "fetch/fetchData";
import { BASE_IMG_ORIGINAL } from "globalConst";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useGlobalFilms } from "context/hooks";
import Image from "next/image";
import HeroCarousel from "components/HeroCarousel";

type TCategory = {
  films: any[];
};

type TFilms = {
  original_title: string;
  original_name: string;
  name: string;
  poster_path: string;
  vote_average: number;
  profile_path: string;
  id: number;
};

const Category: NextPage<TCategory> = ({ films }) => {
  const router = useRouter();
  const { category } = router.query;

  const { DATA_FILMS, updateDataFilms } = useGlobalFilms();
  const [isIntersecting, setIntersecting] = useState<boolean>(false);
  const [innerHeight, setInnerHeight] = useState<number>(0);

  const handleScroll = (e: Event) => {
    const { scrollTop } = e.target as Element;
    updateDataFilms({ ...DATA_FILMS, category, scrollTop });
  };

  useEffect(() => {
    const main = document.querySelector("#category-main") as HTMLElement;
    main.addEventListener("scroll", handleScroll);
    return () => main.removeEventListener("scroll", handleScroll);
  });

  useEffect(() => {
    const main = document.querySelector("#category-main") as HTMLElement;
    main.scrollTo(0, 0);
    if (category != DATA_FILMS.category) {
      fetchData(category, 1).then((value) => {
        updateDataFilms({
          ...DATA_FILMS,
          films: value,
          category,
          scrollTop: 0,
        });
      });
    }
  }, [category]);

  useEffect(() => {
    const initialFilms = DATA_FILMS.films.length > 0 ? DATA_FILMS.films : films;
    updateDataFilms({ ...DATA_FILMS, films: initialFilms });
    const main = document.querySelector("#category-main") as HTMLElement;
    main.scrollTo(0, DATA_FILMS.scrollTop);
    setInnerHeight(window.innerHeight);
    const observer = new IntersectionObserver(
      (entry) => {
        if (entry[0].isIntersecting) setIntersecting(true);
      },
      { threshold: 0.5 }
    );
    const loading = document.querySelector(".loading") as HTMLElement;
    observer.observe(loading);
  }, []);

  useEffect(() => {
    const fetch = async () => {
      setIntersecting(false);
      const results: any[] = await fetchData(category, DATA_FILMS.page + 1);
      updateDataFilms({
        ...DATA_FILMS,
        films: [...DATA_FILMS.films, ...results],
        page: DATA_FILMS.page + 1,
      });
    };
    if (isIntersecting) fetch();
  }, [isIntersecting]);

  const trasnlateY =
    category != "person" ? "translate-y-[-100px]" : "mt-[120px]";

  return (
    <main
      id="category-main"
      className="bg-black h-full overflow-y-auto relative min-h-screen"
    >
      <Head>
        <title>
          Hilman App | {category} with {DATA_FILMS.films.length} results
        </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <span className="fixed w-full h-screen">
        <span className="absolute w-[200px] h-[200px] bottom-0 bg-black-500 right-0 blur-3xl opacity-10"></span>
        <span className="absolute w-[150px] h-[150px] bottom-0 bg-red left-0 blur-3xl opacity-20"></span>
        <span className="absolute w-[150px] h-[150px] top-40 bg-red right-0 blur-3xl opacity-20"></span>
      </span>
      <Header hasGradent={DATA_FILMS.scrollTop > innerHeight + 10} />
      {category != "person" && <HeroCarousel />}
      <section className="absolute z-10 min-h-screen w-full">
        <div className="w-full container px-3 md:px-0 mx-auto">
          <div
            className={
              "grid grid-cols-2 md:grid-cols-5 sm:grid-cols-3 gap-x-4 gap-y-6 " +
              trasnlateY
            }
          >
            {DATA_FILMS.films.map(
              (
                {
                  original_title,
                  original_name,
                  name,
                  poster_path,
                  vote_average,
                  profile_path,
                  id,
                }: TFilms,
                i
              ) => {
                let src: string = "";
                if (poster_path) src = BASE_IMG_ORIGINAL + poster_path;
                if (profile_path) src = BASE_IMG_ORIGINAL + profile_path;
                let title: string = "";
                if (original_title) title = original_title;
                if (original_name) title = original_name;
                if (name) title = name;
                return (
                  <Card
                    key={i}
                    param={category}
                    id={id}
                    title={title}
                    src={src}
                    rate={vote_average}
                  />
                );
              }
            )}
          </div>
        </div>
        <div className="my-20 text-center">
          <Image
            className="animate-spin loading"
            width={32}
            height={32}
            src="/icons/loading.svg"
            alt=""
          />
        </div>
      </section>
    </main>
  );
};

export default Category;

export const getServerSideProps: GetServerSideProps<TCategory> = async (
  ctx
) => {
  const { category } = ctx.query;

  const results: any[] = await fetchData<typeof category>(category);
  return { props: { films: results } };
};
