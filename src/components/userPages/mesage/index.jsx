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
  updateDoc,
  doc,
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
import { FaUserAlt, FaListUl, FaHeart } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { TiMessages } from "react-icons/ti";
import { TbLogout2 } from "react-icons/tb";

export default function Message() {
  const [user, setUser] = useState(null);
  const [chatUsers, setChatUsers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [unreadCounts, setUnreadCounts] = useState({});
  const dummy = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const [productData, setProductData] = useState(null); // 🔹 Step 1: State for product data

  console.log(productData, "No such __messagesmessages");
  useEffect(() => {
    const messageWithProductId = messages.find((msg) => msg.productIds);
    if (messageWithProductId) {
      console.log("Product ID:", messageWithProductId.productIds);

      fetch("http://168.231.80.24:9002/api/dataofmessager", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: messageWithProductId.productIds }),
      })
        .then((res) => res.json())
        .then((data) => {
          setProductData(data); // 🔹 Step 2: Set product data in state
          console.log("Filtered product data:", data);
        })
        .catch((error) => {
          console.error("Error fetching product data:", error);
        });
    }
  }, [messages]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(setUser);
    return () => unsub();
  }, []);

  // Track which messages have been seen by the current user
  useEffect(() => {
    if (!user || !selected) return;

    // Mark messages as seen when opening a chat
    const updateSeenStatus = async () => {
      const messagesToUpdate = messages.filter(
        (msg) => msg.recieverId === user.uid && !msg.seen
      );

      const batch = messagesToUpdate.map((msg) =>
        updateDoc(doc(db, "messages", msg.id), { seen: true })
      );

      await Promise.all(batch);
    };

    updateSeenStatus();
  }, [selected, messages, user]);

  // Fetch and track unread counts for each conversation
  useEffect(() => {
    if (!user) return;

    const unsub = onSnapshot(
      query(collection(db, "messages"), orderBy("createdAt")),
      (snap) => {
        const allMessages = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Filter messages that belong to current user
        const userMessages = allMessages.filter(
          (msg) => msg.uid === user.uid || msg.recieverId === user.uid
        );

        // Calculate unread counts per conversation
        const counts = {};
        userMessages.forEach((msg) => {
          const otherUserId = msg.uid === user.uid ? msg.recieverId : msg.uid;

          if (msg.recieverId === user.uid && !msg.seen) {
            counts[otherUserId] = (counts[otherUserId] || 0) + 1;
          }
        });

        setUnreadCounts(counts);

        // Get unique chat partners
        const chatPartners = [
          ...new Set(
            userMessages.map((msg) =>
              msg.uid === user.uid ? msg.recieverId : msg.uid
            )
          ),
        ];

        // Fetch user data
        const fetchUsers = async () => {
          const usersSnapshot = await getDocs(collection(db, "users"));
          const usersMap = {};
          usersSnapshot.forEach((doc) => {
            const u = doc.data();
            usersMap[u.uid] = u.fullName || u.name || "Unknown";
          });

          const userList = chatPartners.map((uid) => ({
            id: uid,
            name: usersMap[uid] || "Unknown",
            unread: counts[uid] || 0,
          }));

          setChatUsers(userList);
        };

        fetchUsers();

        // Update current chat messages if needed
        if (selected) {
          const filtered = allMessages.filter(
            (msg) =>
              (msg.uid === user.uid && msg.recieverId === selected.id) ||
              (msg.uid === selected.id && msg.recieverId === user.uid)
          );
          setMessages(filtered);
        }
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
      seen: false, // New messages are unread by default
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
        style={{ marginTop: "5rem", paddingBottom: "0px" }}
      >
        <div className="container">
          <div className="">
            <ul className="dashborad-menus">
              <li>
                <Link to="/dashboard">
                  <MdDashboard /> <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/profile">
                  <FaUserAlt /> <span>Profile</span>
                </Link>
              </li>
              <li>
                <Link to="/my-listing">
                  <FaListUl /> <span>My Listing</span>
                </Link>
              </li>
              <li>
                <Link to="/bookmarks">
                  <FaHeart /> <span>Favourite</span>
                </Link>
              </li>
              <li className="active">
                <Link to="/messages">
                  <TiMessages /> <span>Messages</span>
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="#" onClick={handleLogout}>
                  <TbLogout2 />
                  <span>Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Container className="mb-3">
        <Row className="gap-3 gap-lg-0">
          {/* Sidebar */}
          <Col lg={3}>
            <div className="chats_btn_wrap_main">
              <h5 className="chat_heading">Chats</h5>
              <div className="chat_btns_wrap">
                {chatUsers.length === 0 ? (
                  <Alert>No chats yet.</Alert>
                ) : (
                  chatUsers.map((u) => (
                    <Button
                      key={u.id}
                      variant={
                        selected?.id === u.id ? "primary" : "outline-primary"
                      }
                      className="w-100 text-start mb-2 d-flex justify-content-between align-items-center"
                      onClick={() => setSelected(u)}
                    >
                      <span>{u.name}</span>
                      {u.unread > 0 && (
                        <span className="badge bg-danger rounded-pill">
                          {u.unread}
                        </span>
                      )}
                    </Button>
                  ))
                )}
              </div>
            </div>
          </Col>

          {/* Main Chat Area */}
          <Col lg={9} className="d-flex flex-column">
            <div className="chat_messages_main_wrap">
              <div className="title_wrap">
                <h5>Chat with {selected ? selected.name : "..."}</h5>
              </div>

              <div
                className="flex-grow-1 p-3 bg-light overflow-auto"
                style={{ height: "600px" }}
              >
                {!selected ? (
                  <Alert>Select a chat.</Alert>
                ) : messages.length === 0 ? (
                  <Alert>No messages yet.</Alert>
                ) : (
                  <>
                    {/* 🔹 Product Data Display (only once) */}
                    {productData && (
                      <div
                        // onClick={() => navigate("/AutomotiveComp")}
                        onClick={() => {
                          navigate(
                            `/Dynamic_Route?id=${productData.id}&callingFrom=${
                              productData.category === "Motors"
                                ? "AutomotiveComp"
                                : productData.category === "Electronics"
                                ? "ElectronicComp"
                                : productData.category === "Fashion Style"
                                ? "FashionStyle"
                                : productData.category === "Home & Furnituer"
                                ? "HealthCareComp"
                                : productData.category === "Job Board"
                                ? "JobBoard"
                                : productData.category === "Real Estate"
                                ? "RealEstateComp"
                                : productData.category === "Services"
                                ? "TravelComp"
                                : productData.category === "Sports & Game"
                                ? "SportGamesComp"
                                : productData.category === "Pet & Animals"
                                ? "PetAnimalsComp"
                                : productData.category === "Other"
                                ? "Education"
                                : ""
                            }`
                          );
                          console.log(
                            "Product clickedcategory",
                            productData.category
                          );
                        }}
                        className="mb-3 p-3 border bg-white rounded shadow-sm"
                      >
                        <h6 className="mb-2 text-primary">
                          📦 Linked Product Info
                        </h6>
                        <div>
                          <strong>Title:</strong> {productData.title}
                        </div>
                        <div>
                          <strong>Category:</strong> {productData.category}
                        </div>
                        <div>
                          <strong>Price:</strong> {productData.Price}
                        </div>
                        {productData.galleryImages?.length > 0 && (
                          <img
                            src={productData.galleryImages[0]}
                            alt="Product"
                            style={{
                              width: "120px",
                              height: "auto",
                              marginTop: "10px",
                              borderRadius: "6px",
                            }}
                          />
                        )}
                      </div>
                    )}

                    {/* 🔹 Chat Messages */}
                    {messages.map((msg) => (
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
                            <small className="ms-2">
                              {formatTime(msg.createdAt)}
                              {msg.uid !== user.uid && msg.seen && (
                                <span className="ms-2">✓✓</span>
                              )}
                            </small>
                          </div>
                          <div>{msg.text}</div>
                        </div>
                      </div>
                    ))}
                  </>
                )}

                <div ref={dummy} />
              </div>

              {/* Input Field */}
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
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
