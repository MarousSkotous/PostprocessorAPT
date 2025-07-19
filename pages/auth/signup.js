import { useState } from "react";
import { useRouter } from "next/router";

export default function SignUp() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    password: "",
  });
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      alert("Registrace proběhla úspěšně! Nyní se přihlas.");
      router.push("/auth/signin");
    } else {
      const { error } = await res.json();
      alert(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Registrace</h1>

      <div>
        <label className="block mb-1">Jméno*</label>
        <input
          type="text"
          value={form.firstName}
          onChange={e => setForm({ ...form, firstName: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Příjmení*</label>
        <input
          type="text"
          value={form.lastName}
          onChange={e => setForm({ ...form, lastName: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Email*</label>
        <input
          type="email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block mb-1">Firma</label>
        <input
          type="text"
          value={form.company}
          onChange={e => setForm({ ...form, company: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-1">Heslo*</label>
        <input
          type="password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full p-3 bg-blue-600 text-white rounded-lg"
      >
        Registrovat
      </button>
    </form>
  );
}
