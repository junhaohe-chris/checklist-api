import express, { type Express, type Request, type Response, type NextFunction } from 'express';

const app: Express = express();

app.get('/health', (req: Request, res: Response) => {
  res.sendStatus(200);
});

export default app;