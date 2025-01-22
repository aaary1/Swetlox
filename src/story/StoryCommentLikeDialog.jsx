import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Tabs,
  Tab,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InfiniteScroll from "react-infinite-scroll-component"; // Import InfiniteScroll component
import { privateApi } from "../utils/api";
import { formatDistanceToNow } from "date-fns"; // Import date-fns for time ago function

const StoryCommentLikeDialog = ({ open, onClose, storyId }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [comments, setComments] = useState([]);
  const [isLastComment, setLastComment] = useState(false);
  const [commentPage, setCommentPage] = useState(0);
  const [likePage, setLikePage] = useState(0);
  const [likeUsers, setLikeUsers] = useState([]);
  const [isLastLike, setLastLike] = useState(false);

  console.log(storyId);
  // Handle Tab Change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Fetch Comment Data
  const fetchCommentData = async () => {
    const { data } = await privateApi.get(
      `/story/comment/${storyId}?pageNum=${commentPage}`
    );
    setLastComment(data.last);
    setComments((prevComments) => [...prevComments, ...data.content]);
  };

  // Fetch Like Data
  const fetchLikeData = async () => {
    const { data } = await privateApi.get(
      `/story/like/${storyId}?pageNum=${likePage}`
    );
    setLikeUsers((prevLikes) => [...prevLikes, ...data.content]);
    setLastLike(data.last);
  };

  // Infinite Scroll Fetch for Comments
  const fetchMoreComments = () => {
    if (!isLastComment) {
      setCommentPage((prevPage) => prevPage + 1);
    }
  };

  // Infinite Scroll Fetch for Likes
  const fetchMoreLikes = () => {
    if (!isLastLike) {
      setLikePage((prevPage) => prevPage + 1);
    }
  };

  // Fetch Data on page load or when the page number changes
  useEffect(() => {
    if (commentPage > 0) {
      fetchCommentData();
    }
  }, [commentPage]);

  useEffect(() => {
    if (likePage > 0) {
      fetchLikeData();
    }
  }, [likePage]);

  // Initial Data Fetch
  useEffect(() => {
    setComments([]);
    setLikeUsers([]);
    setLastLike(false);
    setLikePage(0);
    setCommentPage(0);
    setLastComment(false);
    fetchCommentData();
    fetchLikeData();
  }, [storyId]);

  // Convert timestamp to time ago format
  function timeAgo(dateString) {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      className="dialog-box"
    >
      {/* Dialog Header */}
      <DialogTitle className="bg-[#0c0a15] text-white flex justify-between items-center">
        <Typography variant="h6">Comments & Likes</Typography>
        <IconButton onClick={onClose} className="text-white">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      {/* Dialog Content */}
      <DialogContent className="p-0 bg-[#0c0a15] text-white">
        {/* Tabs */}
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="inherit"
          variant="fullWidth"
          className="bg-gray-800 text-white"
        >
          <Tab label="Comments" />
          <Tab label="Likes" />
        </Tabs>

        {/* Tab Content */}
        <Box className="p-4" style={{ maxHeight: "400px", overflowY: "auto" }}>
          {activeTab === 0 && (
            <InfiniteScroll
              dataLength={comments.length} // Length of current comments
              next={fetchMoreComments} // Fetch more comments function
              hasMore={!isLastComment} // Check if more comments exist
              loader={
                <Typography className="text-gray-400">
                  Loading more comments...
                </Typography>
              } // Loader when more data is loading
              scrollThreshold={0.95} // Trigger next fetch when reaching 95% of the container's height
            >
              {comments && comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border-b border-gray-700 p-2"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={comment.sender?.profileURL}
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <Typography variant="subtitle1" className="text-white">
                          {comment.sender?.userName}
                        </Typography>
                        <Typography variant="body2" className="text-gray-400">
                          {comment.content}
                        </Typography>
                      </div>
                    </div>
                    {/* Display time on the right side */}
                    <Typography
                      variant="body2"
                      className="text-gray-400 float-end"
                    >
                      {timeAgo(comment.createdAt)}
                    </Typography>
                  </div>
                ))
              ) : (
                <Typography className="text-gray-400">
                  No comments yet!
                </Typography>
              )}
            </InfiniteScroll>
          )}

          {activeTab === 1 && (
            <InfiniteScroll
              dataLength={likeUsers.length} // Length of current like users
              next={fetchMoreLikes} // Fetch more likes function
              hasMore={!isLastLike} // Check if more likes exist
              loader={
                <Typography className="text-gray-400">
                  Loading more likes...
                </Typography>
              } // Loader when more data is loading
              scrollThreshold={0.95} // Trigger next fetch when reaching 95% of the container's height
            >
              {likeUsers && likeUsers.length > 0 ? (
                likeUsers.map((user, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-4 border-b border-gray-700 p-2"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={user.sender.profileURL}
                        alt="User Avatar"
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <Typography variant="subtitle1" className="text-white">
                          {user.sender.userName}
                        </Typography>
                        <Typography variant="subtitle2" className="text-white">
                          Like your story
                        </Typography>
                      </div>
                    </div>
                    {/* Display time on the right side */}
                    <Typography
                      variant="body2"
                      className="text-gray-400 ml-auto"
                    >
                      {timeAgo(user.createdAt)}
                    </Typography>
                  </div>
                ))
              ) : (
                <Typography className="text-gray-400">No likes yet!</Typography>
              )}
            </InfiniteScroll>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default StoryCommentLikeDialog;
