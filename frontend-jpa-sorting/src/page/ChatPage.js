import React, { useEffect } from "react";

import SockJsClient from "react-stomp";
// import SockJS from "sockjs-client";
// import Stomp from "stompjs";

const ChatPage = () => {
  const [socketClient, setSocketClient] = React.useState(null);
  const [stompClient, setStompClient] = React.useState(null);

  useEffect(() => {
    console.log(socketClient);
  }, [socketClient]);

  return (
    <div>
      <SockJsClient
        url="http://localhost:8080/websocketApp"
        topics={["/topic/javainuse"]}
        onMessage={(msg) => {
          console.log(msg);
        }}
        ref={(client) => {
          console.log(client);
          setSocketClient(client);
        }}
        debug={true}
      />
    </div>
  );
};

export default ChatPage;
