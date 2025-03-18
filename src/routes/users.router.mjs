import { Router } from "express";
import usersController from "../controllers/users.controller.mjs";

const router = Router();

router.post("/users", usersController.createUser);
router.get("/users", usersController.allUsers)
router.patch("/users/role/:id", usersController.defineRole)

export default router;
