import React, { useState, useEffect } from "react";
import axios from "axios";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [recipientId, setRecipientId] = useState("");

  const fetchMessages = async () => {
    const response = await axios.get("http://localhost:5000/messages", {
      headers: { Authorization: Bearer ${localStorage.getItem("token")} },
    });
    setMessages(response.data);
  };

  const sendMessage = async () => {
    await axios.post(
      "http://localhost:5000/messages",
      { recipientId, content: newMessage },
      { headers: { Authorization: Bearer ${localStorage.getItem("token")} } }
    );
    fetchMessages();
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div>
      <h3>Messages</h3>
      <ul>
        {messages.map((msg) => (
          <li key={msg.id}>{msg.sender}: {msg.content}</li>
        ))}
      </ul>
      <input type="text" placeholder="Recipient ID" onChange={(e) => setRecipientId(e.target.value)} />
      <input type="text" placeholder="Message" onChange={(e) => setNewMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;