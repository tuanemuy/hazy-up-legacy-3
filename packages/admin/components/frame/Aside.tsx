"use client";

import { useState } from "react";

import { Box } from "@/lib/style/system/jsx";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

type Props = {
  children: React.ReactNode;
};

export function Aside({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Box
        position={{ base: "absolute", md: "relative" }}
        zIndex="2"
        flexShrink="0"
        h="100"
        px="s.200"
        py="m.50"
        bg="white"
        css={{
          boxShadow: "0px 0px 8px rgba(0, 0, 0, .05)",
          transform: {
            base: isOpen ? "translateX(0)" : "translateX(-110%)",
            md: "translateX(0)",
          },
        }}
      >
        {children}
      </Box>

      <Button
        display={{ base: "block", md: "none" }}
        position="fixed"
        zIndex="3"
        p="s.100"
        h="auto"
        bottom="token(sizes.s.100)"
        left="token(sizes.s.100)"
        onClick={() => setIsOpen((v) => !v)}
      >
        <Menu size="16" />
      </Button>
    </>
  );
}
