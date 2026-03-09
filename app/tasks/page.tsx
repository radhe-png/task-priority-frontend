"use client"

import { useEffect, useState } from "react"
import { Task } from "@/types/task"
import { getTasks } from "@/services/task-service"
import TaskList from "@/components/task-list"

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    getTasks(token).then(setTasks).catch(console.error);
  }, []);

  return (
    <div>
      <h1>Tasks</h1>
      <TaskList tasks={tasks} />
    </div>
  )
}
