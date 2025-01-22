import {
  Avatar,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { privateApi } from "../utils/api";

const SearchUser = ({ user }) => {
  const [text, setText] = useState();
  const navigate = useNavigate();
  const isFollowing = user.following;
  const isFollower = user.follower;
  const userIsFollowingAuth = user.userIsFollowingAuth;
  const isRequested = user.requested;
  const handleFollow = async (userId) => {
    if (text !== "Requested") {
      setText("Requested");
      await privateApi.get(`/user/following-request/${userId}`);
    }
  };
  useEffect(() => {
    if (!isFollowing && !userIsFollowingAuth && !isRequested) setText("Follow");
    else if (isRequested) setText("Requested");
    else if (!isFollowing && userIsFollowingAuth) setText("Follow Back");
    else if (isFollowing) {
      setText("Following");
    }
  }, [user]);

  const handleProfileClick = () => {
    navigate(`/profile/${user.userId}`);
  };

  return (
    <ListItem
      key={user.userId}
      sx={{
        color: "#fff",
        cursor: "pointer",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <ListItemAvatar onClick={handleProfileClick}>
          <Avatar src={user.profileURL} alt={user.userName} />
        </ListItemAvatar>
        <ListItemText
          primary={user.userName}
          secondary={`@${user.fullName}`}
          className="flex items-center"
        />
      </Box>
      <Box>
        {}
        {!isFollowing && !userIsFollowingAuth && (
          <Button
            onClick={() => handleFollow(user.userId)}
            variant="contained"
            sx={{
              bgcolor: "#ff3d00",
              color: "#fff",
              "&:hover": {
                bgcolor: "#ff6347",
              },
            }}
          >
            {text}
          </Button>
        )}

        {!isFollowing && userIsFollowingAuth && (
          <Button
            variant="contained"
            sx={{
              bgcolor: "#ff3d00",
              color: "#fff",
              "&:hover": {
                bgcolor: "#ff6347",
              },
            }}
            onClick={() => handleFollow(user.userId)}
            // Add onClick logic to follow back the user
          >
            {text}
          </Button>
        )}
        {isFollowing && (
          <Typography
            variant="body2"
            sx={{
              color: "#fff",
              fontStyle: "italic",
            }}
          >
            Following
          </Typography>
        )}
      </Box>
    </ListItem>
  );
};

export default SearchUser;
