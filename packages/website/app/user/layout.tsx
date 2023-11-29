"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { css } from "@/lib/style/system/css";

import NextLink from "next/link";
import { Box, styled } from "@/lib/style/system/jsx";
import {
  Home,
  Rocket,
  PenSquare,
  Contact,
  LayoutTemplate,
  UserCog,
  CreditCard,
  ShoppingCart,
} from "lucide-react";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const iconSize = 24;
  const selected = usePathname().split("user/")[1];
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <styled.aside
        position="fixed"
        zIndex="2"
        left="0"
        top="0"
        w={{
          base: "210px",
          md: "270px",
        }}
        h="100dvh"
        py="m.50"
        bg="white"
        boxShadow="0px 0px 16px rgba(0, 0, 0, .05)"
        overflowY="scroll"
        transform={{
          base: isExpanded ? "translateX(0)" : "translateX(-110%)",
          md: "translateX(0)",
        }}
      >
        <Box
          bg="theme"
          css={{
            "& a": {
              display: "block",
              px: "m.50",
              py: "s.200",
            },
          }}
        >
          <NextLink href="/user">
            <styled.img
              src="/images/logo_hazyup.png"
              alt="Hazy Up"
              w="auto"
              h="50px"
            />
          </NextLink>
        </Box>

        <styled.nav mt="m.50">
          <ul>
            <li>
              <Link
                name="ホーム"
                href="/user"
                icon={<Home size={iconSize} />}
                selected={selected === undefined}
              />
            </li>

            <li>
              <Link
                name="プロジェクト"
                href="/user/project"
                icon={<Rocket size={iconSize} />}
                selected={selected === "mypage"}
              />
            </li>
          </ul>
        </styled.nav>

        <Box
          px="m.50"
          py="s.250"
          fontWeight="bold"
          fontSize=".8rem"
          textDecoration="underline"
        >
          <NextLink href="/auth/signout">ログアウト</NextLink>
        </Box>
      </styled.aside>

      <Box
        position="relative"
        zIndex="1"
        w="100vw"
        pl={{
          base: "0",
          md: "270px",
        }}
      >
        <styled.main w="100%">{children}</styled.main>
      </Box>
    </>
  );
}

type LinkProps = {
  name: string;
  href: string;
  icon: React.ReactNode;
  selected?: boolean;
  badge?: number;
};

function Link({ name, href, icon, selected, badge }: LinkProps) {
  return (
    <NextLink
      aria-label={name}
      href={href}
      className={css({
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: "s.150",
        px: "m.50",
        py: "s.250",
        color: selected ? "accent.foreground" : "foreground",
        bg: selected ? "accent" : "transparent",
        borderRight: selected
          ? "4px solid token(colors.primary)"
          : "4px solid transparent",
        transitionDuration: ".3s",

        _hover: {
          color: "accent.foreground",
          backgroundColor: "accent",
          borderRight: "4px solid token(colors.primary)",
        },
      })}
    >
      {icon}

      <styled.span fontWeight="bold" fontSize=".9rem">
        {name}
      </styled.span>

      {badge && (
        <styled.span
          position="absolute"
          top="50%"
          right="s.100"
          transform="translateY(-50%)"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexShrink="0"
          width="s.150"
          height="s.150"
          backgroundColor="primary !important"
          color="white !important"
          fontWeight="bold"
          fontSize=".7rem"
          lineHeight="1"
          borderRadius="50%"
        >
          {badge}
        </styled.span>
      )}
    </NextLink>
  );
}
