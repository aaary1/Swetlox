import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Box,
  IconButton,
  TextField,
} from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import SendIcon from "@mui/icons-material/Send";
import { privateApi } from "./utils/api";

const CommentDialog = ({ open, onClose, postId }) => {
  const [commentList, setCommentList] = useState([]);
  const [reply, setReply] = useState({});
  const [replyInput, setReplyInput] = useState({});
  const [replyVisible, setReplyVisible] = useState({});

  const fetchComment = async () => {
    const { data } = await privateApi.get(`/post/comment/${postId}`);
    setCommentList(data);
  };

  const toggleReplyInput = (commentId) => {
    setReplyVisible((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const handleReplyInputChange = (commentId, value) => {
    setReplyInput({ ...replyInput, [commentId]: value });
  };

  const handleReplySubmit = async (commentId) => {
    if (!replyInput[commentId]) return;
    const newReply = {
      content: replyInput[commentId],
      commentId,
    };
    const { data } = await privateApi.post(`/post/reply`, newReply);
    setReply((prev) => ({
      ...prev,
      [commentId]: [...(prev[commentId] || []), data],
    }));
    setReplyInput({ ...replyInput, [commentId]: "" });
    setReplyVisible({ ...replyVisible, [commentId]: false });
  };

  useEffect(() => {
    if (open) {
      fetchComment();
    }
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      sx={{ bgcolor: "transparent", color: "white" }}
      PaperProps={{
        style: {
          backgroundColor: "#1c1c1c", // Background color
          color: "white", // Text color
          minWidth: "500px", // Minimum width
          maxWidth: "500px", // Maximum width
        },
      }}
    >
      <DialogTitle>Comments</DialogTitle>
      <DialogContent>
        <List>
          {commentList.map((comment, index) => (
            <React.Fragment key={index}>
              {/* Main Comment */}
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[500] }}>
                    {comment?.userName?.charAt(0).toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="body1" fontWeight="bold">
                      {comment.userName}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body1" color={grey[400]}>
                      {comment.content}
                    </Typography>
                  }
                />
              </ListItem>

              {/* Replies */}
              {reply[comment.id]?.map((replyItem, replyIndex) => (
                <ListItem
                  key={replyIndex}
                  sx={{
                    pl: 8, // Indent for replies
                  }}
                  alignItems="flex-start"
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: grey[700] }}>
                      {replyItem?.userName?.charAt(0).toUpperCase()}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="body1" fontWeight="bold">
                        {replyItem.userName}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color={grey[400]}>
                        {replyItem.content}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}

              {/* Reply Button */}
              <Box sx={{ pl: 8, mt: 1 }}>
                <Button
                  onClick={() => toggleReplyInput(comment.id)}
                  size="small"
                  color="primary"
                >
                  {replyVisible[comment.id] ? "Cancel" : "Reply"}
                </Button>
              </Box>

              {/* Reply Input */}
              {replyVisible[comment.id] && (
                <Box
                  display="flex"
                  alignItems="center"
                  gap={1}
                  sx={{ pl: 8, mt: 1 }}
                >
                  <TextField
                    placeholder="Write a reply..."
                    size="small"
                    fullWidth
                    value={replyInput[comment.id] || ""}
                    onChange={(e) =>
                      handleReplyInputChange(comment.id, e.target.value)
                    }
                    sx={{
                      input: {
                        color: "white",
                        backgroundColor: "#333",
                        borderRadius: "5px",
                      },
                    }}
                  />
                  <IconButton
                    onClick={() => handleReplySubmit(comment.id)}
                    color="primary"
                    disabled={!replyInput[comment.id]}
                  >
                    <SendIcon />
                  </IconButton>
                </Box>
              )}
            </React.Fragment>
          ))}
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

export default CommentDialog;
