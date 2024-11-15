export const createPosition = (position: string, section?: string) => {
  switch (position) {
    case "top-right":
      if (section === "hero") {
        return { top: "0px", right: "0px" };
      }
      return { top: "-48px", right: "-42px" };
    case "top-left":
      return { top: "-48px", left: "-42px" };
  }
};
