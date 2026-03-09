"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function TaskNavbar() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setIsLoggedIn(true)
      // Optionally fetch user info from /auth/me endpoint
      fetchUserInfo(token)
    }
  }, [])

  async function fetchUserInfo(token: string) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      if (res.ok) {
        const data = await res.json()
        setUsername(data.username || data.email)
      }
    } catch (err) {
      console.error("Failed to fetch user info:", err)
    }
  }

  function handleLogout() {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    setUsername("")
    router.push("/")
  }

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 40px",
        backgroundColor: "#f5f5f5",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Link href="/" style={{ fontSize: "20px", fontWeight: "bold", textDecoration: "none", color: "#333" }}>
        📋 Task Priority
      </Link>

      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        {isLoggedIn || localStorage.getItem('token') ? (
          <>
            <Link href="/dashboard" style={{ textDecoration: "none", color: "#007bff" }}>
              Dashboard
            </Link>
            <Link href="/tasks" style={{ textDecoration: "none", color: "#007bff" }}>
              Tasks
            </Link>
            <span style={{ color: "#666" }}>👤 {username}</span>
            <button
              onClick={handleLogout}
              style={{
                padding: "8px 16px",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/auth/login" style={{ textDecoration: "none", color: "#007bff" }}>
              Login
            </Link>
            <Link
              href="/auth/register"
              style={{
                padding: "8px 16px",
                backgroundColor: "#28a745",
                color: "white",
                borderRadius: "4px",
                textDecoration: "none",
              }}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}