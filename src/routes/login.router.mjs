import { Router } from "express";
import { login } from "../controllers/login.controller.mjs";

const router = Router();

router.post("/login", login);

export default router;
