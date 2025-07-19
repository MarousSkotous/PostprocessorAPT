import { getSession } from "next-auth/react";

export default function Home({ user }) {
  return (
    <div className="p-8">
      <h1>Vítej, {user.name || user.email}!</h1>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (!session) {
    return { redirect: { destination: "/auth/signin", permanent: false } };
  }
  return { props: { user: session.user } };
}
