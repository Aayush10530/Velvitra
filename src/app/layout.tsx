import { AnimatedLayout } from "@/components/layout/AnimatedLayout";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <AnimatedLayout>{children}</AnimatedLayout>
      </body>
    </html>
  );
} 