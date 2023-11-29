import { useState } from "react";
import { NodeID, useEditorStateContext } from "document";

import { Flex, styled } from "@/lib/style/system/jsx";
import {
  Label,
  Button,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui";

import { Plus, Component, GalleryHorizontal } from "lucide-react";
import { SelectTemplate } from "./SelectTemplate";

type Props = {
  nodeId: NodeID;
  exclude?: ("columns" | "component")[];
  sm?: boolean;
};

export function AddColumnsOrComponent({ nodeId, exclude, sm }: Props) {
  const { focusedId, addColumnsAndUpdate, addComponentAndUpdate } =
    useEditorStateContext();

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
      <Popover>
        <PopoverTrigger asChild>
          <Button
            aria-label="Add columns"
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
        </PopoverTrigger>
        <PopoverContent>
          <Flex gap="s.100">
            {!exclude?.includes("columns") && (
              <Flex direction="column" alignItems="center" gap="s.50">
                <Button
                  aria-label="Add columns"
                  onClick={addColumnsAndUpdate}
                  variant="secondary"
                  h="auto"
                  p="s.50"
                >
                  <GalleryHorizontal />
                </Button>
                <styled.p fontSize=".7rem">カラム</styled.p>
              </Flex>
            )}

            {!exclude?.includes("component") && (
              <Flex direction="column" alignItems="center" gap="s.50">
                <SelectTemplate
                  trigger={
                    <Button
                      aria-label="Add component"
                      variant="secondary"
                      h="auto"
                      p="s.50"
                    >
                      <Component />
                    </Button>
                  }
                  onSubmit={(template) => {
                    addComponentAndUpdate(template);
                  }}
                />
                <styled.p fontSize=".7rem">コンポーネント</styled.p>
              </Flex>
            )}
          </Flex>
        </PopoverContent>
      </Popover>
    </Flex>
  );
}
