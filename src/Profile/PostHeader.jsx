import React, { useState } from "react";
import {
  Avatar,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
  Tooltip,
} from "@mui/material";
import { red } from "@mui/material/colors";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const PostHeader = ({ userName, createdAt, profileURL }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <CardHeader
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: "8px",
        ".MuiCardHeader-subheader": {
          color: "#aaa",
        },
        p: 0,
        paddingBottom: "10px",
      }}
      avatar={
        <Avatar
          sx={{
            width: 48,
            height: 48,
            border: "2px solid #555",
          }}
          variant="circular"
        >
          <img
            src={profileURL}
            alt="User Avatar"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
        </Avatar>
      }
      title={
        <Box>
          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: "18px",
              color: "#fff",
              lineHeight: 1.2,
            }}
          >
            {userName}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#aaa",
              fontSize: "14px",
              // mt: 0.5,
            }}
          >
            {createdAt}
          </Typography>
        </Box>
      }
      action={
        <Box>
          <Tooltip title="More actions" arrow>
            <IconButton onClick={handleMenuOpen} size="large">
              <MoreHorizIcon sx={{ color: "#fff" }} />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                bgcolor: "#2d2d2d",
                color: "#fff",
                boxShadow: "0px 4px 12px rgba(0,0,0,0.5)",
                borderRadius: "8px",
                minWidth: "200px",
              },
            }}
          >
            <MenuItem
              onClick={handleMenuClose}
              sx={{
                "&:hover": {
                  bgcolor: "#444",
                },
              }}
            >
              Edit Post
            </MenuItem>
            <MenuItem
              onClick={handleMenuClose}
              sx={{
                "&:hover": {
                  bgcolor: "#444",
                },
              }}
            >
              Delete Post
            </MenuItem>
            <MenuItem
              onClick={handleMenuClose}
              sx={{
                "&:hover": {
                  bgcolor: "#444",
                },
              }}
            >
              Report Post
            </MenuItem>
          </Menu>
        </Box>
      }
    />
  );
};

export default PostHeader;
