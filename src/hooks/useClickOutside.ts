import { useEffect } from "react";

export const useClickOutside = (
  refs: React.MutableRefObject<HTMLUListElement | HTMLButtonElement | null>[],
  callback: () => void
) => {
  const handleClick = (e: MouseEvent) => {
    console.log("Clicked element:", e.target);
    const isOutside = refs.every(
      (ref) => ref.current && !ref.current.contains(e.target as Node)
    );
    if (isOutside) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleClick);
    return () => {
      document.removeEventListener("mouseup", handleClick);
    };
  });
};
