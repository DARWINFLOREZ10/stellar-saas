"use client";
import { useEffect, useState } from 'react';
import { api, setToken } from '../../lib/api';

export default function DashboardPage() {
  const [me, setMe] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token') || undefined;
    setToken(token);
    (async () => {
      try {
        const profile = await api.get('/auth/me');
        setMe(profile.data);
        const list = await api.get('/projects');
        setProjects(list.data);
      } catch {}
    })();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <p className="text-gray-600">Welcome {me?.name || me?.email}</p>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">My Projects</h3>
        <ul className="list-disc ml-6">
          {projects.map((p) => (
            <li key={p.id}>{p.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}