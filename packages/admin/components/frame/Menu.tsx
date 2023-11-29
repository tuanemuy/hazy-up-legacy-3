"use client";

import { usePathname } from "next/navigation";
import { styled } from "@/lib/style/system/jsx";
import { css } from "@/lib/style/system/css";

import NextLink from "next/link";
import {
  Home,
  User,
  AtSign,
  Building,
  ShoppingCart,
  LayoutTemplate,
  ScanBarcode,
} from "lucide-react";

export function Menu() {
  const selected = usePathname().split("/")[1];

  return (
    <nav>
      <styled.ul
        css={{
          "& li:not(:first-child)": {
            marginTop: "s.100",
          },
        }}
      >
        <li>
          <Link
            name="ホーム"
            href="/"
            icon={<Home size={16} />}
            selected={selected === ""}
          />
        </li>

        <li>
          <Link
            name="注文"
            href="/order"
            icon={<ShoppingCart size={16} />}
            selected={selected === "order"}
          />
        </li>

        <li>
          <Link
            name="商品"
            href="/product"
            icon={<ScanBarcode size={16} />}
            selected={selected === "package"}
          />
        </li>

        <li>
          <Link
            name="顧客"
            href="/customer"
            icon={<User size={16} />}
            selected={selected === "customer"}
          />
        </li>

        <li>
          <Link
            name="企業"
            href="/company"
            icon={<Building size={16} />}
            selected={selected === "company"}
          />
        </li>

        <li>
          <Link
            name="テンプレート"
            href="/template"
            icon={<LayoutTemplate size={16} />}
            selected={selected === "template"}
          />
        </li>

        <li>
          <Link
            name="ユーザー"
            href="/user"
            icon={<AtSign size={16} />}
            selected={selected === "user"}
          />
        </li>
      </styled.ul>
    </nav>
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
        gap: "token(sizes.s.100)",
        p: "s.200",
        pr: "m.100",
        color: selected ? "white" : "text",
        backgroundColor: selected ? "theme" : "transparent",
        lineHeight: "1.25",
        borderRadius: "token(sizes.s.50)",
        transitionDuration: ".3s",

        "& svg": {
          width: "auto",
          height: "1.5rem",
        },

        _hover: {
          color: "white",
          backgroundColor: "theme",
        },
      })}
    >
      {icon}

      <styled.span fontWeight="bold">{name}</styled.span>

      {badge && (
        <styled.span
          position="absolute"
          top="50%"
          right="token(sizes.s.200)"
          transform="translateY(-50%)"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexShrink="0"
          width="s.250"
          height="s.250"
          backgroundColor="theme.accent !important"
          color="white !important"
          fontWeight="bold"
          fontSize=".8rem"
          lineHeight="1"
          borderRadius="50%"
        >
          {badge}
        </styled.span>
      )}
    </NextLink>
  );
}
