import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  IconButton,
  Box,
  Typography,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import ConnectionRequestHeader from "./ConnectionRequestHeader";
import NotificationHeader from "./NotificationHeader";
import { privateApi } from "./utils/api";

function NotificationDialog() {
  const [open, setOpen] = useState(false);
  const [showMoreFollowRequests, setShowMoreFollowRequests] = useState(false);
  const [showMoreInteractions, setShowMoreInteractions] = useState(false);
  const [connectionRequest, setConnectionRequest] = useState([]);

  const notifications = useSelector((state) => state.webSocket.notifications);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Fetch pending connection requests from the API
  const handleFetchPendingConnectionRequest = async () => {
    const { data } = await privateApi.get("/user/get-all-pending-request");
    setConnectionRequest(data); // Set the connection requests fetched from the API
  };

  useEffect(() => {
    if (open) {
      handleFetchPendingConnectionRequest(); // Fetch data when the dialog is opened
    }
  }, [open]);

  // Deduplicate connection requests
  const allConnectionRequests = [
    ...connectionRequest,
    ...notifications.filter(
      (notification) => notification.notificationType === "CONNECTION_REQUEST"
    ),
  ];

  const uniqueConnectionRequests = Array.from(
    new Set(allConnectionRequests.map((request) => request.id))
  ).map((id) => allConnectionRequests.find((request) => request.id === id));

  // Deduplicate interaction notifications (likes, comments, etc.)
  const interactionNotifications = notifications.filter(
    (notification) => notification.notificationType !== "CONNECTION_REQUEST"
  );

  const uniqueInteractionNotifications = Array.from(
    new Set(interactionNotifications.map((interaction) => interaction.id))
  ).map((id) =>
    interactionNotifications.find((interaction) => interaction.id === id)
  );

  // Show More functionality
  const initialDisplayCount = 3; // Number of items to show initially
  const followRequestsToDisplay = showMoreFollowRequests
    ? uniqueConnectionRequests
    : uniqueConnectionRequests.slice(0, initialDisplayCount);

  const interactionsToDisplay = showMoreInteractions
    ? uniqueInteractionNotifications
    : uniqueInteractionNotifications.slice(0, initialDisplayCount);

  return (
    <>
      {/* Notification Icon */}
      <Box sx={{ padding: "0 20px", cursor: "pointer" }} onClick={handleOpen}>
        <img
          className="w-[30px]"
          src="src/image/Notification.png"
          alt="Notifications"
        />
      </Box>

      {/* Notification Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            bgcolor: "#152331",
            color: "#fff",
          }}
        >
          Notifications
          <IconButton onClick={handleClose}>
            <CloseIcon sx={{ color: "white" }} />
          </IconButton>
        </DialogTitle>
        <hr />
        <DialogContent
          sx={{
            bgcolor: "#0c0a15",
            color: "#fff",
            overflowY: "auto",
            maxHeight: "500px",
            "&::-webkit-scrollbar": {
              display: "none", // Hides scrollbar in webkit browsers (Chrome, Safari)
            },
            scrollbarWidth: "none", // Set fixed height for the content
          }}
        >
          {/* Follow Requests Section */}
          {uniqueConnectionRequests.length <= 0 &&
            uniqueInteractionNotifications.length <= 0 && (
              <p
                style={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                No notifications yet
              </p>
            )}

          {uniqueConnectionRequests.length > 0 && (
            <Box sx={{ marginBottom: "20px" }}>
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "#fff",
                  marginBottom: "10px",
                }}
              >
                Follow Requests
              </Typography>
              <List>
                {followRequestsToDisplay.map((notificationMetaData) => (
                  <div className="w-[100%] my-2" key={notificationMetaData.id}>
                    <ConnectionRequestHeader
                      notification={notificationMetaData}
                    />
                  </div>
                ))}
              </List>
              {uniqueConnectionRequests.length > initialDisplayCount && (
                <Button
                  sx={{ color: "#fff", textTransform: "none" }}
                  onClick={() =>
                    setShowMoreFollowRequests(!showMoreFollowRequests)
                  }
                >
                  {showMoreFollowRequests ? "Show Less" : "Show More"}
                </Button>
              )}
            </Box>
          )}

          {/* Interaction Notifications Section (Likes, Comments on Reels, Posts, Stories) */}
          {uniqueInteractionNotifications.length > 0 && (
            <Box>
              <Typography
                sx={{ fontWeight: "bold", color: "#fff", marginBottom: "10px" }}
              >
                Interactions
              </Typography>
              <List>
                {interactionsToDisplay.map((notificationMetaData) => (
                  <div className="w-[100%] my-2" key={notificationMetaData.id}>
                    <NotificationHeader
                      profileURL={notificationMetaData.sender.profileURL}
                      userName={notificationMetaData.sender.userName}
                      message={notificationMetaData.message}
                      // Handle displaying appropriate image depending on the type
                      rightImage={
                        notificationMetaData.notificationType === "STORY"
                          ? notificationMetaData.entityURL // Display story image
                          : notificationMetaData.notificationType === "REEL"
                          ? notificationMetaData.entityURL // Display reel thumbnail
                          : notificationMetaData.notificationType === "POST"
                          ? notificationMetaData.entityURL // Display post image
                          : "/default-image.png" // Fallback for unknown types
                      }
                    />
                  </div>
                ))}
              </List>
              {uniqueInteractionNotifications.length > initialDisplayCount && (
                <Button
                  sx={{ color: "#fff", textTransform: "none" }}
                  onClick={() => setShowMoreInteractions(!showMoreInteractions)}
                >
                  {showMoreInteractions ? "Show Less" : "Show More"}
                </Button>
              )}
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default NotificationDialog;
