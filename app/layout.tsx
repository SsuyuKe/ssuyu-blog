import type { Metadata } from 'next';
import '@/assets/css/globals.css';
import { ThemeProvider } from '../lib/providers/theme-provider';
import Header from '@/components/header';
import Footer from '@/components/footer';
import ScrollProgerssBar from '@/components/scroll-progerss-bar';
import TopLoader from '@/components/top-loader';

export const metadata: Metadata = {
  title: 'SSUYUKE｜Front-end developer',
  description: 'I craft fast, user-centered, and elegant web experiences.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        <TopLoader />
        <ScrollProgerssBar />
      </body>
    </html>
  );
}
