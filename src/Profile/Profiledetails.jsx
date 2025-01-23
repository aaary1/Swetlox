import ProfilePosts from "./Profilepost";
import "../css/c.css";
import EditProfileModel from "./EditProfileModel";
import { useEffect, useState } from "react";
import ConnectionDialogBox from "../ConnectionDialogBox";
import { privateApi } from "../utils/api";
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
function Profiledetails({ profiledetails }) {
  const [opne, setOpen] = useState(false);
  const [followerData, setFollowerData] = useState([]);
  const [followingData, setFollowingData] = useState([]);
  const [followerCurrentPageNum, setFollowerCurrentPage] = useState(0);
  const [followingCurrentPageNum, setFollowingCurrentPage] = useState(0);
  const [hasMoreFollower, setHasMoreFollower] = useState(false);
  const [hasMoreFollowing, setHasMoreFollowing] = useState(false);
  const [openFollowerDialog, setOpenFollowerDialog] = useState(false);
  const [openFollowingDialog, setOpenFollowingDialog] = useState(false);
  const navigate = useNavigate();
  const handleFetchUserConnection = async (type, pageNum) => {
    const { data } = await privateApi.get(
      `/user/get-user-connection/${type}?pageNum=${pageNum}`
    );
    if (type == "follower") {
      setHasMoreFollower(!data.last);
      setFollowerData((prev) => [...prev, ...data.content]);
    } else {
      setHasMoreFollowing(!data.last);
      setFollowingData((prev) => [...prev, ...data.content]);
    }
  };

  useEffect(() => {
    handleFetchUserConnection("follower", followerCurrentPageNum);
  }, []);

  useEffect(() => {
    setFollowingCurrentPage((prev) => prev + 1);
    handleFetchUserConnection("following", followingCurrentPageNum);
  }, []);

  const handleProfileEditOpen = () => {
    setOpen(true);
  };

  const handleProfileEditClose = () => {
    setOpen(false);
  };
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
        fetchMoreFollowers={() => {
          setFollowerCurrentPage((prev) => prev + 1);
          handleFetchUserConnection("follower", followerCurrentPageNum);
        }}
        hasMoreFollowers={hasMoreFollower}
        onViewProfile={onViewProfile}
        eventType="follower"
        otherUser={false}
      ></ConnectionDialogBox>
      <ConnectionDialogBox
        open={openFollowingDialog}
        followers={followingData}
        fetchMoreFollowers={() => {
          setFollowingCurrentPage((prev) => prev + 1);
          console.log("call following.....");
          handleFetchUserConnection("following", followingCurrentPageNum);
        }}
        hasMoreFollowers={hasMoreFollowing}
        onClose={() => handleClose("following")}
        onViewProfile={onViewProfile}
        eventType="following"
        otherUser={false}
      ></ConnectionDialogBox>
      <div className="w-[710px] h-[600px] mt-24 rounded-xl ml-[400px] bg-[#172520] fixed  overflow-hidden">
        <div className="overflow-y-scroll no-scrollbar">
            {/* <div className="flex justify-center border-2 border-indigo-500/100 mt-5 mx-5 h-[250px] border-b-0"> */}
            <div>
              <img
                src={profiledetails?.profileURL}
                className="object-cover w-[150px] h-[150px] ml-[280px] mt-6 rounded-full hover:cursor-pointer"
                alt="Profile"
                onClick={handleProfileEditOpen}
              />
              <div className="mt-4 ml-3">
                <h1 className="text-white font-mono text-2xl hover:cursor-pointer text-center">
                  {profiledetails?.userName}
                </h1>
              </div>
            </div>
            <div>
              <div className="w-[66%] ml-[17%] mr-[17%] mt-[1%]">
                <h1 className="text-[#95ada4] text-center" >"📍 Living the dream | 💻 Coding my way to AI | 🌍 Exploring tech & life | DM for collabs 🤝 | 🚀 Always learning, always growing"</h1>
              </div>
              
            </div>
            <div>
            <div className="h-[70px] mt-[5%] w-[510px] bg-[rgba(58,90,64,0.4)] rounded-lg flex justify-between items-center mx-auto my-auto px-4">
  


                <div className="w-[170px] h-full bg-[black] flex flex-col justify-center items-center">
                  <h1 className="text-white font-medium text-2xl hover:cursor-pointer  ">
                    {profiledetails?.postCount}
                  </h1>
                  <h5 className="text-white text-lg hover:cursor-pointer ">
                    Posts
                  </h5>
                </div> 

                 <div className="h-full w-[170px] bg-[rgba(0,0,0,0.7)]  flex flex-col justify-center items-center" onClick={() => handleOpen("follower")}>
                  <h1 className="text-white  text-2xl hover:cursor-pointer ">
                    {profiledetails?.follower}
                  </h1>
                  <h5 className="text-white  text-lg hover:cursor-pointer ">
                    Followers
                  </h5>
                </div> 

                <div
                  className=" h-full w-[170px] bg-black  flex flex-col justify-center items-center ml-auto"
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
              {/* <div className="text-white text-lg px-4 h-[110px] w-[400px] ml-[100px] mt-2 overflow-y-scroll no-scrollbar ">
                {profiledetails?.bio?.map((bio) => {
                  return <p className="text-sm">{bio}</p>;
                })}
              </div> */}
            </div> 
          {/* </div>  */}
          {/* <div className="ml-5">
            <button
              type="button"
              className="text-white bg-indigo-500/100 hover:bg-blue-800 font-medium rounded-b-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-[670px]"
              onClick={handleProfileEditOpen}
            >
              Edit Profile
            </button>
          </div> */}
          <div>
            <div className="ml-[290px] mt-7 ">
              <h1 className="text-white font-medium text-xl hover:cursor-pointer ml-[43px]">
                POST
              </h1>
            </div>
            <div className="bg-[rgba(0,0,0,0.5)] h-1 w-[670px] ml-5 m-1" />
          </div>
          <div className="h-[230px] mx-5 w-[670px] pt-5 h-42">
            <ProfilePosts userId={profiledetails.userId} />
          </div>
        </div>
      </div>
      <EditProfileModel
        open={opne}
        handleClose={handleProfileEditClose}
        data={profiledetails}
      ></EditProfileModel>
    </>
  );
}

export default Profiledetails;
