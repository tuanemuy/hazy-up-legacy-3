import { File, Asset } from "db";

export type { File, Asset } from "db";

export type FullFile = File & { assets: Asset[] };

export function getPath(file: FullFile, label?: string) {
  return file.assets.filter((a) => a.label === label).at(0)?.path || file.path;
}

export function getSrcSet(file: FullFile, basePath: string) {
  return file.assets
    .map((a) => {
      return `${basePath}/${a.path} ${a.width}w`;
    })
    .join(" ");
}
