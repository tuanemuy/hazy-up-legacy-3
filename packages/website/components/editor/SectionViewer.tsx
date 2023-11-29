import { getSrcSet } from "core/file";
import {
  NodeID,
  NodeMap,
  getChildNodes,
  wraps,
  getValueOfScreen,
  useScreenStateContext,
} from "document";

import { Box, styled } from "@/lib/style/system/jsx";
import { Viewer } from "./Viewer";
import { AddColumnsOrComponent } from "./AddColumnsOrComponent";

type Props = {
  id: NodeID;
  nodeMap: NodeMap;
  isEditable?: boolean;
};

export function SectionViewer({ id, nodeMap, isEditable }: Props) {
  const { screen } = useScreenStateContext();
  const node = nodeMap[id];
  const section = node.element;
  const children = getChildNodes(node, nodeMap);
  const { padding, isWrapped, background, backgroundImage } =
    section.attributes;

  return (
    <styled.section
      position="relative"
      style={{
        padding: `${
          getValueOfScreen<[number, number]>(padding, screen)[0]
        }px 0 ${getValueOfScreen<[number, number]>(padding, screen)[1]}px 0`,
      }}
    >
      <Box
        position="relative"
        zIndex="4"
        display="flex"
        flexDirection="column"
        alignItems="center"
        m="0 auto"
        style={{
          width: isWrapped ? wraps[screen] : "100%",
        }}
      >
        {children.map((child) => {
          return (
            <Viewer
              key={child.id}
              id={child.id}
              nodeMap={nodeMap}
              isEditable={isEditable}
            />
          );
        })}

        <Box w="100%" mt="s.100">
          <AddColumnsOrComponent nodeId={id} />
        </Box>
      </Box>

      {background && (
        <Box
          position="absolute"
          top="0"
          left="0"
          zIndex="2"
          w="100%"
          h="100%"
          style={{
            background: background,
          }}
        />
      )}

      {backgroundImage && (
        <Box
          position="absolute"
          zIndex="1"
          top="0"
          left="0"
          width="100%"
          height="100%"
        >
          <styled.img
            src={`/api/file/${backgroundImage.path}`}
            srcSet={getSrcSet(backgroundImage, "/api/file")}
            alt="背景"
            w="100%"
            h="100%"
            objectFit="cover"
            objectPosition="50% 50%"
          />
        </Box>
      )}
    </styled.section>
  );
}
