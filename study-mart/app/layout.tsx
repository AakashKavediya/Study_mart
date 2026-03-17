import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/store/providers';
import { Navbar } from '@/components/shared/Navbar';
import { BottomTab } from '@/components/shared/BottomTab';

export const metadata: Metadata = {
  title: 'Study Mart - Campus Marketplace',
  description: 'Buy, sell, chat, post lost & found items, and explore college events.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen pb-16 md:pb-0">
        <Providers>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <BottomTab />
        </Providers>
      </body>
    </html>
  );
}
