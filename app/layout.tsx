import "./globals.css"
import TaskNavbar from "@/components/navbar/task-navbar"
import { AuthProvider } from "@/components/auth-context"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <TaskNavbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
