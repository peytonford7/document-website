import { Router } from 'express';
import homeRoutes from './homeRoutes.js';
import userRoutes from './userRoutes.js';
import authRoutes from './authRoutes.js';
import fileRoutes from './fileRoutes.js';
import panelRoutes from './panelRoutes.js';
import boardRoutes from './boardRoutes.js';
import errRoutes from './errRoutes.js';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.use('/', homeRoutes);
router.use('/', userRoutes);
router.use(authMiddleware);
router.use('/', authRoutes);
router.use('/', fileRoutes);
router.use('/', panelRoutes);
router.use('/', boardRoutes);
router.use('/', errRoutes);

export default router;
