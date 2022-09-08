/* eslint-disable react-hooks/exhaustive-deps */
import { fetchCredit } from "fetch/fetchCredit";
import { ComponentType, useEffect, useState } from "react";
import Image from "next/image";
import { BASE_IMG_W500 } from "globalConst";
import Link from "next/link";
import Button from "./Button";

type TCredit = {
  id: number;
  category: string | string[] | undefined;
};
type TStateCredit = { cast: any[]; crew: any[] };

const Credit: ComponentType<TCredit> = ({ id, category }) => {
  const [credit, setCredit] = useState<TStateCredit>({ cast: [], crew: [] });
  const [status, setStatus] = useState<string>("loading");
  const [seeAll, setSeeAll] = useState<{ cast: boolean; crew: boolean }>({
    cast: false,
    crew: false,
  });

  const intersection = () => {
    const creditDOM = document.querySelector("#credit") as HTMLElement;
    const observer = new IntersectionObserver(
      (entry) => {
        if (entry[0].isIntersecting) {
          setTimeout(() => {
            fetchCredit(id, category)
              .then((value) => {
                setCredit(value);
                if (value.cast.length <= 8) {
                  setSeeAll({ ...seeAll, cast: true });
                  console.log("lest than");
                }
                if (value.crew.length <= 8) {
                  setSeeAll({ ...seeAll, crew: true });
                }
                setStatus("success");
              })
              .catch(() => setStatus("error"));
            observer.unobserve(creditDOM);
          }, 2000);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(creditDOM);
  };

  useEffect(() => {
    intersection();
  }, []);

  const { cast, crew } = credit;

  if (status === "loading") {
    return (
      <section
        id="credit"
        className="text-white container px-3 lg:px-20 mx-auto animate-pulse"
      >
        <section className="mb-20">
          <h1 className="text-2xl mb-5">Loading...</h1>
          <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-5 md:gap-y-10 gap-x-5">
            {[0, 1, 2, 3, 4, 5, 6, 7].map(({}, i) => {
              return (
                <a key={i} className="flex gap-6 items-center cursor-wait">
                  <div className="relative bg-black-500  rounded-xl w-[100px] shrink-0 aspect-square"></div>
                  <div className="flex flex-col gap-1 w-full">
                    <div className="w-full h-[20px] rounded-sm bg-black-500"></div>
                    <div className="w-[80%] h-[16px] rounded-sm bg-black-500"></div>
                  </div>
                </a>
              );
            })}
          </div>
        </section>
      </section>
    );
  }

  if (status === "error") {
    return (
      <section
        id="credit"
        className="text-white  container px-3 lg:px-20 mx-auto mb-20"
      >
        <div className="w-full py-10 flex justify-center items-center border border-black-500 font-thin">
          Cast & Crew NOT FOUND
        </div>
      </section>
    );
  }

  return (
    <section
      id="credit"
      className="text-white  container px-3 lg:px-20 mx-auto"
    >
      {cast.length > 0 && (
        <section className="mb-20">
          <h1 className="text-2xl mb-5">Cast</h1>
          <div className="relative flex justify-center">
            <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-5 md:gap-y-10 gap-x-5">
              {cast.map(({ profile_path, character, name, id }, i) => {
                const index = seeAll.cast ? cast.length : 8;
                if (i < index)
                  return (
                    <Link key={i} href={"/person/details/" + id}>
                      <a className="flex gap-6 items-center">
                        <div className="relative bg-black-500 aspect-square rounded-xl w-[100px] shrink-0">
                          {profile_path && (
                            <Image
                              objectPosition="center"
                              className="rounded-xl"
                              layout="fill"
                              src={BASE_IMG_W500 + profile_path}
                              alt=""
                            />
                          )}
                        </div>
                        <div className="flex flex-col gap-1">
                          <span>{character}</span>
                          <span className="font-thin">{name}</span>
                        </div>
                      </a>
                    </Link>
                  );
              })}
            </div>
            {!seeAll.cast && (
              <>
                <div className="absolute w-full bg-gradient-to-t h-[200px] from-black bottom-0" />
                <span className="absolute bottom-0">
                  <Button
                    label="see all"
                    variant="secondary"
                    onClick={() => setSeeAll({ ...seeAll, cast: true })}
                    className="shadow-xl"
                  />
                </span>
              </>
            )}
          </div>
        </section>
      )}
      {crew.length > 0 && (
        <section className="mb-20">
          <h1 className="text-2xl mb-5">Crew</h1>
          <div className="relative flex justify-center">
            <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-5 md:gap-y-10 gap-x-5">
              {crew.map(({ profile_path, job, name, id }, i) => {
                const index = seeAll.crew ? crew.length : 8;
                if (i < index)
                  return (
                    <Link key={i} href={"/person/details/" + id}>
                      <a className="flex gap-6 items-center">
                        <div className="relative bg-black-500 aspect-square rounded-xl w-[100px]">
                          {profile_path && (
                            <Image
                              objectPosition="center"
                              className="rounded-xl"
                              layout="fill"
                              src={BASE_IMG_W500 + profile_path}
                              alt=""
                            />
                          )}
                        </div>
                        <div className="flex flex-col gap-1">
                          <span>{name}</span>
                          <span className="font-thin">{job}</span>
                        </div>
                      </a>
                    </Link>
                  );
              })}
            </div>
            {!seeAll.crew && (
              <>
                <div className="absolute w-full bg-gradient-to-t h-[200px] from-black bottom-0" />
                <span className="absolute bottom-0">
                  <Button
                    label="see all"
                    variant="secondary"
                    onClick={() => setSeeAll({ ...seeAll, crew: true })}
                    className="shadow-xl"
                  />
                </span>
              </>
            )}
          </div>
        </section>
      )}
    </section>
  );
};

export default Credit;
