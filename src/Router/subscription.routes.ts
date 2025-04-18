import { Router } from "express";
import {
  addSub,
  getSub,
  getSubs,
  editSub,
  deleteSub,
} from "../controller/subscription.controller";
import { authToken } from "../middleware/authTokenJwt";

const router = Router();

router.post("/addSub", authToken, addSub);
router.get("/getSubs", authToken, getSubs);
router.get("/getSub/:id", authToken, getSub);
router.put("/editSub/:id", authToken, editSub);
router.delete("/deleteSub/:id", authToken, deleteSub);

export default router;
