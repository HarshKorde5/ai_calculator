import { Router } from "express";
import { handleImageAnalysis } from "../controllers/caculate.controller.js";

const router = Router();


router.route("/").post(handleImageAnalysis);

export default router;