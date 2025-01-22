import PostHeader from "../Profile/PostHeader";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useEffect, useState } from "react";
import { privateApi } from "../utils/api";
import Comment from "../Profile/Comment.jsx";
import Loadder from "../loadder/Loadder";
import CommentDialog from "../CommentDialogBox";
import { formatDistanceToNow } from "date-fns";
import ShareIcon from "@mui/icons-material/Share";
import { shareService } from "../share/ShareService";
import LikeUserDialogBox from "./LikeUserDialogBox";

function Post({ post }) {
  const [isLike, setLike] = useState(false);
  const [isBookMark, setBookMark] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comment, setComment] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [isUserLikeDialogBoxOpen, setUserLikeDailogBox] = useState(false);
  const [isShowMoreCaption, setShowMoreCaption] = useState(false);

  useEffect(() => {
    setLike(post.like);
    setBookMark(post.bookMark);
    setLikeCount(post.likeCount);
  }, [post.like, post.likeCount, post.bookMark]);

  function timeAgo(dateString) {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  }

  const handleLike = async (postId) => {
    const newLikeState = !isLike;
    setLike(newLikeState);

    if (newLikeState) {
      setLikeCount((prevCount) => prevCount + 1);
    } else {
      setLikeCount((prevCount) => prevCount - 1);
    }
    try {
      await privateApi.get(`/post/like/${postId}`);
    } catch (error) {
      console.error("Error updating like status:", error);
      setLike(!newLikeState);
      setLikeCount((prevCount) =>
        newLikeState ? prevCount - 1 : prevCount + 1
      );
    }
  };

  const handleBookMark = async (postId) => {
    const newBookMarkState = !isBookMark;
    setBookMark(newBookMarkState);
    try {
      await privateApi.get(`/post/bookmark-post/${postId}`);
    } catch (ex) {
      console.error("Error updating bookmark status:", ex);
    }
  };

  const handleShare = async () => {
    const metaData = {
      url: "",
      text: "",
      title: "",
    };
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My Title",
          text: "Check out this link!",
          url: "https://www.google.com",
        });
        console.log("Shared successfully");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      console.error("Web Share API is not supported on this browser.");
    }
  };

  const handleComment = (value) => {
    setComment(value);
  };

  const handleCommentSubmit = async () => {
    setLoading(true);
    const payload = {
      entityId: post.postId,
      entityType: "POST",
      commentContent: comment,
    };
    await privateApi.post("/post/comment", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    setLoading(false);
    setComment("");
  };

  const handleOpenLikeDisplayDialogBox = () => {
    setUserLikeDailogBox(true);
  };

  const handleCloseUserLikeDialogBox = () => {
    setUserLikeDailogBox(false);
  };

  const handleCommentDialogOpen = () => {
    setCommentDialogOpen(true);
  };
  const handleCommentDialogClose = () => {
    setCommentDialogOpen(false);
  };

  const handleShowMoreCaption = () => {
    setShowMoreCaption((prev) => !prev);
  };

  console.log(post);
  return (
    <>
      <div className="bg-[#152331] w-full rounded-xl p-4 mb-4">
        <PostHeader
          userName={post.postUser.userName}
          createdAt={timeAgo(post.createdAt)}
          profileURL={post.postUser.profileURL}
        />
        <div className="">
          <img
            src={post.postURL}
            alt="Post content"
            className="rounded-xl w-full h-full object-cover"
          />
        </div>

        {/* Like, Comment, Share, and Bookmark Section */}
        <div className="w-full flex justify-between text-white pt-2">
          <div className="flex ml-3 gap-4">
            <div className="flex flex-col">
              <FavoriteBorderIcon
                onClick={() => handleLike(post.postId)}
                style={{ fontSize: "32px" }}
                className={`cursor-pointer ${isLike ? "text-red-600" : ""}`}
              />
            </div>

            {/* Comment Section */}
            <div>
              <CommentIcon
                className="cursor-pointer"
                style={{ fontSize: "32px" }}
                onClick={handleCommentDialogOpen}
              />
            </div>

            {/* Share Section */}
            <div onClick={handleShare}>
              <ShareIcon
                className="cursor-pointer"
                style={{ fontSize: "32px" }}
              />
            </div>
          </div>

          {/* Bookmark Section */}
          <BookmarkBorderIcon
            onClick={() => handleBookMark(post.postId)}
            className={`cursor-pointer text ${
              isBookMark ? "text-red-600" : ""
            }`}
            style={{ fontSize: "32px" }}
          />
        </div>
        <div className="flex flex-col justify-start">
          <p className="text-white ml-6">{likeCount}</p>
          <p
            className="text-white pt-1 cursor-pointer"
            onClick={handleOpenLikeDisplayDialogBox}
          >
            {likeCount > 0
              ? `Liked by ${likeCount} people`
              : "Be the first to like!"}
          </p>
        </div>
        {/* Caption Section */}
        <div className=" mt-2">
          {post?.caption.length > 0 && (
            <p className="text-lg text-white mt-3">
              {isShowMoreCaption
                ? post.caption + " "
                : post.caption.substring(0, 100) + " "}
              {
                <span
                  className="font-bold cursor-pointer"
                  onClick={handleShowMoreCaption}
                >
                  {" "}
                  {isShowMoreCaption ? "showless..." : "showmore..."}
                </span>
              }
            </p>
          )}
        </div>

        {/* Comment Input Section */}
        <div className="py-2 w-[100%]">
          {isLoading ? (
            <div className="w-[100%] flex justify-center items-center">
              <Loadder />
            </div>
          ) : (
            <Comment
              comment={comment}
              handleComment={handleComment}
              handleCommentSubmit={handleCommentSubmit}
            />
          )}
        </div>
      </div>

      {/* Comment and Like Dialog Boxes */}
      <CommentDialog
        open={commentDialogOpen}
        onClose={handleCommentDialogClose}
        postId={post.postId}
      />
      <LikeUserDialogBox
        open={isUserLikeDialogBoxOpen}
        onClose={handleCloseUserLikeDialogBox}
      />
    </>
  );
}

export default Post;
