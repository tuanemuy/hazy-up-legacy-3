import { styled } from "@/lib/style/system/jsx";
import { cva } from "@/lib/style/system/css";

import NextLink from "next/link";

const recipe = cva({
  base: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    w: "s.300",
    h: "s.300",
    bg: "primary",
    color: "white",
    borderRadius: "50%"
  },
});

export const IconButton = styled("button", recipe);

export const IconLink = styled(NextLink, recipe);
