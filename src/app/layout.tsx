import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";
import "./globals.css";
import { Container } from "./components/container";
import Image from "next/image";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

const inter = Inter({
  variable: '--font-inter',
  weight: '400',
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: '--font-inter-tight',
  weight: ['400', '700'],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HBK Weather App",
  description: "HBK Coding Exercise Challenge...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${interTight.variable} antialiased bg-[#f5f5f5]`}
      >
        <AppRouterCacheProvider options={{ key: 'css',  enableCssLayer: true }}>
          <header className="fixed top-0 left--0 right-0 w-full z-1 bg-white shadow-sm">
            <Container>
              <div className="py-4">
                <Image
                  aria-hidden
                  src="/hbk-logo--desktop.png"
                  alt="HBK Logo Desktop"
                  width={200}
                  height={28}
                />
              </div>
            </Container>
          </header>
          <Container>
            {children}
          </Container>
          <footer className="fixed bottom-0 left--0 right-0 w-full z-1 p-2 bg-white shadow-sm text-center uppercase text-[9px] border-t border-neutral-200">
            <Container>
              &copy; Hottinger Brüel & Kjær
            </Container>
          </footer>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
