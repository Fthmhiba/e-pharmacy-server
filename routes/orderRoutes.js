import { Router } from "express";
import { createOrder, getById, getOrders, getOrdersByUserId, orderApproved, orderDelivered, orderPending, orderShipped } from "../controller/orderController.js";

const router = Router();

router.post('/', createOrder);
router.get('/:id', getOrders);
router.post('/approved/:id', orderApproved);
router.post('/pending/:id', orderPending);
router.post('/shipped/:id', orderShipped);
router.post('/delivered/:id', orderDelivered);
router.get('/:id', getById);
router.get('/user/:id', getOrdersByUserId);

export default router;