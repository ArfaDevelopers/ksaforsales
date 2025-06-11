"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "../../Firebase/FirebaseConfig";
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
import Header from "../../home/header";
import Footer from "../../home/footer/Footer";

function Mesagedeals(props) {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [formValue, setFormValue] = useState("");
  const [sending, setSending] = useState(false);
  const dummy = useRef();

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(setUser);
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!user || !props.recieverId) return;

    const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));

    const unsub = onSnapshot(q, (snapshot) => {
      const allMsgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const filtered = allMsgs.filter(
        (m) =>
          (m.uid === user.uid && m.recieverId === props.recieverId) ||
          (m.uid === props.recieverId && m.recieverId === user.uid)
      );
      setMessages(filtered);
      setTimeout(
        () => dummy.current?.scrollIntoView({ behavior: "smooth" }),
        100
      );
    });

    return () => unsub();
  }, [user, props.recieverId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!formValue.trim() || !user || !props.recieverId) return;

    setSending(true);
    try {
      await addDoc(collection(db, "messages"), {
        text: formValue.trim(),
        createdAt: serverTimestamp(),
        uid: user.uid,
        recieverId: props.recieverId,
        name: user.displayName || user.fullName || "Anonymous",
        photoURL: user.photoURL || "",
      });
      setFormValue("");
    } catch (err) {
      console.error("Failed to send:", err);
    }
    setSending(false);
  };

  const formatTime = (timestamp) =>
    timestamp
      ?.toDate()
      .toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <>
      {props.userId ? "" : <Header />}
      <Row className="justify-content-center">
        <Col lg={props.fullWidth ? 12 : 8}>
          <Card className="shadow border-0" style={{ height: "60vh" }}>
            <Card.Header className="bg-primary text-white">
              <div className="d-flex align-items-center">
                <FaComments className="me-2" />
                <h5 className="mb-0">Chat with {props.recieverId}</h5>
                <Badge bg="light" text="dark" className="ms-auto">
                  {messages.length} messages
                </Badge>
              </div>
            </Card.Header>

            <Card.Body
              className="p-3 overflow-auto"
              style={{ background: "#f8f9fa" }}
            >
              {messages.length === 0 ? (
                <Alert variant="info" className="text-center">
                  <FaComments className="me-2" />
                  No messages yet.
                </Alert>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`d-flex mb-3 ${
                      msg.uid === user.uid
                        ? "justify-content-end"
                        : "justify-content-start"
                    }`}
                  >
                    <div
                      className={`p-3 rounded-3 shadow-sm ${
                        msg.uid === user.uid
                          ? "bg-primary text-white"
                          : "bg-white border"
                      }`}
                      style={{ maxWidth: "75%" }}
                    >
                      <div className="d-flex justify-content-between">
                        <small className="fw-bold">{msg.name}</small>
                        <small>{formatTime(msg.createdAt)}</small>
                      </div>
                      <div>{msg.text}</div>
                    </div>
                  </div>
                ))
              )}
              <div ref={dummy} />
            </Card.Body>

            <Card.Footer className="bg-white border-top">
              <Form onSubmit={sendMessage}>
                <InputGroup>
                  <Form.Control
                    value={formValue}
                    onChange={(e) => setFormValue(e.target.value)}
                    placeholder="Type your message…"
                    disabled={sending}
                  />
                  <Button type="submit" disabled={!formValue.trim() || sending}>
                    {sending ? <Spinner size="sm" /> : <FaPaperPlane />}
                  </Button>
                </InputGroup>
              </Form>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
      {props.userId ? "" : <Footer />}
    </>
  );
}

export default Mesagedeals;
