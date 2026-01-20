import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Finanças Pro | Dashboard",
  description: "Gerencie suas finanças pessoais de forma inteligente",
  authors: [{ name: "Marcos Katayama" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.className} antialiased bg-slate-50 text-slate-900`}
      >
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}