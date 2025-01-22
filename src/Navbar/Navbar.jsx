import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { privateApi } from "../utils/api";
import {
  Box,
  Avatar,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  List,
  IconButton,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchUser from "./SearchUser";
import NotificationDialog from "../Notification";
import LogoutIcon from "@mui/icons-material/Logout";

function Navbar() {
  const { user } = useSelector((state) => state.userDetails);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [searchData, setSearchData] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    window.location.reload();
  };

  const handleSearchUser = async (query) => {
    if (query) {
      const { data } = await privateApi.get(`/user/search-user?query=${query}`);
      const filterData = data.filter((q) => q.email !== user.email);
      setSearchData(filterData);
    } else {
      setSearchData(null);
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "#152331",
        width: "100%",
        height: "80px",
        display: "flex",
        flexDirection: "row",
        px: 16,
        position: "fixed",
        top: 0,
        zIndex: 1000,
        alignItems: "center",
      }}
    >
      {/* Logo */}
      <Box sx={{ display: "flex", alignItems: "center", mr: "auto" }}>
        <img
          src="src/image/logo2.png"
          alt="Logo"
          style={{ width: "200px", cursor: "pointer" }}
        />
      </Box>

      {/* Centered Search Bar */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <TextField
          placeholder="Search users..."
          variant="outlined"
          onChange={(e) => handleSearchUser(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#fff" }} />
              </InputAdornment>
            ),
            sx: {
              bgcolor: "#000",
              borderRadius: "50px",
              color: "#fff",
              width: "700px",
              maxWidth: "700px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "transparent",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ff3d00",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ff3d00",
              },
            },
          }}
          sx={{
            input: { color: "#fff" },
          }}
        />
        {searchData && (
          <List
            sx={{
              position: "absolute",
              top: "100%",
              width: "700px",
              maxHeight: "200px",
              bgcolor: "#000",
              borderRadius: "10px",
              overflowY: "auto",
              zIndex: 2000,
            }}
          >
            {searchData.map((user) => (
              <SearchUser user={user} />
            ))}
          </List>
        )}
      </Box>

      <NotificationDialog></NotificationDialog>
      {/* Profile and Logout */}
      <Box sx={{ display: "flex", alignItems: "center", ml: "auto" }}>
        <IconButton onClick={handleMenuOpen} sx={{ color: "#fff" }}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              bgcolor: "#152331",
              color: "#fff",
            },
          }}
        >
        <MenuItem
            component={NavLink}
            to="/profile"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Avatar
              src={user.profileURL}
              sx={{
                width: 30,
                height: 30,
              }}
            />
            <Typography>Profile</Typography>
          </MenuItem>
          <MenuItem
            onClick={handleLogout}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <LogoutIcon></LogoutIcon>
            <Typography>Logout</Typography>
          </MenuItem>
          
        </Menu>
      </Box>
    </Box>
  );
}

export default Navbar;
