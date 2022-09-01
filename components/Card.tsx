import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

type TCard = {
  id: number;
  param?: string | string[];
  title: string;
  rate: number;
  src: string;
};

const Card = ({ id, param, title = "", rate = 0, src }: TCard) => {
  const router = useRouter();
  let href: string = "";
  if (param != "person") href = "/" + param + "/details/" + id;
  if (param === "person") href = "/person/details/" + id;
  return (
    <Link href={href}>
      <a>
        <div className="relative">
          {param != "person" && (
            <span className="bg-white absolute z-[2] rounded-md w-[30px] md:w-[25px] text-center right-3 top-2 opacity-50 text-sm md:text-xs border-1 text-black">
              {rate}
            </span>
          )}
          <div className="relative w-full rounded-[10px] bg-black-500 aspect-[2/3]">
            <Image
              className="rounded-[10px]"
              objectFit="cover"
              layout="fill"
              src={src}
              alt={title}
            />
          </div>
          <span className="absolute bottom-0 h-[120px] left-0 w-full bg-gradient-to-t from-black "></span>
        </div>
        <h1 className="text-white abosolute font-thin">{title}</h1>
      </a>
    </Link>
  );
};

export default Card;
