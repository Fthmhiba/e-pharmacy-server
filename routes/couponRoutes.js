import { Router } from "express"
import { createCoupon, deleteCouponById, getCoupon, getCouponById, updateCouponById } from "../controller/couponController.js";

const router = Router()

router.post('/', createCoupon);
router.get('/', getCoupon);
router.get('/:id', getCouponById);
router.put('/:id', updateCouponById);
router.delete('/:id', deleteCouponById);

export default router;