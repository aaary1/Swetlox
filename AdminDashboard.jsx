import React, { useState } from "react";
import {
  Button,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const AdminDashboard = () => {
  // Dummy data to simulate user information
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "user1",
      email: "user1@example.com",
      role: "USER",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 2,
      username: "user2",
      email: "user2@example.com",
      role: "USER",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: 3,
      username: "admin",
      email: "admin@example.com",
      role: "ADMIN",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    {
      id: 4,
      username: "user3",
      email: "user3@example.com",
      role: "USER",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
  ]);

  // Delete a user by filtering them out of the users array
  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  // Update user role
  const updateUserRole = (id, role) => {
    setUsers(
      users.map((user) => (user.id === id ? { ...user, role: role } : user))
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-semibold text-center mb-8">
        Admin Dashboard
      </h1>
      <TableContainer component={Paper} className="shadow-lg">
        <Table>
          <TableHead className="bg-blue-500 text-white">
            <TableRow>
              <TableCell className="text-white font-bold">ID</TableCell>
              <TableCell className="text-white font-bold">Avatar</TableCell>
              <TableCell className="text-white font-bold">Username</TableCell>
              <TableCell className="text-white font-bold">Email</TableCell>
              <TableCell className="text-white font-bold">Role</TableCell>
              <TableCell className="text-white font-bold">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} hover>
                <TableCell>{user.id}</TableCell>
                <TableCell>
                  <Avatar src={user.avatar} alt={user.username} />
                </TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Select
                    value={user.role}
                    onChange={(e) => updateUserRole(user.id, e.target.value)}
                    variant="outlined"
                    className="bg-white"
                  >
                    <MenuItem value="USER">USER</MenuItem>
                    <MenuItem value="ADMIN">ADMIN</MenuItem>
                  </Select>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    onClick={() => deleteUser(user.id)}
                    className="mr-2"
                  >
                    Delete
                  </Button>
                  <Button variant="outlined" startIcon={<EditIcon />}>
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AdminDashboard;
