import "@/lib/style/system/styles.css";
import type { Metadata } from "next";

import { Frame } from "@/components/frame";
import { Toaster } from "@/components/ui/toast";
import { Providers } from "./_components/Providers";

export const metadata: Metadata = {
  title: "Meishi Admin",
  description: "Meishi Admin",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <Providers>
          <Frame>{children}</Frame>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
