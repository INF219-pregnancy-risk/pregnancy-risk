import "./globals.css";
import PageWarpper from "@/components/layout/PageWrapper";
import Navbar from "@/components/layout/navbar/Navbar";
import { ThemeProvider } from "@/components/layout/providers/theme-provider";
import { constructMetadata } from "@/utils/Metadata";
import { Inter } from "next/font/google";

interface RootLayoutProps extends React.HTMLAttributes<HTMLBodyElement> {}

const inter = Inter({ subsets: ["latin"] });

export const metadata = constructMetadata();

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
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
