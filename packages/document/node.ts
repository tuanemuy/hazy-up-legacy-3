import { createId } from "@paralleldrive/cuid2";
import { NodeMap } from "./node-map";
import { Element } from "./element";

export type NodeID = string;

export interface Node {
  id: NodeID;
  parentId: NodeID | null;
  firstChild: NodeID | null;
  lastChild: NodeID | null;
  prev: NodeID | null;
  next: NodeID | null;
  element: Element;
}

export function generateNodeID(): NodeID {
  return createId();
}

export type GenerateNodeArgs = {
  parentId?: NodeID | null;
  firstChild?: NodeID | null;
  lastChild?: NodeID | null;
  prev?: NodeID | null;
  next?: NodeID | null;
  element: Element;
};

export function generateNode({
  parentId,
  firstChild,
  lastChild,
  prev,
  next,
  element,
}: GenerateNodeArgs): Node {
  return {
    id: generateNodeID(),
    parentId: parentId || null,
    firstChild: firstChild || null,
    lastChild: lastChild || null,
    prev: prev || null,
    next: next || null,
    element,
  };
}

export type GenerateNodeWithIDArgs = {
  id: NodeID;
  parentId?: NodeID | null;
  firstChild?: NodeID | null;
  lastChild?: NodeID | null;
  prev?: NodeID | null;
  next?: NodeID | null;
  element: Element;
};

export function generateNodeWithID({
  id,
  parentId,
  firstChild,
  lastChild,
  prev,
  next,
  element,
}: GenerateNodeWithIDArgs): Node {
  return {
    id,
    parentId: parentId || null,
    firstChild: firstChild || null,
    lastChild: lastChild || null,
    prev: prev || null,
    next: next || null,
    element,
  };
}

export function getChildNodes(node: Node, nodeMap: NodeMap): Node[] {
  let children = [];
  let next = node.firstChild;
  while (next !== null) {
    children.push(nodeMap[next]);
    next = nodeMap[next].next;
  }

  return children;
}
