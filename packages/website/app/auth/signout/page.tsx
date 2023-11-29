"use client";

import { signOut } from "next-auth/react";

import { Flex } from "@/lib/style/system/jsx";
import { Button } from "@/components/ui";

export default function Page() {
  return (
    <Flex align="center" gap="m.50">
      <Button
        fontWeight="bold"
        variant="secondary"
        onClick={() =>
          signOut({
            callbackUrl: "/user",
          })
        }
      >
        ログアウトする
      </Button>
    </Flex>
  );
}
