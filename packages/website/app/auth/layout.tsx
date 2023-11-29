import { Flex, styled } from "@/lib/style/system/jsx";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <Flex justify="center" align="center" w="100vw" h="100dvh">
      <styled.div bg="white" boxShadow="0px 0px 16px rgba(0, 0, 0, .2)">
        <styled.header
          display="flex"
          justifyContent="center"
          p="s.200"
        >
          <styled.img src="/images/logo_hazyup.png" alt="Smart名刺" h="m.100" />
        </styled.header>

        <styled.main px="m.100" py="m.50">
          {children}
        </styled.main>
      </styled.div>
    </Flex>
  );
}
