import { Router } from "express";
import usersController from "../controllers/users.controller.mjs";

const router = Router();

router.post("/users", usersController.createUser);

export default router;
