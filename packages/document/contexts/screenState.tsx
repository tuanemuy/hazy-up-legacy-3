"use client";

import { createContext, useContext, useState } from "react";
import { Screen, screenFromWidth } from "../screen";

export type ScreenState = {
  width: number;
  setWidth: React.Dispatch<React.SetStateAction<number>>;
  screen: Screen;
};

export const ScreenStateContext = createContext<ScreenState>(null as any);

export function useScreenState(): ScreenState {
  const [width, setWidth] = useState(1440);

  return {
    width,
    setWidth,
    screen: screenFromWidth(width),
  };
}

export function useScreenStateContext() {
  return useContext(ScreenStateContext);
}

type Props = {
  children: React.ReactNode;
};

export function ScreenStateContextProvider({ children }: Props) {
  const screenState = useScreenState();

  return (
    <ScreenStateContext.Provider value={screenState}>
      {children}
    </ScreenStateContext.Provider>
  );
}
