"use client"

import { useState } from "react"
import { Task } from "@/types/task"
import { createTask, updateTask } from "@/services/task-service"
import { useAuth } from "@/components/auth-context"

interface TaskFormProps {
    task?: Task
    onSave: () => void
    onCancel: () => void
}

export default function TaskForm({ task, onSave, onCancel }: TaskFormProps) {
    const { token } = useAuth()
    const [formData, setFormData] = useState({
        title: task?.title || '',
        deadline_days: task?.deadline_days || 1,
        estimated_hours: task?.estimated_hours || 1,
        importance: task?.importance || 1
    })
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!token) return

        setLoading(true)
        try {
            if (task) {
                await updateTask(token, task.task_id, formData)
            } else {
                await createTask(token, formData)
            }
            onSave()
        } catch (error) {
            console.error('Failed to save task:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg bg-gray-50">
            <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input
                    type="text"
                    value={formData.title}
                    placeholder="Enter Task name"
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Deadline (days)</label>
                <input
                    type="number"
                    value={formData.deadline_days}
                    onChange={(e) => setFormData({ ...formData, deadline_days: parseInt(e.target.value) })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
                    min="1"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Estimated Hours</label>
                <input
                    type="number"
                    value={formData.estimated_hours}
                    onChange={(e) => setFormData({ ...formData, estimated_hours: parseInt(e.target.value) })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
                    min="1"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Importance (1-10)</label>
                <input
                    type="number"
                    value={formData.importance}
                    onChange={(e) => setFormData({ ...formData, importance: parseInt(e.target.value) })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-black"
                    min="1"
                    max="10"
                    required
                />
            </div>

            <div className="flex space-x-2">
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
                >
                    {loading ? 'Saving...' : task ? 'Update' : 'Create'}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}
