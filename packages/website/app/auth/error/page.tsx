import NextLink from "next/link";
import { Flex } from "@/lib/style/system/jsx";
import { Button } from "@/components/ui";

export default function Page() {
  return (
    <>
      <p>ログインできませんでした。もう一度お試しください。</p>

      <Flex justify="center" mt="s.200">
        <Button variant="secondary" asChild>
          <NextLink href="/auth/signin">ログインページに戻る</NextLink>
        </Button>
      </Flex>
    </>
  );
}
