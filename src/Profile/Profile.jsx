import Profiledetails from "./Profiledetails";
import React, { useEffect, useState } from "react";
import { privateApi } from "../utils/api";
import Loadder from "../loadder/Loadder";
import { useSelector } from "react-redux";
function Profile() {
  const [profileData, setProfileData] = useState();
  const [isLoading, setLoading] = useState(true);
  const userId = useSelector((state) => state.userDetails.user.id);
  const fetchProfileData = async () => {
    try {
      const { data } = await privateApi.get(`/user/profile-data/${userId}`);
      console.log(data);
      setProfileData(data);
      setLoading(false);
    } catch (ex) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProfileData();
  }, []);
  if (isLoading) {
    return (
      <div>
        <Loadder></Loadder>
      </div>
    );
  }
  
  return (
    <>
      <Profiledetails profiledetails={profileData} />
    </>
  );
}

export default Profile;
