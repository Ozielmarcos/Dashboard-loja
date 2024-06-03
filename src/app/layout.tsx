import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';

const inter = Inter({ subsets: ['latin'], variable: '--inter' });

export const metadata: Metadata = {
  title: 'Dashboard - Sii',
  description: 'Dashboard de controle de loja',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={cn(
          'w-full min-h-screen font-inter antialiased',
          inter.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
