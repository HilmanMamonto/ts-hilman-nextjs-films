import { useRouter } from "next/router";
import { ComponentType } from "react";

type TComponentElement = {
  data: { type: string; key: string };
};

type TData = { type: string; key: string };

const VideoPlayer: ComponentType<TComponentElement> = ({ data }) => {
  const router = useRouter();

  const { type, key } = data;

  const handleClick = () => {
    const pathClear = router.asPath.split("#play=")[0];
    router.replace(pathClear);
  };

  return (
    <section className="fixed w-screen h-screen bg-black top-0 z-30 bg-opacity-80 text-white">
      <div className="w-[800px] h-full mx-auto flex items-center justify-center flex-col">
        <label className="bg-black w-full px-3 py-4 flex justify-between">
          <span>{type}</span>
          <button onClick={handleClick}>close</button>
        </label>
        <iframe
          className="aspect-video w-full"
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
