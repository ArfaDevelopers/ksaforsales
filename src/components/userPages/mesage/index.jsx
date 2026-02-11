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
  FaPaperPlane,
  FaArrowLeft,
  FaSearch,
  FaTimes,
  FaEllipsisV,
  FaPlus,
  FaPaperclip,
  FaCamera,
  FaVideo,
  FaPhone
} from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import Header from "../../home/header";
import Footer from "../../home/footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { FaUserAlt, FaListUl, FaHeart, FaBullhorn } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { TiMessages } from "react-icons/ti";
import { TbLogout2 } from "react-icons/tb";
import { useTranslation } from "react-i18next";
import "./whatsapp-chat.css";

export default function Message() {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [chatUsers, setChatUsers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [unreadCounts, setUnreadCounts] = useState({});
  const dummy = useRef();
  const navigate = useNavigate();
  const [productData, setProductData] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 992);
  const [showChatList, setShowChatList] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
      if (window.innerWidth > 992) {
        setShowChatList(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const messageWithProductId = messages.find((msg) => msg.productIds);
    if (messageWithProductId) {
      fetch("http://168.231.80.24:9002/api/dataofmessager", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: messageWithProductId.productIds }),
      })
        .then((res) => res.json())
        .then((data) => setProductData(data))
        .catch((error) => console.error("Error fetching product data:", error));
    }
  }, [messages]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(setUser);
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!user || !selected) return;

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

  useEffect(() => {
    if (!user) return;

    const unsub = onSnapshot(
      query(collection(db, "messages"), orderBy("createdAt")),
      (snap) => {
        const allMessages = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const userMessages = allMessages.filter(
          (msg) => msg.uid === user.uid || msg.recieverId === user.uid
        );

        const counts = {};
        userMessages.forEach((msg) => {
          const otherUserId = msg.uid === user.uid ? msg.recieverId : msg.uid;

          if (msg.recieverId === user.uid && !msg.seen) {
            counts[otherUserId] = (counts[otherUserId] || 0) + 1;
          }
        });

        setUnreadCounts(counts);

        const chatPartners = [
          ...new Set(
            userMessages.map((msg) =>
              msg.uid === user.uid ? msg.recieverId : msg.uid
            )
          ),
        ];

        const fetchUsers = async () => {
          const usersSnapshot = await getDocs(collection(db, "users"));
          const usersMap = {};
          usersSnapshot.forEach((doc) => {
            const u = doc.data();
            usersMap[doc.id] = u.displayName || u.fullName || u.name || "Unknown";
          });

          // Get last message for each chat
          const lastMessages = {};
          chatPartners.forEach((partnerId) => {
            const partnerMessages = userMessages.filter(
              (msg) =>
                (msg.uid === user.uid && msg.recieverId === partnerId) ||
                (msg.uid === partnerId && msg.recieverId === user.uid)
            );
            if (partnerMessages.length > 0) {
              lastMessages[partnerId] =
                partnerMessages[partnerMessages.length - 1];
            }
          });

          const userList = chatPartners.map((uid) => ({
            id: uid,
            name: usersMap[uid] || "Unknown",
            unread: counts[uid] || 0,
            lastMessage: lastMessages[uid]?.text || "",
            lastMessageTime: lastMessages[uid]?.createdAt,
          }));

          // Sort by last message time
          userList.sort((a, b) => {
            if (!a.lastMessageTime) return 1;
            if (!b.lastMessageTime) return -1;
            return b.lastMessageTime.seconds - a.lastMessageTime.seconds;
          });

          setChatUsers(userList);
        };

        fetchUsers();

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
      name: user.displayName || user.email || "Anonymous",
      createdAt: serverTimestamp(),
      seen: false,
    });
    setInput("");
    setTimeout(() => dummy.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const formatTime = (ts) => {
    if (!ts) return "";
    const date = ts.toDate();
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatListTime = (ts) => {
    if (!ts) return "";
    const date = ts.toDate();
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();

    if (isToday) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }

    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }

    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  };

  const handleChatSelect = (chatUser) => {
    setSelected(chatUser);
    if (isMobile) {
      setShowChatList(false);
    }
  };

  const handleBack = () => {
    setShowChatList(true);
    setSelected(null);
  };

  return (
    <>
      {(!isMobile || showChatList) && <Header />}

      {(!isMobile || showChatList) && (
        <div className="dashboard-content" style={{ marginTop: "5rem" }}>
          <div className="container">
            <ul className="dashborad-menus">
              <li>
                <Link to="/dashboard">
                  <MdDashboard /> <span>{t("common.dashboard")}</span>
                </Link>
              </li>
              <li>
                <Link to="/profile">
                  <FaUserAlt /> <span>{t("common.profile")}</span>
                </Link>
              </li>
              <li>
                <Link to="/my-listing">
                  <FaListUl /> <span>{t("common.myListing")}</span>
                </Link>
              </li>
              <li>
                <Link to="/manage-commercial-ads">
                  <FaBullhorn /> <span>{t("messages.commercialAds")}</span>
                </Link>
              </li>
              <li>
                <Link to="/bookmarks">
                  <FaHeart /> <span>{t("common.favourite")}</span>
                </Link>
              </li>
              <li className="active">
                <Link to="/messages">
                  <TiMessages /> <span>{t("common.messages")}</span>
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="#" onClick={handleLogout}>
                  <TbLogout2 />
                  <span>{t("common.logout")}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}

      <div className={`whatsapp-chat-container ${isMobile ? "mobile" : ""}`}>
        {/* Chat List */}
        <div className={`chat-list-panel ${isMobile && !showChatList ? "hidden" : ""}`}>
          <div className="chat-list-header">
            <h2>{t("messages.chats")}</h2>
          </div>

          {/* Search Bar */}
          <div className="chat-search-container">
            <div className="chat-search-bar">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder={t("messages.searchOrStartChat")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="clear-search-btn"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                >
                  <FaTimes />
                </button>
              )}
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="chat-filter-tabs">
            <button
              className={`filter-tab ${activeTab === "all" ? "active" : ""}`}
              onClick={() => setActiveTab("all")}
            >
              {t("messages.all")}
            </button>
            <button
              className={`filter-tab ${activeTab === "unread" ? "active" : ""}`}
              onClick={() => setActiveTab("unread")}
            >
              {t("messages.unread")}
            </button>
          </div>

          <div className="chat-list-body">
            {chatUsers.length === 0 ? (
              <div className="no-chats">
                <p>{t("messages.noChatsYet")}</p>
              </div>
            ) : (() => {
                let filteredChats = chatUsers;

                // Apply tab filter
                if (activeTab === "unread") {
                  filteredChats = filteredChats.filter((chatUser) => chatUser.unread > 0);
                }

                // Apply search filter
                if (searchQuery) {
                  filteredChats = filteredChats.filter((chatUser) =>
                    chatUser.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    chatUser.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
                  );
                }

                if (filteredChats.length === 0) {
                  return (
                    <div className="no-chats">
                      <p>No chats found matching "{searchQuery}"</p>
                    </div>
                  );
                }

                return filteredChats.map((chatUser) => (
                <div
                  key={chatUser.id}
                  className={`chat-list-item ${selected?.id === chatUser.id ? "active" : ""}`}
                  onClick={() => handleChatSelect(chatUser)}
                >
                  <div className="chat-avatar">
                    {chatUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="chat-info">
                    <div className="chat-header-row">
                      <h4 className="chat-name">{chatUser.name}</h4>
                      <span className="chat-time">
                        {formatListTime(chatUser.lastMessageTime)}
                      </span>
                    </div>
                    <div className="chat-preview-row">
                      <p className="chat-preview">
                        {chatUser.lastMessage.length > 40
                          ? chatUser.lastMessage.substring(0, 40) + "..."
                          : chatUser.lastMessage}
                      </p>
                      {chatUser.unread > 0 && (
                        <span className="unread-badge">{chatUser.unread}</span>
                      )}
                    </div>
                  </div>
                </div>
              ));
            })()}
          </div>
        </div>

        {/* Conversation Panel */}
        <div className={`conversation-panel ${isMobile && showChatList ? "hidden" : ""}`}>
          {!selected ? (
            <div className="no-chat-selected">
              <p>{t("messages.selectChat")}</p>
            </div>
          ) : (
            <>
              {/* Chat Header */}
              <div className="conversation-header">
                {isMobile && (
                  <button className="back-button" onClick={handleBack}>
                    <FaArrowLeft />
                  </button>
                )}
                <div className="chat-avatar">
                  {selected.name.charAt(0).toUpperCase()}
                </div>
                <div className="header-info">
                  <h3>{selected.name}</h3>
                </div>
              </div>

              {/* Messages Area */}
              <div className="messages-area">
                {messages.length === 0 ? (
                  <div className="no-messages">
                    <p>{t("messages.noMessagesYet")}</p>
                  </div>
                ) : (
                  <>
                    {/* Product Info Card */}
                    {productData && (
                      <div
                        className="product-card"
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
                        }}
                      >
                        <h6>📦 Linked Product</h6>
                        <div><strong>Title:</strong> {productData.title}</div>
                        <div><strong>Category:</strong> {productData.category}</div>
                        <div><strong>Price:</strong> {productData.Price}</div>
                        {productData.galleryImages?.length > 0 && (
                          <img src={productData.galleryImages[0]} alt="Product" />
                        )}
                      </div>
                    )}

                    {/* Messages */}
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`message-wrapper ${
                          msg.uid === user.uid ? "sent" : "received"
                        }`}
                      >
                        <div className="message-bubble">
                          <div className="message-text">{msg.text}</div>
                          <div className="message-meta">
                            <span className="message-time">
                              {formatTime(msg.createdAt)}
                            </span>
                            {msg.uid === user.uid && msg.seen && (
                              <span className="message-status">✓✓</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={dummy} />
                  </>
                )}
              </div>

              {/* Message Input */}
              <div className="message-input-area">
                <form onSubmit={handleSend}>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t("messages.typeMessage")}
                    disabled={!selected}
                  />
                  <button type="submit" className="send-btn" disabled={!input.trim() || !selected}>
                    <IoSend />
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>

      {(!isMobile || showChatList) && <Footer />}
    </>
  );
}
