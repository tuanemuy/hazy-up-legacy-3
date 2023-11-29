"use client";

import { NodeID, NodeMap, PreTemplate } from "document";

import { IconButton } from "@/components/ui";
import { Center } from "@/lib/style/system/jsx";
import { Viewer } from "./Viewer";
import { Toolbar } from "./Toolbar";
import { ZoomableFrame } from "./ZoomableFrame";
import {
  ScreenStateContextProvider,
  EditorStateContextProvider,
  TemplatesProvider,
  useEditorStateContext,
} from "document";
import { Plus } from "lucide-react";

type Props = {
  initialNodeMap: NodeMap;
  rootId: NodeID;
  templates: { [key: string]: PreTemplate<any> };
  onUpdate: (nodeMap: NodeMap) => void;
};

export function Editor({ initialNodeMap, rootId, templates, onUpdate }: Props) {
  return (
    <EditorStateContextProvider
      initialNodeMap={initialNodeMap}
      rootId={rootId}
      onUpdate={onUpdate}
    >
      <ScreenStateContextProvider>
        <TemplatesProvider templates={templates}>
          <Toolbar />

          <InnerEditor rootId={rootId} />
        </TemplatesProvider>
      </ScreenStateContextProvider>
    </EditorStateContextProvider>
  );
}

type InnerEditorProps = {
  rootId: NodeID;
};

function InnerEditor({ rootId }: InnerEditorProps) {
  const { nodeMap } = useEditorStateContext();
  const { focus, addSectionAndUpdate } = useEditorStateContext();

  return (
    <ZoomableFrame onBlankClicked={() => focus(rootId)} initialScale={0.5}>
      <Viewer id={rootId} nodeMap={nodeMap} isEditable={true} />

      <Center py="s.200">
        <IconButton
          aria-label="Add row"
          onClick={(e) => {
            addSectionAndUpdate();
            e.stopPropagation();
          }}
        >
          <Plus />
        </IconButton>
      </Center>
    </ZoomableFrame>
  );
}
