export const dynamic = "force-dynamic";

import { cache } from "react";
import { getUser } from "@/actions/user";
import { auth } from "auth";

import { Container, Box, Flex, Card, styled } from "@/lib/style/system/jsx";
import { SectionTitle, IconLink } from "@/components/ui";
import { Profile } from "./_components/Profile";
import { PenSquare } from "lucide-react";

export default async function Page() {
  const session = await auth();
  const { user } = await cache(async () => getUser({ id: session!.user.id }))();

  if (!user) {
    throw new Error("NotFound");
  }

  return (
    <Container py="m.50">
      {(() => {
        const width = "calc((100% - token(sizes.s.300)) / 2)";
        return (
          <Flex gap="s.300" position="relative" w="100%">
            <Box w={width}>
              <Box>
                <SectionTitle name="プロフィール" en="Profile" tag="h3" />
                <Card mt="s.300" p="s.300">
                  <Profile user={user} />

                  <IconLink
                    href="/user/profile"
                    position="absolute"
                    top="s.150"
                    right="s.150"
                  >
                    <PenSquare size={16} />
                  </IconLink>
                </Card>
              </Box>

              <Box mt="m.50">
                <SectionTitle name="注文履歴" en="Orders" tag="h3" />
                <Card mt="s.300" p="s.200">
                  <p>注文一覧</p>
                </Card>
              </Box>
            </Box>

            <Box w={width}>
              <SectionTitle name="マイページ" en="MyPage" tag="h3" />
              <Card mt="s.300">
                <styled.img
                  src="/images/mypage_sample.jpg"
                  alt=""
                  w="100%"
                  h="auto"
                />

                <IconLink
                  href="/page"
                  position="absolute"
                  top="s.150"
                  right="s.150"
                >
                  <PenSquare size={16} />
                </IconLink>
              </Card>
            </Box>
          </Flex>
        );
      })()}
    </Container>
  );
}
