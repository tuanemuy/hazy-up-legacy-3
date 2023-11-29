import { useState, useEffect } from "react";
import {
  Node,
  generateNodeWithID,
  generateColumnsElement,
  getValueOfScreen,
  replaceValueOfScreen,
  useScreenStateContext,
  useEditorStateContext,
} from "document";

import { Flex } from "@/lib/style/system/jsx";
import {
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Switch,
} from "@/components/ui";
import { ConfigField } from "./ConfigField";

type Props = {
  node: Node;
};

export function ColumnsConfig({ node }: Props) {
  const { screen } = useScreenStateContext();
  const { updateNode } = useEditorStateContext();

  const attrs = node.element.attributes;

  const initialSpacing = getValueOfScreen<number>(attrs.spacing, screen);
  const initialRepeat = getValueOfScreen<number>(attrs.repeat, screen);
  const initialGap = getValueOfScreen<number>(attrs.gap, screen);

  const [spacing, setSpacing] = useState(initialSpacing);
  const [justifyContent, setJustifyContent] = useState(attrs.justifyContent);
  const [alignItems, setAlignItems] = useState(attrs.alignItems);
  const [repeat, setRepeat] = useState(initialRepeat);
  const [gap, setGap] = useState(initialGap);
  const [flexWrap, setFlexWrap] = useState(attrs.flexWrap);

  useEffect(() => {
    const initialSpacing = getValueOfScreen<number>(attrs.spacing, screen);
    const initialRepeat = getValueOfScreen<number>(attrs.repeat, screen);
    const initialGap = getValueOfScreen<number>(attrs.gap, screen);

    setSpacing(initialSpacing);
    setRepeat(initialRepeat);
    setGap(initialGap);
  }, [screen]);

  useEffect(() => {
    updateNode(
      node.id,
      generateNodeWithID({
        ...node,
        element: generateColumnsElement({
          spacing: replaceValueOfScreen(attrs.spacing, screen, spacing),
          justifyContent,
          alignItems,
          repeat: replaceValueOfScreen(attrs.repeat, screen, repeat),
          gap: replaceValueOfScreen(attrs.gap, screen, gap),
          flexWrap,
        }),
      })
    );
  }, [spacing, justifyContent, alignItems, repeat, gap, flexWrap]);

  return (
    <Flex alignItems="center" gap="s.200">
      <ConfigField label="上部の余白">
        <Input
          type="number"
          min="0"
          value={spacing}
          onChange={(e) => setSpacing(parseFloat(e.target.value))}
          w="m.100"
        />
      </ConfigField>

      <ConfigField label="水平位置">
        <Select
          value={justifyContent}
          onValueChange={(value) => setJustifyContent(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="選択してください" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="flex-start">左</SelectItem>
            <SelectItem value="flex-end">右</SelectItem>
            <SelectItem value="center">中央</SelectItem>
            <SelectItem value="space-between">等間隔</SelectItem>
            <SelectItem value="stretch">自動</SelectItem>
          </SelectContent>
        </Select>
      </ConfigField>

      <ConfigField label="垂直位置">
        <Select
          value={alignItems}
          onValueChange={(value) => setAlignItems(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="選択してください" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="flex-start">上</SelectItem>
            <SelectItem value="flex-end">下</SelectItem>
            <SelectItem value="center">中央</SelectItem>
            <SelectItem value="stretch">自動</SelectItem>
          </SelectContent>
        </Select>
      </ConfigField>

      <ConfigField label="等分">
        <Flex alignItems="center" gap="s.100">
          <Switch
            checked={repeat > -1}
            onCheckedChange={(checked) => setRepeat(checked ? 3 : -1)}
          />
          {repeat > -1 && (
            <Input
              type="number"
              min="1"
              value={repeat || 1}
              onChange={(e) => setRepeat(parseInt(e.target.value, 10))}
              w="m.100"
            />
          )}
        </Flex>
      </ConfigField>

      <ConfigField label="間隔">
        <Input
          type="number"
          min="0"
          value={gap}
          onChange={(e) => setGap(parseFloat(e.target.value))}
          w="m.100"
        />
      </ConfigField>

      <ConfigField label="折り返し">
        <Switch
          checked={flexWrap}
          onCheckedChange={(checked) => setFlexWrap(checked)}
        />
      </ConfigField>
    </Flex>
  );
}
