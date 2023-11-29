import { NodeID, Node, generateNodeID, generateNodeWithID } from "./node";
import { Element } from "./element";

export type GenerateTreeArgs = {
  element: Element;
  children: Tree[];
};

export interface Tree {
  element: Element;
  children: Tree[];
}

export function generateTree({ element, children }: GenerateTreeArgs): Tree {
  return { element, children };
}

export function treeToNodeMap(
  tree: Tree,
  rootId: NodeID
): { [key: NodeID]: Node } {
  const nodes = treeToNodes(tree, rootId, null, null, null);
  const map: { [key: NodeID]: Node } = {};
  for (const node of nodes) {
    map[node.id] = node;
  }
  return map;
}

export function treeToNodes(
  tree: Tree,
  id: NodeID,
  parentId: NodeID | null,
  prev: NodeID | null,
  next: NodeID | null
): Node[] {
  const childIds = Array(tree.children.length)
    .fill(0)
    .map((_v) => generateNodeID());
  return [
    generateNodeWithID({
      id,
      parentId,
      prev,
      next,
      firstChild: childIds[0],
      lastChild: childIds.slice(-1)[0],
      element: tree.element,
    }),
    ...tree.children
      .map((child, index) => {
        return treeToNodes(
          child,
          childIds[index],
          id,
          childIds[index - 1] || null,
          childIds[index + 1] || null
        );
      })
      .flat(),
  ];
}
