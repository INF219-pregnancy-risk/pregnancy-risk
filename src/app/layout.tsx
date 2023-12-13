import "./globals.css";
import PageWrapper from "@/components/layout/PageWrapper";
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

          <PageWrapper>
            <div className="w-full flex flex-col items-center bg-destructive col-span-full fixed z-50 opacity-90 p-2 hover:opacity-100 transition text-destructive-foreground">
              <h2 className="text-sm">This page is under construction</h2>
              <p className="text-xs">Please contact us if any bugs are found</p>
            </div>
            {children}
          </PageWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
