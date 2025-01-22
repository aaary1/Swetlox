import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Box,
  Divider,
  IconButton,
  TextField,
} from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import SearchIcon from "@mui/icons-material/Search";
import { privateApi } from "../utils/api";

const LikeUserDialogBox = ({ open, onClose }) => {
  const [userList, setUserList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchUsers = async () => {
    try {
      const { data } = await privateApi.get("/users"); // Replace with your actual API endpoint
      setUserList(data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  useEffect(() => {
    if (open) {
      fetchUsers();
    }
  }, [open]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = userList.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      sx={{
        bgcolor: "transparent",
        color: "white",
      }}
      PaperProps={{
        style: {
          backgroundColor: "#0c0a15", // Dark background
          color: "white", // White text
          minWidth: "500px", // Minimum width
          maxWidth: "500px", // Maximum width
        },
      }}
      BackdropProps={{
        style: {
          backgroundColor: "rgba(0, 0, 0, 0)", // Darker backdrop
        },
      }}
    >
      <DialogTitle>Users List</DialogTitle>
      <DialogContent>
        {/* Search Input */}
        <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
          <TextField
            variant="outlined"
            placeholder="Search users"
            value={searchQuery}
            onChange={handleSearchChange}
            size="small"
            fullWidth
            sx={{
              input: {
                color: "white", // Text color
                backgroundColor: "#333", // Input background color
              },
            }}
            InputProps={{
              endAdornment: (
                <IconButton edge="end">
                  <SearchIcon sx={{ color: grey[400] }} />
                </IconButton>
              ),
            }}
          />
        </Box>

        {/* User List */}
        <List>
          {filteredUsers.length === 0 ? (
            <Typography variant="body2" color={grey[400]}>
              No users found
            </Typography>
          ) : (
            filteredUsers.map((user) => (
              <React.Fragment key={user.id}>
                <ListItem button>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: blue[500] }}>
                      {user.name.charAt(0).toUpperCase()}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="body1" fontWeight="bold">
                        {user.name}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color={grey[400]}>
                        {user.email}
                      </Typography>
                    }
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))
          )}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LikeUserDialogBox;
