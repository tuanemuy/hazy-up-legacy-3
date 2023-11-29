import { Role, useEditorStateContext } from "document";

import { Box, Flex } from "@/lib/style/system/jsx";
import { Label, Button, IconButton, Separator } from "@/components/ui";
import { PageConfig } from "./PageConfig";
import { SectionConfig } from "./SectionConfig";
import { ColumnsConfig } from "./ColumnsConfig";
import { ComponentConfig } from "./ComponentConfig";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  AlignVerticalSpaceAround,
  GalleryVertical,
  GalleryHorizontal,
  ComponentIcon,
} from "lucide-react";

type Props = {};

export function Toolbar({}: Props) {
  const { nodeMap, focusedNode, rootNode, undo, redo } =
    useEditorStateContext();

  const focused = focusedNode?.id ? nodeMap[focusedNode.id] : null;

  return (
    <Box
      position="relative"
      w="100%"
      boxShadow="0px 0px 4px rgba(0, 0, 0, .25)"
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        px="s.100"
        py="s.50"
        bg="white"
      >
        {rootNode?.element.role === Role.Page && (
          <Label fontSize=".7rem">{rootNode.element.attributes.name}</Label>
        )}

        <Flex>
          <Button
            aria-label="undo"
            variant="ghost"
            h="auto"
            p="s.50"
            onClick={undo}
          >
            <ChevronLeft size={20} />
          </Button>
          <Button
            aria-label="redo"
            variant="ghost"
            h="auto"
            p="s.50"
            onClick={redo}
          >
            <ChevronRight size={20} />
          </Button>
        </Flex>
      </Flex>

      <Separator />

      {focused && (
        <Flex
          key={focused.id}
          width="100%"
          px="s.100"
          py="s.50"
          bg="white"
          alignItems="center"
          gap="s.100"
        >
          {focused?.element.role === Role.Page && (
            <>
              <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Copy />
                <Label fontSize=".7rem">Page</Label>
              </Flex>

              <Separator orientation="vertical" />
            </>
          )}

          {focused?.element.role === Role.Section && (
            <>
              <Flex
                key={focused.id}
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <AlignVerticalSpaceAround />
                <Label fontSize=".7rem">Section</Label>
              </Flex>

              <Separator orientation="vertical" />

              <SectionConfig node={focused} />
            </>
          )}

          {focused?.element.role === Role.Columns && (
            <>
              <Flex
                key={focused.id}
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <GalleryVertical />
                <Label fontSize=".5rem">Columns</Label>
              </Flex>

              <Separator orientation="vertical" />

              <ColumnsConfig node={focused} />
            </>
          )}

          {focused?.element.role === Role.Component && (
            <>
              <Flex
                key={focused.id}
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <ComponentIcon />
                <Label fontSize=".5rem">Component</Label>
              </Flex>

              <Separator orientation="vertical" />

              <ComponentConfig node={focused} />
            </>
          )}
        </Flex>
      )}
    </Box>
  );
}
