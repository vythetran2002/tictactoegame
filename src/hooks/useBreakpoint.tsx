import { useMediaQuery } from "react-responsive";

export const useBreakpoint = (): {
  isXS: boolean;
  isSM: boolean;
} => {
  return {
    isXS: useMediaQuery({ minWidth: 320, maxWidth: 420 }),
    isSM: useMediaQuery({ minWidth: 420 }),
  };
};
