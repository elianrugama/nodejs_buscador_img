import express from 'express';
import { searchImages } from '../controllers/imageController.js';

const router = express.Router();

router.get('/images/:query', searchImages);

export default router; 