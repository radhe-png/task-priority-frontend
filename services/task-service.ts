import { Task } from "@/types/task"

// services/task-service.ts
export async function getTasks(token: string | null | undefined): Promise<Task[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tasks`,
    {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}

export async function createTask(token: string, task: Omit<Task, 'task_id' | 'user_id'>): Promise<Task> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tasks`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    }
  );
  if (!res.ok) throw new Error("Failed to create task");
  return res.json();
}

export async function updateTask(token: string, taskId: string, task: Partial<Omit<Task, 'task_id' | 'user_id'>>): Promise<Task> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(task),
    }
  );
  if (!res.ok) throw new Error("Failed to update task");
  return res.json();
}

export async function deleteTask(token: string, taskId: string): Promise<void> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!res.ok) throw new Error("Failed to delete task");
}