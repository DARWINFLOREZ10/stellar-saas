"use client";
import { useEffect, useState } from 'react';
import { api, setToken } from '../../lib/api';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [me, setMe] = useState<any>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token') || undefined;
    setToken(token);
    (async () => {
      try {
        const profile = await api.get('/auth/me');
        setMe(profile.data);
        const list = await api.get('/projects');
        setProjects(list.data);
      } catch {
        // If not authenticated, redirect to login
        router.push('/login');
      }
    })();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <p className="text-gray-600">Welcome {me?.name || me?.email}</p>
      <div className="mt-6 max-w-md">
        <h3 className="text-lg font-semibold mb-2">Create Project</h3>
        <form
          className="space-y-3"
          onSubmit={async (e) => {
            e.preventDefault();
            setError("");
            try {
              const res = await api.post("/projects", { name, description });
              setProjects((prev) => [res.data, ...prev]);
              setName("");
              setDescription("");
            } catch (err: any) {
              setError(err?.response?.data?.error || "Failed to create project");
            }
          }}
        >
          <input
            className="w-full border p-2"
            placeholder="Project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="w-full border p-2"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
            Create
          </button>
        </form>
      </div>
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