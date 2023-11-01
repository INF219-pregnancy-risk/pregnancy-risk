import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { constructMetadata } from "@/utils/Metadata";

interface RootLayoutProps extends React.HTMLAttributes<HTMLBodyElement> { }


const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetadata()

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={cn(
        "flex min-h-screen-nav overflow-y-scroll flex-col items-center gap-6 scroll-hidden",
        inter.className
      )}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
