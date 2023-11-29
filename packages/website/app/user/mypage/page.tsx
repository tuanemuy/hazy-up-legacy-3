export const dynamic = "force-dynamic";

import { auth } from "auth";
import { ensurePageExists } from "@/actions/page";

import { View } from "./_components/View";

export default async function Page() {
  const session = await auth();
  const { page } = await ensurePageExists({ userId: session!.user.id });

  return <View page={page!} />;
}
