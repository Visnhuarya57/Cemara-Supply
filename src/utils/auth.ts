"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAuthGuard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      router.push("/admin/dashboard");
    }
  }, [router]);

  return null;
}

export function saveAuthToken(token: string, user: object) {
  localStorage.setItem("admin_token", token);
  localStorage.setItem("admin_user", JSON.stringify(user));
}

export function clearAuthToken() {
  localStorage.removeItem("admin_token");
  localStorage.removeItem("admin_user");
}

export function getAuthToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("admin_token");
  }
  return null;
}

export function getAuthUser() {
  if (typeof window !== "undefined") {
    const user = localStorage.getItem("admin_user");
    return user ? JSON.parse(user) : null;
  }
  return null;
}
