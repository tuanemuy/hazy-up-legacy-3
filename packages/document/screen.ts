export type BreakPoints = { [key: Screen]: number };

export const breakPoints: BreakPoints = {
  base: 0,
  sm: 480,
  md: 768,
  lg: 992,
  xl: 1280,
  "2xl": 1536,
};

export type Wraps = { [key: Screen]: string };

export const wraps: Wraps = {
  base: "94%",
  sm: "470px",
  md: "758px",
  lg: "972px",
  xl: "1240px",
  "2xl": "1356px",
};

export type GenerateWrapsArgs = { [key: Screen]: string };

export const Screen = {
  Base: "base",
  Sm: "sm",
  Md: "md",
  Lg: "lg",
  Xl: "xl",
  Xxl: "2xl",
};
export type Screen = (typeof Screen)[keyof typeof Screen];

export function screenFromString(value: Screen): Screen {
  return value;
}

export function screenFromWidth(width: number): Screen {
  let screen = Screen.Base;

  for (const value of Object.values(Screen)) {
    if (width > breakPoints[value]) {
      screen = value;
    }
  }

  return screen;
}

export function getIndexOfScreen(screen: Screen): number {
  return Object.values(Screen).indexOf(screen);
}

export function getWrapOfScreen(screen: Screen): string {
  return wraps[screen];
}
