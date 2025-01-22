import React, { useState } from "react";
import { Avatar, Box, Button, CardContent, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { privateApi } from "./utils/api";

const GradientAvatar = styled(Avatar)(({ theme }) => ({
  background: `linear-gradient(45deg, ${
    theme.palette.primary?.main || "#1976d2"
  }, ${theme.palette.secondary?.main || "#ff4081"})`,
  color: "#fff",
  fontWeight: "bold",
}));

const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 10px",
  backgroundColor: "transparent",
  borderRadius: "8px",
  border: "1px solid #333333",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.4)",
  },
});

const ConnectionRequestHeader = ({ notification = {} }) => {
  console.log(notification);
  const [accepted, setAccepted] = useState(false);
  const handleAccept = async () => {
    await privateApi.get(`user/acceptRequest/${notification.sender.userId}`);
    setAccepted(true);
  };
  console.log(notification);
  return (
    <StyledBox>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar
          src={notification.sender?.profileURL || ""}
          alt={notification.sender?.userName || "User"}
          sx={{ marginRight: "10px", width: 50, height: 50 }}
        />
        <CardContent
          sx={{
            padding: 0,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            marginTop: "15px",
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            {notification?.sender.fullName || "Unknown User"}
          </Typography>
          <Typography variant="body2" sx={{ color: "#aaa" }}>
            sent you a connection request.
          </Typography>
        </CardContent>
      </Box>
      {!accepted ? (
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Button
            variant="contained"
            size="small"
            sx={{
              bgcolor: "#4caf50",
              "&:hover": { bgcolor: "#45a049" },
            }}
            onClick={handleAccept}
          >
            Accept
          </Button>
          <Button
            variant="outlined"
            size="small"
            sx={{
              color: "#f44336",
              borderColor: "#f44336",
              "&:hover": { bgcolor: "#f4433622", borderColor: "#f44336" },
            }}
            onClick={() =>
              console.log(`Rejected: ${notification.sender?.userName}`)
            }
          >
            Reject
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Button
            variant="contained"
            size="small"
            sx={{
              bgcolor: "#4caf50",
              "&:hover": { bgcolor: "#45a049" },
            }}
            onClick={() =>
              console.log(`Accepted: ${notification.sender?.userName}`)
            }
          >
            Accepted
          </Button>
        </Box>
      )}
    </StyledBox>
  );
};

export default ConnectionRequestHeader;
