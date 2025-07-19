import { useState } from "react";
import { useRouter } from "next/router";

export default function SignUp() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) router.push("/auth/signin");
    else alert((await res.json()).error);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4">
      <h1 className="text-xl mb-4">Registrace</h1>
      <input
        placeholder="Jméno"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        placeholder="Heslo"
        type="password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
        className="w-full mb-4 p-2 border rounded"
      />
      <button
        type="submit"
        className="w-full p-2 bg-blue-600 text-white rounded"
      >
        Registrovat
      </button>
    </form>
  );
}
