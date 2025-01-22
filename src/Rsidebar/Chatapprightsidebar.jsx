import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { recentChatAction } from "../reducer/recentChatReducer";
import { privateApi } from "../utils/api";
import Chatsidebar from "./Chatsidebar";

function Chatapprightsidebar({ query }) {
  const [userConnection, setUserConnection] = useState([]);
  const [searchUser, setSearchUser] = useState([]);
  const recentChatUser = useSelector(
    (state) => state.recentChat.recentChatUser
  );
  const dispatch = useDispatch();
  const fetchUserConnectionData = async () => {
    const { data } = await privateApi.get("/user/get-user-chat-history");
    dispatch(recentChatAction.addBulkUser(data));
  };

  useEffect(() => {
    fetchUserConnectionData();
  }, []);
  useEffect(() => {
    if (query != null && query.length != 0) {
      setSearchUser(
        userConnection.filter((user) => user.userName.includes(query))
      );
    } else {
      setSearchUser([]);
    }
  }, [query]);

  useEffect(() => {
    setUserConnection(recentChatUser);
  }, [recentChatUser]);

  return (
    <div className="w-[100%] h-[100%] overflow-auto">
      {searchUser != null &&
        searchUser.map((chat, index) => {
          const bgColor = index % 2 === 0 ? "bg-gray-400" : "bg-white";
          return <Chatsidebar key={index} userData={chat} />;
        })}

      {searchUser.length == 0 &&
        userConnection.map((chat, index) => {
          const bgColor = index % 2 === 0 ? "bg-gray-400" : "bg-white";
          return <Chatsidebar key={index} userData={chat} />;
        })}
    </div>
  );
}

export default Chatapprightsidebar;
