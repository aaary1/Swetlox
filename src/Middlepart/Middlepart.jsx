import React, { useEffect, useState, useCallback } from "react";
import "../css/c.css";
import Postbar from "./Postbar";
import Story from "./Story";
import Post from "./Post";
import { privateApi } from "../utils/api";
import Loadder from "../loadder/Loadder";
import InfiniteScroll from "react-infinite-scroll-component";

function Middlepart() {
  const [postPage, setPostPage] = useState(0);
  const [postList, setPostList] = useState([]);
  const [hasMore, setMore] = useState(true);

  // Load posts from API
  const loadPost = useCallback(async () => {
    try {
      const { data } = await privateApi.get(`/post/load-posts/${postPage}`);
      console.log(data);
      setPostList((prev) => [...prev, ...data.content]);
      setMore(!data.last); // Update `hasMore` based on `data.last`
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }, [postPage]);

  // Fetch posts whenever the page changes
  useEffect(() => {
    loadPost();
  }, [postPage, loadPost]);

  // Trigger the next page fetch
  const fetchMoreData = () => {
    if (hasMore) {
      setPostPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div
      id="scrollableDiv"
      className="w-[700px] ml-[405px] mt-24 h-[600px] fixed overflow-y-auto no-scrollbar rounded-xl"
    >
      {/* Top Components */}
      <Story />
      <Postbar />

      {/* Infinite Scroll Container */}
      <InfiniteScroll
        dataLength={postList.length} // Length of the current data
        next={fetchMoreData} // Function to fetch more data
        hasMore={hasMore} // Condition to fetch more data
        loader={<Loadder />} // Loader component
        scrollableTarget="scrollableDiv" // Specify the correct container
        style={{ overflow: "hidden" }} // Prevent extra scrollbars
      >
        <div className="w-[100%] flex flex-col items-center">
          {postList.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default Middlepart;
