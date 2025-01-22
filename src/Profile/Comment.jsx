import React from "react";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";

const Comment = ({ handleComment, comment, handleCommentSubmit }) => {
  const profileURL = useSelector((state) => state.userDetails.user.profileURL);
  return (
    <div className="rounded-lg">
      <div className="flex items-center space-x-4">
        {/* User Avatar */}
        <div className="flex-shrink-0">
          <img
            src={profileURL}
            alt="User Avatar"
            className="w-10 h-10 rounded-full border border-gray-700"
          />
        </div>
        {/* Input Field */}
        <input
          className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => handleComment(e.target.value)}
        />
        {/* Post Button */}
        {comment && (
          <Button
            onClick={() => handleCommentSubmit()}
            variant="contained"
            sx={{
              backgroundColor: "#1D4ED8",
              color: "white",
              ":hover": {
                backgroundColor: "#2563EB",
              },
              fontSize: "14px",
              textTransform: "none",
              padding: "6px 12px",
              borderRadius: "8px",
            }}
          >
            Post
          </Button>
        )}
      </div>
      {/* Divider */}
      <div className="mt-4 border-t border-gray-700"></div>
    </div>
  );
};

export default Comment;
