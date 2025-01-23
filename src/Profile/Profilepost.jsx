import { useEffect, useState, useCallback } from "react";
import { privateApi } from "../utils/api";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import PostModel from "./PostModel";
import { useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import Loadder from "../loadder/Loadder";

export function Profilepost({ postss, handleDeletePost }) {
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);
  useSelector;

  const handleHoverIn = () => {
    setHover(true);
  };
  const handleHoverOut = () => {
    setHover(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePostModelOpen = () => {
    setOpen(true);
  };

  const handleDeletePostAndClose = async (postId) => {
    try {
      await privateApi.delete(`/post/${postId}`);
      handleDeletePost(postId); // Remove the post from the postData state
      handleClose(); // Close the modal
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div
      className="bg-black w-[213px] h-[213px] ml-2 mb-2 relative"
      onMouseEnter={handleHoverIn}
      onMouseLeave={handleHoverOut}
    >
      <img
        src={postss.postURL}
        alt="Profile Post"
        className="w-140px  h-140px object-fill"
      />
      {hover && (
        <div
          className="absolute bg-[#25252576] w-[100%] h-[100%] top-0 "
          onClick={handlePostModelOpen}
        >
          <div className="w-[100%] h-[100%] flex justify-center items-center gap-6 duration-300">
            <div>
              <FavoriteBorderIcon className="text-white text-lg "></FavoriteBorderIcon>
            </div>
            <div>
              <CommentIcon className="text-white text-lg "></CommentIcon>
            </div>
          </div>
        </div>
      )}
      {open && (
        <PostModel
          open={open}
          handleClose={handleClose}
          postData={postss}
          handleDeletePost={handleDeletePostAndClose}
        />
      )}
    </div>
  );
}

function ProfilePosts({ userId }) {
  const [postData, setPostData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPostData = async (page) => {
    try {
      const { data } = await privateApi.get(
        `/post/get-post/${userId}?pageNum=${page}`
      );
      console.log("Fetched post data: ", data);

      setPostData((prevPostData) => [...prevPostData, ...data.content]);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    console.log("try another id ", userId, " ", currentPage);
    setPostData([])
    fetchPostData(currentPage);
  }, [userId]);

  const fetchMoreData = () => {
    if (currentPage < totalPages - 1) {
      console.log(currentPage);
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleDeletePost = (postId) => {
    setPostData((prevPostData) =>
      prevPostData.filter((post) => post.postId !== postId)
    );
  };

  return (
    <div
      id="scrollableDiv"
      className="ProfilePosts scrollbar-hide"
      style={{ height: "500px", overflow: "auto" }}
    >
      <InfiniteScroll
        dataLength={postData.length} // This is the current length of the posts array
        next={fetchMoreData} // Function to fetch more data
        hasMore={currentPage < totalPages - 1} // Checks if there are more pages
        loader={<Loadder />}
        style={{ overflow: "hidden" }} // Loading indicator
        scrollableTarget="scrollableDiv"
        endMessage={
          <p
            style={{ textAlign: "center", color: "white", fontWeight: "bold" }}
          >
            No more posts to show.
          </p>
        } // Message when all posts are loaded
      >
        <div className="flex flex-wrap">
          {postData.map((post) => (
            <Profilepost
              key={post.postId}
              postss={post}
              handleDeletePost={handleDeletePost}
            />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default ProfilePosts;
