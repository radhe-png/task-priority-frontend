"use client"

import { useEffect, useState } from "react"
import { Task } from "@/types/task"
import { getTasks } from "@/services/task-service"
import TaskList from "@/components/task-list"
import { useAuth } from "@/components/auth-context"

const DEFAULT_AVATAR =
  "https://static.vecteezy.com/system/resources/previews/046/010/545/non_2x/user-icon-simple-design-free-vector.jpg"

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const { token, isLoggedIn } = useAuth()

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
  }, [token])

  return (
    <div className="container mx-auto px-4 py-8">

      <div className="flex items-center space-x-4 mb-6">
        {isLoggedIn && (
          <img
            src={DEFAULT_AVATAR}
            alt="User"
            className="w-12 h-12 rounded-full"
          />
        )}
        <h1 className="text-2xl font-bold">Tasks</h1>
      </div>

      <TaskList tasks={tasks} onUpdate={fetchTasks} />

    </div>
  )
}
