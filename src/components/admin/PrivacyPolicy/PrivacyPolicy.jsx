import React, { useEffect, useState } from "react";
import {
  ShieldCheckIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../Firebase/FirebaseConfig";
import Header from "../../home/header";
import Footer from "../../home/footer/Footer";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import { useLocation, useNavigate } from "react-router-dom";

// Icon mapping
const iconMap = {
  ShieldCheckIcon: ShieldCheckIcon,
  DocumentTextIcon: DocumentTextIcon,
};

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [policySections, setPolicySections] = useState([]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch data from Firebase
  useEffect(() => {
    const privacyPolicyCollection = collection(db, "PrivacyPolicy");
    const unsubscribe = onSnapshot(
      privacyPolicyCollection,
      (snapshot) => {
        const sectionsList = snapshot.docs.map((doc, index) => {
          const data = doc.data();
          const cleanHtml = DOMPurify.sanitize(data.content || "<p>No content available</p>");
          return {
            id: doc.id,
            htmlContent: cleanHtml,
            icon: index % 2 === 0 ? "ShieldCheckIcon" : "DocumentTextIcon",
            color: index % 2 === 0 ? "text-blue-600" : "text-green-600",
          };
        });
        setPolicySections(sectionsList);
      },
      (error) => {
        console.error("Error fetching PrivacyPolicy sections:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Header />

      <div
        className="dashboard-content"
        style={{
          marginTop: windowWidth <= 576 ? "8rem" : "10rem",
          marginBottom: windowWidth <= 576 ? "8rem" : "0rem",
        }}
      >
        <section className="bg-gray-50 min-h-screen py-16">
          {/* Sections */}
          <div className="container mx-auto px-4">
            {policySections.map((section, index) => {
              const IconComponent = iconMap[section.icon] || ShieldCheckIcon;
              return (
                <motion.div
                  key={section.id}
                  className="py-8 border-b border-gray-200 last:border-b-0"
                  variants={sectionVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="text-center mb-1">
                    <IconComponent
                      className={`custom-icon ${section.color} mb-2 mx-auto`}
                      aria-hidden="true"
                      style={{ width: "80px", height: "80px" }}
                    />
                  </div>

                  <div
                    className="prose prose-gray max-w-none mx-auto"
                    dangerouslySetInnerHTML={{ __html: section.htmlContent }}
                  ></div>

                  <div
                    className={`h-1 w-16 ${section.color.replace("text-", "bg-")} mt-4 mx-auto`}
                  ></div>
                </motion.div>
              );
            })}
          </div>

          {/* Footer Note */}
          {/* <div className="container mx-auto px-4 mt-12 text-center">
            <p className="text-gray-500 text-sm">
              Last updated: May 12, 2025 |{" "}
              <a
                href="tel:+966530771851"
                className="text-blue-600 hover:underline"
              >
                Contact Us
              </a>
            </p>
          </div> */}
        </section>
        <Footer />
      </div>
    </>
  );
};

export default PrivacyPolicy;
