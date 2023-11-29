import { NodeID, NodeMap, getChildNodes } from "document";

import { Viewer } from "./Viewer";

type Props = {
  id: NodeID;
  nodeMap: NodeMap;
  isEditable?: boolean;
};

export function PageViewer({ id, nodeMap, isEditable }: Props) {
  const node = nodeMap[id];
  const children = getChildNodes(node, nodeMap);
  return children.map((child) => (
    <Viewer
      key={child.id}
      id={child.id}
      nodeMap={nodeMap}
      isEditable={isEditable}
    />
  ));
}
