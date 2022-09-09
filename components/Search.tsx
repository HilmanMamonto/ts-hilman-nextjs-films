import { fetchSearch } from "fetch";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { MouseEvent, useEffect, useRef, useState } from "react";

const Search = () => {
  const [value, setValue] = useState<string>("");
  const [data, setData] = useState<any[]>([]);
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null!);
  const { category } = router.query;
  const [status, setStatus] = useState<string>("");
  const [isActive, setActive] = useState<boolean>(false);

  const activate = isActive
    ? "translate-y-4 visible opacity-100"
    : "invisible opacity-0";

  const handleClick = async () => {
    if (value === "") {
      setData([]);
      setStatus("blank");
      setActive(true);
      return;
    }
    const result = await fetchSearch(category, value);
    setData(result);
    setStatus("found");
    setActive(true);
  };

  const handleClickOutside = (e: any) => {
    const { target } = e;
    if (!ref.current.contains(target)) {
      setActive(false);
      console.log("outside");
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <div className="bg-black-500 rounded-xl flex items-center relative overflow-hidden backdrop-blur-sm bg-opacity-80">
        <span className="absolute bg-white blur-3xl w-[200px] h-[50px] left-0 bottom-[-40px] opacity-10"></span>
        <input
          onChange={(e) => setValue(e.target.value)}
          value={value}
          className="bg-transparent rounded-xl py-2 w-full px-4 focus:outline-0 font-thin"
          placeholder={"Search " + category}
        ></input>
        <span className="border-l-2 opacity-10 h-[20px]"></span>
        <button
          onClick={handleClick}
          className="flex px-5 h-full items-center opacity-50"
        >
          <Image height={16} width={16} src="/icons/search.svg" alt="" />
        </button>
      </div>
      <div
        className={
          "absolute z-10 bg-black-500 backdrop-blur-sm bg-opacity-80 rounded-xl w-full px-4 py-3 transition-all ease-in-out duration-300 " +
          activate
        }
      >
        {status === "not-found" && (
          <div className="text-center font-thin">Opss, Data Not Found!</div>
        )}
        {status === "blank" && (
          <div className="text-center font-thin">Search blank</div>
        )}
        <ul className="flex flex-col gap-4 max-h-[400px] overflow-auto">
          {data.length > 0 &&
            data.map(({ original_title, poster_path, vote_average, id }, i) => {
              let src = poster_path
                ? "https://image.tmdb.org/t/p/w500" + poster_path
                : "";

              return (
                <Link
                  key={i}
                  href={category + "/details/" + id}
                  className="flex gap-4 items-center"
                >
                  <a>
                    <div className="bg-black rounded-md relative w-full aspect-[2/3]">
                      <Image
                        className="rounded-md"
                        layout="fill"
                        src={src}
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg font-thin">
                        {original_title}
                      </span>
                      <span className="text-sm font-thin">
                        Rate : {vote_average}
                      </span>
                    </div>
                  </a>
                </Link>
              );
            })}
        </ul>
        <p className="mt-[20px] font-thin">Total results : {data.length}</p>
      </div>
    </div>
  );
};

export default Search;
