import type { Metadata } from "next";
import "./globals.css";
import AuthWrapper from "@/components/AuthWrapper";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "jamn!",
  description: "get a job, jamn it!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthWrapper>
          {children}
          <Toaster richColors position="bottom-left" />
        </AuthWrapper>
      </body>
    </html>
  );
}
