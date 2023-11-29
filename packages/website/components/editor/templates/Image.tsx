import { PreTemplate } from "document";
import { FullFile, getPath, getSrcSet } from "core/file";

export type Props = {
  file?: FullFile;
  className?: string;
};

export const Image: PreTemplate<Props> = {
  id: "image",
  name: "画像",
  thumbnail: "/images/profile_default.jpg",
  props: [{ type: "file", key: "file", name: "ファイル" }],
  f: ({ file, className }: Props) => {
    if (file) {
      return (
        <img
          className={className}
          style={{
            position: "relative",
            display: "block",
            width: "100%",
            minWidth: "30px",
            height: "auto",
            minHeight: "30px",
          }}
          src={`/api/file/${getPath(file)}`}
          srcSet={getSrcSet(file, "/api/file")}
        />
      );
    } else {
      return (
        <div
          className={className}
          style={{
            position: "relative",
            display: "block",
            width: "100%",
            minWidth: "100px",
            aspectRatio: "16 / 9",
            backgroundColor: "#efefef",
          }}
        />
      );
    }
  },
  defaultProps: {},
};
