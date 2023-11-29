import { FullFile, getSrcSet } from "core/file";
import { styled } from "@/lib/style/system/jsx";

type Props = {
  file: FullFile;
};

export function Image({ file }: Props) {
  return (
    <styled.img
      src={`/api/file/${file.path}`}
      srcSet={getSrcSet(file, "/api/file")}
      alt="画像"
      display="block"
      w="100%"
      verticalAlign="center"
    />
  );
}
