import { Router } from "express";
import { createOrder, getById, getOrders, getOrdersByUserId, orderApproved, orderDelivered, orderPending, orderShipped, payment } from "../controller/orderController.js";

const router = Router();

router.post('/', createOrder);
router.post('/payment', payment)
router.get('/user/:id', getOrdersByUserId);
router.get('/get-orders/:id', getOrders);
router.post('/approved/:id', orderApproved);
router.post('/pending/:id', orderPending);
router.post('/shipped/:id', orderShipped);
router.post('/delivered/:id', orderDelivered);
router.get('/:id', getById);

export default router;