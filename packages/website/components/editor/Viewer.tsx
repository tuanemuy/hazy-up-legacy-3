import { css, cx } from "@/lib/style/system/css";
import { icon } from "@/lib/style/system/recipes";
import { NodeID, NodeMap, Role } from "document";

import { Flex } from "@/lib/style/system/jsx";
import { ComponentViewer } from "./ComponentViewer";
import { PageViewer } from "./PageViewer";
import { ColumnsViewer } from "./ColumnsViewer";
import { SectionViewer } from "./SectionViewer";
import { Editable } from "./Editable";
import { Loader2 } from "lucide-react";

type Props = {
  nodeMap: NodeMap;
  id: NodeID;
  isEditable?: boolean;
};

export function Viewer({ nodeMap, id, isEditable }: Props) {
  if (isEditable) {
    return (
      <Editable id={id}>
        <InnerViewer nodeMap={nodeMap} id={id} isEditable={true} />
      </Editable>
    );
  } else {
    return <InnerViewer nodeMap={nodeMap} id={id} isEditable={false} />;
  }
}

type InnerViewerProps = {
  nodeMap: NodeMap;
  id: NodeID;
  isEditable: boolean;
};

export function InnerViewer({ nodeMap, id, isEditable }: InnerViewerProps) {
  const node = nodeMap[id];

  if (!node) {
    return (
      <Flex
        justifyContent="center"
        alignItems="center"
        w="100%"
        h="100%"
        p="s.300"
        border="3px solid #ffffff"
      >
        <Loader2 className={cx(icon(), css({ animation: "spin" }))} />
      </Flex>
    );
  }

  if (node.element.role === Role.Page) {
    return (
      <PageViewer id={node.id} nodeMap={nodeMap} isEditable={isEditable} />
    );
  } else if (node.element.role === Role.Section) {
    return (
      <SectionViewer id={node.id} nodeMap={nodeMap} isEditable={isEditable} />
    );
  } else if (node.element.role === Role.Columns) {
    return (
      <ColumnsViewer id={node.id} nodeMap={nodeMap} isEditable={isEditable} />
    );
  } else if (node.element.role === Role.Component) {
    return (
      <ComponentViewer id={node.id} nodeMap={nodeMap} isEditable={isEditable} />
    );
  } else {
    throw new Error("Unreachable");
  }
}
