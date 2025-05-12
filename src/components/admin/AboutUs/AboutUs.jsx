import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase/FirebaseConfig";
import DOMPurify from "dompurify";
import Footer from "../../home/footer/Footer";
import Header from "../../home/header";

const AboutUs = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [aboutUsContent, setAboutUsContent] = useState([]);

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
      collection(db, "AboutUs"), // Fetch data from the "AboutUs" table/collection
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched AboutUs data:", data);
        setAboutUsContent(data);
      },
      (error) => {
        console.error("Error fetching AboutUs data:", error);
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
            About Us
          </h1>

          {aboutUsContent.length > 0 ? (
            aboutUsContent.map((item) => (
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
              No About Us content available.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
