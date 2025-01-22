import { useEffect, useState } from "react";
import { privateApi } from "../utils/api";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { padding } from "@mui/system";
import { data } from "autoprefixer";
import { useDispatch, useSelector } from "react-redux";
import { recentChatAction } from "../reducer/recentChatReducer";

const useStyles = makeStyles(() => ({
  container: {
    position: "relative",
    width: "47%",
    marginLeft: "400px",
    marginTop: "97px",
    backgroundColor: "#0c0a15",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    color: "#e0e0e0",
    height: "85vh",
    "&::-webkit-scrollbar": {
      display: "none", // Hides scrollbar in webkit browsers (Chrome, Safari)
    },
    scrollbarWidth: "none",
    overflowY: "scroll",
  },
  header: {
    position: "sticky",
    top: 0,
    backgroundColor: "#152331",
    padding: "16px",
    borderBottom: "1px solid #333333",
    zIndex: 10,
  },
  chatList: {
    padding: "16px",
    height: "100%",
    "&::-webkit-scrollbar": {
      display: "none", // Hides scrollbar in webkit browsers (Chrome, Safari)
    },
    scrollbarWidth: "none",
    overflowY: "scroll",
  },
  card: {
    display: "flex",
    alignItems: "center",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "8px",
    backgroundColor: "transparent",
    cursor: "pointer",
    border: "1px solid #333333",
    transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.5)",
    },
  },
  avatar: {
    marginRight: "12px",
    width: "48px",
    height: "48px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
  },
  cardText: {
    flexGrow: 1,
  },
  subtitle: {
    color: "#b0b0b0",
    fontSize: "0.875rem",
  },
  icon: {
    color: "#b0b0b0",
    "&:hover": {
      color: "#ffffff",
    },
  },
}));

const MidChatUser = () => {
  const [userConnection, setUserConnection] = useState([]);
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();

  const fetchUserConnectionData = async () => {
    const { data } = await privateApi.get("/user/get-user-connection");
    setUserConnection(data);
  };

  useEffect(() => {
    fetchUserConnectionData();
  }, []);

  const handleChatOpen = (user) => {
    dispatch(recentChatAction.addUser({ user }));
    navigate("/chat?id=" + user.userId);
  };

  return (
    <Box className={classes.container}>
      <Box className={classes.header}>
        <Typography variant="h6" component="div" style={{ color: "#ffffff" }}>
          Friends List
        </Typography>
        <Typography variant="body2" className={classes.subtitle}>
          Stay connected with your friends!
        </Typography>
      </Box>
      <Box className={classes.chatList}>
        {userConnection.map((user, index) => (
          <Card
            key={index}
            className={classes.card}
            onClick={() => handleChatOpen(user)}
          >
            <Avatar
              alt={user.userName}
              src={user.profileURL}
              className={classes.avatar}
            />
            <Box className={classes.cardText}>
              <Typography variant="subtitle1" style={{ color: "#ffffff" }}>
                {user.userName}
              </Typography>
              <Typography variant="body2" className={classes.subtitle}>
                Hey' WhatsApp
              </Typography>
            </Box>
            <IconButton>
              <ChatBubbleOutlineIcon className={classes.icon} />
            </IconButton>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default MidChatUser;
