import { assert } from 'chai';
import { describe, it } from 'mocha';
import { loginUser, registerUser, verifyUserCode } from '../src/service/authService';
import { pool } from '../src/config/databaseConfig';

describe('AuthService', () => {
  describe('registerUser and loginUser', () => {
    it('should register a new user', async () => {
      const user = {
        name: 'Juan Valerian Delima',
        username: 'juanvaleriand',
        email: 'juanvaleriand@gmail.com',
      };

      const result = await registerUser(user);

      assert.isNotNull(result);
    });

    it('should generate a verification code and publish to queue', async () => {
      const user = {
        email: 'juanvaleriand@gmail.com',
      };

      const result = await loginUser(user.email);

      assert.isTrue(result);

    });

    it('should throw an error for existing user', async () => {
      const user = {
        name: 'Bastian Cd',
        username: 'bastiancd',
        email: 'bastiancd@gmail.com',
      };

      await registerUser(user);

      try {
        await registerUser(user);

        assert.fail('Expected an error but got success');
      } catch (error) {
        assert.strictEqual(error.message, 'User with the same email or username already exists');
      }
    });
  });

  describe('loginUser', () => {
    it('should generate a verification code and publish to queue', async () => {
      const user = {
        email: 'juanvaleriand@gmail.com',
      };

      const result = await loginUser(user.email);

      assert.isTrue(result);

    });
  });

  describe('verifyUserCode', () => {
    it('should verify user code and return JWT token', async () => {
      const user = {
        name: 'Juan Valerian',
        username: 'juanvd9',
        email: 'juanvaleriandelima9@gmail.com',
      };

      // Register user untuk mendapatkan kode verifikasi
      await registerUser(user);

      const selectQuery = 'SELECT verification_code FROM users WHERE email = $1';
      const selectResult = await pool.query(selectQuery, [user.email]);
      const verificationCode = selectResult.rows[0].verification_code;

      const token = await verifyUserCode(verificationCode);

      assert.isNotNull(token);
    });

    it('should return null for invalid user code', async () => {
      const invalidCode = 'invalid_verification_code';

      const token = await verifyUserCode(invalidCode);

      assert.isNull(token);
    });
  });
});
