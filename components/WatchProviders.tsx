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
      <div className="flex justify-center gap-5">
        {data.map(({ logo_path }, i) => {
          return (
            <Link
              href="/"
              className="relative w-fit p-10 rounded-3xl bg-white bg-opacity-5 shadow-lg flex flex-col items-center justify-center"
              key={i}
            >
              <Image layout="fill" src={BASE_IMG_W500 + logo_path} alt="" />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default WatchProviders;
