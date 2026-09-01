import express, { type Express, type Request, type Response } from 'express';
import pool from './lib/db.ts';

const app: Express = express();

app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
  res.sendStatus(200);
});

app.get('/tasks', async (req: Request, res: Response) => {
  try {
    const tasks = await pool.query(
        'SELECT * FROM tasks'
    );

    res.status(200).json(tasks.rows);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/tasks', async (req: Request, res: Response) => {
  try {
    const { title, dueDate } = req.body as { title: string, dueDate: string };

    if (Number.isNaN(new Date(dueDate).getTime())) {
        return res.status(400).json({
          error: 'Invalid dueDate'
        });
      }

    const task = await pool.query(
      'INSERT INTO tasks (title, dueDate) VALUES ($1, $2) RETURNING *',
      [title, dueDate]
    );

    res.status(201).json(task.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.put('/tasks/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { status } = req.body as { status: boolean };

      if (typeof status !== 'boolean') {
        return res.status(400).json({
          error: 'status must be a boolean'
        });
      }
      
      const task = await pool.query(
        'UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *',
        [status, id]
      );

      if (task.rowCount === 0) {
        return res.status(404).json({ error: 'Task not found' });
      }

      res.status(200).json(task.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.delete('/tasks/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
  
      const task = await pool.query(
        'DELETE FROM tasks WHERE id = $1 RETURNING *',
        [id]
      );
  
      if (task.rowCount === 0) {
        return res.status(404).json({ error: 'Task not found' });
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

export default app;