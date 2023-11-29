import { Role, useEditorStateContext } from "document";

import { Box, Flex, styled } from "@/lib/style/system/jsx";
import { Button } from "@/components/ui";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui";

import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash,
  GalleryHorizontal,
  ComponentIcon,
} from "lucide-react";

export function Actions() {
  const {
    nodeMap,
    focusedNode,
    removeFocused,
    addColumnsAndUpdate,
    moveBack,
    moveForward,
  } = useEditorStateContext();
  const focusedParent = focusedNode?.parentId
    ? nodeMap[focusedNode.parentId]
    : null;

  return (
    <Box position="absolute" zIndex="999" right="s.100" top="s.100">
      <Flex gap="s.50">
        {focusedNode?.element.role === Role.Section && (
          <>
            {focusedNode.prev && (
              <Button
                aria-label="Move up"
                onClick={moveBack}
                variant="secondary"
                h="auto"
                p="s.50"
              >
                <ChevronUp />
              </Button>
            )}

            {focusedNode.next && (
              <Button
                aria-label="Move down"
                onClick={moveForward}
                variant="secondary"
                h="auto"
                p="s.50"
              >
                <ChevronDown />
              </Button>
            )}
          </>
        )}

        {focusedParent?.element.role === Role.Section && (
          <>
            {focusedNode?.prev && (
              <Button
                aria-label="Move up"
                onClick={moveBack}
                variant="secondary"
                h="auto"
                p="s.50"
              >
                <ChevronUp />
              </Button>
            )}

            {focusedNode?.next && (
              <Button
                aria-label="Move down"
                onClick={moveForward}
                variant="secondary"
                h="auto"
                p="s.50"
              >
                <ChevronDown />
              </Button>
            )}
          </>
        )}

        {focusedParent?.element.role === Role.Columns && (
          <>
            {focusedNode?.prev && (
              <Button
                aria-label="Move left"
                onClick={moveBack}
                variant="secondary"
                h="auto"
                p="s.50"
              >
                <ChevronLeft />
              </Button>
            )}
            {focusedNode?.next && (
              <Button
                aria-label="Move right"
                onClick={moveForward}
                variant="secondary"
                h="auto"
                p="s.50"
              >
                <ChevronRight />
              </Button>
            )}
          </>
        )}

        <Button
          aria-label="Delete"
          onClick={removeFocused}
          variant="secondary"
          h="auto"
          p="s.50"
        >
          <Trash />
        </Button>
      </Flex>
    </Box>
  );
}
