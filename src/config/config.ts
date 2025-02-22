import { configDotenv } from "dotenv";

configDotenv();

export const DATABASE_URL: string = process.env.DATABASE_URL!;
export const PORT: number = parseInt(process.env.PORT!, 10) || 3000;
export const JWT_SECRET: string = process.env.JWT_SECRET!;
