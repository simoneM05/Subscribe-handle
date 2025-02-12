import { Router } from "express";
import {
  addSub,
  getSub,
  getSubs,
  editSub,
  deleteSub,
  statsSub,
} from "../controller/subscription.controller";

const router = Router();

router.post("/addSub", addSub);
router.get("/getSubs", getSubs);
router.get("/getSub", getSub);
router.put("/editSub", editSub);
router.delete("/deleteSub", deleteSub);
router.get("/statsSub", statsSub);

export default router;
