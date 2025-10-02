"use client";

import { useState } from "react";
import { User, updateUser, deleteUser } from "../lib/api";

type Props = {
  users: User[];
  loading: boolean;
  onUserDeleted: () => void;
  onUserUpdated: () => void;
};

export default function UsersTable({ users, loading, onUserDeleted, onUserUpdated }: Props) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(id);
      onUserDeleted();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Unknown error occurred.");
    }
  };

  const startEdit = (user: User) => {
    setEditingId(user.id);
    setEditName(user.name);
    setEditEmail(user.email);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditEmail("");
  };

  const saveEdit = async (id: number) => {
    try {
      await updateUser(id, editName, editEmail);
      onUserUpdated();
      cancelEdit();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Unknown error occurred.");
    }
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b text-left">ID</th>
            <th className="py-2 px-4 border-b text-left">Name</th>
            <th className="py-2 px-4 border-b text-left">Email</th>
            <th className="py-2 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-4">
                No users found
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{user.id}</td>
                <td className="py-2 px-4 border-b">
                  {editingId === user.id ? (
                    <input
                      className="border px-2 py-1 w-full"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  {editingId === user.id ? (
                    <input
                      className="border px-2 py-1 w-full"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td className="py-2 px-4 border-b space-x-2">
                  {editingId === user.id ? (
                    <>
                      <button
                        className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        onClick={() => saveEdit(user.id)}
                      >
                        Save
                      </button>
                      <button
                        className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                        onClick={cancelEdit}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() => startEdit(user)}
                      >
                        Update
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
