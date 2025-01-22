import "../css/c.css";
import { useEffect, useState } from "react";
import { privateApi } from "../utils/api";
import ConnectionDialogBox from "../ConnectionDialogBox";
import ProfilePosts from "../Profile/Profilepost";
import { useNavigate } from "react-router-dom";
const followersData = [
  {
    id: 1,
    name: "John Doe",
    username: "johndoe",
    profilePic: "https://via.placeholder.com/150",
    isFollowing: true,
  },
  {
    id: 2,
    name: "Jane Smith",
    username: "janesmith",
    profilePic: "https://via.placeholder.com/150",
    isFollowing: false,
  },
  {
    id: 1,
    name: "John Doe",
    username: "johndoe",
    profilePic: "https://via.placeholder.com/150",
    isFollowing: true,
  },
  {
    id: 2,
    name: "Jane Smith",
    username: "janesmith",
    profilePic: "https://via.placeholder.com/150",
    isFollowing: false,
  },
  {
    id: 1,
    name: "John Doe",
    username: "johndoe",
    profilePic: "https://via.placeholder.com/150",
    isFollowing: true,
  },
  {
    id: 2,
    name: "Jane Smith",
    username: "janesmith",
    profilePic: "https://via.placeholder.com/150",
    isFollowing: false,
  },
  {
    id: 1,
    name: "John Doe",
    username: "johndoe",
    profilePic: "https://via.placeholder.com/150",
    isFollowing: true,
  },
  {
    id: 2,
    name: "Jane Smith",
    username: "janesmith",
    profilePic: "https://via.placeholder.com/150",
    isFollowing: false,
  },
];
function OtherProfileDetails({ profiledetails, userId }) {
  const [followerData, setFollowerData] = useState([]);
  const [followingData, setFollowingData] = useState([]);
  const [openFollowerDialog, setOpenFollowerDialog] = useState(false);
  const [openFollowingDialog, setOpenFollowingDialog] = useState(false);
  const navigate = useNavigate();
  const handleFetchUserConnection = async (type) => {
    const { data } = await privateApi.get(
      `/user/get-user-connection/${userId}/${type}`
    );
    if (type == "follower") {
      setFollowerData((prev) => [...prev, ...data]);
    } else {
      setFollowingData((prev) => [...prev, ...data]);
    }
  };

  useEffect(() => {
    setFollowerData([]);
    handleFetchUserConnection("follower");
  }, [userId]);

  useEffect(() => {
    setFollowingData([]);
    handleFetchUserConnection("following");
  }, [userId]);
  const handleClose = (type) => {
    console.log(type);
    if (type == "follower") {
      setOpenFollowerDialog(false);
    } else {
      setOpenFollowingDialog(false);
    }
  };
  const handleOpen = (type) => {
    if (type == "follower") {
      setOpenFollowerDialog(true);
    } else {
      setOpenFollowingDialog(true);
    }
  };

  const onViewProfile = (userId) => {
    navigate(`/profile/${userId}`);
  };
  return (
    <>
      <ConnectionDialogBox
        open={openFollowerDialog}
        followers={followerData}
        onClose={() => handleClose("follower")}
        otherUser={true}
        onViewProfile={onViewProfile}
        eventType="follower"
      ></ConnectionDialogBox>
      <ConnectionDialogBox
        open={openFollowingDialog}
        followers={followingData}
        otherUser={true}
        onViewProfile={onViewProfile}
        onClose={() => handleClose("following")}
        eventType="following"
      ></ConnectionDialogBox>
      <div className="w-[710px] h-[600px] mt-24 rounded-xl ml-[400px] bg-[#0c0a15] fixed">
        <div className="overflow-y-scroll no-scrollbar">
          <div className="flex justify-center border-2 border-indigo-500 mt-5 mx-5 h-[250px] ">
            <div>
              <img
                src={profiledetails?.profileURL}
                className="w-[100px] h-[100px] ml-6 mt-6 rounded-full hover:cursor-pointer"
                alt="Profile"
              />
              <div className="mt-2 ml-6">
                <h1 className="text-white font-medium text-lg hover:cursor-pointer text-center">
                  {profiledetails?.userName}
                </h1>
              </div>
            </div>
            <div>
              <div className=" w-[240px] h-[70px] mt-[30px] ml-[120px] flex space-x-4">
                <div className="w-[50px] h-full ">
                  <h1 className="text-white font-medium text-2xl hover:cursor-pointer  ">
                    {profiledetails?.postCount}
                  </h1>
                  <h5 className="text-white text-lg hover:cursor-pointer ">
                    Posts
                  </h5>
                </div>
                <div className="h-full" onClick={() => handleOpen("follower")}>
                  <h1 className="text-white  text-2xl hover:cursor-pointer ">
                    {profiledetails?.follower}
                  </h1>
                  <h5 className="text-white  text-lg hover:cursor-pointer ">
                    Followers
                  </h5>
                </div>
                <div
                  className="w-[] h-full"
                  onClick={() => handleOpen("following")}
                >
                  <h1 className="text-white  text-2xl hover:cursor-pointer ">
                    {profiledetails?.following}
                  </h1>
                  <h5 className="text-white  text-lg hover:cursor-pointer ">
                    Following
                  </h5>
                </div>
              </div>
              <div className="text-white text-lg px-4 h-[110px] w-[400px] ml-[100px] mt-2 overflow-y-scroll no-scrollbar ">
                {profiledetails?.bio?.map((bio) => {
                  return <p className="text-sm">{bio}</p>;
                })}
              </div>
            </div>
          </div>
          <div>
            <div className="ml-[290px] mt-3">
              <h1 className="text-white font-medium text-xl hover:cursor-pointer ml-[43px]">
                POST
              </h1>
            </div>
            <div className="bg-indigo-500/100 h-1 w-[670px] ml-5 m-1" />
          </div>
          <div className="h-[230px] mx-5 w-[670px] pt-5 h-42">
            <ProfilePosts userId={userId} />
          </div>
        </div>
      </div>
    </>
  );
}

export default OtherProfileDetails;
