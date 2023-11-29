import { useState, useEffect } from "react";
import { FullFile } from "core/file";
import {
  Node,
  Responsive,
  PreTemplate,
  generateNodeWithID,
  generateComponentElement,
  getValueOfScreen,
  useScreenStateContext,
  useEditorStateContext,
  useTemplatesContext,
} from "document";

import { Flex, Box } from "@/lib/style/system/jsx";
import {
  Button,
  IconButton,
  Label,
  Input,
  Textarea,
  Switch,
} from "@/components/ui";
import { ConfigField } from "./ConfigField";
import { LucideIcon, PenSquare, Search } from "lucide-react";

type Props = {
  node: Node;
};

export function ComponentConfig({ node }: Props) {
  const templates = useTemplatesContext();
  const { screen } = useScreenStateContext();
  const { updateNode, updateNodeTemporarily, setDraftNodeMap } =
    useEditorStateContext();

  const attrs = node.element.attributes;
  const templateId = attrs.templateId;
  const template = templates[templateId];
  const propsDef = template?.props;
  const initialSpacing = getValueOfScreen<number>(attrs.spacing, screen);
  const initialWidth = getValueOfScreen<number | null>(attrs.width, screen);
  const initialProps = getValueOfScreen<{
    [key: string]: string | number | boolean | FullFile | LucideIcon;
  }>(attrs.props, screen);

  const [spacing, setSpacing] = useState(initialSpacing);
  const [width, setWidth] = useState(initialWidth);
  const [href, setHref] = useState<string | null>(attrs.href);
  const [props, setProps] = useState(initialProps);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const initialSpacing = getValueOfScreen<number>(attrs.spacing, screen);
    const initialWidth = getValueOfScreen<number | null>(attrs.width, screen);
    const initialProps = getValueOfScreen<{
      [key: string]: string | number | boolean | FullFile | LucideIcon;
    }>(attrs.props, screen);

    setSpacing(initialSpacing);
    setWidth(initialWidth);
    setProps(initialProps);
  }, [screen]);

  useEffect(() => {
    setProps(attrs.props);
  }, [attrs.props]);

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <>
      <Flex alignItems="center" gap="s.200">
        <ConfigField label="上部の余白" unit="px">
          <Input
            type="number"
            min="0"
            value={spacing}
            onChange={(e) => setSpacing(parseFloat(e.target.value))}
            w="m.100"
          />
        </ConfigField>

        <ConfigField label="幅" unit="px">
          <Flex alignItems="center" gap="s.50">
            <Switch
              checked={width !== null}
              onCheckedChange={(checked) => setWidth(checked ? 300 : null)}
            />
            <Input
              type="number"
              value={width || 0}
              onChange={(e) =>
                setWidth((v) => {
                  return v !== null ? v : null;
                })
              }
              disabled={width === null}
              w="m.100"
            />
          </Flex>
        </ConfigField>

        <ConfigField label="リンク">
          <Input
            value={href || ""}
            onChange={(e) => setHref(e.target.value)}
            w="m.200"
          />
        </ConfigField>

        {propsDef.map((pd) => {
          const value = props[pd.key];
          return (
            <ConfigField key={pd.key} label="リンク">
              {pd.type === "text" && typeof value === "string" && (
                <Input
                  value={value}
                  onChange={(e) => setHref(e.target.value)}
                  w="m.200"
                />
              )}

              {pd.type === "color" && (
                <Input
                  value={href || ""}
                  onChange={(e) => setHref(e.target.value)}
                  w="m.200"
                />
              )}
            </ConfigField>
          );
        })}
      </Flex>
    </>
  );
}
