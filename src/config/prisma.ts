import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("✅ Database connesso con successo!");
  } catch (error) {
    console.error("❌ Errore di connessione al database:", error);
    process.exit(1); // Termina l'app se la connessione fallisce
  }
};

connectDB();
