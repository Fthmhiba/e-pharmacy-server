import { Router } from "express";
import { getUsers, login, signUp } from "../controller/userController.js";

const router = Router();

router.post('/signup', signUp);
router.post('/login', login);
router.get('/', getUsers)

export default router;