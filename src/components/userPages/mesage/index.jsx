"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "../../Firebase/FirebaseConfig";
import {
  Row,
  Col,
  Button,
  Form,
  InputGroup,
  Alert,
  Container,
} from "react-bootstrap";
import { FaPaperPlane } from "react-icons/fa";
import Header from "../../home/header";
import Footer from "../../home/footer/Footer";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";

export default function Message() {
  const [user, setUser] = useState(null);
  const [chatUsers, setChatUsers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const dummy = useRef();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Logs out the user
      console.log("User logged out successfully!");
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };
  useEffect(() => {
    const unsub = auth.onAuthStateChanged(setUser);
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!user) return;
    const unsub = onSnapshot(collection(db, "messages"), async (snap) => {
      const allMessages = snap.docs.map((doc) => doc.data());
      const userInvolvedMessages = allMessages.filter(
        (msg) => msg.uid === user.uid || msg.recieverId === user.uid
      );

      const chatUserIds = [
        ...new Set(
          userInvolvedMessages.map((msg) =>
            msg.uid === user.uid ? msg.recieverId : msg.uid
          )
        ),
      ];

      const userDocs = await getDocs(collection(db, "users"));
      const usersMap = {};
      userDocs.forEach((doc) => {
        const u = doc.data();
        usersMap[u.uid] = u.fullName || u.name || "Unknown";
      });

      const userList = chatUserIds.map((uid) => ({
        id: uid,
        name: usersMap[uid] || "Unknown",
      }));

      setChatUsers(userList);
    });

    return () => unsub();
  }, [user]);

  useEffect(() => {
    if (!user || !selected) return;
    const unsub = onSnapshot(
      query(collection(db, "messages"), orderBy("createdAt")),
      (snap) => {
        const allMessages = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const filtered = allMessages.filter(
          (msg) =>
            (msg.uid === user.uid && msg.recieverId === selected.id) ||
            (msg.uid === selected.id && msg.recieverId === user.uid)
        );
        setMessages(filtered);
        setTimeout(
          () => dummy.current?.scrollIntoView({ behavior: "smooth" }),
          100
        );
      }
    );
    return () => unsub();
  }, [user, selected]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || !selected) return;

    await addDoc(collection(db, "messages"), {
      uid: user.uid,
      recieverId: selected.id,
      text: input.trim(),
      name: user.fullName || user.displayName || "Anonymous",
      createdAt: serverTimestamp(),
    });
    setInput("");
  };

  const formatTime = (ts) =>
    ts?.toDate().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

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
              {/* <li>
                <Link to="/reviews">
                  <i className="fas fa-solid fa-star" /> <span>Reviews</span>
                </Link>
              </li> */}
              <li>
                <Link className="dropdown-item" to="#" onClick={handleLogout}>
                  <i className="fas fa-light fa-circle-arrow-left" />{" "}
                  <span>Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Container style={{ marginTop: "-1rem" }}>
        <Row className="min-vh-100">
          <Col md={3} className="border-end p-3 bg-white">
            <h5>Chats</h5>
            {chatUsers.length === 0 ? (
              <Alert>No chats yet.</Alert>
            ) : (
              chatUsers.map((u) => (
                <Button
                  key={u.id}
                  variant={
                    selected?.id === u.id ? "primary" : "outline-primary"
                  }
                  className="w-100 text-start mb-2"
                  onClick={() => setSelected(u)}
                >
                  {u.name}
                </Button>
              ))
            )}
          </Col>

          <Col md={9} className="d-flex flex-column p-0">
            <div className="p-3 bg-white border-bottom">
              <h5>Chat with {selected ? selected.name : "..."}</h5>
            </div>
            <div className="flex-grow-1 p-3 bg-light overflow-auto">
              {!selected ? (
                <Alert>Select a chat.</Alert>
              ) : messages.length === 0 ? (
                <Alert>No messages yet.</Alert>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`d-flex mb-2 ${
                      msg.uid === user.uid
                        ? "justify-content-end"
                        : "justify-content-start"
                    }`}
                  >
                    <div
                      className={`p-2 rounded ${
                        msg.uid === user.uid
                          ? "bg-primary text-white"
                          : "bg-white border"
                      }`}
                    >
                      <div>
                        <small className="fw-bold">{msg.name}</small>{" "}
                        <small>{formatTime(msg.createdAt)}</small>
                      </div>
                      <div>{msg.text}</div>
                    </div>
                  </div>
                ))
              )}
              <div ref={dummy} />
            </div>
            <div className="p-3 border-top bg-white">
              <Form onSubmit={handleSend}>
                <InputGroup>
                  <Form.Control
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message…"
                    disabled={!selected}
                  />
                  <Button type="submit" disabled={!input.trim() || !selected}>
                    <FaPaperPlane />
                  </Button>
                </InputGroup>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
