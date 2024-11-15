export const createMask = (mask: string) => {
  switch (mask) {
    case "arch":
      return { WebkitMaskImage: "url('./src/assets/gaming-mask.png')" };
    case "semi-squared-rounded":
      return { WebkitMaskImage: "url('./src/assets/fashion-mask.png')" };
    case "semi-squared-cloud":
      return { WebkitMaskImage: "url('./src/assets/design-mask.png')" };
    case "cloud":
      return {
        WebkitMaskImage: "url('./src/assets/design-additional-mask.png')",
      };
    case "corner-squared-cloud":
      return {
        WebkitMaskImage: "url('./src/assets/marketing-mask.png')",
      };
    case "corner-squared-rounded":
      return {
        WebkitMaskImage: "url('./src/assets/software-mask.png')",
      };
  }
};
