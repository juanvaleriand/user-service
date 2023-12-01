import { pool } from '../config/databaseConfig';
import { User } from '../model/user';
import { generateVerificationCode } from '../helper';
import { publishToQueue } from '../helper/rabbitmq/producer/verificationProducer';
import jwt from 'jsonwebtoken';

export const loginUser = async (email: string) => {
    const client = await pool.connect();
    try {
      const verificationCode = generateVerificationCode();
  
      const updateQuery = 'UPDATE users SET verification_code = $1 WHERE email = $2 RETURNING verification_code';
      const updateResult = await client.query(updateQuery, [verificationCode, email]);
  
      if (updateResult.rows.length > 0) {
        await publishToQueue(email, verificationCode);
        return true;
      } else {
        return null;
      }
    } finally {
      client.release();
    }
};

export const registerUser = async (user: User) => {
    try {
        const verificationCode = generateVerificationCode();
        await saveUserToDatabase(user, verificationCode);
        await publishToQueue(user.email, verificationCode);
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
};

export const verifyUserCode = async (userCode: string) => {
    const client = await pool.connect();
    try {
      const selectQuery = 'SELECT * FROM users WHERE verification_code = $1';
      const selectResult = await client.query(selectQuery, [userCode]);
  
      if (selectResult.rows.length > 0) {
        const userId = selectResult.rows[0].id;
  
        // Update verification_code menjadi null
        const updateQuery = 'UPDATE users SET verification_code = null WHERE id = $1 RETURNING *';
        const updateResult = await client.query(updateQuery, [userId]);
  
        if (updateResult.rows.length > 0) {
          // Kode verifikasi cocok, buat dan kirim JWT token sebagai tanda verifikasi
          const token = jwt.sign({ userId }, 'secret_key', { expiresIn: '1h' });
          return token;
        } else {
          return null; // Gagal mengupdate verification_code
        }
      } else {
        return null; // Kode verifikasi tidak cocok atau user tidak ditemukan
      }
    } finally {
      client.release();
    }
  };

const saveUserToDatabase = async (user: User, verificationCode: string) => {
    const client = await pool.connect();
    try {
        const checkExistingUserQuery = 'SELECT * FROM users WHERE email = $1 OR username = $2';
        const existingUserResult = await client.query(checkExistingUserQuery, [user.email, user.username]);

        if (existingUserResult.rows.length > 0) {
            throw new Error('User with the same email or username already exists');
        }
        const insertUserQuery = 'INSERT INTO users (name, username, email, verification_code) VALUES ($1, $2, $3, $4)';
        const insertUserValues = [user.name, user.username, user.email, verificationCode];

        await client.query(insertUserQuery, insertUserValues);
    } finally {
        client.release();
    }
};
