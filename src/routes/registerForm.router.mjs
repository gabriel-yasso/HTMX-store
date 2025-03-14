import { Router } from "express";
import registerFormController from "../controllers/registerForm.controller.mjs";

const router = Router();

router.get("/register-form", registerFormController.getForm);

export default router;
