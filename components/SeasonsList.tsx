import { ComponentType } from "react";
import Image from "next/image";
import { BASE_IMG_W500 } from "globalConst";
import Link from "next/link";
import { useRouter } from "next/router";

type TSeasonsList = {
  data: any[];
};

const SeasonsList: ComponentType<TSeasonsList> = ({ data }) => {
  const router = useRouter();
  const { category, id } = router.query;
  const gridCols =
    data.length >= 4 ? "md:grid-cols-4" : "md:grid-cols-" + data.length;

  const href = "/" + category + "/details/" + id + "/season";

  console.log(data);

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
          if (!src) return;

          const season = name === "Specials" ? "specials" : season_number;
          return (
            <Link href={href + "/" + season} className="w-fit" key={i}>
              <a>
                <div className="relative">
                  <div className="bg-black-500 rounded-t-lg relative w-full md:w-[200px] h-full aspect-[2/3]">
                    <Image
                      layout="fill"
                      className="rounded-t-lg"
                      src={src}
                      alt={name}
                    />
                  </div>
                  <span className="bg-gradient-to-t from-black absolute bottom-0 left-0 h-[120px] w-full hover:h-full" />
                </div>
                <span>{name}</span>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default SeasonsList;
