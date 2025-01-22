import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Box,
  Avatar,
  LinearProgress,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SendIcon from "@mui/icons-material/Send";
import { privateApi } from "../utils/api";
import { toast, ToastContainer } from "react-toastify";
import StoryCommentLikeDialog from "../story/StoryCommentLikeDialog";

const StoryDialogBox = ({ open, handleClose, story, isSelfStory }) => {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0); // Current progress for the active story
  const [liked, setLiked] = useState(false); // Like state for the current story
  const [comment, setComment] = useState(""); // Current comment text
  const timerRef = useRef(null);
  const videoRef = useRef(null); // Ref for video element
  const [commentLikeDialogOpen, setCommentLikeDialogOpen] = useState(false);
  const isVideo = useRef(false); // Track if the current story is a video

  const totalStories = story.storyDtoList.length;

  // Start progress for the current story
  const startProgress = (duration) => {
    setProgress(0);
    const intervalDuration = duration / 100; // Interval to update progress bar

    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timerRef.current);
          handleNextStory();
          return 0;
        }
        return prev + 1;
      });
    }, intervalDuration);
  };

  // Stop progress when switching stories or dialog closes
  const stopProgress = () => {
    clearInterval(timerRef.current);
    setProgress(0);
  };

  // Pause or resume video playback
  const toggleVideoPlayback = (play) => {
    if (isVideo.current && videoRef.current) {
      play ? videoRef.current.play() : videoRef.current.pause();
    }
  };

  // Go to next story
  const handleNextStory = () => {
    stopProgress();
    if (currentStoryIndex < totalStories - 1) {
      setCurrentStoryIndex((prevIndex) => prevIndex + 1);
      setLiked(false); // Reset like state for the new story
      setComment(""); // Reset comment for the new story
    } else {
      handleClose(); // Close when all stories are viewed
    }
  };

  // Go to previous story
  const handlePrevStory = () => {
    stopProgress();
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex((prevIndex) => prevIndex - 1);
      setLiked(false); // Reset like state for the previous story
      setComment(""); // Reset comment for the previous story
    }
  };

  const handleComment = async () => {
    console.log(story.storyDtoList[currentStoryIndex].id);
    if (comment.length > 0) {
      const commentRequestPayload = {
        entityId: story.storyDtoList[currentStoryIndex].id,
        entityType: "STORY",
        commentContent: comment,
      };
      try {
        await privateApi.post("/story/comment", commentRequestPayload);
        toast.success("Commented");
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Something went wrong. Try again.",
          {
            position: "top-right",
            autoClose: 5000,
            theme: "colored",
          }
        );
      }
    }
  };

  // Handle story changes dynamically
  useEffect(() => {
    if (open && !commentLikeDialogOpen) {
      const currentStory = story.storyDtoList[currentStoryIndex];
      if (currentStory.mediaType === "VIDEO") {
        isVideo.current = true;
        videoRef.current.load(); // Reload video when switching stories
      } else {
        isVideo.current = false;
        startProgress(currentStory?.duration * 1000 || 5000); // Default 5s for images
      }
    }

    return () => stopProgress();
  }, [currentStoryIndex, open, commentLikeDialogOpen]);

  // Start video progress after metadata loads
  const handleVideoLoaded = () => {
    const videoDuration = videoRef.current.duration * 1000 || 20000; // Default 20s
    startProgress(videoDuration);
  };

  const handleLike = async () => {
    const id = story.storyDtoList[currentStoryIndex].id;
    await privateApi.post(`/story/like/${id}`);
  };
  const handleUnlike = async () => {
    const id = story.storyDtoList[currentStoryIndex].id;
    await privateApi.post(`/story/unlike/${id}`);
  };

  const toggleLike = () => {
    if (!liked) {
      handleLike();
    } else {
      handleUnlike();
    }
    setLiked((prev) => !prev);
  };

  const handleOpenCommentLikeDialogBox = () => {
    setCommentLikeDialogOpen(true);
  };
  const handleCloseCommentLikeDialogBox = () => {
    setCommentLikeDialogOpen(false);
  };

  return (
    <>
      <ToastContainer />
      <StoryCommentLikeDialog
        open={commentLikeDialogOpen}
        onClose={() => {
          toggleVideoPlayback(true); // Resume video playback
          startProgress(5000); // Resume story progress
          handleCloseCommentLikeDialogBox();
        }}
        storyId={story.storyDtoList[currentStoryIndex].id}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            width: "350px",
            height: "700px",
            backgroundColor: "black",
            position: "relative",
          },
        }}
      >
        <DialogTitle sx={{ padding: "8px", backgroundColor: "black" }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center">
              <Avatar
                src={story.profileURL}
                sx={{ marginRight: 1, width: 40, height: 40 }}
              />
              <Typography variant="body1" sx={{ color: "white" }}>
                {story.userName || "User"}
              </Typography>
            </Box>
            <IconButton onClick={handleClose} sx={{ color: "white" }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <Box
          display="flex"
          justifyContent="space-between"
          padding="8px"
          marginBottom="8px"
        >
          {story.storyDtoList.map((_, index) => (
            <LinearProgress
              key={index}
              variant="determinate"
              value={
                index === currentStoryIndex
                  ? progress
                  : index < currentStoryIndex
                  ? 100
                  : 0
              }
              sx={{
                width: `${100 / totalStories}%`,
                margin: "0 2px",
                height: 3,
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "white",
                },
              }}
            />
          ))}
        </Box>

        <DialogContent
          sx={{
            padding: 0,
            backgroundColor: "black",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "70%",
            position: "relative",
          }}
        >
          <Box
            onClick={handlePrevStory}
            sx={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "30%",
              cursor: "pointer",
              zIndex: 3,
            }}
          />
          <Box
            onClick={handleNextStory}
            sx={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "30%",
              cursor: "pointer",
              zIndex: 3,
            }}
          />
          {story.storyDtoList[currentStoryIndex].mediaType === "IMAGE" ? (
            <img
              src={story.storyDtoList[currentStoryIndex].mediaURL}
              alt="story"
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
            />
          ) : (
            <video
              ref={videoRef}
              autoPlay
              muted
              onLoadedMetadata={handleVideoLoaded}
              src={story.storyDtoList[currentStoryIndex].mediaURL}
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          )}
        </DialogContent>

        {!isSelfStory && (
          <Box
            sx={{
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              backgroundColor: "black",
              position: "relative",
              zIndex: 2,
            }}
          >
            <Box
              display="flex"
              justifyContent="space-evenly"
              alignItems="center"
            >
              <TextField
                variant="outlined"
                size="small"
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                sx={{
                  flexGrow: 1,
                  backgroundColor: "transparent",
                  borderRadius: "4px",
                  "& .MuiOutlinedInput-root": {
                    color: "white",
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "lightgray",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: "white",
                  },
                  "& .MuiInputBase-placeholder": {
                    color: "rgba(255, 255, 255, 0.7)",
                  },
                }}
              />
              <IconButton onClick={handleComment}>
                <SendIcon className="text-white" />
              </IconButton>
              <Box display="flex" alignItems="center">
                <IconButton onClick={toggleLike}>
                  {liked ? (
                    <FavoriteIcon sx={{ color: "white" }} />
                  ) : (
                    <FavoriteBorderIcon sx={{ color: "white" }} />
                  )}
                </IconButton>
              </Box>
            </Box>
          </Box>
        )}
        {isSelfStory && (
          <Typography
            variant="body2"
            onClick={handleOpenCommentLikeDialogBox}
            sx={{
              color: "white",
              cursor: "pointer",
              textDecoration: "underline",
              // marginTop: 2,
              ":hover": {
                color: "lightgray",
              },
            }}
          >
            View Comments
          </Typography>
        )}
      </Dialog>
    </>
  );
};

export default StoryDialogBox;
