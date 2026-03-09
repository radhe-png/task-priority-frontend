"use client"

import { Task } from "@/types/task"

export default function TaskList({ tasks }: { tasks: Task[] }) {
  return (
    tasks.length === 0 ? (
      <p>You don't have any task</p>
    ) : (
      <ul>
        {tasks.map(task => (
          <li key={task.task_id}>
            {task.title} - {task.category} - {task.score}
          </li>
        ))}
      </ul>

    )
  )
}