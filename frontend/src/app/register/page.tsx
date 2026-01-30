"use client";
import { useState } from 'react';
import { api } from '../../lib/api';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/auth/register', { name, email, password });
      router.push('/login');
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Create account</h2>
      <form className="space-y-3" onSubmit={onSubmit}>
        <input className="w-full border p-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="w-full border p-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full border p-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Register</button>
      </form>
    </div>
  );
}