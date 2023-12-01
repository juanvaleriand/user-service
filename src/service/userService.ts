import { pool } from '../config/databaseConfig';

export const getUserList = async () => {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM users';
      const result = await client.query(query);
  
      return result.rows;
    } finally {
      client.release();
    }
};

export const getUserById = async (userId: string) => {
    const client = await pool.connect();
    try {
      const query = 'SELECT * FROM users WHERE id = $1';
      const result = await client.query(query, [userId]);
  
      if (result.rows.length > 0) {
        return result.rows[0];
      } else {
        return null; // User not found
      }
    } finally {
      client.release();
    }
};

export const deleteUserById = async (userId: string) => {
    const client = await pool.connect();
    try {
      const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
      const result = await client.query(query, [userId]);
  
      if (result.rows.length > 0) {
        return result.rows[0];
      } else {
        return null; // User not found
      }
    } finally {
      client.release();
    }
};