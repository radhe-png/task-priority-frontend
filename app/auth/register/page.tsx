"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

const ROLES = ["user", "admin"]

export default function RegisterPage() {
    const router = useRouter()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState(ROLES[0])
    const [error, setError] = useState("")

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault()

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username,
                        email,
                        password,
                        role
                    }),
                }
            )

            if (!res.ok) {
                throw new Error("Invalid credentials")
            }

            const data = await res.json()

            // store token temporarily
            localStorage.setItem("token", data.access_token)

            router.push("/auth/login")
        } catch (err: any) {
            setError(err.message)
        }
    }

    return (
        <div style={{ padding: "40px" }}>
            <h1>Register</h1>

            <form onSubmit={handleRegister}>
                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div>
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        {ROLES.map((r) => (
                            <option key={r} value={r}>
                                {r}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit">Register</button>
            </form>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    )
}
