"use client";

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  addDoc,
  query,
  orderBy,
  serverTimestamp,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { auth, db, GoogleAuthProvider } from "../../Firebase/FirebaseConfig";
import { signInWithPopup, signOut } from "firebase/auth";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
  Badge,
  Spinner,
  Alert,
} from "react-bootstrap";
import { FaPaperPlane, FaComments } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../home/header";
import Footer from "../../home/footer/Footer";
function Message() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [formValue, setFormValue] = useState("");
  const [sending, setSending] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const dummy = useRef();
  console.log(selectedUser, "uniqueUsers____________881");
  // Authentication state observer
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Fetch users who have chatted with the current user
  useEffect(() => {
    if (user) {
      const messagesRef = collection(db, "messages");
      const q = query(messagesRef, orderBy("createdAt", "asc"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const loadedMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const uniqueUserIds = Array.from(
          new Set(
            loadedMessages
              .filter(
                (msg) => msg.recieverId === user.uid || msg.uid === user.uid
              )
              .map((msg) => (msg.uid === user.uid ? msg.recieverId : msg.uid))
          )
        );
        console.log(loadedMessages, "uniqueUsers____________uniqueUserIds1");

        // Fetch user names based on unique user IDs
        const fetchUserNames = async () => {
          try {
            const usersCollection = collection(db, "users");
            const usersSnapshot = await getDocs(usersCollection);
            const usersData = {};

            usersSnapshot.forEach((doc) => {
              const data = doc.data();
              if (data.uid) {
                usersData[data.uid] = data.fullName || data.name || "Unnamed";
              }
            });

            const usersWithNames = uniqueUserIds.map((id) => ({
              id,
              name: usersData[id] || "Unknown User",
            }));

            setUsers(usersWithNames);
          } catch (error) {
            console.error("Error fetching user names:", error);
          }
        };

        fetchUserNames();
        setMessages(loadedMessages);
        setTimeout(() => {
          dummy.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      });

      return () => unsubscribe();
    }
  }, [user]);

  // Sign in with Google
  const signInWithGoogle = async () => {
    setSending(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setSending(false);
    }
  };

  // Sign out
  const handleSignOut = () => {
    signOut(auth).catch((error) => {
      console.error("Sign out error:", error);
    });
  };

  // Send message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!formValue.trim() || !selectedUser) return;

    setSending(true);
    const { uid, photoURL, displayName } = auth.currentUser;

    try {
      await addDoc(collection(db, "messages"), {
        text: formValue.trim(),
        createdAt: serverTimestamp(),
        recieverId: selectedUser.id, // Chat with the selected user
        uid,
        photoURL,
        name: displayName,
      });

      setFormValue("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setSending(false);
    }
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Render chat message
  const renderChatMessage = (message) => {
    const { text, uid, photoURL, name, createdAt, id } = message;
    const isCurrentUser = uid === auth.currentUser?.uid;

    return (
      <div
        key={id}
        className={`d-flex mb-3 ${
          isCurrentUser ? "justify-content-end" : "justify-content-start"
        }`}
      >
        <div
          className={`d-flex ${
            isCurrentUser ? "flex-row-reverse" : "flex-row"
          } align-items-start`}
          style={{ maxWidth: "70%" }}
        >
          <img
            src={
              photoURL ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                name || "User  "
              )}&background=007bff&color=fff`
            }
            alt="avatar"
            className="rounded-circle me-2 ms-2"
            style={{ width: "40px", height: "40px", objectFit: "cover" }}
          />
          <div className={`${isCurrentUser ? "me-2" : "ms-2"}`}>
            <div
              className={`p-3 rounded-3 shadow-sm ${
                isCurrentUser ? "bg-primary text-white" : "bg-white border"
              }`}
            >
              <div className="d-flex align-items-center mb-1">
                <small
                  className={`fw-bold ${
                    isCurrentUser ? "text-white-50" : "text-muted"
                  }`}
                >
                  {name || "Anonymous"}
                </small>
                {createdAt && (
                  <small
                    className={`ms-2 ${
                      isCurrentUser ? "text-white-50" : "text-muted"
                    }`}
                  >
                    {formatTime(createdAt)}
                  </small>
                )}
              </div>
              <div>{text}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Loading spinner
  if (loading) {
    return (
      <Container
        fluid
        className="d-flex justify-content-center align-items-center min-vh-100"
      >
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <>
      <Header />

      <div
        className="dashboard-content"
        style={{
          marginTop: "6rem",
        }}
      >
        <div className="container">
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
          <div className="container-fluid">
            <Row className="min-vh-100">
              <Col md={12}>
                <Row className="min-vh-100">
                  {/* Left Sidebar for Users */}
                  <Col
                    md={3}
                    className="bg-white p-3 border-end shadow-sm rounded-3"
                    style={{ height: "calc(100vh - 4rem)" }} // Adjusted for potential header/footer
                  >
                    <h5 className="text-primary mb-3 fw-bold">Users</h5>
                    {users.length === 0 ? (
                      <Alert variant="info" className="rounded-3">
                        No users to chat with.
                      </Alert>
                    ) : (
                      users.map((user) => (
                        <Button
                          key={user.id}
                          variant={
                            selectedUser?.id === user.id
                              ? "primary"
                              : "outline-primary"
                          }
                          className="w-100 mb-2 text-start rounded-4 shadow-sm transition-all duration-200 hover-shadow-lg"
                          onClick={() => setSelectedUser(user)}
                          style={{
                            background:
                              selectedUser?.id === user.id
                                ? "linear-gradient(to right, #3b82f6, #2563eb)"
                                : "",
                            borderColor: "#3b82f6",
                          }}
                        >
                          {user.name}
                        </Button>
                      ))
                    )}
                  </Col>

                  {/* Right Chat Area */}
                  <Col md={9} className="p-0">
                    <div
                      className="d-flex flex-column"
                      style={{ height: "calc(100vh - 4rem)" }}
                    >
                      {/* Top Bar */}
                      <div className="p-3 border-bottom bg-white shadow-sm">
                        <h5 className="mb-0 text-dark fw-bold">
                          Chat with {selectedUser?.name || "Select a User"}
                        </h5>
                      </div>

                      {/* Chat Window */}
                      <div
                        className="flex-grow-1 p-3 bg-gray-100 overflow-y-auto"
                        style={{ maxHeight: "calc(100vh - 12rem)" }} // Adjust maxHeight for top bar and input area
                      >
                        {messages.length === 0 || !selectedUser ? (
                          <Alert
                            variant="info"
                            className="text-center rounded-3"
                          >
                            <FaComments
                              className="mb-2"
                              style={{ fontSize: "2rem" }}
                            />
                            <div>Select a user to start chatting!</div>
                          </Alert>
                        ) : (
                          messages
                            .filter(
                              (msg) =>
                                msg.re_forestId === selectedUser.id ||
                                msg.uid === selectedUser.id
                            )
                            .map((msg) => renderChatMessage(msg))
                        )}
                        <div ref={dummy} />
                      </div>

                      {/* Input Area */}
                      <div className="p-3 border-top bg-white shadow-sm">
                        <InputGroup>
                          <Form.Control
                            type="text"
                            placeholder="Type something..."
                            value={formValue}
                            onChange={(e) => setFormValue(e.target.value)}
                            disabled={sending || !selectedUser}
                            className="rounded-3 border-gray-300"
                          />
                          <Button
                            variant="primary"
                            onClick={sendMessage}
                            disabled={
                              !formValue.trim() || sending || !selectedUser
                            }
                            className="rounded-3 shadow-sm"
                            style={{
                              background:
                                "linear-gradient(to right, #3b82f6, #2563eb)",
                              border: "none",
                            }}
                          >
                            <FaPaperPlane />
                          </Button>
                        </InputGroup>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Message;
