import { Node, NodeID, generateNode, generateNodeWithID } from "./node";
import {
  Role,
  generateDefaultSectionElement,
  generateDefaultColumnsElement,
  generateDefaultComponentElement,
} from "./element";
import { Template } from "./template";
import { PreTemplate } from "./pre-template";

export type NodeMap = { [key: NodeID]: Node };

export function addNode(map: NodeMap, targetId: NodeID, node: Node) {
  const targetNode = map[targetId];
  if (!targetNode) {
    return map;
  }

  if (
    node.element.role === Role.Page ||
    targetNode.element.role === Role.Component
  ) {
    return map;
  }

  if (
    node.element.role === Role.Section &&
    !(targetNode.element.role === Role.Page)
  ) {
    return map;
  }

  if (
    node.element.role === Role.Columns &&
    !(targetNode.element.role === Role.Section)
  ) {
    return map;
  }

  if (
    node.element.role === Role.Component &&
    targetNode.element.role === Role.Page
  ) {
    return map;
  }

  const lastChildId = targetNode.lastChild;
  const newNodeMap = { ...map };
  if (lastChildId !== null && map[lastChildId]) {
    newNodeMap[targetId] = generateNodeWithID({
      ...targetNode,
      lastChild: node.id,
    });

    newNodeMap[lastChildId] = generateNodeWithID({
      ...map[lastChildId],
      next: node.id,
    });
  } else {
    newNodeMap[targetId] = generateNodeWithID({
      ...targetNode,
      firstChild: node.id,
      lastChild: node.id,
    });
  }
  newNodeMap[node.id] = node;

  return newNodeMap;
}

export function addSection(nodeMap: NodeMap, targetId: NodeID) {
  return addNode(
    nodeMap,
    targetId,
    generateNode({
      parentId: targetId,
      prev: nodeMap[targetId].lastChild,
      element: generateDefaultSectionElement(),
    })
  );
}

export function addColumns(nodeMap: NodeMap, targetId: NodeID) {
  return addNode(
    nodeMap,
    targetId,
    generateNode({
      parentId: targetId,
      prev: nodeMap[targetId].lastChild,
      element: generateDefaultColumnsElement(),
    })
  );
}

export async function addComponent(
  nodeMap: NodeMap,
  targetId: NodeID,
  template: PreTemplate<any>
) {
  return addNode(
    nodeMap,
    targetId,
    generateNode({
      parentId: targetId,
      prev: nodeMap[targetId].lastChild,
      element: generateDefaultComponentElement(template),
    })
  );
}
