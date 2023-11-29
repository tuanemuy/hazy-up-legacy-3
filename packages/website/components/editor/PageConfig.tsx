import { useState, useEffect } from "react";
import {
  Node,
  generateNodeWithID,
  generatePageElement,
  useEditorStateContext,
} from "document";

import { Flex } from "@/lib/style/system/jsx";
import { Label, Input } from "@/components/ui";

type Props = {
  node: Node;
};

export function PageConfig({ node }: Props) {
  const attrs = node.element.attributes;
  const [name, setName] = useState(attrs.name);
  const [path, setPath] = useState(attrs.path);

  const { nodeMap, updateNodeMap } = useEditorStateContext();

  useEffect(() => {
    const newNodeMap = { ...nodeMap };
    newNodeMap[node.id] = generateNodeWithID({
      ...node,
      element: generatePageElement({
        name,
        path,
      }),
    });
    updateNodeMap(newNodeMap);
  }, [name, path]);

  return (
    <Flex gap="s.100">
      <Flex flexDirection="column" alignItems="center">
        <Input value={name} onChange={(e) => setName(e.target.value)} />
        <Label fontSize=".7rem">Name</Label>
      </Flex>

      <Flex flexDirection="column" alignItems="center">
        <Input value={path} onChange={(e) => setPath(e.target.value)} />
        <Label fontSize=".5rem">Path</Label>
      </Flex>
    </Flex>
  );
}
