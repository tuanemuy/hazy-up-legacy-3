import { createContext } from "react";
import {
  NodeID,
  NodeMap,
  getChildNodes,
  getValueOfScreen,
  useScreenStateContext,
  useEditorStateContext,
} from "document";

import { Flex, Box } from "@/lib/style/system/jsx";
import { Viewer } from "./Viewer";
import { ColumnsItem } from "./ColumnsItem";
import { AddComponent } from "./AddComponent";

export const ColumnsContext = createContext<{
  itemWidth: string;
  itemShrink: number;
}>(null as any);

type ColumnsProps = {
  id: NodeID;
  nodeMap: NodeMap;
  isEditable?: boolean;
};

export function ColumnsViewer({ id, nodeMap, isEditable }: ColumnsProps) {
  const { screen } = useScreenStateContext();
  const { focusedId } = useEditorStateContext();
  const node = nodeMap[id];
  const children = getChildNodes(node, nodeMap);
  const columns = node.element;
  const { spacing, justifyContent, alignItems, repeat, gap, flexWrap } =
    columns.attributes;
  const itemWidth =
    repeat && getValueOfScreen<number>(repeat, screen) > 0
      ? `calc((100% - (${getValueOfScreen<number>(gap, screen)}px * ${
          getValueOfScreen<number>(repeat, screen) - 1
        })) / ${getValueOfScreen<number>(repeat, screen)})`
      : "auto";
  const itemShrink = flexWrap ? 0 : 1;

  return (
    <ColumnsContext.Provider value={{ itemWidth, itemShrink }}>
      <Box
        position="relative"
        w={repeat ? "100%" : "auto"}
        style={{
          paddingTop: getValueOfScreen(spacing, screen),
        }}
      >
        <Flex
          justifyContent={justifyContent}
          alignItems={alignItems}
          flexWrap={flexWrap ? "wrap" : "nowrap"}
          position="relative"
          style={{
            gap: gap ? getValueOfScreen(gap, screen) : "0",
          }}
        >
          {children.map((child) => {
            return (
              <ColumnsItem
                key={child.id}
                flexGrow={
                  child.element.attributes.repeat &&
                  getValueOfScreen<number>(
                    child.element.attributes.repeat,
                    screen
                  ) > 0
                    ? 1
                    : 0
                }
              >
                <Viewer
                  id={child.id}
                  nodeMap={nodeMap}
                  isEditable={isEditable}
                />
              </ColumnsItem>
            );
          })}

          {isEditable && children.length < 1 && (
            <ColumnsItem flexGrow={0}>
              <AddComponent nodeId={node.id} />
            </ColumnsItem>
          )}

          {isEditable && children.length > 0 && focusedId === id && (
            <ColumnsItem flexGrow={0}>
              <AddComponent nodeId={node.id} sm />
            </ColumnsItem>
          )}
        </Flex>
      </Box>
    </ColumnsContext.Provider>
  );
}
