"use client";

import { signOut } from "next-auth/react";
import { styled } from "@/lib/style/system/jsx";

import NextLink from "next/link";
import { Flex, Box } from "@/lib/style/system/jsx";
import { Aside } from "./Aside";
import { Menu } from "./Menu";

type Props = {
  children: React.ReactNode;
};

export function Frame({ children }: Props) {
  return (
    <Flex h="dvh">
      <Aside>
        <NextLink href="/">
          <Flex justify="center">
            <styled.img
              src="/images/logo_meishi.png"
              alt="Meishi"
              w="m.200"
              h="auto"
            />
          </Flex>
        </NextLink>

        <Box mt="m.50">
          <Menu />
        </Box>

        <Box mt="m.50">
          <styled.button
            onClick={() => signOut()}
            px="s.200"
            color="theme"
            fontSize=".9rem"
            fontWeight="bold"
            textDecoration="underline"
            cursor="pointer"
          >
            ログアウト
          </styled.button>
        </Box>
      </Aside>

      <styled.main h="100%" w="100%" flexShrink="2" overflowY="scroll">
        {children}
      </styled.main>
    </Flex>
  );
}
