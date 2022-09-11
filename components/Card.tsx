import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { ComponentType } from "react";

type TCard = {
  id: number;
  param?: string | string[];
  title: string;
  rate: number;
  src: string;
};

const Card: ComponentType<TCard> = ({
  id,
  param,
  title = "",
  rate = 0,
  src,
}) => {
  let href: string = "";
  if (param != "person") href = "/" + param + "/details/" + id;
  if (param === "person") href = "/person/details/" + id;
  return (
    <Link href={href}>
      <a>
        <div className="relative overflow-hidden">
          {param != "person" && (
            <span className="bg-white absolute z-[2] rounded-md w-[30px] md:w-[25px] text-center right-3 top-2 opacity-50 text-sm md:text-xs border-1 text-black">
              {rate}
            </span>
          )}
          <div className="relative w-full rounded-[10px] bg-black-500 aspect-[2/3]">
            {src && (
              <Image
                className="rounded-[10px]"
                objectFit="cover"
                layout="fill"
                src={src}
                alt={title}
                quality={param === "person" ? 60 : 100}
              />
            )}
          </div>
          <span className="absolute bottom-0 translate-y-[1px] h-[120px] left-0 w-[110%] bg-gradient-to-t from-black "></span>
        </div>
        <h1 className="text-white abosolute font-thin">{title}</h1>
      </a>
    </Link>
  );
};

export default Card;
