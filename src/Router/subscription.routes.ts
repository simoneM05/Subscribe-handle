import { Router } from "express";
import {
  addSub,
  getSub,
  getSubs,
  editSub,
  deleteSub,
  statsSub,
} from "../controller/subscription.controller";
import { authToken } from "../middleware/authTokenJwt";

const router = Router();

router.post("/addSub", authToken, addSub);
router.get("/getSubs", authToken, getSubs);
router.get("/getSub", authToken, getSub);
router.put("/editSub", authToken, editSub);
router.delete("/deleteSub", authToken, deleteSub);
router.get("/statsSub", authToken, statsSub);

export default router;
