import { prisma } from "db";

import { Suspense } from "react";
import { Page } from "@/components/page";
import { Form } from "../_components/Form";

type Props = {
  params: {
    userId: string;
  };
};

export default async function Edit({ params: { userId } }: Props) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  return (
    <Page name="ユーザー詳細">
      <Suspense fallback={<p>Loading...</p>}>
        {user && <Form user={user} readOnly={["id", "email"]} />}
      </Suspense>
    </Page>
  );
}
