
import { useEffect, useReducer, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { privateApi } from "../utils/api";
import { useSelector } from "react-redux";
import {
  Box,
  Avatar,
  IconButton,
  TextField,
  Typography,
  Button,
  LinearProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";
import StopIcon from "@mui/icons-material/Stop";
import DeleteIcon from "@mui/icons-material/Delete";
import { PlayArrow, Pause } from "@mui/icons-material";
import VideoMessage from "./VideoMessage";
import CloseIcon from "@mui/icons-material/Close";
import "../css/c.css";


function Fullchat() {
  const location = useLocation();
  const [chatUser, setChatUser] = useState(null);
  const [chatText, setChatText] = useState("");
  const messageEndRef = useRef(null);
  const userDetails = useSelector((state) => state.userDetails);
  const messageData = useSelector((state) => state.webSocket.messages);
  const [messages, setMessages] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState("");
  const mediaRecorderRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState();
  const fileInputRef = useRef(null);
  const searchParam = new URLSearchParams(location.search);
  const id = searchParam.get("id");

  const handleSendMessage = (payload) => {
    const formData = new FormData();
    formData.append("sender", userDetails.user.id);
    formData.append("recipient", id);
    formData.append("content", chatText);
    if (payload.mediaType == "text") {
      if (chatText.trim() === "") return;
      formData.append("mediaType", "TEXT");
      console.log("text message");

      handleSendMessageApi(formData, "TEXT");
      return;
    }
    if (payload.mediaType == "image") {
      if (selectedFile == null) return;
      formData.append("mediaType", "IMAGE");
      formData.append("media", selectedFile);
      console.log(formData);

      handleSendMessageApi(formData, "IMAGE");
      setSelectedFile(null);
      return;
    }
    if (payload.mediaType == "video") {
      if (selectedFile == null) return;
      formData.append("mediaType", "VIDEO");
      formData.append("media", selectedFile);

      handleSendMessageApi(formData, "VIDEO");
      setSelectedFile(null);
      return;
    }
    if (payload.mediaType == "VOICE") {
      console.log("audio");
      formData.append("mediaType", "VOICE");
      formData.append("media", audioBlob);
      console.log(formData);
      handleSendMessageApi(formData, "VOICE");
      setAudioBlob(null);
      setAudioUrl("");
      return;
    }
  };

  const handleIconClick = () => {
    // Trigger the hidden file input click
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      // console.log()
      console.log(file);
    }
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      if (event.data instanceof Blob) {
        console.log("audio is blob");
      }
      setAudioBlob(event.data);
      setAudioUrl(URL.createObjectURL(event.data));
    };

    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  const fetchChatUser = async () => {
    const { data } = await privateApi.get(`/user/get-user/${id}`);
    setChatUser(data);
  };

  const createChatRoom = async () => {
    await privateApi.get(`/chat/create-chatroom/${id}`);
  };

  const handleSendMessageApi = async (formData, mediaType) => {
    const media = {};
    if (mediaType == "TEXT") {
      media["content"] = formData.get("content");
    } else if (mediaType == "VIDEO") {
      media["videoURL"] = URL.createObjectURL(formData.get("media"));
      media["content"] = formData.get("content");
    } else if (mediaType == "IMAGE") {
      media["imageURL"] = URL.createObjectURL(formData.get("media"));
      media["content"] = formData.get("content");
    } else if (mediaType == "VOICE") {
      media["voiceURL"] = URL.createObjectURL(formData.get("media"));
      media["content"] = formData.get("content");
    }
    setMessages((prev) => [
      ...prev,
      {
        senderId: userDetails.user.id,
        recipientId: id,
        media,
        mediaType,
        timeStamp: new Date().getTime(),
      },
    ]);
    setChatText("");
    await privateApi.post("/message/send-message", formData);
    scrollToBottom();
  };

  const fetchMessages = async () => {
    const { data } = await privateApi.get(`/message/load-message/${id}`);
    setMessages(data);
  };

  useEffect(() => {
    setMessages([]);
    fetchChatUser();
    createChatRoom();
    fetchMessages();
  }, [id]);

  useEffect(() => {
    if (messageData && messageData.length > 0) {
      setMessages((prev) => {
        const lastMessage = messageData[messageData.length - 1];
        const isDuplicate = prev.some(
          (msg) => msg.messageId === lastMessage.messageId
        );
        return isDuplicate ? prev : [...prev, lastMessage];
      });
    }
  }, [messageData]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  {
    /* console.log(message.senderId === userDetails.user.id+" voice message") */
  }
  console.log(userDetails.user.id);
  console.log(messageData);
  return (
    <Box
      sx={{
        width: "710px",
        height: "84vh",
        marginTop: "95px",
        marginLeft: "400px",
        borderRadius: "16px",
        bgcolor: "#0c0a15",
        boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.4)",
        p: 1,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          bgcolor: "#152331",
          p: 1,
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Avatar
          src={chatUser?.profileURL}
          sx={{
            width: 60,
            height: 60,
            mr: 2,
            border: "2px solid #ffffff",
          }}
          alt="Profile"
        />
        <Box>
          <Typography variant="h6" sx={{ color: "white", fontWeight: "bold" }}>
            {chatUser?.fullName}
          </Typography>
          <Typography variant="body2" sx={{ color: "#b0b0b0" }}>
            @{chatUser?.userName}
          </Typography>
        </Box>
      </Box>

      {/* Messages Area */}
      <Box
        sx={{
          height: "407px",
          overflowY: "auto",
          // mb: 3,
          display: "flex",
          flexDirection: "column",
          // gap: 2,
          // p: 1,
          "&::-webkit-scrollbar": {
            display: "none", // Hides scrollbar in webkit browsers (Chrome, Safari)
          },
          scrollbarWidth: "none",
        }}
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent:
                message.senderId === userDetails.user.id
                  ? "flex-end" // Sender's messages aligned to the right
                  : "flex-start", // Receiver's messages aligned to the left
              mb: 1,
            }}
          >
            {message.mediaType === "TEXT" ? (
              <Box
                sx={{
                  bgcolor:
                    message.senderId === userDetails.user.id
                      ? "#3a68d0" // Blue for sender's messages
                      : "#222", // Dark gray for receiver's messages
                  color: "white",
                  borderRadius: "12px",
                  p: "10px 14px",
                  maxWidth: "80%",
                  boxShadow: 2,
                  fontSize: "14px", // Adjust text size
                }}
              >
                {message.media.content}
              </Box>
            ) : message.mediaType === "VOICE" ? (
              <Box
                sx={{
                  bgcolor:
                    message.senderId === userDetails.user.id
                      ? "#3a68d0" // Blue for sender's messages
                      : "#222",
                  p: "10px",
                  borderRadius: "12px",
                  boxShadow: 3,
                  maxWidth: "300px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <audio
                  controls
                  src={message.media.voiceURL}
                  style={{
                    maxWidth: "100%",
                    borderRadius: "8px",
                  }}
                ></audio>
              </Box>
            ) : message.mediaType === "IMAGE" ? (
              <Box
                sx={{
                  bgcolor:
                    message.senderId === userDetails.user.id
                      ? "#3a68d0"
                      : "#222",
                  p: "10px",
                  borderRadius: "12px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems:
                    message.senderId === userDetails.user.id
                      ? "flex-end"
                      : "flex-start",
                }}
              >
                <img
                  src={message.media.imageURL}
                  alt="message"
                  style={{
                    width: "300px",
                    maxHeight: "300px",
                    borderRadius: "12px",
                    objectFit: "cover",
                  }}
                />
                <Box
                  sx={{
                    bgcolor:
                      message.senderId === userDetails.user.id
                        ? "#3a68d0"
                        : "#222",

                    borderRadius: "12px",
                    color: "white",
                    mt: 1,
                  }}
                >
                  {message.media.content}
                </Box>
              </Box>
            ) : (
              <VideoMessage message={message}></VideoMessage>
            )}
          </Box>
        ))}

        <div ref={messageEndRef} />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          // alignItems: "center",
          bgcolor: "#222222",
          borderRadius: "8px",
          p: 1,
          position: "relative",
          marginTop: "10px",
        }}
      >
        {/* File Preview Section */}
        {selectedFile && (
          <Box
            sx={{
              position: "relative",
              display: "inline-block",
              marginBottom: "10px",
            }}
          >
            {/* Render Preview Based on File Type */}
            {selectedFile.type.startsWith("video/") ? (
              <video
                controls
                src={URL.createObjectURL(selectedFile)}
                style={{
                  maxWidth: "200px",
                  maxHeight: "120px",
                  borderRadius: "8px",
                }}
              />
            ) : (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                style={{
                  maxWidth: "200px",
                  maxHeight: "120px",
                  borderRadius: "8px",
                }}
              />
            )}

            {/* Cross Icon */}
            <IconButton
              onClick={() => setSelectedFile(null)}
              sx={{
                position: "absolute",
                top: "5px",
                right: "5px",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                color: "white",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                },
              }}
            >
              <CloseIcon></CloseIcon>
            </IconButton>
          </Box>
        )}

        {/* Main Input Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
          }}
        >
          <IconButton onClick={handleIconClick}>
            <AttachFileIcon className="text-gray-500" />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </IconButton>
          {audioBlob ? (
            <Box
              sx={{
                display: "flex",
                bgcolor: "#222222",
                alignItems: "center",
                justifyContent: "end",
                flex: 3,
                overflow: "hidden",
              }}
            >
              <audio
                controls
                src={audioUrl}
                style={{
                  flex: 1,
                  bgcolor: "#222222",
                  maxWidth: "310px",
                  marginRight: "8px",
                  maxHeight: "40px",
                }}
              />
              <IconButton
                onClick={() => {
                  setAudioBlob(null);
                  setAudioUrl("");
                }}
              >
                <DeleteIcon className="text-white" />
              </IconButton>
            </Box>
          ) : (
            <TextField
              value={chatText}
              onChange={(e) => setChatText(e.target.value)}
              placeholder="Type a message..."
              variant="outlined"
              size="small"
              sx={{
                flex: 1,
                margin: 0,
                p: 0,
                "& .MuiInputBase-root": { color: "white" },
                "& .MuiOutlinedInput-notchedOutline": { border: "none" },
              }}
            />
          )}
          {isRecording ? (
            <IconButton onClick={stopRecording} color="error">
              <StopIcon />
            </IconButton>
          ) : !audioBlob ? (
            <IconButton onClick={startRecording}>
              <KeyboardVoiceIcon className="text-white" />
            </IconButton>
          ) : null}
          {
            <IconButton
              onClick={() => {
                selectedFile
                  ? selectedFile.type.startsWith("video/")
                    ? handleSendMessage({ mediaType: "video" })
                    : handleSendMessage({ mediaType: "image" })
                  : audioBlob
                  ? handleSendMessage({ mediaType: "VOICE" })
                  : handleSendMessage({ mediaType: "text" });
              }}
            >
              <SendIcon className="text-white" />
            </IconButton>
          }
        </Box>
      </Box>
    </Box>
  );
}

export default Fullchat;
