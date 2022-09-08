import { useRouter } from "next/router";
import { ComponentType } from "react";

type TComponentElement = {
  data: { type: string; key: string };
};

const VideoPlayer: ComponentType<TComponentElement> = ({ data }) => {
  const router = useRouter();

  const { type, key } = data;

  const handleClick = () => {
    const pathClear = router.asPath.split("#play=")[0];
    router.push(pathClear);
  };

  return (
    <section className="fixed w-screen h-screen bg-black top-0 z-30 bg-opacity-80 text-white">
      <div className="max-w-[800px] px-3 md:px-0 h-full mx-auto flex items-center justify-center flex-col">
        <div className="bg-black w-full px-3 py-4 flex justify-between">
          <span>{type}</span>
          <button className="inline-flex" onClick={handleClick}>
            close
          </button>
        </div>
        <iframe
          className="aspect-video w-full bg-black-500"
          src={
            "//www.youtube.com/embed/" +
            key +
            "?autoplay=1&amp;origin=https%3A%2F%2Fwww.themoviedb.org&amp;hl=en&amp;modestbranding=1&amp;fs=1&amp;autohide=1"
          }
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
};

export default VideoPlayer;
