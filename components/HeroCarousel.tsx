import { RootContext } from "context";
import { BASE_IMG_ORIGINAL, BASE_IMG_W500 } from "globalConst";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Button from "./Button";

const HeroCarousel = () => {
  const router = useRouter();
  const { category } = router.query;
  const { state } = useContext(RootContext);

  const [dataFilms, setDataFilms] = useState<any[]>([]);
  const [index, setIndex] = useState<number>(3);

  useEffect(() => {
    if (category !== "person") {
      setDataFilms(state.globalState.dataFilms.films);
    }
  }, [category, state]);

  return (
    <section className="relative text-white h-screen">
      {dataFilms?.map(
        (
          {
            backdrop_path,
            poster_path,
            original_title,
            original_name,
            overview,
            id,
          },
          i
        ) => {
          const title = original_title ? original_title : original_name;
          const imgAs =
            window.innerWidth < 500
              ? BASE_IMG_W500 + poster_path
              : BASE_IMG_ORIGINAL + backdrop_path;

          if (i === index) {
            return (
              <div className="relative" key={i}>
                <div className="relative h-screen w-full">
                  <Image
                    layout="fill"
                    src={imgAs}
                    alt=""
                    quality={100}
                    objectPosition="center"
                    priority
                    objectFit="cover"
                  />
                </div>
                <div className="absolute flex items-center justify-center w-full h-full px-3 md:px-0 z-10 top-0 left-0">
                  <div className="container relative">
                    <h1 className="text-[2rem] md:text-6xl font-bold mb-4 max-w-[270px] md:max-w-full">
                      {title}
                    </h1>
                    <p className="font-thin max-w-[270px] md:max-w-[600px] max-h-[100px] md:max-h-[200px] overflow-auto mb-4">
                      {overview}
                    </p>
                    <Button
                      onClick={() => router.push(category + "/details/" + id)}
                      label="View"
                      variant="secondary"
                    />
                    <button
                      onClick={() => {
                        index < dataFilms.length - 1 ? setIndex(index + 1) : "";
                      }}
                      className="absolute z-10 right-0 inset-y-1/2"
                    >
                      <div className="bg-white flex rounded-full p-2 md:p-5 bg-opacity-10 backdrop-blur-sm">
                        <div className="relative w-[16px] h-[16px] md:w-[20px] md:h-[20px]">
                          <Image
                            layout="fill"
                            src="/icons/arrow-right.svg"
                            alt=""
                          />
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            );
          }
        }
      )}
      <div className="absolute z-[1] h-full  lg:h-[300px] bottom-0 w-full bg-gradient-to-t from-black" />
    </section>
  );
};

export default HeroCarousel;
