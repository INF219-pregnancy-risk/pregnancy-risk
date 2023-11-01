import "./globals.css";
import { Inter } from "next/font/google";
import { constructMetadata } from "@/utils/Metadata";
import Navbar from "@/components/layout/navbar/Navbar";
import PageWarpper from "@/components/layout/PageWarpper";
import { ThemeProvider } from "@/components/layout/providers/theme-provider";

interface RootLayoutProps extends React.HTMLAttributes<HTMLBodyElement> { }

const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetadata()

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${inter.className} md:desktop mobile scroll-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <PageWarpper>{children}</PageWarpper>
        </ThemeProvider>
      </body>
    </html>
  );
}
