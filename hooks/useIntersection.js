import { useRef, useState, useEffect } from "react";

export const useIntersection = (options) => {
  const containerRef = useRef();
  const [visible, setVisible] = useState(false);

  const callBack = (entries) => {
    const [entry] = entries;
    setVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callBack, options);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [containerRef, visible]);

  return [containerRef, visible];
};
