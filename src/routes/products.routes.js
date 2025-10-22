// principal -> rutas -> controlador -> negocio -> modelos

import express from 'express';
const router = express.Router();

import { productsController } from '../controllers/products.controller.js';

// Most specific routes first
router.get('/products/price', productsController.getProductsByPrice);


// Dynamic parameter routes
router.route('/products/:id')
.get(productsController.getProductById)
.delete(productsController.deleteProduct);
// la otra manera -sin encadenar- es más larga y propensa a errores:
// router.get('/products/:id', getProductById);
// router.delete('/products/:id', deleteProduct);

// General routes last
router.route('/products')
.get(productsController.getAllProducts)
.post(productsController.createProduct);
// la otra manera -sin encadenar- es más larga y propensa a errores:
// router.get('/products', getAllProducts);
// router.post('/products', createProduct);

export default router;

