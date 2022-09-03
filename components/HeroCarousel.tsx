import { RootContext } from "context";
import { BASE_IMG_ORIGINAL } from "globalConst";
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
      setDataFilms(state.globalState.dataFilms.results);
    }
  }, [category, state]);

  return (
    <section className="relative text-white h-screen">
      {dataFilms?.map(
        ({ backdrop_path, original_title, original_name, overview, id }, i) => {
          const title = original_title ? original_title : original_name;
          if (i === index) {
            return (
              <div className="relative" key={i}>
                <div className="relative h-screen">
                  <Image
                    layout="fill"
                    src={BASE_IMG_ORIGINAL + backdrop_path}
                    alt=""
                    unoptimized
                    quality={100}
                  />
                </div>
                <div className="absolute flex items-center justify-center w-full h-full z-10 top-0 left-0">
                  <div className="container">
                    <h1 className="text-6xl font-bold mb-4">{title}</h1>
                    <p className="font-thin max-w-[600px] max-h-[200px] overflow-auto mb-4">
                      {overview}
                    </p>
                    <Button
                      onClick={() => router.push(category + "/details/" + id)}
                      label="View"
                      variant="secondary"
                    />
                  </div>
                </div>
              </div>
            );
          }
        }
      )}
      <div className="absolute z-[1] h-[300px] bottom-0 w-full bg-gradient-to-t from-black" />
      <button
        onClick={() => {
          index < dataFilms.length ? setIndex(index + 1) : "";
        }}
        className="absolute z-10 right-0 inset-y-1/2 mr-8"
      >
        <div className="bg-white flex rounded-full p-5 bg-opacity-10 backdrop-blur-sm">
          <Image width={26} height={26} src="/icons/arrow-right.svg" alt="" />
        </div>
      </button>
    </section>
  );
};

export default HeroCarousel;
