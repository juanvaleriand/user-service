import { body, validationResult } from 'express-validator';
import { Request } from 'express';

const validateRegistrationRequest = async (req: Request) => {
    await Promise.all([
      body('name').trim().isLength({ min: 3 }).withMessage('Name must be at least 3 characters long').run(req),
      body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long').run(req),
      body('email').trim().isEmail().withMessage('Invalid email address').run(req),
    ]);
  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Validasi gagal, lemparkan array pesan kesalahan validasi
      return Promise.reject(errors.array());
    }
  
    // Validasi berhasil
    return Promise.resolve();
};
  
const validateLoginRequest = async (req: Request) => {
    await Promise.all([
        body('email').trim().isEmail().withMessage('Invalid email address').run(req),
    ]);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Validasi gagal, lemparkan array pesan kesalahan validasi
        return Promise.reject(errors.array());
    }
    
    // Validasi berhasil
    return Promise.resolve();
};

const validateVerificationCodeRequest = async (req: Request) => {
    await Promise.all([
        body('code').trim().isLength({ min: 6, max: 6 }).withMessage('Code must be at least 6 characters long').run(req),
    ]);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Validasi gagal, lemparkan array pesan kesalahan validasi
        return Promise.reject(errors.array());
    }
    
    // Validasi berhasil
    return Promise.resolve();
};

export {
    validateLoginRequest,
    validateRegistrationRequest,
    validateVerificationCodeRequest
}