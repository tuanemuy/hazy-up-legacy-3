"use client";

import { useRouter } from "next/navigation";

import { Table } from "./Table";

export function View() {
  const router = useRouter();

  return (
    <Table
      actions={[
        {
          name: "Edit",
          variant: "outline",
          action: (id: string) => {
            router.push(`/user/${id}`);
          },
        },
      ]}
    />
  );
}
