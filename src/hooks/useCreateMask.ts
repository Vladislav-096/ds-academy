export const useCreateMask = (mask: string) => {
  switch (mask) {
    case "arch":
      return { "-webkit-mask-image": "url('./src/assets/gaming-mask.png')" };
    case "semi-squared-rounded":
      return { "-webkit-mask-image": "url('./src/assets/fashion-mask.png')" };
    case "semi-squared-cloud":
      return { "-webkit-mask-image": "url('./src/assets/design-mask.png')" };
    case "cloud":
      return {
        "-webkit-mask-image": "url('./src/assets/design-additional-mask.png')",
      };
    case "corner-squared-cloud":
      return {
        "-webkit-mask-image": "url('./src/assets/marketing-mask.png')",
      };
    case "corner-squared-rounded":
      return {
        "-webkit-mask-image": "url('./src/assets/software-mask.png')",
      };
  }
};
