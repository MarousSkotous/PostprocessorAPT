import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  // Debug: zjistit, jakou metodu voláme
  console.log("🔥 /api/signup", req.method);

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { firstName, lastName, email, company, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    res.status(400).json({ error: "Vyplň všechny povinné údaje." });
    return;
  }

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    res.status(400).json({ error: "Email už je zaregistrován." });
    return;
  }

  const hashed = await hash(password, 10);
  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      company: company || null,
      password: hashed,
    },
  });

  res.status(201).json({ id: user.id, email: user.email });
}
