import React, { useState, useRef } from "react";
import { Box, IconButton } from "@mui/material";
import { PlayArrow, Pause } from "@mui/icons-material";
import { useSelector } from "react-redux";

const VideoMessage = ({ message, index }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPause, setShowPause] = useState(false);
  const userDetails = useSelector((state) => state.userDetails); // State for pause button visibility

  // Toggle play/pause when video or play icon is clicked
  const togglePlayPause = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
      setShowPause(false); // Hide pause button after playing
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      setShowPause(true); // Show pause button after pausing
    }
  };

  // Handle video click to toggle between play/pause
  const handleVideoClick = () => {
    togglePlayPause(); // Toggle play/pause on video click
  };

  return (
    <Box
      key={index}
      sx={{
        bgcolor:
          message.senderId === userDetails.user.id
            ? "#3a68d0" // Blue for sender's messages
            : "#222",

        // Dark background for video messages
        p: "10px",
        borderRadius: "12px",
        boxShadow: 3,
        mb: 1,
        position: "relative",
        width: "300px", // For play button positioning
      }}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        src={message.media?.videoURL}
        style={{
          //   maxWidth: "100%",
          width: "300px",
          borderRadius: "12px",
          height: "auto",
          maxHeight: "350px",
        }}
        onClick={handleVideoClick} // Toggle play/pause on video click
      />
      <Box
        sx={{
          bgcolor:
            message.senderId === userDetails.user.id ? "#3a68d0" : "#222",

          borderRadius: "12px",
          color: "white",
          mt: 1,
        }}
      >
        {message.media.content}
      </Box>
      {/* Play Icon appears only when the video is paused */}
      {!isPlaying && !showPause && (
        <IconButton
          onClick={togglePlayPause}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            color: "white",
            padding: "12px",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.8)",
            },
          }}
        >
          <PlayArrow fontSize="large" />
        </IconButton>
      )}

      {/* Pause Icon appears when the video is playing */}
      {showPause && (
        <IconButton
          onClick={togglePlayPause}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            color: "white",
            padding: "12px",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.8)",
            },
          }}
        >
          <Pause fontSize="large" />
        </IconButton>
      )}
    </Box>
  );
};

export default VideoMessage;
