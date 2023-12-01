import { assert } from 'chai';
import { describe, it } from 'mocha';
import { getUserList, getUserById, deleteUserById } from '../src/service/userService';

describe('UserService', () => {
  it('should get user list', async () => {
    // Tambahkan pengguna ke database untuk pengujian
    const result = await getUserList();
    assert.isArray(result);
  });

  it('should get user by ID', async () => {
    // Tambahkan pengguna ke database untuk pengujian
    const userId = '1'; // Gantilah dengan ID pengguna yang valid
    const result = await getUserById(userId);
    assert.isObject(result);
  });

  it('should delete user by ID', async () => {
    // Tambahkan pengguna ke database untuk pengujian
    const userId = '1'; // Gantilah dengan ID pengguna yang valid
    const result = await deleteUserById(userId);
    assert.isObject(result);
  });
});
