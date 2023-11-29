import { NodeID, useEditorStateContext } from "document";

import { Flex } from "@/lib/style/system/jsx";
import { Button } from "@/components/ui";

import { Plus } from "lucide-react";
import { SelectTemplate } from "./SelectTemplate";

type Props = {
  nodeId: NodeID;
  sm?: boolean;
};

export function AddComponent({ nodeId, sm }: Props) {
  const { focusedId, addComponentAndUpdate } = useEditorStateContext();

  return (
    <Flex
      position="relative"
      zIndex="2"
      justifyContent="center"
      alignItems="center"
      flexShrink={0}
      width="100%"
      p={sm ? "0" : "s.300"}
      border={sm ? "none" : "3px dashed token(colors.primary)"}
      pointerEvents="none"
    >
      <SelectTemplate
        trigger={
          <Button
            aria-label="Add component"
            alignSelf="center"
            pointerEvents={focusedId === nodeId ? "auto" : "none"}
            disabled={focusedId !== nodeId}
            opacity={focusedId === nodeId ? 1 : 0.5}
            variant="secondary"
            h="auto"
            p="s.50"
          >
            <Plus />
          </Button>
        }
        onSubmit={(template) => {
          addComponentAndUpdate(template);
        }}
      />
    </Flex>
  );
}
