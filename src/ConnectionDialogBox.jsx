import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  Box,
  Avatar,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { privateApi } from "./utils/api";

function ConnectionDialogBox({
  open,
  onClose,
  followers,
  onUnfollow,
  onViewProfile,
  fetchMoreFollowers, // Function to fetch more followers
  hasMoreFollowers,
  eventType,
  otherUser, // Boolean to check if there are more followers
}) {
  const user = useSelector((state) => state.userDetails.user);
  const [visibleFollowers, setVisibleFollowers] = useState(
    followers.filter((u) => u.userId != user.id)
  );

  // Function to handle loading more followers
  const loadMoreFollowers = () => {
    fetchMoreFollowers().then((newFollowers) => {
      setVisibleFollowers((prevFollowers) => [
        ...prevFollowers,
        ...newFollowers,
      ]);
    });
  };

  useEffect(() => {
    setVisibleFollowers(followers);
  }, [followers]);

  const onFollow = async (userId, isRequested) => {
    if (!isRequested) {
      await privateApi.get(`/user/following-request/${userId}`);
      setVisibleFollowers((prevFollowers) =>
        prevFollowers.map((follower) =>
          follower.userId === userId
            ? { ...follower, requestPending: true } 
            : follower
        )
      );
    }
  };
  
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          bgcolor: "#0c0a15", // Dark background
          borderRadius: "16px",
          color: "#ffffff", // White text
          border: "1px solid #1c1c1e",
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: "#1c1c1e",
          px: 3,
          py: 2,
          borderBottom: "1px solid #333",
          background: "#152331",
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{
            fontSize: "1.2rem",
            color: "#ffffff",
          }}
        >
          {eventType == "follower" ? "Followers" : "Followings"}
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            color: "white",
            "&:hover": {
              color: "white",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* Content */}
      <DialogContent
        sx={{
          maxHeight: "390px",
          overflowY: "auto",
          px: 3,
          py: 2,
          mt: 2,
        }}
        className="no-scrollbar"
        id="scrollableContent"
      >
        {otherUser ? (
          visibleFollowers.length === 0 ? (
            <Typography
              align="center"
              sx={{
                color: "#888",
                fontStyle: "italic",
              }}
            >
              {eventType == "follower"
                ? "No followers yet."
                : "No following yet."}
            </Typography>
          ) : (
            visibleFollowers.map((follower, index) => (
              <Box
                key={follower.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  py: 1.5,
                  px: 2,
                  bgcolor: index % 2 === 0 ? "#16161a" : "transparent",
                  borderRadius: "8px",
                  "&:hover": {
                    bgcolor: "#26262b",
                    cursor: "pointer",
                  },
                }}
              >
                {/* Left Section: Avatar and Info */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    src={follower.profileURL}
                    alt={follower.name}
                    sx={{
                      width: 50,
                      height: 50,
                      mr: 2,
                      border: "2px solid white",
                    }}
                  />
                  <Box>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        fontSize: "1rem",
                        color: "#ffffff",
                      }}
                    >
                      {follower.fullName}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "0.85rem",
                        color: "#aaaaaa",
                      }}
                    >
                      {follower.userName}
                    </Typography>
                  </Box>
                </Box>
                {user.id == follower.userId ? (
                  ""
                ) : (
                  <Box sx={{ display: "flex", gap: 1 }}>
                    {follower.authUserFollow ? (
                      <Button
                        onClick={() => onUnfollow(follower.userId)}
                        variant="contained"
                        sx={{
                          bgcolor: "#ff4c29", // Deep red
                          color: "#ffffff",
                          textTransform: "none",
                          fontSize: "0.85rem",
                          "&:hover": {
                            bgcolor: "#ff6e40", // Slightly lighter red
                          },
                        }}
                      >
                        Unfollow
                      </Button>
                    ) : (
                      <Button
                        onClick={() => {
                          if (!follower.requestPending) {
                            onFollow(follower.userId, follower.requestPending);
                          }
                        }}
                        variant="contained"
                        sx={{
                          bgcolor: "#ff4c29", // Deep red
                          color: "#ffffff",
                          textTransform: "none",
                          fontSize: "0.85rem",
                          "&:hover": {
                            bgcolor: "#ff6e40", // Slightly lighter red
                          },
                        }}
                      >
                        {follower.requestPending ? "Requested" : "follow"}
                      </Button>
                    )}
                    <Button
                      onClick={() => onViewProfile(follower.userId)}
                      variant="outlined"
                      sx={{
                        borderColor: "#666666", // Muted gray
                        color: "#ffffff",
                        textTransform: "none",
                        fontSize: "0.85rem",
                        "&:hover": {
                          borderColor: "#aaaaaa", // Lighter gray
                          color: "#aaaaaa",
                        },
                      }}
                    >
                      View Profile
                    </Button>
                  </Box>
                )}
                {/* Right Section: Action Buttons */}
              </Box>
            ))
          )
        ) : (
          <InfiniteScroll
            dataLength={visibleFollowers.length} // Length of the visible followers list
            next={loadMoreFollowers} // Function to load more followers
            hasMore={hasMoreFollowers} // Check if there are more followers to load
            loader={
              <Typography align="center" sx={{ color: "#888" }}>
                Loading...
              </Typography>
            }
            scrollThreshold={0.9} // Start loading when the user is 90% scrolled to the bottom
            scrollableTarget="scrollableContent"
            endMessage={
              <p
                style={{
                  textAlign: "center",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {eventType == "follower"
                  ? "That's all your fans for now. Keep inspiring!"
                  : "You’re all caught up with your inspirations!"}
              </p>
            } // Target element to be scrollable
          >
            {visibleFollowers.length === 0 ? (
              <Typography
                align="center"
                sx={{
                  color: "#888",
                  fontStyle: "italic",
                }}
              >
                {eventType == "follower"
                  ? "No followers yet."
                  : "No following yet."}
              </Typography>
            ) : (
              visibleFollowers.map((follower, index) => (
                <Box
                  key={follower.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    py: 1.5,
                    px: 2,
                    bgcolor: index % 2 === 0 ? "#16161a" : "transparent",
                    borderRadius: "8px",
                    "&:hover": {
                      bgcolor: "#26262b",
                      cursor: "pointer",
                    },
                  }}
                >
                  {/* Left Section: Avatar and Info */}
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      src={follower.profileURL}
                      alt={follower.name}
                      sx={{
                        width: 50,
                        height: 50,
                        mr: 2,
                        border: "2px solid white",
                      }}
                    />
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          fontSize: "1rem",
                          color: "#ffffff",
                        }}
                      >
                        {follower.fullName}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.85rem",
                          color: "#aaaaaa",
                        }}
                      >
                        {follower.userName}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Right Section: Action Buttons */}
                  <Box sx={{ display: "flex", gap: 1 }}>
                    {follower.authUserFollow ? (
                      eventType == "follower" ? (
                        <Button
                          onClick={() => onUnfollow(follower.userId)}
                          variant="contained"
                          sx={{
                            bgcolor: "#ff4c29", // Deep red
                            color: "#ffffff",
                            textTransform: "none",
                            fontSize: "0.85rem",
                            "&:hover": {
                              bgcolor: "#ff6e40", // Slightly lighter red
                            },
                          }}
                        >
                          Remove
                        </Button>
                      ) : (
                        <Button
                          onClick={() => onUnfollow(follower.userId)}
                          variant="contained"
                          sx={{
                            bgcolor: "#ff4c29", // Deep red
                            color: "#ffffff",
                            textTransform: "none",
                            fontSize: "0.85rem",
                            "&:hover": {
                              bgcolor: "#ff6e40", // Slightly lighter red
                            },
                          }}
                        >
                          Unfollow
                        </Button>
                      )
                    ) : (
                      <Button
                        onClick={() => onUnfollow(follower.userId)}
                        variant="contained"
                        sx={{
                          bgcolor: "#ff4c29", // Deep red
                          color: "#ffffff",
                          textTransform: "none",
                          fontSize: "0.85rem",
                          "&:hover": {
                            bgcolor: "#ff6e40", // Slightly lighter red
                          },
                        }}
                      >
                        FollowBack
                      </Button>
                    )}
                    <Button
                      onClick={() => onViewProfile(follower.userId)}
                      variant="outlined"
                      sx={{
                        borderColor: "#666666", // Muted gray
                        color: "#ffffff",
                        textTransform: "none",
                        fontSize: "0.85rem",
                        "&:hover": {
                          borderColor: "#aaaaaa", // Lighter gray
                          color: "#aaaaaa",
                        },
                      }}
                    >
                      View Profile
                    </Button>
                  </Box>
                </Box>
              ))
            )}
          </InfiniteScroll>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default ConnectionDialogBox;
