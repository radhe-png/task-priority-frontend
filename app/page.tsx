import Link from "next/link"

export default function HomePage() {

  return (
    <div style={{ padding: "40px" }}>
      <h1>Task Priority App</h1>

      <p>Welcome to the Task Priority Dashboard</p>

      <div style={{ marginTop: "20px" }}>
        <Link href="/dashboard">Go to Dashboard</Link>
      </div>

      <div style={{ marginTop: "10px" }}>
        <Link href="/tasks">View Tasks</Link>
      </div>

    </div>
  )
}
