"use client"

import { useEffect, useState } from "react"
import { getTasks } from "@/services/task-service"
import TaskList from "@/components/task-list"
import { Task } from "@/types/task"

function TasksSection() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")
    getTasks(token)
      .then(setTasks)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Loading tasks...</p>

  return <TaskList tasks={tasks} />
}

export default function DashboardPage() {
  return (
    <div style={{ padding: "40px" }}>

      <h1>Dashboard</h1>

      { localStorage.getItem('token') && <TasksSection />}
    </div>
  )
}
