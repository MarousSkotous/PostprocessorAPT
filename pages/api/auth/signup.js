import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { firstName, lastName, email, company, password } = req.body;

  // základní validace
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: "Vyplň všechny povinné údaje." });
  }

  // kontrola duplicity emailu
  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) {
    return res.status(400).json({ error: "Email už je zaregistrován." });
  }

  // zahashuj heslo
  const hashed = await hash(password, 10);

  // vytvoř uživatele
  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      company: company || null,
      password: hashed,
    },
  });

  return res.status(201).json({ id: user.id, email: user.email });
}
