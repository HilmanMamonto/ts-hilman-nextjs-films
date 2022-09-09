import { ComponentType } from "react";
import Image from "next/image";
import { BASE_IMG_W500 } from "globalConst";
import Link from "next/link";
import { useRouter } from "next/router";

type TSeasonsList = {
  data: any[];
  title: string;
};

const SeasonsList: ComponentType<TSeasonsList> = ({ data, title = "" }) => {
  const router = useRouter();
  const { category, id } = router.query;
  let gridCols = "";
  if (data.length >= 4) gridCols = "grid-cols-2 md:grid-cols-4";
  if (data.length < 4) gridCols = "grid-cols-2 md:grid-cols-" + data.length;
  if (data.length === 1) gridCols = "grid-cols-1";

  const href = "/" + category + "/details/" + id + "/season";
  const renameTitle = title.toLowerCase().split(" ").join("-");

  return (
    <div className="flex items-center flex-col pb-20">
      <span className="text-3xl mb-4">Seasons</span>
      <div
        className={
          "w-full md:w-fit px-3 md:px-0 grid gap-x-3 gap-y-4 " + gridCols
        }
      >
        {data.map(({ name, poster_path, season_number }, i) => {
          const src = poster_path ? BASE_IMG_W500 + poster_path : "";
          const season = name === "Specials" ? "specials" : season_number;
          return (
            <Link
              href={href + "/" + renameTitle + "/" + season}
              className="w-fit"
              key={i}
            >
              <a>
                <div className="relative">
                  <div className="bg-black-500 rounded-t-lg w-full md:w-[200px] h-full aspect-[2/3] relative">
                    <Image
                      layout="fill"
                      className="rounded-t-lg"
                      src={src}
                      alt=""
                    />
                  </div>
                  <span className="bg-gradient-to-t from-black absolute bottom-0 left-0 h-[120px] w-full hover:h-full" />
                </div>
                <span className="font-thin">{name}</span>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default SeasonsList;
