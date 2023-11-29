import NextLink from "next/link";
import { Flex } from "@/lib/style/system/jsx";
import { Button } from "../button";

type Props = {
  count: number;
  perPage: number;
  page: number;
  baseUrl: string;
  baseSearchParams?: URLSearchParams;
};

export function Pagination({
  count,
  perPage,
  page,
  baseUrl,
  baseSearchParams,
}: Props) {
  return (
    <Flex gap="s.100">
      {[...Array(Math.ceil(count / perPage))].map((_, i) => {
        const searchParams = baseSearchParams || new URLSearchParams();
        searchParams.set("page", (i + 1).toString());

        return (
          <Button
            key={i + 1}
            h="auto"
            px="s.100"
            py="s.50"
            borderRadius="sm"
            variant={page === i + 1 ? "default" : "outline"}
          >
            <NextLink href={`${baseUrl}?${searchParams.toString()}`}>
              {i + 1}
            </NextLink>
          </Button>
        );
      })}
    </Flex>
  );
}
