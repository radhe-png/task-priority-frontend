"use client"

import { useState } from "react"
import { Task } from "@/types/task"
import { deleteTask } from "@/services/task-service"
import { useAuth } from "@/components/auth-context"
import TaskForm from "./forms/task-form"
import Loading from "@/app/tasks/loading"

interface TaskListProps {
  tasks: Task[]
  onUpdate: () => void
}

export default function TaskList({ tasks, onUpdate }: TaskListProps) {
  const { token } = useAuth()
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [showForm, setShowForm] = useState(false)

  const handleDelete = async (taskId: string) => {
    if (!token || !confirm('Are you sure you want to delete this task?')) return

    try {
      await deleteTask(token, taskId)
      onUpdate()
    } catch (error) {
      console.error('Failed to delete task:', error)
    }
  }

  const handleEdit = (task: Task) => {
    setEditingTask(task)
    setShowForm(true)
  }

  const handleCreate = () => {
    setEditingTask(null)
    setShowForm(true)
  }

  const handleSave = () => {
    setShowForm(false)
    setEditingTask(null)
    onUpdate()
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingTask(null)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Tasks</h2>
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Add Task
        </button>
      </div>

      {showForm && (
        <TaskForm
          task={editingTask || undefined}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      {tasks.length === 0 ? (
        <p className="text-gray-500"><Loading /></p>
      ) : (
        <div className="space-y-2">
          {tasks.map(task => (
            <div key={task.task_id} className="border rounded-lg p-4 bg-white shadow-sm">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-black">{task.title}</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Category: {task.category || 'N/A'}</p>
                    <p>Deadline: {task.deadline_days} days</p>
                    <p>Estimated Hours: {task.estimated_hours}</p>
                    <p>Importance: {task.importance}/10</p>
                    {task.score && <p>Score: {task.score.toFixed(2)}</p>}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(task)}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(task.task_id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}