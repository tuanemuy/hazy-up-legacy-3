"use client";

import { useEffect } from "react";

import { Page } from "@/components/page";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Page name="Something went wrong!">
      <Button onClick={() => reset()}>Try again</Button>
    </Page>
  );
}
