import { Router } from "express";
import { login, logout } from "../controllers/auth.controller.mjs";

const router = Router();

router.post("/auth/login", login);
router.get("/auth/logout", logout)

export default router;
