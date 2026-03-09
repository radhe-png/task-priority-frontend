import "./globals.css"
import TaskNavbar from "@/components/navbar/task-navbar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body>
        <TaskNavbar />
        {children}
      </body>
    </html>
  )
}
