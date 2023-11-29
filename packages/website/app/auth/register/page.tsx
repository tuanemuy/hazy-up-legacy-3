export const dynamic = "force-dynamic";

import { cache } from "react";
import { redirect } from "next/navigation";
import { auth } from "auth";
import { getUser } from "@/actions/user";

import { Form } from "./_components/Form";

export default async function Page() {
  const session = await auth();
  const { user } = await cache(async () => getUser({ id: session!.user.id }))();

  if (!user) {
    throw new Error("NotFound");
  }

  if (user.customer) {
    redirect("/user");
  }

  return <Form user={user} />;
}
