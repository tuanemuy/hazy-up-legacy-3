import { LucideIcon } from "lucide-react";
import { FullFile } from "core/file";
import {
  NodeID,
  NodeMap,
  getValueOfScreen,
  useScreenStateContext,
  useTemplatesContext,
} from "document";

import NextLink from "next/link";
import { Box } from "@/lib/style/system/jsx";

type Props = {
  id: NodeID;
  nodeMap: NodeMap;
  isEditable?: boolean;
};

export function ComponentViewer({ id, nodeMap, isEditable }: Props) {
  const { screen } = useScreenStateContext();
  const templates = useTemplatesContext();
  const node = nodeMap[id];
  const component = node.element;
  const { templateId, spacing, width, href, props } = component.attributes;
  const w = getValueOfScreen<number | null>(width, screen);
  const p = getValueOfScreen<{
    [key: string]: string | number | boolean | FullFile | LucideIcon;
  }>(props, screen);
  const template = templates[templateId];

  if (template) {
    return (
      <Box
        position="relative"
        height="100%"
        style={{
          width: w ? `${w}px` : "100%",
          paddingTop: getValueOfScreen(spacing, screen),
        }}
      >
        {href && href !== "" && !isEditable && (
          <NextLink href={href || ""} target="_blank">
            <template.f {...p} />
          </NextLink>
        )}

        {(!href || href === "" || isEditable) && <template.f {...p} />}
      </Box>
    );
  } else {
    return (
      <Box
        position="relative"
        height="100%"
        style={{
          width: w ? `${w}px` : "100%",
          paddingTop: getValueOfScreen(spacing, screen),
        }}
      >
        <p>Error</p>
      </Box>
    );
  }
}
