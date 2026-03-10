"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from "next/navigation"

interface AuthContextType {
    isLoggedIn: boolean
    username: string
    userId: string | null
    hasUserImage: boolean
    token: string | null
    login: (token: string, username: string, userId?: string, hasUserImage?: boolean) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [username, setUsername] = useState('')
    const [userId, setUserId] = useState<string | null>(null)
    const [hasUserImage, setHasUserImage] = useState(false)
    const [token, setToken] = useState<string | null>(null)
    const router = useRouter()


    useEffect(() => {
        const storedToken = localStorage.getItem('token')
        const storedUserId = localStorage.getItem('userId')
        const storedHasUserImage = localStorage.getItem('hasUserImage') === 'true'
        
        if (storedToken) {
            setToken(storedToken)
            setUserId(storedUserId)
            setHasUserImage(storedHasUserImage)
            setIsLoggedIn(true)
            // Fetch username if needed
            fetchUserInfo(storedToken)
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
                setUserId(data.user_id || data.id)
                localStorage.setItem('userId', data.user_id || data.id)
            }
        } catch (err) {
            console.error('Failed to fetch user info:', err)
        }
    }

    function login(token: string, username: string, userId?: string, hasUserImage?: boolean) {
        // guard against undefined tokens
        if (!token) {
            console.warn('login called without token')
            return
        }

        localStorage.setItem('token', token)
        if (userId) {
            localStorage.setItem('userId', userId)
        }

        // only update image flag if provided
        if (hasUserImage !== undefined) {
            localStorage.setItem('hasUserImage', hasUserImage.toString())
            setHasUserImage(hasUserImage)
        }

        setToken(token)
        setUsername(username)
        setUserId(userId || null)
        setIsLoggedIn(true)
        if (!userId) {
            fetchUserInfo(token)
        }
    }

    function logout() {
        localStorage.removeItem('token')
        // localStorage.removeItem('userId')
        // localStorage.removeItem('hasUserImage')
        setToken(null)
        setUsername('')
        setUserId(null)
        setHasUserImage(false)
        setIsLoggedIn(false)
        router.push('/auth/login')
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, username, userId, hasUserImage, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}