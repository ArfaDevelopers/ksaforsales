import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase/FirebaseConfig";
import DOMPurify from "dompurify";

import Footer from "../../home/footer/Footer";
import Header from "../../home/header";

const Copyrights = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [copyrights, setCopyrights] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "CopyRights"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched CopyRights data:", data);
        setCopyrights(data);
      },
      (error) => {
        console.error("Error fetching CopyRights data:", error);
      }
    );
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Header />
      <div
        className="dashboard-content bg-gray-50 min-h-screen"
        style={{
          marginTop: windowWidth <= 576 ? "8rem" : "12rem",
          marginBottom: windowWidth <= 576 ? "8rem" : "0rem",
          padding: "2rem",
        }}
      >
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-15">
            Copyright Information
          </h1>

          {copyrights.length > 0 ? (
            copyrights.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-md rounded-xl p-6 mb-6"
              >
                <div
                  className="prose max-w-none text-gray-800"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(item.content),
                  }}
                />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              No copyright content available.
            </p>
          )}
        </div>
      </div>
      <Footer />

    </>
  );
};

export default Copyrights;
