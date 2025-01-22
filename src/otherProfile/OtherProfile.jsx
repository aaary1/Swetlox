import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Loadder from "../loadder/Loadder";
import Profiledetails from "../Profile/Profiledetails";
import { privateApi } from "../utils/api";
import OtherProfileDetails from "./OtherProfileDetails";

const OtherProfile = () => {
  const [profileData, setProfileData] = useState();
  const [isLoading, setLoading] = useState(true);
  const { userId } = useParams();
  const fetchProfileData = async () => {
    console.log(`/user/profile-data/${userId}`);
    try {
      const { data } = await privateApi.get(`/user/profile-data/${userId}`);
      setProfileData(data);
      setLoading(false);
    } catch (ex) {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProfileData();
  }, [userId]);
  if (isLoading) {
    return (
      <div>
        <Loadder></Loadder>
      </div>
    );
  }

  return (
    <>
      <OtherProfileDetails profiledetails={profileData} userId={userId} />
    </>
  );
};
export default OtherProfile;
