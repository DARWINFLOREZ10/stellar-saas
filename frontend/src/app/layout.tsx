import '../styles/globals.css';
import React from 'react';
import dynamic from 'next/dynamic';

const NavBar = dynamic(() => import('../components/NavBar'), { ssr: false });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <NavBar />
        <div className="max-w-6xl mx-auto p-6">{children}</div>
      </body>
    </html>
  );
}
