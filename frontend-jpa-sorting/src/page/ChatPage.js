import React, { useEffect, useRef, useState } from "react";

import SockJsClient from "react-stomp";
// import SockJS from "sockjs-client";
// import Stomp from "stompjs";

const ChatPage = () => {
  const stompClientRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [name, setName] = useState("");
  const [nameIsLocked, setNameIsLocked] = useState(false);

  const onConnect = () => {
    setIsConnected(true);
  };

  const [receivedMessages, setReceiveedMessages] = useState("");
  const [messageInput, setMessageInput] = useState("");

  let onMessageReceived = (msg) => {
    setReceiveedMessages(msg.content + receivedMessages);
  };

  const joinChat = () => {
    setNameIsLocked(true);
    setTimeout(() => {
      stompClientRef.current.sendMessage(
        "/app/chat.newUser",
        JSON.stringify({
          sender: name, // Replace with the desired sender name
          content: `User ${name} joined chat!`, // Replace with the desired message
        })
      );
    }, 1000);
  };

  const sendMessage = () => {
    stompClientRef.current.sendMessage(
      "/app/chat.sendMessage",
      JSON.stringify({
        type: "type",
        sender: name, // Replace with the desired sender name
        content: messageInput, // Replace with the desired message
      })
    );
    setMessageInput("");
  };

  console.log(nameIsLocked);

  return (
    <div>
      {nameIsLocked === false && (
        <>
          <input value={name} onChange={(e) => setName(e.target.value)}></input>
          <button onClick={joinChat}>Lock Name</button>
        </>
      )}
      {nameIsLocked && (
        <>
          <input
            value={messageInput}
            onChange={(e) => {
              setMessageInput(e.target.value);
            }}
          ></input>
          <button onClick={sendMessage}>Send Message</button>
        </>
      )}
      {nameIsLocked && (
        <SockJsClient
          url="http://localhost:8080/websocketApp"
          topics={["/topic/javainuse"]}
          onMessage={(msg) => {
            console.log(msg);
            onMessageReceived(msg);
          }}
          ref={(client) => {
            stompClientRef.current = client;
            setIsConnected(true);
          }}
          debug={true}
        />
      )}
      <p>{receivedMessages}</p>
    </div>
  );
};

export default ChatPage;
