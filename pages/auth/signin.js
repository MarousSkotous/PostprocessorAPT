import { signIn } from "next-auth/react";
import Link from "next/link";

export default function SignIn() {
  return (
    <div className="max-w-sm mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Přihlášení</h1>

      {/* Tlačítko pro přihlášení */}
      <button
        onClick={() => signIn("credentials")}
        className="w-full p-2 bg-green-600 text-white rounded"
      >
        Přihlásit se
      </button>

      {/* ODKAZ NA REGISTRACI */}
      <p className="text-center">
        Ještě nemáte účet?{" "}
        <Link href="/auth/signup">
          <a className="text-blue-600 hover:underline">Registrovat se</a>
        </Link>
      </p>
    </div>
  );
}
