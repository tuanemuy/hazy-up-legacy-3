"use client";

import { useRouter } from "next/navigation";
import { SearchParams } from "util/router";

import { Flex } from "@/lib/style/system/jsx";
import { Button } from "@/components/ui/button";

type Props = {
  count: number;
  perPage: number;
  page: number;
  path: string;
  params: { [key: string]: any };
};

export function Pagination({ count, perPage, page, path, params }: Props) {
  const router = useRouter();

  const redirect = (p: number) => {
    params.perPage = perPage;
    params.page = p;
    const searchParams = SearchParams.fromRaw(params);

    router.push(`${path}?${searchParams.toString()}`);
  };

  return (
    <Flex gap="s.100">
      {[...Array(Math.ceil(count / perPage))].map((_, i) => {
        return (
          <Button
            key={i + 1}
            onClick={() => redirect(i + 1)}
            h="auto"
            px="s.100"
            py="s.50"
            borderRadius="sm"
            variant={page === i + 1 ? "default" : "outline"}
          >
            {i + 1}
          </Button>
        );
      })}
    </Flex>
  );
}
