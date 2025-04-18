"use client"; // Declares this as a client-side component in Next.js

// Importing core dependencies and required icons
import { useState, useEffect, useCallback } from "react";
import { AxiosError } from "axios";
import { PlusIcon, Pencil, Trash2, CheckIcon, XIcon } from "lucide-react";

// API and custom utilities
import api from "@/lib/api";
import { RoleGuard } from "@/components/common/role-guard";
import { useErrorHandler } from "@/hooks/use-error-handler";

// UI components
import {
  Button,
  Input,
  Label,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Spinner,
  ErrorMessage,
} from "@/components/ui";

// Type definitions for user data and form handling
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  role: "ADMIN" | "USER";
  status: boolean;
  lastActivateAt: string;
}

interface UserFormData extends Partial<User> {
  password?: string;
}

export default function UsersPage() {
  // State variables for managing user data and UI state
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState<UserFormData>({});
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newUserData, setNewUserData] = useState<UserFormData>({
    role: "USER",
  });

  const handleError = useErrorHandler(); // Custom error handler hook

  // Fetch all users from the API
  const fetchUsers = useCallback(async () => {
    try {
      const response = await api.get("/user");
      setUsers(response.data);
      setError("");
    } catch (err) {
      const error = err as AxiosError<{ message?: string; error?: string }>;
      if (!handleError(error)) {
        setError(error.message || "Failed to fetch users");
      }
    } finally {
      setLoading(false);
    }
  }, [handleError]);

  // Initial fetch of users on component mount
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // API call to create a new user
  async function createUser(data: UserFormData) {
    try {
      await api.post("/user", { ...data, role: data.role || "USER" });
      await fetchUsers();
      setIsCreateDialogOpen(false);
      setNewUserData({ role: "USER" });
    } catch (err) {
      const error = err as AxiosError<{ message?: string; error?: string }>;
      if (!handleError(error)) {
        setError(error.message || "Failed to create user");
      }
    }
  }

  // API call to update existing user
  async function updateUser(id: number, data: UserFormData) {
    try {
      await api.put(`/user/${id}`, data);
      fetchUsers();
      setIsEditing(false);
      setEditFormData({});
    } catch (err) {
      const error = err as AxiosError<{ message?: string; error?: string }>;
      if (!handleError(error)) {
        setError(error.message || "Failed to update user");
      }
    }
  }

  // API call to toggle user status (active/inactive)
  async function updateUserStatus(id: number, status: boolean) {
    try {
      await api.patch(`/user/${id}/status`, { status });
      fetchUsers();
    } catch (err) {
      const error = err as AxiosError<{ message?: string; error?: string }>;
      if (!handleError(error)) {
        setError(error.message || "Failed to update user status");
      }
    }
  }

  // API call to delete a user
  async function deleteUser(id: number) {
    try {
      await api.delete(`/user/${id}`);
      fetchUsers();
    } catch (err) {
      const error = err as AxiosError<{ message?: string; error?: string }>;
      if (!handleError(error)) {
        setError(error.message || "Failed to delete user");
      }
    }
  }

  // Filter users based on search input (by name or email)
  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(search.toLowerCase()) ||
      user.lastName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()),
  );

  // Show error UI if API request fails
  if (error) {
    return (
      <RoleGuard allowedRoles={["ADMIN"]}>
        <div className="p-6">
          <ErrorMessage message={error} onRetry={fetchUsers} />
        </div>
      </RoleGuard>
    );
  }

  return (
    <RoleGuard allowedRoles={["ADMIN"]}>
      <div className="p-6 space-y-6">
        {/* Page header with title and search bar */}
        <div className="flex justify-between items-center gap-4 flex-col sm:flex-row">
          <h1 className="text-2xl font-semibold">Users</h1>
          <div className="flex items-center gap-4">
            <Input
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-[200px]"
            />

            {/* Dialog trigger for creating a new user */}
            <Dialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>
                  <PlusIcon className="w-4 h-4 mr-2" />
                  New User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New User</DialogTitle>
                </DialogHeader>

                {/* Form fields for new user creation */}
                <div className="grid gap-4 py-4">
                  {/* First Name */}
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={newUserData.firstName || ""}
                      onChange={(e) =>
                        setNewUserData({
                          ...newUserData,
                          firstName: e.target.value,
                        })
                      }
                    />
                  </div>
                  {/* Last Name */}
                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={newUserData.lastName || ""}
                      onChange={(e) =>
                        setNewUserData({
                          ...newUserData,
                          lastName: e.target.value,
                        })
                      }
                    />
                  </div>
                  {/* Email */}
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newUserData.email || ""}
                      onChange={(e) =>
                        setNewUserData({
                          ...newUserData,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                  {/* Mobile */}
                  <div className="grid gap-2">
                    <Label htmlFor="mobile">Mobile</Label>
                    <Input
                      id="mobile"
                      type="tel"
                      value={newUserData.mobile || ""}
                      onChange={(e) =>
                        setNewUserData({
                          ...newUserData,
                          mobile: e.target.value,
                        })
                      }
                    />
                  </div>
                  {/* Password */}
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      onChange={(e) =>
                        setNewUserData({
                          ...newUserData,
                          password: e.target.value,
                        })
                      }
                    />
                  </div>
                  {/* Role Selector */}
                  <div className="grid gap-2">
                    <Label htmlFor="role">Role</Label>
                    <select
                      id="role"
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors"
                      value={newUserData.role || "USER"}
                      onChange={(e) =>
                        setNewUserData({
                          ...newUserData,
                          role: e.target.value as "ADMIN" | "USER",
                        })
                      }
                    >
                      <option value="USER">User</option>
                      <option value="ADMIN">Admin</option>
                    </select>
                  </div>
                  {/* Submit button */}
                  <Button
                    onClick={() => createUser(newUserData)}
                    className="w-full mt-4"
                  >
                    Create User
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* User table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Show loading skeleton */}
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell colSpan={6}>
                        <div className="flex justify-center py-4">
                          <Spinner size={24} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                : filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      {/* Name column (editable) */}
                      <TableCell>
                        {isEditing && selectedUser?.id === user.id ? (
                          <div className="flex gap-2">
                            <Input
                              value={editFormData.firstName || user.firstName}
                              onChange={(e) =>
                                setEditFormData({
                                  ...editFormData,
                                  firstName: e.target.value,
                                })
                              }
                              className="w-[100px]"
                            />
                            <Input
                              value={editFormData.lastName || user.lastName}
                              onChange={(e) =>
                                setEditFormData({
                                  ...editFormData,
                                  lastName: e.target.value,
                                })
                              }
                              className="w-[100px]"
                            />
                          </div>
                        ) : (
                          `${user.firstName} ${user.lastName}`
                        )}
                      </TableCell>

                      {/* Email column (editable) */}
                      <TableCell>
                        {isEditing && selectedUser?.id === user.id ? (
                          <Input
                            value={editFormData.email || user.email}
                            onChange={(e) =>
                              setEditFormData({
                                ...editFormData,
                                email: e.target.value,
                              })
                            }
                          />
                        ) : (
                          user.email
                        )}
                      </TableCell>

                      {/* Mobile column (editable) */}
                      <TableCell>
                        {isEditing && selectedUser?.id === user.id ? (
                          <Input
                            value={editFormData.mobile || user.mobile}
                            onChange={(e) =>
                              setEditFormData({
                                ...editFormData,
                                mobile: e.target.value,
                              })
                            }
                          />
                        ) : (
                          user.mobile
                        )}
                      </TableCell>

                      {/* Role column (editable) */}
                      <TableCell>
                        {isEditing && selectedUser?.id === user.id ? (
                          <select
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors"
                            value={editFormData.role || user.role}
                            onChange={(e) =>
                              setEditFormData({
                                ...editFormData,
                                role: e.target.value as "ADMIN" | "USER",
                              })
                            }
                          >
                            <option value="USER">User</option>
                            <option value="ADMIN">Admin</option>
                          </select>
                        ) : (
                          user.role
                        )}
                      </TableCell>

                      {/* Status toggle button */}
                      <TableCell>
                        <Button
                          variant={user.status ? "default" : "destructive"}
                          size="sm"
                          onClick={() =>
                            updateUserStatus(user.id, !user.status)
                          }
                        >
                          {user.status ? "Active" : "Inactive"}
                        </Button>
                      </TableCell>

                      {/* Edit and Delete actions */}
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {isEditing && selectedUser?.id === user.id ? (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  updateUser(user.id, editFormData);
                                }}
                              >
                                <CheckIcon className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setIsEditing(false);
                                  setEditFormData({});
                                }}
                              >
                                <XIcon className="w-4 h-4" />
                              </Button>
                            </>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedUser(user);
                                setIsEditing(true);
                              }}
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteUser(user.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </RoleGuard>
  );
}
