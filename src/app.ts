import express, { type Express, type Request, type Response } from 'express';
import { createTaskController, deleteTaskController, getTasksController, updateTaskController } from './controllers/task.controller.ts';

const app: Express = express();

app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
  res.sendStatus(200);
});

app.get('/tasks', getTasksController);
app.post('/tasks', createTaskController);
app.put('/tasks/:id', updateTaskController);
app.delete('/tasks/:id', deleteTaskController);

export default app;