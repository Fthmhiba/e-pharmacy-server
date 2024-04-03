import { Router } from "express"
import { createBanner2, deleteBanner2ById, getBanner2, getBanner2ById, updateBanner2ById } from "../controller/bannerController.js";

const router = Router()

router.post('/', createBanner2);
router.get('/', getBanner2);
router.get('/:id', getBanner2ById);
router.put('/:id', updateBanner2ById);
router.delete('/:id', deleteBanner2ById);


export default router;