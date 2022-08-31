import { fetchSearch } from "fetch";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const Search = () => {
  const [value, setValue] = useState("");
  const [data, setData] = useState<any[]>([]);
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null!);
  const { category } = router.query;

  const activate =
    data.length > 0
      ? "translate-y-4 visible opacity-100"
      : "invisible opacity-0";

  const handleClick = async () => {
    const result = await fetchSearch<typeof category, string>(category, value);
    setData(result);
  };

  const handleClickOutside = (e) => {
    const { target } = e;
    if (!target.contains(ref.current)) {
      console.log("outside");
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <div className="bg-black-500 rounded-xl flex items-center relative overflow-hidden">
        <span className="absolute bg-white blur-3xl w-[200px] h-[50px] left-0 bottom-[-40px] opacity-10"></span>
        <input
          onChange={(e) => setValue(e.target.value)}
          value={value}
          className="bg-transparent rounded-xl py-2 max-w-[400px] px-4 focus:outline-0"
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
          "absolute z-10 bg-black-500 rounded-xl w-full px-4 py-3 transition-all ease-in-out duration-300 " +
          activate
        }
      >
        {data.length === 0 && (
          <div className="text-center">Opss, Data Not Found!</div>
        )}
        <ul className="flex flex-col gap-4 max-h-[400px] overflow-auto">
          {data.map(({ original_title, poster_path, vote_average, id }, i) => {
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
                  <div className="relative w-full aspect-[2/3]">
                    <Image
                      className="rounded-md"
                      layout="fill"
                      src={src}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-lg">{original_title}</span>
                    <span className="text-sm">Rate : {vote_average}</span>
                  </div>
                </a>
              </Link>
            );
          })}
        </ul>
        <p className="mt-[20px]">Total results : {data.length}</p>
      </div>
    </div>
  );
};

export default Search;
