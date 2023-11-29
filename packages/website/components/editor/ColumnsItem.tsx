import { useContext } from "react";
import { ColumnsContext } from "./ColumnsViewer";

import { Flex } from "@/lib/style/system/jsx";

type Props = {
  flexGrow: number;
  children: React.ReactNode;
};

export function ColumnsItem({ flexGrow, children }: Props) {
  const { itemShrink, itemWidth } = useContext(ColumnsContext);

  return (
    <Flex
      position="relative"
      zIndex="2"
      maxW="100%"
      style={{
        flexShrink: itemShrink,
        flexGrow: flexGrow,
        width: itemWidth,
      }}
    >
      {children}
    </Flex>
  );
}
