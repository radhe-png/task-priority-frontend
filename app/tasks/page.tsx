"use client"

import { useEffect, useState } from "react"
import { Task } from "@/types/task"
import { getTasks } from "@/services/task-service"
import TaskList from "@/components/task-list"
import { useAuth } from "@/components/auth-context"

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { token } = useAuth()

  const fetchTasks = async () => {
    if (token) {
      try {
        const fetchedTasks = await getTasks(token)
        setTasks(fetchedTasks)
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [token]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Tasks</h1>
      <TaskList tasks={tasks} onUpdate={fetchTasks} />
    </div>
  )
}
