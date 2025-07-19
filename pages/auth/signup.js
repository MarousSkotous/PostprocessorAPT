import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

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
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      // přečti to jako text
      const text = await res.text();

      // zkusti parsovat JSON; pokud to nejde, použij čistý text jako error
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = { error: text };
      }

      if (res.ok) {
        alert("Registrace proběhla úspěšně! Nyní se přihlas.");
        router.push("/auth/signin");
      } else {
        alert(data.error || "Něco se pokazilo při registraci.");
      }
    } catch (err) {
      console.error("Network/Server error:", err);
      alert("Chyba sítě nebo server není dostupný.");
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Registrace</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Jméno*</label>
          <input
            type="text"
            value={form.firstName}
            onChange={e =>
              setForm({ ...form, firstName: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Příjmení*</label>
          <input
            type="text"
            value={form.lastName}
            onChange={e =>
              setForm({ ...form, lastName: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Email*</label>
          <input
            type="email"
            value={form.email}
            onChange={e =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Firma</label>
          <input
            type="text"
            value={form.company}
            onChange={e =>
              setForm({ ...form, company: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Heslo*</label>
          <input
            type="password"
            value={form.password}
            onChange={e =>
              setForm({ ...form, password: e.target.value })
            }
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

      <p className="mt-6 text-center">
        Už máte účet?{" "}
        <Link
          href="/auth/signin"
          className="text-blue-600 hover:underline"
        >
          Přihlásit se
        </Link>
      </p>
    </div>
  );
}
