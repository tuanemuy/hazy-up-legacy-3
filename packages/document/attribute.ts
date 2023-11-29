export type Padding = [number, number];

export type BackgroundColor = {
  hex: string;
  opacity: number;
};

export type ParseStringSizeResult = {
  value: string;
  unit: string;
} | null;

export function parseStringSize(str: string): ParseStringSizeResult {
  const regex = /(?<value>[0-9]+)(?<unit>(px|vw|vh))/;
  const match = regex.exec(str);

  const value = match?.groups?.value || null;
  const unit = match?.groups?.unit || null;

  if (value && unit) {
    return {
      value,
      unit,
    };
  } else {
    return null;
  }
}

export function hexToRgba(hex: string, opacity: number): string | null {
  let hexArray = hex.slice(1).split("");

  if (hexArray.length === 3) {
    hexArray = hexArray.map((v) => [v, v]).flat();
  }

  if (hexArray.length !== 6) {
    return null;
  }

  return `rgba(${parseInt(hexArray.slice(0, 2).join(""), 16)}, ${parseInt(
    hexArray.slice(2, 4).join(""),
    16
  )}, ${parseInt(hexArray.slice(4, 6).join(""), 16)}, ${opacity})`;
}

export function rgbaToHexOpacity(value: string): BackgroundColor | null {
  const rgba = value
    .replace(/\s/g, "")
    .match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i);

  if (rgba?.length !== 4 && rgba?.length !== 5) {
    return null;
  }

  const opacity = rgba[4] ? parseFloat(rgba[4]) : 1;
  const hex =
    "#" +
    `0${parseInt(rgba[1], 10).toString(16)}`.slice(-2) +
    `0${parseInt(rgba[2], 10).toString(16)}`.slice(-2) +
    `0${parseInt(rgba[3], 10).toString(16)}`.slice(-2);

  return {
    hex,
    opacity,
  };
}
