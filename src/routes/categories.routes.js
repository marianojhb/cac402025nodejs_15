import express from 'express';
import { getAllCategories,
        getCategoryById,
        createCategory,
        deleteCategory
 } from '../controllers/categories.controller.js';

const router = express.Router();

router.get('/categories', getAllCategories);

router.post('/categories', createCategory);

router.get('/categories/:id', getCategoryById);

router.delete('/categories/:id', deleteCategory);

// Luego exportas el router para usarlo en tu archivo principal (index.js)
export default router;
