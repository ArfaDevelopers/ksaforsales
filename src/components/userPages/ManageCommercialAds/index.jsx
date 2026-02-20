import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Footer from "../../home/footer/Footer";
import Header from "../../home/header";
import { Table } from "antd";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../Firebase/FirebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { signOut } from "firebase/auth";
import {
  FaUserAlt,
  FaListUl,
  FaHeart,
  FaRegEye,
  FaTrash,
  FaArrowLeft,
  FaArrowRight,
  FaBullhorn,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { TiMessages } from "react-icons/ti";
import { TbLogout2 } from "react-icons/tb";
import { useTranslation } from "react-i18next";

const ManageCommercialAds = () => {
  const { t } = useTranslation();
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [ads, setAds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [userId, setUserId] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  // Handle responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Check authentication and fetch ads
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log("Auth state changed, user:", user?.uid);
      if (user) {
        setUserId(user.uid);
        await fetchUserAds(user.uid);
      } else {
        console.log("No user logged in");
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch user's commercial ads
  const fetchUserAds = async (uid) => {
    try {
      console.log("Fetching ads for user:", uid);

      // Fetch ALL ads from CommercialAdscom collection
      const adsCollection = collection(db, "CommercialAdscom");
      const adsSnapshot = await getDocs(adsCollection);

      console.log("Total ads in collection:", adsSnapshot.docs.length);

      const allAds = adsSnapshot.docs.map((doc) => ({
        id: doc.id,
        key: doc.id,
        ...doc.data(),
      }));

      // Filter ads: show only ads that belong to current user
      const userAds = allAds.filter((ad) => {
        return ad.userId === uid;
      });

      console.log("Ads filtered for current user:", userAds.length);

      userAds.forEach((ad) => {
        console.log("User Ad found:", ad.id, ad);
      });

      setAds(userAds);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching ads:", error);
      setLoading(false);
    }
  };

  // Handle delete ad
  const handleDelete = async (adId) => {
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this ad!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteDoc(doc(db, "CommercialAdscom", adId));
          const updatedAds = ads.filter((ad) => ad.id !== adId);
          setAds(updatedAds);
          MySwal.fire("Deleted!", "Your ad has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting ad:", error);
          MySwal.fire("Error", "Failed to delete ad", "error");
        }
      }
    });
  };

  // Handle view ad
  const handleView = useCallback(
    (adId) => {
      console.log("View button clicked for ad:", adId);
      navigate(`/CategoryDetail/${adId}`);
    },
    [navigate]
  );

  // Calculate total pages
  const totalPages = Math.ceil(ads.length / pageSize);

  // Get paginated ads
  const paginatedAds = ads.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Render pagination items
  const renderPaginationItems = () => {
    const items = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <li key={i} className={currentPage === i ? "active" : ""}>
          <Link
            to="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(i);
            }}
            style={{
              color: currentPage === i ? "#fff" : "#000",
              backgroundColor: currentPage === i ? "#2d4495" : "transparent",
              padding: "8px 12px",
              borderRadius: "4px",
              textDecoration: "none",
              display: "inline-block",
              cursor: "pointer",
            }}
          >
            {i}
          </Link>
        </li>
      );
    }
    return items;
  };

  // Helper function to translate category titles (handles both new keys and old English values)
  const translateCategoryTitle = (title) => {
    if (!title) return "N/A";

    const validKeys = ['motors', 'electronics', 'fashionStyle', 'homeFurniture', 'jobBoard',
                       'realEstate', 'services', 'sportGame', 'petAnimals', 'other', 'commercial'];

    // If it's already a valid key, translate it
    if (validKeys.includes(title)) {
      return t(`categories.${title}`);
    }

    // Map old English values to keys for backward compatibility
    const categoryReverseMap = {
      "Fashion Style": "fashionStyle",
      "Home & Furniture": "homeFurniture",
      "Job Board": "jobBoard",
      "Real Estate": "realEstate",
      "Sport & Game": "sportGame",
      "Pet & Animals": "petAnimals",
      "Motors": "motors",
      "Electronics": "electronics",
      "Services": "services",
      "Other": "other",
      "Commercial": "commercial"
    };

    const key = categoryReverseMap[title];
    if (key) {
      return t(`categories.${key}`);
    }

    // If no match, return as-is
    return title;
  };

  // Define columns for the table
  const columns = [
    {
      title: t("myListing.image"),
      dataIndex: "image",
      render: (image) => (
        <div className="listingtable-img">
          <img
            className="img-fluid avatar-img"
            src={image || "https://via.placeholder.com/150x100"}
            alt="Ad"
            style={{
              width: "150px",
              height: "100px",
              objectFit: "cover",
              borderRadius: "4px",
              marginBottom: "10px",
            }}
          />
        </div>
      ),
    },
    {
      title: t("myListing.details"),
      dataIndex: "Title",
      render: (text, record) => (
        <>
          <h6 style={{ margin: "0 0 10px 0", fontWeight: "600" }}>
            {translateCategoryTitle(text)}
          </h6>
          <div className="listingtable-rate" style={{ marginBottom: "10px" }}>
            <span style={{ color: "#666", fontSize: "14px" }}>
              <strong>{t("commercialAds.phone")}:</strong> {record.phone || "N/A"}
            </span>
          </div>
          <div className="listingtable-rate">
            <span style={{ color: "#666", fontSize: "14px" }}>
              <strong>{t("commercialAds.whatsapp")}:</strong> {record.whatsapp || "N/A"}
            </span>
          </div>
        </>
      ),
    },
    {
      title: t("commercialAds.date"),
      dataIndex: "timeAgo",
      render: (timeAgo) => (
        <span style={{ color: "#666", fontSize: "14px" }}>
          {timeAgo
            ? new Date(
                timeAgo.seconds ? timeAgo.seconds * 1000 : timeAgo
              ).toLocaleDateString()
            : "N/A"}
        </span>
      ),
    },
    {
      title: t("myListing.action"),
      dataIndex: "id",
      render: (id) => (
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
          }}
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              console.log(
                "View button clicked, navigating to:",
                `/CategoryDetail/${id}`
              );
              handleView(id);
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              borderRadius: "4px",
              backgroundColor: "#1E55B4",
              color: "white",
              textDecoration: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              border: "none",
              padding: 0,
            }}
            title="View"
          >
            <FaRegEye />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleDelete(id);
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              borderRadius: "4px",
              backgroundColor: "#dc3545",
              color: "white",
              textDecoration: "none",
              cursor: "pointer",
              transition: "all 0.3s ease",
              border: "none",
              padding: 0,
            }}
            title="Delete"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Header />

      <div className="dashboard-content" style={{ marginTop: "5rem" }}>
        <div className="container">
          <div className="">
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
              <li className="active">
                <Link to="/manage-commercial-ads">
                  <FaBullhorn /> <span>{t("messages.commercialAds")}</span>
                </Link>
              </li>
              <li>
                <Link to="/bookmarks">
                  <FaHeart /> <span>{t("common.favourite")}</span>
                </Link>
              </li>
              <li>
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

          <div className="dash-listingcontent dashboard-info">
            <div className="dash-cards card">
              <div
                style={{
                  display: "flex",
                  justifyContent: isMobile ? "flex-start" : "space-between",
                  alignItems: isMobile ? "flex-start" : "center",
                  padding: isMobile ? "10px" : "15px",
                  backgroundColor: "#fff",
                  borderBottom: "1px solid #e0e0e0",
                  flexDirection: isMobile ? "column" : "row",
                  gap: isMobile ? "10px" : "0",
                }}
              >
                <h4
                  style={{
                    margin: "0",
                    fontSize: isMobile ? "18px" : "20px",
                    fontWeight: "600",
                  }}
                >
                  {t("commercialAds.myCommercialAds")}
                </h4>
                <Link
                  to="/commercial-ads"
                  className="nav-link header-login add-listing"
                  style={{
                    backgroundColor: "#1E55B4",
                    color: "#fff",
                    padding: isMobile ? "6px 10px" : "8px 12px",
                    borderRadius: "4px",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    fontSize: isMobile ? "12px" : "14px",
                    width: isMobile ? "50%" : "auto",
                    justifyContent: isMobile ? "center" : "flex-start",
                    textAlign: "center",
                  }}
                >
                  <i
                    className="fa-solid fa-plus"
                    style={{ fontSize: isMobile ? "12px" : "14px" }}
                  />
                  {t("commercialAds.addCommercialAd")}
                </Link>
              </div>

              <div className="card-body">
                {loading ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "300px",
                    }}
                  >
                    <div className="flex justify-center items-center">
                      <div
                        style={{
                          width: "64px",
                          height: "64px",
                          border: "4px solid #2d4495",
                          borderTop: "4px solid transparent",
                          borderRadius: "50%",
                          animation: "spin 1s linear infinite",
                        }}
                      ></div>
                    </div>
                    <style>
                      {`
                        @keyframes spin {
                          from {
                            transform: rotate(0deg);
                          }
                          to {
                            transform: rotate(360deg);
                          }
                        }
                      `}
                    </style>
                  </div>
                ) : ads.length === 0 ? (
                  <div
                    style={{
                      textAlign: "center",
                      padding: "40px 20px",
                      color: "#666",
                    }}
                  >
                    <p style={{ fontSize: "16px", marginBottom: "20px" }}>
                      {t("commercialAds.noAdsYet")}
                    </p>
                    <Link
                      to="/commercial-ads"
                      className="nav-link header-login"
                      style={{
                        backgroundColor: "#1E55B4",
                        color: "#fff",
                        padding: "10px 20px",
                        borderRadius: "4px",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                        cursor: "pointer",
                      }}
                    >
                      <i className="fa-solid fa-plus" />
                      {t("commercialAds.createFirstAd")}
                    </Link>
                  </div>
                ) : (
                  <>
                    {isMobile ? (
                      // Mobile Card View
                      <div style={{ padding: "10px" }}>
                        {paginatedAds.map((ad) => (
                          <div
                            key={ad.id}
                            style={{
                              backgroundColor: "#fff",
                              border: "1px solid #e0e0e0",
                              borderRadius: "8px",
                              padding: "15px",
                              marginBottom: "15px",
                              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                            }}
                          >
                            <img
                              src={ad.image || "https://via.placeholder.com/150x100"}
                              alt="Ad"
                              style={{
                                width: "100%",
                                height: "180px",
                                objectFit: "cover",
                                borderRadius: "8px",
                                marginBottom: "15px",
                              }}
                            />
                            <h6
                              style={{
                                margin: "0 0 10px 0",
                                fontWeight: "600",
                                fontSize: "16px",
                              }}
                            >
                              {translateCategoryTitle(ad.Title)}
                            </h6>
                            <div style={{ marginBottom: "8px" }}>
                              <span style={{ color: "#666", fontSize: "14px" }}>
                                <strong>{t("commercialAds.phone")}:</strong>{" "}
                                {ad.phone || "N/A"}
                              </span>
                            </div>
                            <div style={{ marginBottom: "8px" }}>
                              <span style={{ color: "#666", fontSize: "14px" }}>
                                <strong>{t("commercialAds.whatsapp")}:</strong>{" "}
                                {ad.whatsapp || "N/A"}
                              </span>
                            </div>
                            <div style={{ marginBottom: "15px" }}>
                              <span style={{ color: "#666", fontSize: "14px" }}>
                                <strong>{t("commercialAds.date")}:</strong>{" "}
                                {ad.timeAgo
                                  ? new Date(
                                      ad.timeAgo.seconds
                                        ? ad.timeAgo.seconds * 1000
                                        : ad.timeAgo
                                    ).toLocaleDateString()
                                  : "N/A"}
                              </span>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                gap: "10px",
                                justifyContent: "center",
                              }}
                            >
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleView(ad.id);
                                }}
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  width: "45%",
                                  padding: "10px",
                                  borderRadius: "4px",
                                  backgroundColor: "#1E55B4",
                                  color: "white",
                                  textDecoration: "none",
                                  cursor: "pointer",
                                  transition: "all 0.3s ease",
                                  border: "none",
                                  fontSize: "14px",
                                  fontWeight: "500",
                                }}
                              >
                                <FaRegEye style={{ marginRight: "5px" }} />
                                {t("common.view")}
                              </button>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleDelete(ad.id);
                                }}
                                style={{
                                  display: "inline-flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  width: "45%",
                                  padding: "10px",
                                  borderRadius: "4px",
                                  backgroundColor: "#dc3545",
                                  color: "white",
                                  textDecoration: "none",
                                  cursor: "pointer",
                                  transition: "all 0.3s ease",
                                  border: "none",
                                  fontSize: "14px",
                                  fontWeight: "500",
                                }}
                              >
                                <FaTrash style={{ marginRight: "5px" }} />
                                {t("common.delete")}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      // Desktop Table View
                      <div className="table-responsive">
                        <Table
                          className="listing-table datatable"
                          columns={columns}
                          dataSource={paginatedAds}
                          rowKey={(record) => record.id}
                          pagination={false}
                          loading={loading}
                        />
                      </div>
                    )}
                    <div className="blog-pagination">
                      <nav>
                        <ul className="pagination">
                          <li
                            className={`page-item previtem ${
                              currentPage === 1 ? "disabled" : ""
                            }`}
                          >
                            <Link
                              className="page-link"
                              to="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage((prev) => Math.max(prev - 1, 1));
                              }}
                            >
                              <FaArrowLeft /> {t("myListing.prev")}
                            </Link>
                          </li>
                          <li className="justify-content-center pagination-center">
                            <div className="pagelink">
                              <ul>{renderPaginationItems()}</ul>
                            </div>
                          </li>
                          <li
                            className={`page-item nextlink ${
                              currentPage === totalPages ? "disabled" : ""
                            }`}
                          >
                            <Link
                              className="page-link"
                              to="#"
                              onClick={(e) => {
                                e.preventDefault();
                                setCurrentPage((prev) =>
                                  Math.min(prev + 1, totalPages)
                                );
                              }}
                            >
                              {t("myListing.next")} <FaArrowRight />
                            </Link>
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ManageCommercialAds;
