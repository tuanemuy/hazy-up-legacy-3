import { prisma } from "db";

import { Suspense } from "react";
import { Page } from "@/components/page";
import { Form } from "../_components/Form";

type Props = {
  params: {
    templateId: string;
  };
};

export default async function Edit({ params: { templateId } }: Props) {
  const template = await prisma.template.findUnique({
    where: { id: templateId },
    include: {
      thumbnail: {
        include: {
          assets: true,
        },
      },
    },
  });

  return (
    <Page name="テンプレート詳細">
      <Suspense fallback={<p>Loading...</p>}>
        {template && <Form template={template} readOnly={["id"]} />}
      </Suspense>
    </Page>
  );
}
