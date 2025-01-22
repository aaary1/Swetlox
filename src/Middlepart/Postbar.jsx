import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import { Box, IconButton, Tooltip } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import UploadPostDialog from "./UploadPostDialog";
import { useSelector } from "react-redux";

function Postbar() {
  const [openDialog, setOpenDialog] = useState(false);
  const { user } = useSelector((state) => state.userDetails);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#152331",
        borderRadius: "30px",
        margin: "20px 0",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Avatar
        alt={user.fullName}
        src={user.profileURL}
        sx={{
          width: 56,
          height: 56,
          cursor: "pointer",
          border: "2px solid #ff3d00",
        }}
      />
      <TextField
        variant="standard"
        fullWidth
        placeholder={`What's on your mind, ${user.userName}?`}
        sx={{
          marginLeft: "20px",
          borderRadius: "30px",
          outline: "none",
          input: { color: "#fff" },
          "& .MuiInput-underline:before": { borderBottom: "1px solid #fff" },
        }}
        onClick={handleOpenDialog}
        InputProps={{
          readOnly: true,
        }}
      />
      <Tooltip title="Upload Post" arrow>
        <IconButton
          onClick={handleOpenDialog}
          sx={{
            marginLeft: "20px",
            backgroundColor: "#ff3d00",
            color: "#fff",
            padding: "12px",
            "&:hover": { backgroundColor: "#FF787C" },
          }}
        >
          <AddPhotoAlternateIcon sx={{ fontSize: 28 }} />
        </IconButton>
      </Tooltip>
      {/* Upload post dialog */}
      <UploadPostDialog open={openDialog} handleClose={handleCloseDialog} />
    </Box>
  );
}

export default Postbar;
