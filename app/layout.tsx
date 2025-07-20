import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Salil Hiremath - Software Developer & Data Analyst',
  description: 'Professional portfolio showcasing software development and data analytics expertise',
  keywords: 'software developer, data analyst, powerbi, python, machine learning, web development',
  authors: [{ name: 'Salil Hiremath' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Salil Hiremath - Software Developer & Data Analyst',
    description: 'Professional portfolio showcasing software development and data analytics expertise',
    type: 'website',
    url: 'https://salilhiremath.dev',
    images: [
      {
        url: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1200',
        width: 1200,
        height: 630,
        alt: 'Salil Hiremath Portfolio'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Salil Hiremath - Software Developer & Data Analyst',
    description: 'Professional portfolio showcasing software development and data analytics expertise',
    images: ['https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1200']
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>☕</text></svg>" />
        <link rel="apple-touch-icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>☕</text></svg>" />
        <meta name="theme-color" content="#7c3aed" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}