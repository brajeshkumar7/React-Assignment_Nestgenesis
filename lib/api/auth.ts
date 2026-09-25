import api from "@/lib/api/axios";
import type { User } from "@/types/auth";

export async function login(username: string, password: string) {
  const { data } = await api.post<User>("/auth/login", { username, password, expiresInMins: 60 });
  return data;
}
