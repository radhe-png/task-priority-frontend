"use client"

import { useEffect, useState } from "react"
import { getTasks } from "@/services/task-service"
import TaskList from "@/components/task-list"
import { Task } from "@/types/task"
import { useAuth } from "@/components/auth-context"
import Loading from "../tasks/loading"

function TasksSection() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const { token } = useAuth()

  const fetchTasks = async () => {
    if (token) {
      try {
        const fetchedTasks = await getTasks(token)
        setTasks(fetchedTasks)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [token])

  if (loading) return <Loading />

  return <TaskList tasks={tasks} onUpdate={fetchTasks} />
}

export default function DashboardPage() {
  const { isLoggedIn, userId, hasUserImage } = useAuth()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center space-x-4 mb-6">
        {isLoggedIn && (
          <img src={hasUserImage && userId ? `/user-${userId}.jpg` : "/user-img.jpg"} alt="User Image" className="w-16 h-16 rounded-full" onError={(e) => { e.currentTarget.src = "/user-img.jpg" }} />
        )}
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      { isLoggedIn && <TasksSection />}
    </div>
  )
}
