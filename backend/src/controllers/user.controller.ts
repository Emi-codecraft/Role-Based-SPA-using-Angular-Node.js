import { Request, Response } from 'express';
import * as userService from '../services/user.service';

export const getUsers = (req: Request, res: Response): void => {
  if (!req.user) {
    res.status(401).json({ error: 'Authentication required.' });
    return;
  }

  const users = userService.getUsers(req.user.role, req.user.id);
  res.json(users);
};

export const createUser = (req: Request, res: Response): void => {
  const { userId, password, firstName, lastName, email, role, department } = req.body;

  if (!userId || !password || !firstName || !lastName || !email || !role || !department) {
    res.status(400).json({ error: 'All fields are required: userId, password, firstName, lastName, email, role, department.' });
    return;
  }

  const result = userService.createUser({ userId, password, firstName, lastName, email, role, department });

  if ('error' in result) {
    res.status(409).json(result);
    return;
  }

  res.status(201).json(result);
};

export const updateUser = (req: Request, res: Response): void => {
  const { id } = req.params;
  const updates = req.body;

  if (!id) {
    res.status(400).json({ error: 'User ID is required.' });
    return;
  }

  const result = userService.updateUserById(id, updates);

  if (!result) {
    res.status(404).json({ error: 'User not found.' });
    return;
  }

  res.json(result);
};

export const deleteUser = (req: Request, res: Response): void => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: 'User ID is required.' });
    return;
  }

  const success = userService.deleteUserById(id);

  if (!success) {
    res.status(404).json({ error: 'User not found.' });
    return;
  }

  res.json({ message: 'User deleted successfully.' });
};
