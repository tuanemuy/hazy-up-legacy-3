import { ReactNode } from "react";
import { NodeID, Node, useEditorStateContext } from "document";

import { Box } from "@/lib/style/system/jsx";
import { Actions } from "./Actions";

type SelectorProps = {
  id: NodeID;
  children: ReactNode;
};

export function Editable({ id, children }: SelectorProps) {
  const { nodeMap, focusedId, focus } = useEditorStateContext();
  const isFocused = focusedId === id;
  const isChildrenFocused =
    Object.values(nodeMap)
      .filter((n: Node) => n.parentId === id)
      .filter((n: Node) => n.id === focusedId).length > 0;

  const onClick: React.MouseEventHandler = (event) => {
    event.stopPropagation();
    focus(id);
  };

  return (
    <Box position="relative" width="100%" onClick={onClick}>
      {children}

      <Box
        position="absolute"
        zIndex="998"
        top="0"
        left="0"
        w="100%"
        h="100%"
        pointerEvents="none"
        border={
          isFocused
            ? "2px solid token(colors.primary)"
            : "3px solid transparent"
        }
      />

      {isChildrenFocused && (
        <Box
          position="absolute"
          zIndex="997"
          top="-6px"
          left="-6px"
          width="calc(100% + 12px)"
          height="calc(100% + 12px)"
          border="6px solid token(colors.primary)"
          opacity="0.5"
          pointerEvents="none"
        />
      )}

      {isFocused && <Actions />}
    </Box>
  );
}
