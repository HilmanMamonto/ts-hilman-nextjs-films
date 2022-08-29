import Link from "next/link";
import { useRouter } from "next/router";
import Button from "./Button";
import Search from "./Search";

const Header = () => {
  const router = useRouter();
  const { category } = router.query;

  const activate = {
    movie: category === "movie" ? "opacity-100" : "opacity-50",
    tv: category === "tv" ? "opacity-100" : "opacity-50",
    person: category === "person" ? "opacity-100" : "opacity-50",
  };
  return (
    <div className="container absolute z-10">
      <header className="px-3 md:px-0 h-[100px] bg-gradient-to-b from-black via-black flex justify-between items-center text-white">
        <nav className="hidden md:flex items-center gap-12">
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
        <div className="flex items-center gap-6">
          <Search />
          <Button className="hidden md:block" label="Sign Up" />
        </div>
      </header>
    </div>
  );
};

export default Header;
