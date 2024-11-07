import { ReactNode } from "react";

interface MaskCreator {
  children: ReactNode;
  className: string;
  shape: string;
}

export const MaskCreator = ({ children, className, shape }: MaskCreator) => {
  const pictureMask = (shape: string) => {

  };

  return <picture className={className}>{children}</picture>;
};
