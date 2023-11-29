import { styled } from "@/lib/style/system/jsx";
import { nl2br } from "util/common";

type Props = {
  text: string;
  color: string;
  family: string;
  size: string;
  align: string;
  weight: string;
};

export function Text({ text, color, family, size, weight, align }: Props) {
  return (
    <styled.p
      dangerouslySetInnerHTML={{ __html: nl2br(text) }}
      w="100%"
      color={color}
      fontFamily={family}
      fontSize={size}
      fontWeight={weight}
      textAlign={align}
    />
  );
}
