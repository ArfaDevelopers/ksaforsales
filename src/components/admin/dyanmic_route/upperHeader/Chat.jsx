import React, { useEffect, useState, useRef } from "react";
// import {
//   db,
//   collection,
//   query,
//   where,
//   orderBy,
//   onSnapshot,
//   addDoc,
//   serverTimestamp,
// } from "../../../firebase/firestore";
import {
  getDocs,
  collection,
  addDoc,
  setDoc,
  getDoc,
  doc,
  query,
  where,
  orderBy,
  onSnapshot,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../Firebase/FirebaseConfig";
import io from "socket.io-client";

// import { db } from "../../Firebase/FirebaseConfig";
let socket;

const Chat = ({ recieverId, userId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [refresh, setRefresh] = useState(false);

  console.log(recieverId, "recieverId__________");
  console.log(userId, "recieverId__________userId");
  const chatEndRef = useRef(null);

  //   useEffect(() => {
  //     if (!chatId) return;

  //     const messagesQuery = query(
  //       collection(db, "messages"),
  //       where("chat_id", "==", chatId),
  //       orderBy("created_at", "asc")
  //     );

  //     const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
  //       setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  //     });

  //     return () => unsubscribe();
  //   }, [chatId]);
  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `https://ksaforsaleapis.vercel.app/api/getmessages?userId=${userId}&receiverId=${recieverId}`,
        { method: "GET" }
      );
      const data = await response.json();
      console.log("Messages Data:", data);
      setMessages(data.messages || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchMessages(); // Fetch initial messages

    const messagesRef = collection(db, "messages");
    const messagesQuery = query(
      messagesRef,
      where("sender", "in", [userId, recieverId]),
      where("receiver", "in", [recieverId, userId])
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      console.log("Messages table updated. Fetching new messages...");
      fetchMessages(); // Re-fetch messages when Firestore changes
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  //   useEffect(() => {
  //     const fetchMessages = async () => {
  //       try {
  //         const response = await fetch(
  //           "https://ksaforsaleapis.vercel.app/api/getmessages?userId=tQmx7v6VjFdPbrEMPrZCLHJP58s2&receiverId=DqlbCkK1DzaTSP95sqJPrT6IDAx1",
  //           {
  //             method: "GET",
  //           }
  //         );
  //         const data = await response.json();
  //         console.log("Messages Data:", data);
  //         setMessages(data.messages || []); // Extract messages array
  //       } catch (error) {
  //         console.error("Error fetching messages:", error);
  //       }
  //     };

  //     fetchMessages();
  //   }, [refresh]);
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    try {
      const response = await fetch(
        "https://ksaforsaleapis.vercel.app/api/messages",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: newMessage,
            sender: userId,
            receiver: recieverId,
            from: userId,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      setRefresh(!refresh);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  //   const sendMessage = async () => {
  //     if (newMessage.trim() === "") return;

  //     await addDoc(collection(db, "messages"), {
  //       chat_id: 0,
  //       content: newMessage,
  //       created_at: serverTimestamp(),
  //       sender: userId,
  //       receiver: userId === "client" ? "admin" : "client", // Example logic
  //       from: userId === "client" ? "client" : "admin",
  //     });
  //     setRefresh(!refresh);
  //     setNewMessage("");
  //   };

  return (
    <div className="container mt-4">
      <div className="card shadow-sm p-3 chat-container">
        <div className="chat-box overflow-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`d-flex ${
                msg.sender === userId
                  ? "justify-content-end"
                  : "justify-content-start"
              } my-2`}
            >
              <div
                className={`chat-bubble p-3 rounded ${
                  msg.sender === userId ? "bg-primary text-white" : "bg-light"
                }`}
              >
                <p className="mb-1">{msg.content}</p>
                <small className="text-muted d-block text-end">
                  {new Date(
                    msg.created_at?._seconds * 1000
                  ).toLocaleTimeString()}
                </small>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input Box */}
        <div className="input-group mt-3">
          <input
            type="text"
            className="form-control"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button className="btn btn-primary" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
