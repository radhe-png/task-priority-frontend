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