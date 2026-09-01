import pool from '../lib/db.ts';

export const getTasks = async () => {
  const tasks = await pool.query('SELECT * FROM tasks');
  return tasks.rows;
};

export const createTask = async (title: string, dueDate: string) => {
  const task = await pool.query('INSERT INTO tasks (title, dueDate) VALUES ($1, $2) RETURNING *', [title, dueDate]);
  return task.rows[0];
};

export const updateTask = async (id: string, status: boolean) => {
  const task = await pool.query('UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *', [status, id]);
  return task.rows[0];
};

export const deleteTask = async (id: string) => {
  const task = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
  return task.rows[0];
};