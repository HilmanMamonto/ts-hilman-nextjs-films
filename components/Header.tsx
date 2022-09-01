import Link from "next/link";
import { useRouter } from "next/router";
import Button from "./Button";
import Search from "./Search";
import Image from "next/image";

const Header = () => {
  const router = useRouter();
  const { category } = router.query;

  const activate = {
    movie: category === "movie" ? "opacity-100" : "opacity-50",
    tv: category === "tv" ? "opacity-100" : "opacity-50",
    person: category === "person" ? "opacity-100" : "opacity-50",
  };
  return (
    <div className="container fixed z-10">
      <header className="px-3 md:px-0 h-[100px] bg-gradient-to-b from-black via-black flex justify-between items-center text-white">
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
          <Button className="hidden md:block" label="Sign Up" />
          <button className="shrink-0 w-[24px] flex md:hidden flex-col gap-[6px]">
            <label className="w-full h-[3px] bg-white rounded-[100px]"></label>
            <label className="w-full h-[3px] bg-white rounded-[100px]"></label>
            <label className="w-full h-[3px] bg-white rounded-[100px]"></label>
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
