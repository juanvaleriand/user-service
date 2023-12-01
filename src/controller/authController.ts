import { Request, Response } from 'express';
import { loginUser, registerUser, verifyUserCode } from '../service/authService';
import { User } from '../model/user';
import { validateLoginRequest, validateRegistrationRequest, validateVerificationCodeRequest } from '../request/authRequest';

export const loginUserController = async (req: Request, res: Response) => {  
    try {
        await validateLoginRequest(req);

        const email = req.body.email;
        const verificationCode = await loginUser(email);
        
        if (verificationCode) {
            return res.status(200).json({ message: 'Login successful. Verification email sent.' });
        } else {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
    } catch (error) {
        if (Array.isArray(error) && error.length > 0) {
            return res.status(400).json({ errors: error });
        }

        console.error('Error logging in user:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const registerUserController = async (req: Request, res: Response) => {
  try {
    await validateRegistrationRequest(req);

    const userData: User = req.body;
    await registerUser(userData);

    return res.status(201).json({ message: 'Registration successful. Verification email sent.' });
  } catch (error) {
    if (Array.isArray(error) && error.length > 0) {
      return res.status(400).json({ errors: error });
    }

    if (error instanceof Error && error.message.includes('User with the same email or username already exists')) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    console.error('Error during registration:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const verifyUserCodeController = async (req: Request, res: Response) => {
    try {
        await validateVerificationCodeRequest(req)
        const userCode = req.body.code;
        const verificationResult = await verifyUserCode(userCode);
        
        if (verificationResult) {
            return res.status(200).json({ message: 'Verification successful', token: verificationResult });
        } else {
            return res.status(400).json({ error: 'Verification failed' });
        }
    } catch (error) {
        if (Array.isArray(error) && error.length > 0) {
            return res.status(400).json({ errors: error });
        }
        console.error('Error verifying user code:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

