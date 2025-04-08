import express from "express";
import cors from "cors";
import helmet from "helmet";
import UserRoutes from "./Router/user.routes";
import SubRoutes from "./Router/subscription.routes";
import { errorHandler } from "./middleware/errorHandler";
import "./config/redis"; // connect at redis client
import { PORT } from "./config/config";
import morgan from "morgan";
import { logStream } from "./services/log.service";
import rateLimit from "express-rate-limit";

export const app = express();

// Imposta un rate limit globale
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limita a 100 richieste per ogni IP
  message: "Too many requests from this IP, please try again later.",
  headers: true,
});

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("combined", { stream: logStream }));

// Applica il rate limit globalmente a tutte le rotte
app.use(limiter);

app.use("/api/users", UserRoutes);
app.use("/api/subs", SubRoutes);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.json({ message: "API Running 🚀" });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
