import { useEffect, useState } from "react";

export const useBreakpoints = () => {
  const [breakpoints, setBreakpoints] = useState<string>("");
  const sizes = [
    { size: "sm", value: 640 },
    { size: "md", value: 768 },
    { size: "lg", value: 1024 },
    { size: "xl", value: 1280 },
    { size: "2xl", value: 1536 },
  ];

  const handleSize = () => {
    let i = 0;
    while (i <= sizes.length) {
      if (window.innerWidth >= sizes[i].value) {
        setBreakpoints(sizes[i].size);
        break;
      }
    }
  };

  useEffect(() => {
    document.addEventListener("resize", handleSize);
    handleSize();
    return () => document.removeEventListener("resize", handleSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { breakpoints };
};
