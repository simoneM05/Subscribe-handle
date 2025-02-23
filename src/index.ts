import express from "express";
import cors from "cors";
import helmet from "helmet";
import UserRoutes from "./Router/user.routes";
import SubRoutes from "./Router/subscription.routes";
import { errorHandler } from "./middleware/errorHandler";
import "./config/redis"; // connect at redis client
import { PORT } from "./config/config";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());

app.use("/api/users", UserRoutes);
app.use("/api/subs", SubRoutes);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.json({ message: "API Running 🚀" });
});
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
