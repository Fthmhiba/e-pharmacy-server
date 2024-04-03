import { Router } from "express"
import { createBanner, deleteBannerById, getBanner,  getBannerById, updateBannerById } from "../controller/bannerController.js";

const router = Router()

router.post('/', createBanner);
router.get('/', getBanner);

router.get('/:id', getBannerById);

router.put('/:id', updateBannerById);
router.delete('/:id', deleteBannerById);

export default router;