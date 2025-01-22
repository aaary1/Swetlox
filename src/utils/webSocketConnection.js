import { Client, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { store } from "../main";
import { addMessage, addNotification } from "../reducer/webSocketSlice";

export let stompClient = null;
export const connect = () => {
  const state = store.getState();
  const userEmail = state.userDetails.user.email;
  const id = state.userDetails.user.id;
  const socket = new SockJS("http://localhost:9000/swetlox/ws");
  stompClient = Stomp.over(socket);
  stompClient.connect({}, () => {
    stompClient.subscribe(`/topic/notifications/${userEmail}`, (message) => {
      const notification = JSON.parse(message.body);
      console.log(notification);
      store.dispatch(addNotification(notification));
    });

    stompClient.subscribe(`/topic/messages/${userEmail}`, (message) => {
      const messageData = JSON.parse(message.body);
      messageData["type"] = "other";
      store.dispatch(addMessage(messageData));
    });

    stompClient.subscribe(
      `/topic/following-request/${userEmail}`,
      (message) => {
        const messageData = JSON.parse(message.body);
        console.log("why ?");
        console.log(messageData);
        console.log("???? ?");
        messageData["type"] = "connection-request";
        store.dispatch(addNotification(messageData));
      }
    );

    stompClient.subscribe(`/user/chat/message/${id}`, (message) => {
      const messageData = JSON.parse(message.body);
      console.log(messageData);
      store.dispatch(addMessage(messageData));
    });
  });
  stompClient.activate();
};
