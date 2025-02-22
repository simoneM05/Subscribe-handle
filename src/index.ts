import express from "express";
import cors from "cors";
import helmet from "helmet";
import UserRoutes from "./Router/user.routes";
import { errorHandler } from "./middleware/errorHandler";
import "./config/redis"; // connect at redis client
import { PORT } from "./config/config";
import morgan from "morgan";
import fs from "fs";
import path from "path";

const app = express();
const logStream = fs.createWriteStream(path.join(process.cwd(), ".log"), {
  flags: "a",
});

app.use(express.json());
app.use(
  morgan('":method :url" :status - :response-time ms', {
    stream: logStream,
  })
);
app.use(helmet());
app.use(cors());

app.use("/api/users", UserRoutes);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.json({ message: "API Running 🚀" });
});
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
