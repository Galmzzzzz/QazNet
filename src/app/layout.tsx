import type { Metadata } from "next";
import "./globals.css";
import { auth } from "@/auth/auth";
import Header from "@/layout/header";
import Providers from "@/layout/Providers";

export const metadata: Metadata = {
  title: "QazNet",
  description: "Social Network for kazakh",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" className="bg-black text-white antialiased transition-colors">
      <body
        suppressHydrationWarning={true}
        className="min-h-screen flex flex-col items-center font-sans text-sm sm:text-base leading-relaxed dark:bg-black dark:text-white bg-white text-black"
      >
        <Providers session={session}>
          <div className="w-full max-w-2xl border-x border-neutral-800 min-h-screen">
            <Header />
            <main>{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
