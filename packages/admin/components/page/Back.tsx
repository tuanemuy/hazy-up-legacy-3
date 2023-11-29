"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function Back() {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      variant="outline"
      h="auto"
      px="s.100"
      py="s.100"
    >
      <ArrowLeft size={20} />
    </Button>
  );
}
