import { styled } from "@/lib/style/system/jsx";

type Props = {
  name: string;
  en: string;
  tag: string;
};

const tags: { [key: string]: any } = {
  h1: styled.h1,
  h2: styled.h2,
  h3: styled.h3,
  h4: styled.h4,
  h5: styled.h5,
  p: styled.p,
};

export function SectionTitle({ name, en, tag }: Props) {
  const Title = tags[tag] || styled.h2;
  return (
    <>
      <styled.p fontSize="1.75rem" fontWeight="bold" lineHeight="1.25">
        {en}
      </styled.p>

      <Title fontSize=".9rem" fontWeight="bold" color="muted.foreground">
        {name}
      </Title>
    </>
  );
}
