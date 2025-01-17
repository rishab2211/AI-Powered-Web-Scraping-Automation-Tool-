import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import AppProvider from "@/components/provider/AppProvider";



export const metadata: Metadata = {
  title: "Workflow automation",
  description: "workflow animation tool",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider afterSignOutUrl="/sign-in">
      <html lang="en" suppressHydrationWarning>
        <body>
          <AppProvider>
            <main>
              {children}
              <Toaster richColors closeButton />
            </main>
          </AppProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
