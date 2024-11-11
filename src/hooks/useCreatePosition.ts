export const useCreatePosition = (position: string) => {
  switch (position) {
    case "top-right":
      return { top: "0", right: "0" };
    case "top-left":
      return { top: "0", left: "0" };
  }
};
