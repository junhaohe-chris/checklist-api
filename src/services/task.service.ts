import { getTasks, createTask, deleteTask, updateTask } from '../repositories/task.repository.ts';

export const getTasksService = async () => {
  return await getTasks();
};

export const createTaskService = async (title: string, dueDate: string) => {
  return await createTask(title, dueDate);
};

export const updateTaskService = async (id: string, status: boolean) => {
  return await updateTask(id, status);
};

export const deleteTaskService = async (id: string) => {
  return await deleteTask(id);
};