"use client";

import { useEffect, useState } from "react";
import { fetchUsers, User } from "../lib/api";
import AddUserForm from "../components/AddUserForm";
import UsersTable from "../components/UsersTable";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>
      <AddUserForm onUserAdded={loadUsers} />
      <UsersTable users={users} loading={loading} onUserDeleted={loadUsers} />
    </div>
  );
}
