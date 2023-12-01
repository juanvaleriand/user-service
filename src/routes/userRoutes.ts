import express from 'express';
import { deleteUserByIdController, getUserByIdController, getUserListController } from '../controller/userController';

const router = express.Router();

router.get('/users', getUserListController);
router.get('/users/:id', getUserByIdController);
router.delete('/users/:id', deleteUserByIdController);

export default router;