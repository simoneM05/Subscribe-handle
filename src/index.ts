import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import UserRoutes from "./Router/user.routes";

dotenv.config;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(helmet());
app.use(cors());

app.use("/api/users", UserRoutes);

app.get("/", (req, res) => {
  res.json({ message: "API Running 🚀" });
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
