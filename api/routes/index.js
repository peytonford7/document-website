import { Router } from 'express';
import homeRoutes from './homeRoutes.js';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import fileRoutes from './fileRoutes.js';
import panelRoutes from './panelRoutes.js';
import boardRoutes from './boardRoutes.js';
import errRoutes from './errRoutes.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

router.use('/', homeRoutes);
router.use('/', authRoutes);
router.use(authMiddleware);
router.use('/', userRoutes);
router.use('/', fileRoutes);
router.use('/', panelRoutes);
router.use('/', boardRoutes);
router.use('/', errRoutes);

export default router;
