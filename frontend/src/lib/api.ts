export type User = {
  id: number;
  name: string;
  email: string;
};

const API_BASE = "http://localhost:8000/users/";

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

export async function createUser(name: string, email: string): Promise<User> {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.detail || "Failed to create user");
  }
  return res.json();
}

export async function deleteUser(id: number): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE}${id}`, { method: "DELETE" });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.detail || "Failed to delete user");
  }
  return res.json();
}
