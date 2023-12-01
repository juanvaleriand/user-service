import { Request, Response } from 'express';
import { deleteUserById, getUserById, getUserList } from '../service/userService';

export const getUserListController = async (req: Request, res: Response) => {
    try {
      const userList = await getUserList();
      return res.status(200).json({ data: userList });
    } catch (error) {
      console.error('Error fetching user list:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getUserByIdController = async (req: Request, res: Response) => {
    const userId = req.params.id;
  
    try {
      const userDetails = await getUserById(userId);
  
      if (userDetails) {
        return res.status(200).json(userDetails);
      } else {
        return res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteUserByIdController = async (req: Request, res: Response) => {
    const userId = req.params.id;
  
    try {
      const deleteResult = await deleteUserById(userId);
  
      if (deleteResult) {
        return res.status(200).json({ message: 'User deleted successfully' });
      } else {
        return res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
};