import { getUserServerSession } from "@/actions";
import { AppBar } from "@/components/appBar";
import { NextAuthProvider, ThemeProvider, ToasterProvider } from "@/providers/";
import "@/styles/globals.css";
import { Session } from "next-auth";
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
  const { user } = ((await getUserServerSession()) as Session) || {};

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextAuthProvider>
            <ToasterProvider />
            <AppBar user={user} />
            {children}
          </NextAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
