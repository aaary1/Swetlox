//  import {
//   Avatar,
//   Box,
//   IconButton,
//   List,
//   ListItem,
//   ListItemAvatar,
//   ListItemText,
//   Modal,
//   Tooltip,
//   Typography,
// } from "@mui/material";
// import { blue } from "@mui/material/colors";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { useEffect, useState } from "react";
// import { privateApi } from "../utils/api";
// import Comment from "./Comment";
// import PostAction from "./PostAction";
// import PostHeader from "./PostHeader";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "60%",
//   bgcolor: "transparent",
//   boxShadow: 24,
// };

// const PostModel = ({ open, handleClose, postData, handleDeletePost }) => {
//   const [commentValue, setCommentValue] = useState();
//   const [commentList, setCommentList] = useState([]);

//   const fetchComment = async () => {
//     const { data } = await privateApi.get(`/post/comment/${postData.postId}`);
//     setCommentList(data);
//   };

//   useEffect(() => {
//     fetchComment();
//   }, []);

//   const handleComment = (e) => {
//     setCommentValue(e.target.value);
//   };

//   const handleCommentSubmit = (postId) => {
//     console.log(postId);
//   };

//   return (
//     <Modal
//       open={open}
//       onClose={handleClose}
//       aria-labelledby="modal-modal-title"
//       aria-describedby="modal-modal-description"
//     >
//       <Box sx={style}>
//         <div className="w-[100%] h-[80vh] flex">
//           <div className="relative w-[60%] h-[80vh]">
//             {/* Delete Button */}
//             <Tooltip title="Delete">
//               <IconButton
//                 sx={{
//                   bgcolor: "black",
//                   "&:hover": { bgcolor: "rgba(255, 0, 0, 0.5)" },
//                   position: "absolute",
//                 }}
//                 onClick={() => handleDeletePost(postData.postId)}
//                 size="small"
//               >
//                 <DeleteIcon sx={{ color: "white" }} />
//               </IconButton>
//             </Tooltip>
//             {/* Image or Video */}
//             {postData?.postURL && (
//               <img
//                 src={postData.postURL}
//                 className="w-[100%] h-[100%] object-fill cursor-pointer"
//               />
//             )}
//             {postData?.reelURL && (
//               <video
//                 src={postData.reelURL}
//                 className="w-[100%] h-[100%] object-cover cursor-pointer"
//                 autoPlay
//                 onMouseEnter={(e) => e.target.pause()}
//                 onMouseLeave={(e) => e.target.play()}
//                 loop
//               />
//             )}
//           </div>
//           <div className="bg-[#222222] w-[50%] h-[80vh]">
//             <PostHeader
//               userName={postData.userName}
//               createdAt={postData.createdAt}
//             />
//             <div className="w-[100%] h-[65%] overflow-auto">
//               <List
//                 sx={{
//                   color: "white",
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                 }}
//               >
//                 {commentList.map((comment, index) => (
//                   <ListItem key={index} alignItems="flex-start">
//                     <ListItemAvatar>
//                       <Avatar sx={{ bgcolor: blue[500] }}>
//                         {comment?.userName?.charAt(0).toUpperCase()}
//                       </Avatar>
//                     </ListItemAvatar>
//                     <ListItemText
//                       primary={
//                         <Typography variant="body1" fontWeight="bold">
//                           {comment.userName}
//                         </Typography>
//                       }
//                       secondary={
//                         <Typography variant="body1">
//                           {"" + comment.content}
//                         </Typography>
//                       }
//                     />
//                   </ListItem>
//                 ))}
//               </List>
//             </div>
//             <PostAction />
//             <Comment
//               comment={commentValue}
//               handleComment={handleComment}
//               handleCommentSubmit={handleCommentSubmit}
//             />
//           </div>
//         </div>
//       </Box>
//     </Modal>
//   );
// };

// export default PostModel;
// import {
//   Avatar,
//   Box,
//   IconButton,
//   List,
//   ListItem,
//   ListItemAvatar,
//   ListItemText,
//   Modal,
//   Tooltip,
//   Typography,
// } from "@mui/material";
// import { blue } from "@mui/material/colors";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { useEffect, useState } from "react";
// import { privateApi } from "../utils/api";
// import Comment from "./Comment";
// import PostAction from "./PostAction";
// import PostHeader from "./PostHeader";
// import PropTypes from "prop-types"; // Added for prop validation

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "80%", // Updated for better responsiveness
//   bgcolor: "transparent",
//   boxShadow: 24,
// };

// const PostModel = ({ open, handleClose, postData, handleDeletePost }) => {
//   const [commentValue, setCommentValue] = useState("");
//   const [commentList, setCommentList] = useState([]);

//   // Fetch comments when the modal opens or postData changes
//   useEffect(() => {
//     if (open) {
//       fetchComment();
//     }
//   }, [open, postData.postId]);

//   // Fetch comments
//   const fetchComment = async () => {
//     const { data } = await privateApi.get(`/post/comment/${postData.postId}`);
//     setCommentList(data);
//   };

//   const handleComment = (e) => {
//     setCommentValue(e.target.value);
//   };

//   const handleCommentSubmit = async () => {
//     if (!commentValue) return; // Prevent empty comments
//     await privateApi.post(`/post/comment/${postData.postId}`, {
//       content: commentValue,
//     });
//     setCommentValue(""); // Clear input
//     fetchComment(); // Refresh comments
//   };

//   // Reset state when closing the modal
//   useEffect(() => {
//     if (!open) {
//       setCommentValue("");
//       setCommentList([]);
//     }
//   }, [open]);

//   return (
//     <Modal
//       open={open}
//       onClose={handleClose}
//       aria-labelledby="modal-modal-title"
//       aria-describedby="modal-modal-description"
//     >
//       <Box sx={style}>
//         <div className="flex flex-col md:flex-row w-full h-[80vh]">
//           <div className="relative w-full md:w-[60%] h-[100%]">
//             {/* Delete Button */}
//             <Tooltip title="Delete">
//               <IconButton
//                 sx={{
//                   bgcolor: "black",
//                   "&:hover": { bgcolor: "rgba(255, 0, 0, 0.5)" },
//                   position: "absolute",
//                   top: "10px",
//                   right: "10px",
//                 }}
//                 onClick={() => handleDeletePost(postData.postId)}
//                 size="small"
//               >
//                 <DeleteIcon sx={{ color: "white" }} />
//               </IconButton>
//             </Tooltip>
//             {/* Image or Video */}
//             {postData?.postURL && (
//               <img
//                 src={postData.postURL}
//                 className="w-full h-full object-cover cursor-pointer"
//                 alt="Post Media"
//               />
//             )}
//             {postData?.reelURL && (
//               <video
//                 src={postData.reelURL}
//                 className="w-full h-full object-cover cursor-pointer"
//                 autoPlay
//                 onMouseEnter={(e) => e.target.pause()}
//                 onMouseLeave={(e) => e.target.play()}
//                 loop
//                 alt="Post Video"
//               />
//             )}
//           </div>
//           <div className="bg-[#222222] w-full md:w-[40%] h-[100%] p-4">
//             <PostHeader
//               userName={postData.userName}
//               createdAt={postData.createdAt}
//             />
//             <div className="w-full h-[65%] overflow-auto">
//               <List
//                 sx={{
//                   color: "white",
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                 }}
//               >
//                 {commentList.map((comment, index) => (
//                   <ListItem key={index} alignItems="flex-start">
//                     <ListItemAvatar>
//                       <Avatar sx={{ bgcolor: blue[500] }}>
//                         {comment?.userName?.charAt(0).toUpperCase()}
//                       </Avatar>
//                     </ListItemAvatar>
//                     <ListItemText
//                       primary={
//                         <Typography variant="body1" fontWeight="bold">
//                           {comment.userName}
//                         </Typography>
//                       }
//                       secondary={
//                         <Typography variant="body1">
//                           {comment.content}
//                         </Typography>
//                       }
//                     />
//                   </ListItem>
//                 ))}
//               </List>
//             </div>
//             <PostAction />
//             <Comment
//               comment={commentValue}
//               handleComment={handleComment}
//               handleCommentSubmit={handleCommentSubmit}
//             />
//           </div>
//         </div>
//       </Box>
//     </Modal>
//   );
// };

// // Prop validation
// PostModel.propTypes = {
//   open: PropTypes.bool.isRequired,
//   handleClose: PropTypes.func.isRequired,
//   postData: PropTypes.object.isRequired,
//   handleDeletePost: PropTypes.func.isRequired,
// };

// export default PostModel;

// import {
//   Avatar,
//   Box,
//   IconButton,
//   List,
//   ListItem,
//   ListItemAvatar,
//   ListItemText,
//   Modal,
//   Tooltip,
//   Typography,
// } from "@mui/material";
// import { blue } from "@mui/material/colors";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { useEffect, useState } from "react";
// import { privateApi } from "../utils/api";
// import Comment from "./Comment";
// import PostAction from "./PostAction";
// import PostHeader from "./PostHeader";
// import PropTypes from "prop-types"; // Added for prop validation

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: "80%", // Updated for better responsiveness
//   bgcolor: "transparent",
//   boxShadow: 24,
// };

// const PostModel = ({ open, handleClose, postData, handleDeletePost }) => {
//   const [commentValue, setCommentValue] = useState("");
//   const [commentList, setCommentList] = useState([]);

//   // Fetch comments when the modal opens or postData changes
//   useEffect(() => {
//     if (open) {
//       fetchComment();
//     }
//   }, [open, postData.postId]);

//   // Fetch comments
//   const fetchComment = async () => {
//     const { data } = await privateApi.get(`/post/comment/${postData.postId}`);
//     setCommentList(data);
//   };

//   const handleComment = (e) => {
//     setCommentValue(e.target.value);
//   };

//   const handleCommentSubmit = async () => {
//     if (!commentValue) return; // Prevent empty comments
//     await privateApi.post(`/post/comment/${postData.postId}`, {
//       content: commentValue,
//     });
//     setCommentValue(""); // Clear input
//     fetchComment(); // Refresh comments
//   };

//   // Reset state when closing the modal
//   useEffect(() => {
//     if (!open) {
//       setCommentValue("");
//       setCommentList([]);
//     }
//   }, [open]);

//   return (
//     <Modal
//       open={open}
//       onClose={handleClose}
//       aria-labelledby="modal-modal-title"
//       aria-describedby="modal-modal-description"
//     >
//       <Box sx={style}>
//         <div className="flex flex-col md:flex-row w-full h-[80vh]">
//           <div className="relative w-full md:w-[60%] h-[100%]">
//             {/* Delete Button */}
//             <Tooltip title="Delete">
//               <IconButton
//                 sx={{
//                   bgcolor: "black",
//                   "&:hover": { bgcolor: "rgba(255, 0, 0, 0.5)" },
//                   position: "absolute",
//                   top: "10px",
//                   right: "10px",
//                 }}
//                 onClick={() => handleDeletePost(postData.postId)}
//                 size="small"
//               >
//                 <DeleteIcon sx={{ color: "white" }} />
//               </IconButton>
//             </Tooltip>
//             {/* Image or Video with Square Styling */}
//             {postData?.postURL && (
//               <img
//                 src={postData.postURL}
//                 className="w-[100%] h-[100%] object-cover cursor-pointer"
//                 alt="Post Media"
//               />
//             )}
//             {postData?.reelURL && (
//               <video
//                 src={postData.reelURL}
//                 className="w-[100%] h-[100%] object-cover cursor-pointer"
//                 autoPlay
//                 onMouseEnter={(e) => e.target.pause()}
//                 onMouseLeave={(e) => e.target.play()}
//                 loop
//                 alt="Post Video"
//               />
//             )}
//           </div>
//           <div className="bg-[#222222] w-full md:w-[40%] h-[100%] p-4">
//             <PostHeader
//               userName={postData.userName}
//               createdAt={postData.createdAt}
//             />
//             <div className="w-full h-[65%] overflow-auto">
//               <List
//                 sx={{
//                   color: "white",
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                 }}
//               >
//                 {commentList.map((comment, index) => (
//                   <ListItem key={index} alignItems="flex-start">
//                     <ListItemAvatar>
//                       <Avatar sx={{ bgcolor: blue[500] }}>
//                         {comment?.userName?.charAt(0).toUpperCase()}
//                       </Avatar>
//                     </ListItemAvatar>
//                     <ListItemText
//                       primary={
//                         <Typography variant="body1" fontWeight="bold">
//                           {comment.userName}
//                         </Typography>
//                       }
//                       secondary={
//                         <Typography variant="body1">
//                           {comment.content}
//                         </Typography>
//                       }
//                     />
//                   </ListItem>
//                 ))}
//               </List>
//             </div>
//             <PostAction />
//             <Comment
//               comment={commentValue}
//               handleComment={handleComment}
//               handleCommentSubmit={handleCommentSubmit}
//             />
//           </div>
//         </div>
//       </Box>
//     </Modal>
//   );
// };

// // Prop validation
// PostModel.propTypes = {
//   open: PropTypes.bool.isRequired,
//   handleClose: PropTypes.func.isRequired,
//   postData: PropTypes.object.isRequired,
//   handleDeletePost: PropTypes.func.isRequired,
// };

// export default PostModel;
import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  Tooltip,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { privateApi } from "../utils/api";
import Comment from "./Comment";
import PostAction from "./PostAction";
import PostHeader from "./PostHeader";
import PropTypes from "prop-types"; // Added for prop validation

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%", // Updated for better responsiveness
  bgcolor: "transparent",
  boxShadow: 24,
};

const PostModel = ({ open, handleClose, postData, handleDeletePost }) => {
  const [commentValue, setCommentValue] = useState();
  const [commentList, setCommentList] = useState([]);

  const fetchComment = async () => {
    const { data } = await privateApi.get(`/post/comment/${postData.postId}`);
    setCommentList(data);
  };

  useEffect(() => {
    fetchComment();
  }, []);

  const handleComment = (e) => {
    setCommentValue(e.target.value);
  };

  const handleCommentSubmit = (postId) => {
    console.log(postId);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="flex  flex-row h-900px w-200px">
          <div className="relative w-full md:w-100px h-100px">
            {/* Delete Button */}
            <Tooltip title="Delete">
              <IconButton
                sx={{
                  bgcolor: "black",
                  "&:hover": { bgcolor: "rgba(255, 0, 0, 0.5)" },
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                }}
                onClick={() => handleDeletePost(postData.postId)}
                size="small"
              >
                <DeleteIcon sx={{ color: "white" }} />
              </IconButton>
            </Tooltip>
            {/* Image or Video with Square Styling */}
            {postData?.postURL && (
              <img
                src={postData.postURL}
                className="w-[100%] h-[100%] object-cover cursor-pointer"
                alt="Post Media"
              />
            )}
            {postData?.reelURL && (
              <video
                src={postData.reelURL}
                className="w-[100%] h-[100%] object-cover cursor-pointer"
                autoPlay
                onMouseEnter={(e) => e.target.pause()}
                onMouseLeave={(e) => e.target.play()}
                loop
                alt="Post Video"
              />
            )}
          </div>
          <div className="bg-[#222222] relative w-full md:w-100px h-600px p-4">
            <PostHeader
              userName={postData.userName}
              createdAt={postData.createdAt}
            />
            <div className="w-200px h-100px overflow-auto">
              <List
                sx={{
                  color: "white",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {commentList.map((comment, index) => (
                  <ListItem key={index} alignItems="flex-start">
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
                        <Typography variant="body1">
                          {comment.content}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            
            <div className="absolute  bottom-0 w-[95%]">
              <PostAction />

              <Comment
                comment={commentValue}
                handleComment={handleComment}
                handleCommentSubmit={handleCommentSubmit}
              />
            </div>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

// Prop validation
PostModel.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  postData: PropTypes.object.isRequired,
  handleDeletePost: PropTypes.func.isRequired,
};

export default PostModel;
