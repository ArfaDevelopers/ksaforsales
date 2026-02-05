import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase/FirebaseConfig";
import DOMPurify from "dompurify";
import Footer from "../../home/footer/Footer";
import Header from "../../home/header";

const TermsConditions = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [termsConditionsContent, setTermsConditionsContent] = useState([]);

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
      collection(db, "TermsConditions"), // Fetch data from the "TermsConditions" table/collection
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("Fetched TermsConditions data:", data);
        setTermsConditionsContent(data);
      },
      (error) => {
        console.error("Error fetching TermsConditions data:", error);
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
          marginBottom: windowWidth <= 576 ? "0rem" : "0rem",
          padding: "2rem",
        }}
      >
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-15">
            Terms & Conditions
          </h1>

          {termsConditionsContent.length > 0 ? (
            termsConditionsContent.map((item) => (
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
              No Terms & Conditions content available.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsConditions;
