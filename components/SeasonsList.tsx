import { ComponentType } from "react";
import Image from "next/image";
import { BASE_IMG_W500 } from "globalConst";

type TSeasonsList = {
  data: any[];
};

const SeasonsList: ComponentType<TSeasonsList> = ({ data }) => {
  const gridCols =
    data.length >= 4 ? "grid-cols-4" : "grid-cols-" + (data.length + 1);
  return (
    <div className="flex items-center flex-col mb-20">
      <span className="text-3xl mb-4">Seasons</span>
      <div className={"grid gap-x-3 gap-y-4 " + gridCols}>
        {data.map(({ name, poster_path }, i) => {
          const src = poster_path ? BASE_IMG_W500 + poster_path : "";
          if (!src) return;
          return (
            <div className="w-fit" key={i}>
              <div className="relative">
                <div className="bg-black-500 rounded-t-lg relative w-[200px] h-full aspect-[2/3]">
                  <Image
                    layout="fill"
                    className="rounded-t-lg"
                    src={src}
                    alt={name}
                  />
                </div>
                <span className="bg-gradient-to-t from-black absolute bottom-0 left-0 h-[120px] w-full" />
              </div>
              <span>{name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default SeasonsList;
