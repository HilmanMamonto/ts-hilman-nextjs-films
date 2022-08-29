import Image from "next/image";
import Link from "next/link";
import { ComponentType } from "react";
import { BASE_IMG_W500 } from "../globalConst";

type TWatchProviders = {
  data: any[];
  title: string;
};

const WatchProviders: ComponentType<TWatchProviders> = ({
  data,
  title = "title",
}) => {
  return (
    <div className="md:container mx-auto">
      <h1 className="text-lg text-center mb-5">{title}</h1>
      <div className="flex flex-col md:flex-row items-center justify-center gap-5">
        {data.map(({ logo_path }, i) => {
          return (
            <div key={i}>
              <div className="bg-black-500 w-fit p-4 rounded-3xl drop-shadow">
                <a className="relative w-[50px] aspect-square bg-opacity-5 shadow-lg flex flex-col items-center justify-center">
                  <Image
                    className="rounded-xl"
                    layout="fill"
                    src={BASE_IMG_W500 + logo_path}
                    alt=""
                  />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WatchProviders;
