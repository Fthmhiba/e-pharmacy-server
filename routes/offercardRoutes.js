import { Router } from "express"
import { createCard, deleteCardById, getCard, getCardById, updateCardById } from "../Controller/offerCardController.js";

const router = Router()

router.post('/', createCard);
router.get('/', getCard);
router.get('/:id', getCardById);
router.put('/:id', updateCardById);
router.delete('/:id', deleteCardById);

export default router;