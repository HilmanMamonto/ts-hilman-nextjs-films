/* eslint-disable react-hooks/exhaustive-deps */
import { fetchReview } from "fetch/fetchReview";
import { ComponentType, useEffect, useState } from "react";
import Image from "next/image";
import { BASE_IMG_W500 } from "globalConst";

type TReview = {
  id: number;
  category: string | string[] | undefined;
};

type TStateReviews = {
  author: string;
  author_details: {
    avatar_path: string;
    rating: number;
  };
  content: string;
};

const Reviews: ComponentType<TReview> = ({ id, category }) => {
  const [status, setStatus] = useState("loading");
  const [reviews, setReviews] = useState<TStateReviews[]>([]);
  useEffect(() => {
    const observer = new IntersectionObserver((enter) => {
      if (enter[0].isIntersecting) {
        setTimeout(() => {
          fetchReview(category, id).then((value) => {
            setReviews(value.results);
            setStatus("success");
          });
        }, 2000);
        observer.unobserve(reviewDOM);
      }
    });
    const reviewDOM = document.querySelector("#review") as HTMLElement;
    observer.observe(reviewDOM);
  }, []);

  if (status === "loading") {
    return (
      <section
        id="review"
        className="px-3 lg:px-20 text-white py-2 animate-pulse pb-20"
      >
        <h1 className="text-2xl mb-10 cursor-wait">Loading...</h1>
        <div className="w-full grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-5">
          {[0, 1, 2, 3, 4, 5].map(({}, i) => {
            return (
              <div key={i} className="flex gap-5 flex-col cursor-wait">
                <div className="flex gap-5 items-center">
                  <div className="aspect-square w-[60px] bg-black-500 rounded-full shrink-0"></div>
                  <div className="flex gap-2 flex-col w-full">
                    <div className="flex w-[50%] h-[10px] bg-black-500 shrink-0"></div>
                    <div className="flex w-[10%] h-[5px] bg-black-500 shrink-0"></div>
                  </div>
                </div>
                <div className="w-full flex flex-col gap-2">
                  <div className="flex w-full h-[10px] bg-black-500 shrink-0"></div>
                  <div className="flex w-full h-[10px] bg-black-500 shrink-0"></div>
                  <div className="flex w-[80%] h-[10px] bg-black-500 shrink-0"></div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return (
      <section className="px-3 lg:px-20 text-white">
        <h1 className="text-2xl mb-10">Reviews</h1>
        <div className="w-full py-10 flex justify-center items-center border border-black-500 font-thin">
          There is no reviews
        </div>
      </section>
    );
  }

  return (
    <section id="review" className="px-3 lg:px-20 text-white pb-20">
      <h1 className="text-2xl mb-5">Reviews</h1>
      <div className="border-b mb-10 opacity-20"></div>
      <div className="w-full grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-5">
        {reviews.map(({ author, author_details, content }, i) => {
          const rating = author_details.rating;
          let avatar: string = author_details.avatar_path;
          // checking null
          if (!avatar) avatar = "";
          //setting the link
          if (avatar) {
            avatar = avatar.includes("https")
              ? avatar.slice(1)
              : BASE_IMG_W500 + avatar;
          }
          return (
            <div key={i} className="felx flex-col">
              <div className="flex items-center gap-5 mb-5">
                <div className="relative w-[60px] rounded-full aspect-square bg-black-500">
                  {avatar && (
                    <Image
                      layout="fill"
                      className="rounded-full"
                      src={avatar}
                      alt=""
                    />
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <span>{author}</span>
                  <span className="font-thin text-[12px]">{rating}</span>
                </div>
              </div>
              <p className="font-thin max-h-[100px] overflow-y-auto">
                {content}
              </p>
            </div>
          );
        })}
      </div>
      <div className="border-b mt-10 opacity-20"></div>
    </section>
  );
};

export default Reviews;
