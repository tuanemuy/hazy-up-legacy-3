"use client";

import { Box, Flex, styled } from "@/lib/style/system/jsx";
import { Label } from "@/components/ui";

type Props = {
  label: string;
  unit?: string;
  children: React.ReactNode;
};

export function ConfigField({ label, unit, children }: Props) {
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      h="m.100"
    >
      <Flex
        flexShrink="1"
        flexGrow="1"
        h="s.200"
        justifyContent="center"
        alignItems="center"
        gap="s.50"
        css={{
          "& input": {
            h: "auto",
            p: ".25rem",
          },
          "& input[type=color]": {
            h: "m.50",
          },
        }}
      >
        <Flex
          justifyContent="center"
          alignItems="center"
          flexShrink="1"
          flexGrow="1"
        >
          {children}
        </Flex>
        {unit && (
          <styled.p flexShrink="0" flexGrow="0" fontSize=".7rem">
            {unit}
          </styled.p>
        )}
      </Flex>

      <Label
        flexShrink="0"
        flexGrow="0"
        mt="s.50"
        fontSize=".7rem"
        textAlign="center"
      >
        {label}
      </Label>
    </Flex>
  );
}
