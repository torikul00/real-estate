"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"

export async function login(email: string, password: string) {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
    
    const data = await response.json()
    
    if (data.success) {
      toast.success("Login successful")
      return { success: true, user: data.user }
    } else {
      toast.error(data.message || "Login failed")
      return { success: false, message: data.message }
    }
  } catch (error) {
    console.error("Login error:", error)
    toast.error("An error occurred during login")
    return { success: false, message: "An error occurred during login" }
  }
}

export async function signup(name: string, email: string, password: string) {
  try {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    })
    
    const data = await response.json()
    
    if (data.success) {
      toast.success("Account created successfully")
      return { success: true, user: data.user }
    } else {
      toast.error(data.message || "Signup failed")
      return { success: false, message: data.message }
    }
  } catch (error) {
    console.error("Signup error:", error)
    toast.error("An error occurred during signup")
    return { success: false, message: "An error occurred during signup" }
  }
}

export async function logout() {
  try {
    const response = await fetch("/api/logout", {
      method: "POST",
    })
    
    const data = await response.json()
    
    if (data.success) {
      toast.success("Logged out successfully")
      return { success: true }
    } else {
      toast.error(data.message || "Logout failed")
      return { success: false, message: data.message }
    }
  } catch (error) {
    console.error("Logout error:", error)
    toast.error("An error occurred during logout")
    return { success: false, message: "An error occurred during logout" }
  }
} 