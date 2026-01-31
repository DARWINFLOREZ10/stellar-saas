"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function NavBar() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const t = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    setAuthed(!!t);
  }, []);

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    setAuthed(false);
    router.push('/login');
  };

  return (
    <nav className="w-full mb-6 border-b bg-white/70 backdrop-blur sticky top-0 z-10">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-3">
        <div className="flex gap-4 text-sm">
          <Link className="hover:underline" href="/">Home</Link>
          <Link className="hover:underline" href="/dashboard">Dashboard</Link>
        </div>
        <div className="flex gap-3 text-sm">
          {!authed ? (
            <>
              <Link className="hover:underline" href="/login">Login</Link>
              <Link className="hover:underline" href="/register">Register</Link>
            </>
          ) : (
            <button onClick={logout} className="text-red-600 hover:underline">Logout</button>
          )}
        </div>
      </div>
    </nav>
  );
}
