"use client";

import { editPage } from "@/actions/page";
import { Page } from "core/page";
import { NodeMap } from "document";

import { Box } from "@/lib/style/system/jsx";
import { Editor } from "@/components/editor/Editor";
import { Text } from "@/components/editor/templates/Text";
import { Image } from "@/components/editor/templates/Image";

type Props = {
  page: Page;
};

const templates = {
  text: Text,
  image: Image,
};

export function View({ page }: Props) {
  const initialNodeMap: NodeMap = JSON.parse(page!.structure);
  console.log(initialNodeMap);

  return (
    <Box position="relative" w="100%" h="100vh" overflow="hidden">
      <Editor
        initialNodeMap={initialNodeMap}
        rootId="root"
        templates={templates}
        onUpdate={(nodeMap) => {
          try {
            editPage({
              id: page.id,
              structure: JSON.stringify(nodeMap),
            });
          } catch (e) {
            console.error(e);
          }
        }}
      />
    </Box>
  );
}
