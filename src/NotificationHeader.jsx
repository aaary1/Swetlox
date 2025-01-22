import { Avatar, Box, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/system";

const GradientAvatar = styled(Avatar)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary?.main}, ${theme.palette.secondary?.main})`,
  color: "#fff",
  fontWeight: "bold",
  width: "50px",
  height: "50px",
}));

const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px",
  backgroundColor: "transparent",
  borderRadius: "8px",
  border: "1px solid #333333",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.4)",
  },
});

const NotificationHeader = ({ profileURL, userName, message, rightImage }) => {
  console.log(rightImage);
  return (
    <StyledBox>
      <Box display="flex" alignItems="center">
        <GradientAvatar aria-label="user-avatar">
          <img src={profileURL}></img>
        </GradientAvatar>
        <Box marginLeft={2}>
          <Typography
            variant="body1"
            fontWeight="bold"
            color="white"
            sx={{ textTransform: "capitalize" }}
          >
            {userName}
          </Typography>
          <Typography variant="body2" color="gray">
            {message}
          </Typography>
        </Box>
      </Box>
      {rightImage != "not support" && (
        <IconButton>
          <Box
            component="img"
            src={rightImage}
            alt="Notification Action"
            sx={{
              height: 40,
              width: 40,
              borderRadius: "50%",
              boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.5)",
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          />
        </IconButton>
      )}
    </StyledBox>
  );
};

export default NotificationHeader;
