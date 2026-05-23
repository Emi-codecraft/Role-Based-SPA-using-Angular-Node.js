import { Request, Response, NextFunction } from 'express';

export const delayMiddleware = (
  _req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const delay = Math.floor(Math.random() * 3000) + 2000; // 2-5 seconds
  console.log(`⏳ Simulating ${delay}ms API delay...`);
  setTimeout(() => next(), delay);
};
