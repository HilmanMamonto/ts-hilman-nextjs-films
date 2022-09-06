/* eslint-disable react-hooks/exhaustive-deps */
import { fetchCredit } from "fetch/fetchCredit";
import { ComponentType, useEffect, useState } from "react";
import Image from "next/image";
import { BASE_IMG_W500 } from "globalConst";
import Link from "next/link";

type TCredit = {
  id: number;
  category: string | string[] | undefined;
};
type TStateCredit = { cast: any[]; crew: any[] };

const Credit: ComponentType<TCredit> = ({ id, category }) => {
  const [credit, setCredit] = useState<TStateCredit>({ cast: [], crew: [] });

  useEffect(() => {
    fetchCredit(id, category).then((value) => setCredit(value));
  }, []);

  const { cast, crew } = credit;

  console.log("cast ", cast);
  console.log("crew ", crew);

  return (
    <section className="text-white  container px-3 lg:px-20 mx-auto">
      <section className="mb-20">
        <h1 className="text-2xl mb-5">Cast</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-5 md:gap-y-10 gap-x-5">
          {cast.map(({ profile_path, character, name, id }, i) => {
            return (
              <Link key={i} href={"/person/details/" + id}>
                <a className="flex gap-6 items-center">
                  <div className="relative bg-black-500 aspect-square rounded-xl w-[100px] mb-2">
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
      </section>
      <section className="mb-20">
        <h1 className="text-2xl mb-5">Crew</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-5 md:gap-y-10 gap-x-5">
          {crew.map(({ profile_path, job, name, id }, i) => {
            return (
              <Link key={i} href={"/person/details/" + id}>
                <a className="flex gap-6 items-center">
                  <div className="relative bg-black-500 aspect-square rounded-xl w-[100px] mb-2">
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
      </section>
    </section>
  );
};

export default Credit;
