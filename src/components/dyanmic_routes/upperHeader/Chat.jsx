import React, { useEffect, useState, useRef } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../../Firebase/FirebaseConfig";

// Debounce utility to limit fetchMessages calls
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

const Chat = ({ recieverId, userId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSending, setIsSending] = useState(false); // Prevent double sends
  const chatEndRef = useRef(null);

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `/api/getmessages?userId=${userId}&receiverId=${recieverId}`,
        { method: "GET" },
      );
      const data = await response.json();
      console.log("Messages Data:", data);

      // Deduplicate messages by id or composite key
      const uniqueMessages = Array.from(
        new Map(
          (data.messages || []).map((msg) => [
            msg.id ||
              `${msg.sender}-${msg.created_at?._seconds}-${msg.content}`,
            msg,
          ]),
        ).values(),
      );
      setMessages(uniqueMessages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const debouncedFetchMessages = debounce(fetchMessages, 500);

  useEffect(() => {
    fetchMessages();

    const messagesRef = collection(db, "messages");
    const messagesQuery = query(
      messagesRef,
      where("sender", "in", [userId, recieverId]),
      where("receiver", "in", [recieverId, userId]),
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      console.log("Messages table updated. Fetching new messages...");
      debouncedFetchMessages();
    });

    return () => unsubscribe();
  }, [userId, recieverId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (newMessage.trim() === "" || isSending) return;

    setIsSending(true);
    const messagePayload = {
      content: newMessage,
      sender: userId,
      receiver: recieverId,
      from: userId,
    };

    try {
      console.log("Sending message:", messagePayload);
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messagePayload),
      });

      const responseData = await response.json();
      console.log("Send Message Response:", responseData);

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="chat-container" style={styles.container}>
      {/* Messages Area */}
      <div style={styles.messagesArea}>
        {messages.map((msg) => (
          <div
            key={
              msg.id ||
              `${msg.sender}-${msg.created_at?._seconds}-${msg.content}`
            }
            style={
              msg.sender === userId
                ? styles.userMessageContainer
                : styles.botMessageContainer
            }
          >
            {msg.sender !== userId && (
              <div style={styles.avatar}>🤖</div> // Bot avatar
            )}
            <div
              style={
                msg.sender === userId ? styles.userMessage : styles.botMessage
              }
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div style={styles.inputArea}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              sendMessage();
            }
          }}
          placeholder="Message..."
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.sendButton}>
          ↑
        </button>
      </div>
    </div>
  );
};

// Inline styles to match the design
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: window.innerWidth <= 576 ? "300px" : "500px",
    width: "auto",
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f5f5f5",
  },
  header: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    backgroundColor: "#6b48ff", // Purple header
    color: "#fff",
  },
  backArrow: {
    marginRight: "10px",
    cursor: "pointer",
  },
  headerTitle: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "bold",
  },
  messagesArea: {
    flex: 1,
    padding: "15px",
    overflowY: "auto",
    backgroundColor: "#f5f5f5",
  },
  botMessageContainer: {
    display: "flex",
    alignItems: "flex-start",
    marginBottom: "15px",
  },
  userMessageContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "15px",
  },
  avatar: {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    backgroundColor: "#6b48ff", // Purple avatar
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "10px",
    fontSize: "16px",
  },
  botMessage: {
    backgroundColor: "#fff",
    color: "#6b48ff", // Purple text for bot messages
    padding: "10px 15px",
    borderRadius: "15px 15px 15px 0",
    maxWidth: "70%",
    fontSize: "14px",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
  },
  userMessage: {
    backgroundColor: "#e6e1ff", // Light purple for user messages
    color: "#333",
    padding: "10px 15px",
    borderRadius: "15px 15px 0 15px",
    maxWidth: "70%",
    fontSize: "14px",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
  },
  inputArea: {
    display: "flex",
    padding: "10px",
    borderTop: "1px solid #ddd",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "20px",
    fontSize: "14px",
    outline: "none",
  },
  sendButton: {
    marginLeft: "10px",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#6b48ff", // Purple send button
    color: "#fff",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "18px",
  },
};

export default Chat;
