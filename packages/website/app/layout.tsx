import type { Metadata } from "next";
import "@/lib/panda-css/init.css";

import { Toaster } from "@/components/ui";
import { Providers } from "./_components/Providers";

export const metadata: Metadata = {
  title: "Hazy Up",
  description: "",
};

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <html lang="ja">
      <body>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
