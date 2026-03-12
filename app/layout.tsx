'use client'

import "./globals.css"
import TaskNavbar from "@/components/navbar/task-navbar"
import { AuthProvider } from "@/components/auth-context"
import { useEffect } from "react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // prevent to use developer mode and right click
  useEffect(() => {
    const handleKeyDown = (e: any) => {
      if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I") || (e.ctrlKey && e.shiftKey && e.key === "C") || (e.ctrlKey && e.shiftKey && e.key === "J")) {
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    const handleContextMenu = (e: any) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);
    return () => document.removeEventListener('contextmenu', handleContextMenu);
  }, []);
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
