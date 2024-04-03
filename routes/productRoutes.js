import express, { Router } from "express";
import { createProduct, deleteProductById, getProductByCategory, getProductById, getProducts, searchProduct, updateProductById } from "../controller/productController.js";


const router = Router();

router.post('/',createProduct)
router.get('/',getProducts)
router.get("/search", searchProduct)
router.get('/:id', getProductById)
router.put("/:id",updateProductById)
router.delete("/:id",deleteProductById)
router.get('/getprdcts-bycat/:id', getProductByCategory);


export default router;

