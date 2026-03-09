export interface Task {
  task_id: string
  title: string
  deadline_days: number
  estimated_hours: number
  importance: number
  score?: number
  category?: string
  user_id: string
}
