import fetch from "isomorphic-fetch";
import React, { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";

const MessageList = () => {
  const { authState } = useOktaAuth();
  const [messages, setMessages] = useState<[]>([]);

  // fetch messages
  var f=async () => {
    if (authState.isAuthenticated) {
      const { accessToken } = authState;
      try {
        const response = await fetch(
          "http://localhost:8888/users/current",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );
        const data = await response.json();
        setMessages(data.messages);
      } catch (err) {
        // handle error as needed
      }
    }
  }
  useEffect(() => {
    f();
  }, [authState]);

  if (!messages) {
    return <div>Loading...</div>;
  }

  const items = messages.map(message => <li key={message}>{message}</li>);
  return <ul>{items}</ul>;
};
export default MessageList;
