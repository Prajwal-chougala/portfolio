import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from './components/layout/navbar';
import Footer from './components/layout/footer';
import AntigravityBackground from './components/effects/antigravity-background';
import SplashScreen from './components/effects/splash-screen';

const inter = Inter({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Prajwal Chougala | AI Engineer & Full-Stack Developer',
  description:
    'Portfolio of Prajwal Chougala, building autonomous AI agents, intelligent systems, and scalable full-stack web applications.',
  keywords: [
    'Prajwal Chougala',
    'AI Engineer',
    'Full-Stack Developer',
    'Agentic AI',
    'MERN stack',
    'Portfolio',
  ],
  authors: [{ name: 'Prajwal Chougala' }],
  creator: 'Prajwal Chougala',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://prajwalchougala.dev',
    title: 'Prajwal Chougala | AI Engineer & Full-Stack Developer',
    description:
      'Portfolio of Prajwal Chougala, building autonomous AI agents, intelligent systems, and scalable full-stack web applications.',
    siteName: 'Prajwal Chougala Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prajwal Chougala | AI Engineer & Full-Stack Developer',
    description:
      'Portfolio of Prajwal Chougala, building autonomous AI agents, intelligent systems, and scalable full-stack web applications.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-deep text-text-body relative">
        <SplashScreen>
          <AntigravityBackground />
          <Navbar />
          <main className="flex-1 w-full relative z-10">{children}</main>
          <Footer />
        </SplashScreen>
      </body>
    </html>
  );
}

