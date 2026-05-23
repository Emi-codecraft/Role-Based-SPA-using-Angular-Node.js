import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { authMiddleware, adminOnly } from '../middleware/auth.middleware';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

router.get('/', userController.getUsers);
router.post('/', adminOnly, userController.createUser);
router.put('/:id', adminOnly, userController.updateUser);
router.delete('/:id', adminOnly, userController.deleteUser);

export default router;
