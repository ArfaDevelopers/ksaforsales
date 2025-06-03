"use client";

import React, { useEffect, useRef, useState } from "react";
import Header from "../../home/header";
import Footer from "../../home/footer/Footer";
import { Link } from "react-router-dom";

import {
  collection,
  addDoc,
  query,
  orderBy,
  serverTimestamp,
  onSnapshot,
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
  Navbar,
  Badge,
  Spinner,
  Alert,
} from "react-bootstrap";
import {
  FaGoogle,
  FaSignOutAlt,
  FaPaperPlane,
  FaComments,
  FaUser,
  FaRocket,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

function Message(props) {
  console.log(props, "props main kia h");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [formValue, setFormValue] = useState("");
  const [sending, setSending] = useState(false);
  const dummy = useRef();

  // Authentication state observer
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Messages observer
  useEffect(() => {
    if (user) {
      const messagesRef = collection(db, "messages");
      const q = query(messagesRef, orderBy("createdAt", "asc"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const loadedMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(loadedMessages, "loadedMessages_______");
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
    if (!formValue.trim()) return;

    setSending(true);
    const { uid, photoURL, displayName } = auth.currentUser;

    try {
      await addDoc(collection(db, "messages"), {
        text: formValue.trim(),
        createdAt: serverTimestamp(),
        recieverId: props.recieverId,
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
                name || "User"
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
      {props.userId > 0 ? "" : <Header />}

      <div className="min-vh-100" style={{ backgroundColor: "#f8f9fa" }}>
        {/* {props ? (
          ""
        ) : ( */}
        <>
          {" "}
          {props.length > 0 ? (
            <div
              className="dashboard-content"
              style={{
                marginTop: "8rem",
              }}
            >
              <div className="container">
                <div
                  className="col-12 text-start text-dark"
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
                        <i className="fas fa-solid fa-heart" />{" "}
                        <span>Favourite</span>
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
                        <i className="fas fa-solid fa-star" />{" "}
                        <span>Reviews</span>
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
              </div>
            </div>
          ) : (
            ""
          )}
        </>
        {/* )} */}
        <Container
          className="py-4"
          style={{
            marginTop: "8rem",
          }}
        >
          {/* Chat Room UI */}
          <Row className="justify-content-center">
            <Col
              lg={props.fullWidth ? 12 : 8}
              xl={props.fullWidth ? 12 : 6}
              style={props.fullWidth ? { width: "100%" } : {}}
            >
              <Card className="shadow border-0" style={{ height: "70vh" }}>
                <Card.Header className="bg-primary text-white">
                  <div className="d-flex align-items-center">
                    <FaComments className="me-2" />
                    <h5 className="mb-0">Group Chat</h5>
                    <Badge bg="light" text="dark" className="ms-auto">
                      {messages.length} messages
                    </Badge>
                  </div>
                </Card.Header>

                <Card.Body
                  className="p-0 overflow-auto"
                  style={{
                    height: "calc(70vh - 140px)",
                    backgroundColor: "#f8f9fa",
                  }}
                >
                  <div className="p-3">
                    {messages.length === 0 ? (
                      <Alert variant="info" className="text-center">
                        <FaComments className="me-2" />
                        No messages yet. Start the conversation!
                      </Alert>
                    ) : (
                      messages.map((msg) => renderChatMessage(msg))
                    )}
                    <div ref={dummy} />
                  </div>
                </Card.Body>

                <Card.Footer className="bg-white border-top">
                  <Form onSubmit={sendMessage}>
                    <InputGroup>
                      <Form.Control
                        type="text"
                        placeholder="Type your message..."
                        value={formValue}
                        onChange={(e) => setFormValue(e.target.value)}
                        disabled={sending}
                        className="border-0 shadow-none"
                        style={{ backgroundColor: "#f8f9fa" }}
                      />
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={!formValue.trim() || sending}
                        className="px-4"
                      >
                        {sending ? (
                          <Spinner animation="border" size="sm" />
                        ) : (
                          <FaPaperPlane style={{ color: "red" }} />
                        )}
                      </Button>
                    </InputGroup>
                  </Form>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      {props ? "" : <Footer />}
    </>
  );
}

export default Message;
