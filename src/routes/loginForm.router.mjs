import { Router } from "express";
import {loginForm} from "../controllers/loginForm.controller.mjs";
const router = Router();

router.get("/login-form", loginForm);

export default router;
