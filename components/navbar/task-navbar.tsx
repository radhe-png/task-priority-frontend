"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-context"

export default function TaskNavbar() {
  const router = useRouter()
  const { isLoggedIn, username, userId, hasUserImage, logout } = useAuth()

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
        {isLoggedIn ? (
          <>
            <Link href="/dashboard" style={{ textDecoration: "none", color: "#007bff" }}>
              Dashboard
            </Link>
            <Link href="/tasks" style={{ textDecoration: "none", color: "#007bff" }}>
              Tasks
            </Link>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img src={hasUserImage && userId ? `/user-${userId}.jpg` : "/user-img.jpg"} alt="User" style={{ width: "40px", height: "40px", borderRadius: "50%" }} onError={(e) => { e.currentTarget.src = "/user-img.jpg" }} />
              <span style={{ color: "#666" }}>{username}</span>
            </div>
            <button
              onClick={logout}
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