"use client";

import { useState } from "react";
import { FullFile } from "core/file";
import { PreTemplate, useTemplatesContext } from "document";
import { Text } from "./templates/Text";
import { Image } from "./templates/Image";

import { Flex, styled } from "@/lib/style/system/jsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";

type Props = {
  trigger: React.ReactNode;
  onSubmit: (template: PreTemplate<any>) => void;
};

export function SelectTemplate({ trigger, onSubmit }: Props) {
  const templates = useTemplatesContext();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent maxW="90%">
        <DialogHeader>
          <DialogTitle>コンポーネントを選択</DialogTitle>
        </DialogHeader>

        <Flex flexWrap="wrap" gap="s.200">
          {Object.keys(templates).map((key) => {
            const t = templates[key];
            return (
              <styled.button
                key={key}
                onClick={() => {
                  onSubmit(t);
                  setIsOpen(false);
                }}
                position="relative"
                cursor="pointer"
                css={{
                  "& img": {
                    border: "3px solid transparent",
                    _hover: {
                      border: "3px solid token(colors.primary)",
                    },
                  },
                }}
              >
                <styled.picture>
                  <styled.img
                    src={t.thumbnail}
                    alt=""
                    w="l.50"
                    h="l.50"
                    objectFit="cover"
                    objectPosition="50% 50%"
                  />

                  <styled.figcaption mt="s.100">{t.name}</styled.figcaption>
                </styled.picture>
              </styled.button>
            );
          })}
        </Flex>
      </DialogContent>
    </Dialog>
  );
}
