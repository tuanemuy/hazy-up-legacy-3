"use client";

import { signOut } from "next-auth/react";

import { Flex } from "@/lib/style/system/jsx";
import { Page } from "@/components/page";
import { Button } from "@/components/ui/button";

export default function SignOut() {
  return (
    <Page name="ログアウト" isRoot={true}>
      <Flex mt="s.300">
        <Button onClick={() => signOut()}>ログアウト</Button>
      </Flex>
    </Page>
  );
}
