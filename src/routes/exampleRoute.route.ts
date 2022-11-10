/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from 'express';
const router = express.Router();

router.post(
  '/example-route',
  async (_req: Request, _res: Response, _next: NextFunction) => {
    _res
      .status(200)
      .json({ message: 'exampleRoute Route not yet implemented' });
  },
);

export default router;
