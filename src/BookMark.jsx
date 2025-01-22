import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Fade,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { privateApi } from "./utils/api";
import Loadder from "./loadder/Loadder";

// Dummy data
const dummyReels = [
  {
    id: "1",
    title: "Dance Compilation",
    description: "A compilation of the best dance moves.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "2",
    title: "Cooking Tutorial",
    description: "Learn how to cook a delicious meal.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: "3",
    title: "Travel Vlog",
    description: "Highlights from my recent travels.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
];

function BookMark() {
  const [savedPosts, setSavedPosts] = useState([]);
  const [savedReels, setSavedReels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedItems = async () => {
      try {
        const { data } = await privateApi.get("/post/bookmark-post");
        setSavedPosts(data);
        setSavedReels(dummyReels);
      } catch (error) {
        console.error("Error fetching saved items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedItems();
  }, []);

  const handleDeletePost = async (postId) => {
    try {
      await privateApi.delete(`/post/bookmark-delete/${postId}`);
      setSavedPosts((prevPosts) =>
        prevPosts.filter((post) => post?.postId !== postId && post != null)
      );
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loadder />
      </div>
    );
  }

  return (
    <Box
      sx={{
        padding: 0,
        width: 707,
        marginTop: "98px",
        marginLeft: "400px",
        bgcolor: "#0c0a15",
        borderRadius: 4,
        // mt: 5,
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
      }}
    >
      <Typography
        variant="h6"
        component="div"
        sx={{
          backgroundColor: "#152331",
          padding: "16px",
          borderBottom: "1px solid #333333",
          zIndex: 10,
          color: "white",
        }}
      >
        Saved Posts
      </Typography>
      {savedPosts.length === 0 ? (
        <Typography
          variant="h6"
          sx={{ textAlign: "center", color: "#CBD5E0", mt: 4 }}
        >
          No saved posts yet! Start saving posts to view them here.
        </Typography>
      ) : (
        <Grid container spacing={4} padding={2}>
          {savedPosts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post?.postId}>
              <Fade in={true} timeout={500}>
                <Card
                  sx={{
                    maxWidth: 360,
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.3)",
                    },
                    borderRadius: 3,
                    bgcolor: "transparent",
                    color: "#F8FAFC",
                    cursor: "pointer",
                    border: "1px solid #333333",
                  }}
                >
                  <CardMedia
                    component="img"
                    // height="180"
                    image={post?.postURL || ""}
                    alt={post?.title || "Invalid post"}
                    sx={{
                      transition: "opacity 0.3s",
                      borderRadius: "3px 3px 0 0",
                      "&:hover": {
                        opacity: 0.9,
                      },
                      height: "150px",
                      objectFit:"cover"
                    }}
                  />
                  <CardContent>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", color: "#F1F5F9", mb: 1 }}
                    >
                      {post?.title || "Untitled Post"}
                    </Typography>
                    <Typography variant="body2" color="#94A3B8">
                      {post?.caption || "No description available."}
                    </Typography>
                  </CardContent>
                  <Box
                    sx={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      display: "flex",
                      gap: 1,
                    }}
                  >
                    <Tooltip title="Delete">
                      <IconButton
                        sx={{
                          bgcolor: "black",
                          "&:hover": { bgcolor: "rgba(255, 0, 0, 0.5)" },
                        }}
                        onClick={() => handleDeletePost(post.postId)}
                        size="small"
                      >
                        <DeleteIcon sx={{ color: "white" }} />
                      </IconButton>
                    </Tooltip>
                    {/* <Tooltip title="Bookmark">
                      <IconButton
                        sx={{
                          bgcolor: "rgba(255, 255, 255, 0.2)",
                          "&:hover": { bgcolor: "rgba(0, 255, 0, 0.5)" },
                        }}
                      >
                        <BookmarkBorderIcon sx={{ color: "#10B981" }} />
                      </IconButton>
                    </Tooltip> */}
                  </Box>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default BookMark;
