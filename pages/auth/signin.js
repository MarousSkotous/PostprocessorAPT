import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <div className="max-w-sm mx-auto p-4">
      <h1 className="text-xl mb-4">Přihlášení</h1>
      <button
        onClick={() => signIn("credentials")}
        className="w-full p-2 bg-green-600 text-white rounded"
      >
        Přihlásit se
      </button>
    </div>
  );
}
