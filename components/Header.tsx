import Link from "next/link";
import { useRouter } from "next/router";
import Button from "./Button";
import Search from "./Search";
import Image from "next/image";
import { ComponentType, useState } from "react";

type THeader = {
  hasGradent: boolean;
};

const Header: ComponentType<THeader> = ({ hasGradent = false }) => {
  const router = useRouter();
  const { category } = router.query;
  const [menu, setMenu] = useState<boolean>(false);

  const activate = {
    movie: category === "movie" ? "opacity-100" : "opacity-50",
    tv: category === "tv" ? "opacity-100" : "opacity-50",
    person: category === "person" ? "opacity-100" : "opacity-50",
  };

  const showGradient = hasGradent
    ? "from-black via-black bg-gradient-to-b"
    : "";

  const showGradient2 = hasGradent ? "h-[80px]" : "h-[100px]";
  const menuActivate = menu
    ? "opacity-100 visible"
    : "opacity-0 invisible translate-x-[100px]";

  return (
    <div className={"fixed z-20 w-full pr-1 " + showGradient}>
      <div className="relative">
        <div className="container mx-auto">
          <header
            className={
              "px-3 md:px-0 transition-all duration-500 border-none  flex justify-between items-center text-white " +
              showGradient2
            }
          >
            <div className="flex gap-12">
              <Link href="/movie">
                <a className="mr-6 md:mr-0 shrink-0 relative flex justify-center">
                  <Image
                    width={24}
                    height={24}
                    src="/icons/films-logo.svg"
                    alt=""
                  />
                </a>
              </Link>
              <nav className="font-thin hidden md:flex items-center gap-12">
                <Link href="/movie">
                  <a
                    className={
                      "opacity-50 hover:opacity-100 hover:scale-110 transition-all " +
                      activate.movie
                    }
                  >
                    Movie
                  </a>
                </Link>
                <Link href="/tv">
                  <a
                    className={
                      "opacity-50 hover:opacity-100 hover:scale-110 transition-all " +
                      activate.tv
                    }
                  >
                    Tv
                  </a>
                </Link>
                <Link href="/person">
                  <a
                    className={
                      "opacity-50 hover:opacity-100 hover:scale-110 transition-all " +
                      activate.person
                    }
                  >
                    Person
                  </a>
                </Link>
              </nav>
            </div>
            <div className="w-full md:w-fit justify-between md:justify-start flex items-center gap-4 lg:gap-6 ">
              <Search />
              <Button
                onClick={() => ""}
                className="hidden md:block"
                label="Sign Up"
              />
              <button
                onClick={() => setMenu(true)}
                className="shrink-0 w-[24px] flex md:hidden flex-col gap-[6px]"
              >
                <span className="w-full h-[3px] bg-white rounded-[100px]"></span>
                <span className="w-full h-[3px] bg-white rounded-[100px]"></span>
                <span className="w-full h-[3px] bg-white rounded-[100px]"></span>
              </button>
            </div>
          </header>
        </div>
        <div
          className={
            "fixed z-30 top-0 w-screen h-screen bg-black text-white transition-all duration-[1000ms] " +
            menuActivate
          }
        >
          <ul className="flex items-center gap-20 font-thin flex-col h-full py-20">
            <button onClick={() => setMenu(false)}>close</button>
            <button
              onClick={() => {
                setMenu(false);
                router.push("/movie");
              }}
            >
              Movie
            </button>
            <button
              onClick={() => {
                setMenu(false);
                router.push("/tv");
              }}
            >
              Tv
            </button>
            <button
              onClick={() => {
                setMenu(false);
                router.push("/person");
              }}
            >
              Person
            </button>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
