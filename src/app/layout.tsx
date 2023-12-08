import { getCurrentUser } from "@/actions";
import { NavigationBar } from "@/components/navigation";
import { NextAuthProvider, ThemeProvider, ToasterProvider } from "@/providers/";
import "@/styles/globals.css";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NextAuth Boilerplate",
  description: "Next Auth Boilerplate with Tailwind CSS",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextAuthProvider>
            <ToasterProvider />
            <NavigationBar user={user as any} />
            {children}
          </NextAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
