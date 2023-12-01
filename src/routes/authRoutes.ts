import express from 'express';
import { loginUserController, registerUserController, verifyUserCodeController } from '../controller/authController';

const router = express.Router();

router.post('/auth/login', loginUserController);
router.post('/auth/register', registerUserController);
router.post('/auth/verification', verifyUserCodeController);

export default router;
