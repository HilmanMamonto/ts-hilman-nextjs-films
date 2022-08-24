import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchData } from "../fetch/fetchData";

const Search = () => {
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);

  const activate = value
    ? "translate-y-4 visible opacity-100"
    : "invisible opacity-0";

  useEffect(() => {
    fetchData("movie").then((res) => setData(res));
  }, [value]);

  return (
    <div className="relative">
      <div className="bg-black-500 rounded-xl flex items-center relative overflow-hidden">
        <span className="absolute bg-white blur-3xl w-[200px] h-[50px] left-0 bottom-[-40px] opacity-10"></span>
        <input
          onChange={(e) => setValue(e.target.value)}
          value={value}
          className="bg-transparent rounded-xl py-2 w-[400px] px-4 focus:outline-0"
          placeholder="Search Movies"
        ></input>
        <span className="border-l-2 opacity-10 h-[20px]"></span>
        <button className="px-5 h-full items-center opacity-50">
          <Image className="w-[16px]" src="/icons/search.svg" alt=""></Image>
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
        <div className="flex flex-col gap-4 max-h-[400px] overflow-auto">
          {data.map(({ original_title, poster_path, vote_average, id }, i) => {
            let src = poster_path
              ? "https://image.tmdb.org/t/p/w500" + poster_path
              : "";

            return (
              <Link
                key={i}
                href={"/view/" + id}
                className="flex gap-4 items-center"
              >
                <Image className="w-[100px] rounded-md" src={src} alt="" />
                <div className="flex flex-col">
                  <span className="text-lg">{original_title}</span>
                  <span className="text-sm">Rate : {vote_average}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Search;
