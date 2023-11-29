import { Screen } from "./screen";

export type Responsive<T> = [T, ...T[]];

export function generateResponsive<T>(values: Responsive<T>): Responsive<T> {
  return values;
}

export function replaceValueOfScreen<T>(
  responsive: Responsive<T>,
  screen: Screen,
  value: T
): Responsive<T> {
  let vs: { [key: Screen]: T } = {};
  Object.values(Screen).forEach((s, i) => {
    vs[s] = getValueRecursive(responsive, i);
  });

  const newValues = Object.keys(vs).map((s) => {
    if (screen === s) {
      return value;
    } else {
      return vs[s];
    }
  });

  return [newValues[0], ...newValues.slice(1)];
}

export function getValueOfScreen<T>(
  responsive: Responsive<T>,
  screen: Screen
): T {
  let vs: { [key: Screen]: T } = {};
  Object.values(Screen).forEach((s, i) => {
    vs[s] = getValueRecursive(responsive, i);
  });
  return vs[screen];
}

export function getValueRecursive<T>(
  responsive: Responsive<T>,
  index: number
): T {
  if (index >= 0) {
    return responsive[index] !== undefined
      ? responsive[index]
      : getValueRecursive(responsive, index - 1);
  } else {
    throw new Error("Unreachable");
  }
}
