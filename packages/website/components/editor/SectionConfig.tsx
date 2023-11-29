import { useState, useEffect } from "react";
import {
  Node,
  BackgroundColor,
  generateNodeWithID,
  generateSectionElement,
  hexToRgba,
  rgbaToHexOpacity,
  getValueOfScreen,
  replaceValueOfScreen,
  useScreenStateContext,
  useEditorStateContext,
} from "document";

import { Flex } from "@/lib/style/system/jsx";
import { Button, Input, Switch } from "@/components/ui";
import { ConfigField } from "./ConfigField";

type Props = {
  node: Node;
};

export function SectionConfig({ node }: Props) {
  const { screen } = useScreenStateContext();
  const { updateNode } = useEditorStateContext();

  const attrs = node.element.attributes;
  const initialPadding = getValueOfScreen<[number, number]>(
    attrs.padding,
    screen
  );
  const [topPadding, setTopPadding] = useState(initialPadding[0]);
  const [bottomPadding, setBottomPadding] = useState(initialPadding[1]);
  const [isWrapped, setIsWrapped] = useState(attrs.isWrapped);
  const [background, setBackground] = useState<BackgroundColor | null>(
    attrs.background ? rgbaToHexOpacity(attrs.background) : null
  );
  const [backgroundImage, setBackgroundImage] = useState(attrs.backgroundImage);
  const [isSemantic, setIsSemantic] = useState(attrs.isSemantic);

  useEffect(() => {
    const initialPadding = getValueOfScreen<[number, number]>(
      attrs.padding,
      screen
    );

    setTopPadding(initialPadding[0]);
    setBottomPadding(initialPadding[1]);
  }, [screen]);

  useEffect(() => {
    updateNode(
      node.id,
      generateNodeWithID({
        ...node,
        element: generateSectionElement({
          padding: replaceValueOfScreen(attrs.padding, screen, [
            topPadding,
            bottomPadding,
          ]),
          isWrapped,
          background: background
            ? hexToRgba(background.hex, background.opacity)
            : null,
          backgroundImage,
          isSemantic,
        }),
      })
    );
  }, [
    topPadding,
    bottomPadding,
    isWrapped,
    background,
    backgroundImage,
    isSemantic,
  ]);

  return (
    <Flex alignItems="center" gap="s.200">
      <ConfigField label="左右の余白">
        <Switch
          checked={isWrapped}
          onCheckedChange={(checked) => setIsWrapped(checked)}
        />
      </ConfigField>

      <ConfigField label="上部の余白" unit="px">
        <Input
          type="number"
          min="0"
          value={topPadding}
          onChange={(e) => setTopPadding(parseFloat(e.target.value))}
          w="m.100"
        />
      </ConfigField>

      <ConfigField label="下部の余白" unit="px">
        <Input
          type="number"
          min="0"
          value={bottomPadding}
          onChange={(e) => setBottomPadding(parseFloat(e.target.value))}
          w="m.100"
        />
      </ConfigField>

      <ConfigField label="背景">
        <Flex alignItems="center" gap="s.50">
          <Switch
            checked={background !== null}
            onCheckedChange={(checked) =>
              setBackground(
                checked
                  ? {
                      hex: "#ea9921",
                      opacity: 0.5,
                    }
                  : null
              )
            }
          />
          <Input
            type="color"
            value={background?.hex || "#ffffff"}
            onChange={(e) =>
              setBackground((v) => {
                return v !== null
                  ? {
                      hex: e.target.value,
                      opacity: v.opacity,
                    }
                  : null;
              })
            }
            disabled={background === null}
            w="m.50"
          />

          <Input
            type="number"
            min="0"
            max="1"
            step="0.1"
            value={background ? background.opacity : "1"}
            onChange={(e) =>
              setBackground((v) => {
                return v !== null
                  ? {
                      hex: v.hex,
                      opacity: parseFloat(e.target.value),
                    }
                  : null;
              })
            }
            disabled={background === null}
            w="m.100"
          />
        </Flex>
      </ConfigField>

      <ConfigField label="背景画像">
        <Button onClick={() => {}}>Select image</Button>
      </ConfigField>
    </Flex>
  );
}
