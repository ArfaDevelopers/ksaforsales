import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ProfileAvatar03,
  ProfileAvatar04,
  ProfileAvatar05,
  chat_attachment,
  chatsearch,
} from "../../imagepath";
import Footer from "../../home/footer/Footer";
import UserHeader from "../Userheader";
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
import { auth, db } from "../../Firebase/FirebaseConfig";
import Header from "../../home/header";
const Message = ({ recieverId }) => {
  const parms = useLocation().pathname;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [refresh, setRefresh] = useState(false);
  const user1 = auth.currentUser;
  const userId = user1?.uid;
  var displayName = user1?.displayName;
  const [receiverId, setReceiverId] = useState(null);
  const [receivers, setReceivers] = useState([]); // State to hold the list of receivers

  console.log(userId, "recieverId__________1");
  console.log(displayName, "recieverId__________1userId");
  const chatEndRef = useRef(null);
  const fetchReceivers = async () => {
    try {
      const response = await fetch(
        "http://localhost:9002/api/getusermessage?userId=" + userId,
      ); // Adjust the endpoint as needed
      const data = await response.json();
      const uniqueReceivers = [
        ...new Set(data.messages.map((msg) => msg.receiver)),
      ]; // Get unique receiver IDs
      setReceivers(uniqueReceivers); // Assuming the response has a 'receivers' array
    } catch (error) {
      console.error("Error fetching receivers:", error);
    }
  };

  const fetchMessages = async () => {
    if (!receiverId) return; // Don't fetch if no receiver is selected
    try {
      const response = await fetch(
        `http://localhost:9002/api/getmessages?userId=${userId}&receiverId=${receiverId}`,
        { method: "GET" },
      );
      const data = await response.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    fetchReceivers(); // Fetch the list of receivers on component mount
  }, []);

  useEffect(() => {
    fetchMessages(); // Fetch messages when receiverId changes
  }, [receiverId]);

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newMessage,
          sender: userId,
          receiver: receiverId,
          from: userId,
          senderName: displayName,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      setNewMessage("");
      fetchMessages(); // Fetch messages after sending
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleReceiverClick = (id) => {
    setReceiverId(id); // Set the selected receiver ID
    fetchMessages(); // Fetch messages for the selected receiver
  };

  return (
    <>
      <Header />

      <div
        className="dashboard-content"
        style={{
          marginTop: "8rem",
        }}
      >
        <div className="container">
          <div
            class="col-12 text-start text-dark "
            style={{ fontSize: 26, fontWeight: 500 }}
          >
            Home / Messages
          </div>

          <div className="">
            <ul className="dashborad-menus">
              <li>
                <Link to="/dashboard">
                  <i className="feather-grid" /> <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/profile">
                  <i className="fa-solid fa-user" /> <span>Profile</span>
                </Link>
              </li>
              <li>
                <Link to="/my-listing">
                  <i className="feather-list" /> <span>My Listing</span>
                </Link>
              </li>
              <li>
                <Link to="/bookmarks">
                  <i className="fas fa-solid fa-heart" /> <span>Favourite</span>
                </Link>
              </li>
              <li className="active">
                <Link to="/messages">
                  <i className="fa-solid fa-comment-dots" />{" "}
                  <span>Messages</span>
                </Link>
              </li>
              <li>
                <Link to="/reviews">
                  <i className="fas fa-solid fa-star" /> <span>Reviews</span>
                </Link>
              </li>
              <li>
                <Link to="/login">
                  <i className="fas fa-light fa-circle-arrow-left" />{" "}
                  <span>Logout</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="profile-content">
            <div className="row dashboard-info chat-window">
              <div className="col-lg-4">
                <div className="chat-cont-left">
                  <form className="chat-search">
                    <div className="form-group">
                      <div className="group-img">
                        <img src={chatsearch} alt="" />
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search"
                        />
                      </div>
                    </div>
                  </form>
                  <div className="chat-users-list">
                    <div className="chat-scroll">
                      {receivers.map((receiver) => (
                        <Link
                          key={receiver} // Assuming each receiver has a unique 'id'
                          to="#"
                          className="media d-flex"
                          onClick={() => handleReceiverClick(receiver)}
                        >
                          <div className="media-img-wrap flex-shrink-0">
                            <div className="avatar avatar-online">
                              <img
                                src={ProfileAvatar03}
                                alt="User  Image"
                                className="avatar-img rounded-circle"
                              />
                            </div>
                          </div>
                          <div className="media-body flex-grow-1">
                            <div>
                              <div className="user-name">{receiver}</div>{" "}
                              {/* Display receiver's name */}
                              <div className="user-last-chat">
                                Last message preview...
                              </div>
                            </div>
                            <div>
                              <div className="last-chat-time block">2 min</div>
                              <div className="badge badge-success rounded-pill">
                                15
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="chat-cont-right">
                  <div className="chat-header">
                    <Link
                      id="back_user_list"
                      to="javascript:void(0)"
                      className="back-user-list"
                    >
                      <i className="fa-solid fa-chevron-left" />
                    </Link>
                    <div className="media d-flex align-items-center">
                      <div className="media-img-wrap flex-shrink-0">
                        <div className="avatar avatar-online">
                          <img
                            src={ProfileAvatar03}
                            alt="User  Image"
                            className="avatar-img rounded-circle"
                          />
                        </div>
                      </div>
                      <div className="media-body flex-grow-1">
                        <div className="user-name">
                          {receiverId ? receiverId : "Select a receiver"}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="chat-body">
                    <div className="chat-scroll">
                      <ul className="list-unstyled">
                        {messages.map((message) => (
                          <li
                            key={message.id}
                            className={`media d-flex ${
                              message.sender === userId ? "sent" : "received"
                            }`}
                          >
                            <div className="avatar flex-shrink-0">
                              <img
                                src={ProfileAvatar03}
                                alt="User  Image"
                                className="avatar-img rounded-circle"
                              />
                            </div>
                            <div className="media-body flex-grow-1">
                              <div className="msg-box">
                                <div>
                                  <p>{message.content}</p>
                                  <ul className="chat-msg-info">
                                    <li>
                                      <div className="chat-time">
                                        <span>
                                          {new Date(
                                            message.created_at._seconds * 1000,
                                          ).toLocaleTimeString()}
                                        </span>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                        <div ref={chatEndRef} />
                      </ul>
                    </div>
                  </div>
                  <div className="chat-footer">
                    <div className="input-group">
                      <div className="attach-btn">
                        <input
                          type="text"
                          className="input-msg-send form-control"
                          placeholder="Type something"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <div className="btn-file btn">
                          <i className="fa fa-paperclip" />
                          <input type="file" />
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn msg-send-btn"
                        onClick={sendMessage}
                      >
                        <i className="fas fa-paper-plane" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Profile Content */}
      <Footer />
    </>
  );
};
export default Message;
