import Link from "next/link";
import { useRouter } from "next/router";
import Button from "./Button";
import Search from "./Search";

const Header = () => {
  const router = useRouter();
  const category = router.query.category;

  const activate = {
    movie: category === "movie" ? "opacity-100" : "",
    tv: category === "tv" ? "opacity-100" : "",
    person: category === "person" ? "opacity-100" : "",
  };
  return (
    <div className="container absolute z-10">
      <header className="bg-gradient-to-b from-black via-black flex justify-between items-center text-white">
        <nav className="flex items-center gap-12 h-[100px]">
          <Link
            href="/movie"
            className={
              "opacity-50 hover:opacity-100 hover:scale-110 transition-all " +
              activate.movie
            }
          >
            Movie
          </Link>
          <Link
            href="/tv"
            className={
              "opacity-50 hover:opacity-100 hover:scale-110 transition-all " +
              activate.tv
            }
          >
            Tv
          </Link>
          <Link
            href="/person"
            className={
              "opacity-50 hover:opacity-100 hover:scale-110 transition-all " +
              activate.person
            }
          >
            Person
          </Link>
          <Link
            href="/networks"
            className="opacity-50 hover:opacity-100 hover:scale-110 transition-all"
          >
            Networks
          </Link>
        </nav>
        <div className="flex items-center gap-6">
          <Search />
          <Button label="Sign Up" />
        </div>
      </header>
    </div>
  );
};

export default Header;
