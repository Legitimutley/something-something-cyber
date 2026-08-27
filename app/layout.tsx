import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Something Something Cyber',
  description: 'Technology, security, projects, and honest notes from learning in public.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
