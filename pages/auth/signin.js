// pages/auth/signin.js
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function SignIn() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
      callbackUrl: "/",
    });
    if (res.error) {
      setError(res.error);
    } else {
      window.location.href = res.url;
    }
  }

  return (
    <div className="max-w-sm mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Přihlášení</h1>
      {error && <p className="mb-4 text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Heslo</label>
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
          className="w-full p-2 bg-green-600 text-white rounded"
        >
          Přihlásit se
        </button>
      </form>
      <p className="mt-6 text-center">
        Ještě nemáte účet?{" "}
        <Link href="/auth/signup">
          <a className="text-blue-600 hover:underline">Registrovat se</a>
        </Link>
      </p>
    </div>
  );
}
