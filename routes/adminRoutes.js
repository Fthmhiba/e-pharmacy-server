import express, { Router } from "express";
import { register, login,getAdmin,getAllAdmin, updateAdminProfile } from "../controller/adminController.js";
import { verifyAdminToken } from "../middleware/AdminToken.js";


const router = Router()

router.post('/register', register);
router.post('/login', login);
router.get('/:id', verifyAdminToken, getAdmin);
router.get('/',verifyAdminToken, getAllAdmin);
router.put('/profile', verifyAdminToken, updateAdminProfile);

export default router;

