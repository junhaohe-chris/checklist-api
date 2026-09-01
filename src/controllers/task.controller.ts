import { type Request, type Response } from 'express';
import { getTasksService, createTaskService, updateTaskService, deleteTaskService } from '../services/task.service.ts';

export const getTasksController = async (req: Request, res: Response) => {
  try {
    const tasks = await getTasksService();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createTaskController = async (req: Request, res: Response) => {
  try {
    const { title, dueDate } = req.body;

    if (Number.isNaN(new Date(dueDate).getTime())) {
      return res.status(400).json({
        error: 'Invalid dueDate'
      });
    }
    
    const task = await createTaskService(title, dueDate);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateTaskController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const { status } = req.body;

    if (typeof status !== 'boolean') {
      return res.status(400).json({
        error: 'status must be a boolean'
      });
    }

    const task = await updateTaskService(id, status);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteTaskController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const task = await deleteTaskService(id);
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(204).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};