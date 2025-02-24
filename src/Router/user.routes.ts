import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controller/user.controller";
import { authToken } from "../middleware/authTokenJwt";
import { errorHandler } from "../middleware/errorHandler";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", authToken, logoutUser);

export default router;
