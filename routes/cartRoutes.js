import { Router } from "express"
import { addToCart, listCartByUser, getById,decrementCartQuantity,incrementCartQuantity,removeCartQuantity, getAll } from "../controller/cartController.js";

const router = Router()

router.post('/addToCart', addToCart);
router.get('/viewall',getAll)
router.get('/listCart/:id', listCartByUser);

router.get('/decrement-cart/:userId/:productId', decrementCartQuantity);
router.get('/remove-cart/:userId/:productId', removeCartQuantity);
router.post('/increment-cart/:userId/:productId', incrementCartQuantity);

router.get('/:id', getById);


export default router;