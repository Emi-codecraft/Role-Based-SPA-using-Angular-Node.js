import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import { UserRole } from '../models/user.model';

export const login = (req: Request, res: Response): void => {
  const { userId, password, role } = req.body;

  // Validate input
  if (!userId || !password || !role) {
    res.status(400).json({ error: 'User ID, password, and role are required.' });
    return;
  }

  if (!Object.values(UserRole).includes(role)) {
    res.status(400).json({ error: 'Invalid role. Must be Admin or GeneralUser.' });
    return;
  }

  const result = authService.login({ userId, password, role });

  if (!result) {
    res.status(401).json({ error: 'Invalid credentials. Please check your User ID, password, and role.' });
    return;
  }

  res.json(result);
};
