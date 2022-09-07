/* eslint-disable react-hooks/exhaustive-deps */
import {
  useState,
  useRef,
  useEffect,
  UIEventHandler,
  ComponentType,
} from "react";
import Image from "next/image";
import { useRouter } from "next/router";

type TCarousel = {
  data: any[];
  className: string;
};

const Carousel: ComponentType<TCarousel> = ({ data = [], className }) => {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLUListElement>(null!);
  const refIndicator = useRef<HTMLUListElement>(null!);
  const router = useRouter();

  useEffect(() => {
    // for button next and prev
    if (ref) {
      const video = document.querySelector("#video" + current) as HTMLElement;
      if (video) {
        ref.current.scrollLeft = video.offsetLeft;
      }
    }

    // for set indicator activate
    if (refIndicator) {
      const indicator = document.querySelector(
        "#indicator" + current
      ) as HTMLElement;
      if (indicator) {
        const { offsetWidth } = refIndicator.current;
        const halfOfOffsetWidth = offsetWidth / 2;
        refIndicator.current.scrollLeft =
          indicator.offsetLeft - halfOfOffsetWidth;
      }
    }
  }, [current]);

  const handleScroll: UIEventHandler<HTMLUListElement> = (e) => {
    const { scrollLeft } = e.target as Element;
    let i = 0;
    while (i < data.length) {
      const video = document.querySelector("#video" + i) as HTMLElement;
      if (video && scrollLeft === video.offsetLeft) {
        setCurrent(i);
        break;
      }
      i++;
    }
  };

  if (!data) return null;

  const activate = {
    left: current === 0 ? "invisible" : "visible",
    right: current === 0 ? "visible" : "invisible",
  };

  return (
    <section className={className}>
      {/* indicator */}
      <div className="flex justify-between mb-5 items-center">
        <h2 className="text-2xl">On Youtube</h2>
        <div className="max-w-[100px] lg:max-w-[200px]">
          <ul
            ref={refIndicator}
            className="relative snap-mandatory snap-x flex gap-2 overflow-x-auto scrollbar-hidden scroll-smooth after:min-w-full"
          >
            {data.map(({}, i) => {
              const indicator =
                current === i
                  ? "opacity-100 transition-all ease-in-out duration-500"
                  : "opacity-10";
              return (
                <li
                  id={"indicator" + i}
                  key={i}
                  className={
                    "snap-end rounded-full shrink-0 w-[5px] aspect-square bg-white transition-all ease-in-out duration-500 delay-300 " +
                    indicator
                  }
                ></li>
              );
            })}
          </ul>
        </div>
      </div>
      {/* items */}
      <div className="relative flex items-center">
        <ul
          ref={ref}
          onScroll={handleScroll}
          className="relative snap-mandatory snap-x flex gap-2 max-w-screen overflow-auto scrollbar-hidden scroll-smooth after:min-w-[50%]"
        >
          {data.map(({ key }, i) => {
            return (
              <li
                id={"video" + i}
                key={i}
                className="relative snap-start aspect-video object-cover w-[290px] lg:w-[280px] shrink-0"
              >
                <button
                  onClick={() => router.push(router.asPath + "#play=" + key)}
                >
                  <Image
                    objectPosition="center"
                    className="bg-black-500"
                    layout="fill"
                    src={"https://i.ytimg.com/vi/" + key + "/hqdefault.jpg"}
                    alt=""
                  />
                </button>
              </li>
            );
          })}
        </ul>
        <div
          className={
            "absolute left-0 h-full w-[50px] bg-gradient-to-r from-black z-10 top-0 " +
            activate.left
          }
        ></div>
        <div
          className={
            "absolute right-[-1px] h-full w-[50px] bg-gradient-to-l from-black z-10 top-0 " +
            activate.right
          }
        ></div>
        <button
          hidden={current === 0}
          onClick={() => setCurrent(current > 0 ? current - 1 : current)}
          className="inline-flex absolute z-20 left-0  ml-5 bg-white bg-opacity-10 backdrop-blur-[1px] p-2 rounded-full"
        >
          <Image width={16} height={16} src="/icons/arrow-left.svg" alt="" />
        </button>
        <button
          hidden={current === data.length - 1}
          onClick={() =>
            setCurrent(current < data.length - 1 ? current + 1 : current)
          }
          className="inline-flex absolute z-20 right-0  mr-5 bg-white bg-opacity-10 backdrop-blur-[1px] p-2 rounded-full"
        >
          <Image width={16} height={16} src="/icons/arrow-right.svg" alt="" />
        </button>
      </div>
    </section>
  );
};

export default Carousel;
