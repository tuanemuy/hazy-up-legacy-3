import { styled } from "@/lib/style/system/jsx";

import { Container, Box, Flex } from "@/lib/style/system/jsx";
import { Back } from "./Back";

type Props = {
  name: string;
  isRoot?: boolean;
  children: React.ReactNode;
};

export function Page({ name, isRoot, children }: Props) {
  return (
    <Box py="m.50">
      <Container>
        <Flex align="center" gap="s.200">
          {!isRoot && <Back />}

          <styled.h1
            fontSize="1.75rem"
            fontWeight="bold"
            color="theme"
            lineHeight="1"
          >
            {name}
          </styled.h1>
        </Flex>
      </Container>

      <Container mt="m.50">{children}</Container>
    </Box>
  );
}
