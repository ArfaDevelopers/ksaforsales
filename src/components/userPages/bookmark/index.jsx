import React from "react";
import Header from "../../home/header";
import {
  ProfileAvatar02,
  ProfileAvatar03,
  ProfileAvatar04,
  ProfileAvatar05,
  ProfileAvatar06,
  ProfileAvatar07,
  eye,
  listgrid_1,
  listgrid_2,
  listgrid_3,
  listgrid_4,
  listgrid_5,
  listgrid_6,
  listgrid_7,
  listgrid_8,
} from "../../imagepath";
import { Table } from "antd";
import { Link, useLocation } from "react-router-dom";
import Footer from "../../home/footer/Footer";
import UserHeader from "../Userheader";
import { useEffect, useState } from "react";
// import { Modal, Button, Form } from "react-bootstrap";
import { Modal, Button, Row, Col, Card, Form } from "react-bootstrap";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase/FirebaseConfig"; // Ensure the correct Firebase import
// import Spinner from "react-bootstrap/Spinner";
import Spinner from "react-bootstrap/Spinner";
import { FaHeart } from "react-icons/fa";

import {
  collection,
  getDocs,
  getDoc,
  query,
  where,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "./../../Firebase/FirebaseConfig.jsx";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const Bookmarks = () => {
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [userId, setUserId] = useState(""); // State for image preview
  const [error, setError] = useState(""); // ✅ Error state
  console.log("User UID:cars", cars);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken();
        console.log("User ID Token:", token);
        console.log("User UID:", user.uid);
        setUserId(user.uid);
        localStorage.setItem(user.uid, "user.uid1");
      } else {
        console.log("No user is logged in. Redirecting to /login...");
        // navigate("/login", { replace: true }); // Redirect to login page
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);
  const categoryMapping = {
    "Sports & Game": "SPORTSGAMESComp",
    Electronics: "ELECTRONICS",
    "Fashion Style": "FASHIONComp",
    "Job board": "JOBBOARD",
    "Real Estate": "REALESTATECOMP",
    Education: "Education",
    Travel: "TRAVEL",
    "Pet & Animal": "PETANIMALCOMP",
    "Health Care": "HEALTHCARE",

    // Add more categories as needed
  };
  // const editItem = async (id, category) => {
  //   try {
  //     const tableName = categoryMapping[category] || category;
  //     const docRef = doc(db, tableName, id);

  //     const docSnap = await getDoc(docRef);
  //     console.log("Document Data:category", category);
  //     console.log("Document Data:categoryid11", id);

  //     if (docSnap.exists()) {
  //       console.log(
  //         `Fetched item with ID: ${id} from collection: ${tableName}`
  //       );
  //       console.log("Document Data:", docSnap.data());
  //     } else {
  //       console.log("No document found with this ID.");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching item:", error);
  //   }
  // };
  const [show, setShow] = useState(false);
  const [editData, setEditData] = useState(null);
  const [formData, setFormData] = useState({});
  const [itemCategory, setItemCategory] = useState(""); // To store the item category
  const [itemId, setItemId] = useState(null); // To store the item id
  const [FormDataView, setFormDataView] = useState({});
  const [view, setView] = useState(false);
  console.log("Document Data:FormDataView", FormDataView);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleView = () => setView(true);
  const handleCloseview = () => setView(false);
  const [sortOrder, setSortOrder] = useState("Newest");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
    // Sort the filtered cars based on the new sort order
    const sortedCars = [...filteredCars].sort((a, b) => {
      const dateA = a.createdAt.seconds;
      const dateB = b.createdAt.seconds;

      return event.target.value === "Newest" ? dateB - dateA : dateA - dateB;
    });
    setCars(sortedCars);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter cars based on search query
  const displayedCars = filteredCars.filter((car) => {
    return (
      car.title.toLowerCase().includes(searchQuery.toLowerCase()) || // Assuming you want to search by title
      car.description.toLowerCase().includes(searchQuery.toLowerCase()) // You can add more fields to search
    );
  });
  // Function to fetch document by ID and open modal
  const viewItem = async (id, category) => {
    try {
      const tableName = categoryMapping[category] || category;
      const docRef = doc(db, tableName, id);
      const docSnap = await getDoc(docRef);
      console.log(category, "category_________");
      console.log(id, "category_________id");

      if (docSnap.exists()) {
        console.log("Document Data:", docSnap.data());

        // Filter out empty fields
        const filteredData = Object.fromEntries(
          Object.entries(docSnap.data()).filter(
            ([_, value]) => value !== "" && value !== null
          )
        );
        console.log("No document found with this ID.", filteredData);

        setFormDataView(filteredData);
        setItemId(id);
        setItemCategory(category); // Save the category for later use
        handleView();
      } else {
        console.log("No document found with this ID.");
      }
    } catch (error) {
      console.error("Error fetching item:", error);
    }
  };
  const editItem = async (id, category) => {
    try {
      const tableName = categoryMapping[category];
      const docRef = doc(db, tableName, id);
      const docSnap = await getDoc(docRef);
      console.log(category, "category_________");
      console.log(id, "category_________id");

      if (docSnap.exists()) {
        console.log("Document Data:", docSnap.data());

        // Filter out empty fields
        const filteredData = Object.fromEntries(
          Object.entries(docSnap.data()).filter(
            ([_, value]) => value !== "" && value !== null
          )
        );

        setFormData(filteredData);
        setItemId(id);
        setItemCategory(category); // Save the category for later use
        handleShow();
      } else {
        console.log("No document found with this ID.");
      }
    } catch (error) {
      console.error("Error fetching item:", error);
    }
  };
  const updateItem = async () => {
    try {
      const tableName = categoryMapping[itemCategory] || itemCategory;
      const docRef = doc(db, tableName, itemId);

      // Update the document with the modified form data
      await updateDoc(docRef, formData);

      console.log("Document successfully updated!");

      // Close the modal after updating
      handleClose();
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  // Handle input change for editable fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const deleteItem = async (id, category) => {
    console.log(category, "combinedData___________category");
    // Display confirmation dialog
    MySwal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Proceed with deletion
        MySwal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          timer: 1000,
        });

        // Delete the ad from Firestore (Firebase)
        try {
          // Delete the document from Firestore using the ad's id
          // Get the correct Firestore collection name
          const tableName = categoryMapping[category] || category;

          const docRef = doc(db, tableName, id);
          await deleteDoc(docRef);
          console.log(
            `Deleted item with ID: ${id} from collection: ${tableName}`
          );

          // Optionally, update the state or re-fetch the data after deletion
          // For example, you can call a function to refetch ads here
        } catch (error) {
          console.error("Error deleting ad from Firestore:", error);
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        MySwal.fire({
          title: "Cancelled",
          text: "Your file is safe :)",
          icon: "error",
          timer: 1000,
        });
      }
    });
  };

  // const deleteItem = async (id, category) => {
  //   try {
  //     if (!id || !category) {
  //       console.error("Invalid ID or Category");
  //       return;
  //     }

  //     // Get the correct Firestore collection name
  //     const tableName = categoryMapping[category] || category;

  //     const docRef = doc(db, tableName, id);
  //     await deleteDoc(docRef);

  //     console.log(`Deleted item with ID: ${id} from collection: ${tableName}`);
  //   } catch (error) {
  //     console.error("Error deleting item:", error);
  //   }
  // };

  // console.log(cars, "carsData_____SPORTSGAMESCompcars");
  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        // Fetch data from the first collection
        const sportsCollectionRef = collection(db, "SPORTSGAMESComp");
        const sportsQuerySnapshot = await getDocs(sportsCollectionRef);
        const sportsData = sportsQuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Fetch data from the second collection
        const realEstateCollectionRef = collection(db, "REALESTATECOMP");
        const realEstateQuerySnapshot = await getDocs(realEstateCollectionRef);
        const realEstateData = realEstateQuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const CarsCollectionRef = collection(db, "Cars");
        const CarsQuerySnapshot = await getDocs(CarsCollectionRef);
        const CarsData = CarsQuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const ELECTRONICSCollectionRef = collection(db, "ELECTRONICS");
        const ELECTRONICSQuerySnapshot = await getDocs(
          ELECTRONICSCollectionRef
        );
        const ELECTRONICSData = CarsQuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const EducationCollectionRef = collection(db, "Education");
        const EducationQuerySnapshot = await getDocs(EducationCollectionRef);
        const EducationData = EducationQuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const FASHIONCollectionRef = collection(db, "FASHION");
        const FASHIONQuerySnapshot = await getDocs(FASHIONCollectionRef);
        const FASHIONData = FASHIONQuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const HEALTHCARECollectionRef = collection(db, "HEALTHCARE");
        const HEALTHCAREQuerySnapshot = await getDocs(HEALTHCARECollectionRef);
        const HEALTHCAREData = HEALTHCAREQuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const JOBBOARDCollectionRef = collection(db, "JOBBOARD");
        const JOBBOARDQuerySnapshot = await getDocs(JOBBOARDCollectionRef);
        const JOBBOARDData = JOBBOARDQuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        const MAGAZINESCOMPCollectionRef = collection(db, "MAGAZINESCOMP");
        const MAGAZINESCOMPQuerySnapshot = await getDocs(
          MAGAZINESCOMPCollectionRef
        );
        const MAGAZINESCOMPData = MAGAZINESCOMPQuerySnapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data(),
          })
        );
        const PETANIMALCOMPCollectionRef = collection(db, "PETANIMALCOMP");
        const PETANIMALCOMPQuerySnapshot = await getDocs(
          PETANIMALCOMPCollectionRef
        );
        const PETANIMALCOMPData = PETANIMALCOMPQuerySnapshot.docs.map(
          (doc) => ({
            id: doc.id,
            ...doc.data(),
          })
        );
        const TRAVELCollectionRef = collection(db, "TRAVEL");
        const TRAVELQuerySnapshot = await getDocs(TRAVELCollectionRef);
        const TRAVELData = TRAVELQuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // Combine both datasets
        const combinedData = [
          ...sportsData,
          ...realEstateData,
          ...CarsData,
          ...ELECTRONICSData,
          ...EducationData,
          ...FASHIONData,
          ...HEALTHCAREData,
          ...JOBBOARDData,
          ...MAGAZINESCOMPData,
          ...PETANIMALCOMPData,
          ...TRAVELData,
        ];

        const user = auth.currentUser;

        // Filter by userId (replace 'yourUser Id' with the actual userId you want to filter by)
        const userId = user.uid; // Replace with the actual userId you want to filter by
        const filteredData = combinedData.filter(
          (item) => item.userId === userId
        );
        console.log(combinedData, "combinedData___________");
        const searchedData = filteredData.filter((item) => {
          return (
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) || // Assuming 'title' is a field in your data
            item.description.toLowerCase().includes(searchQuery.toLowerCase()) // Assuming 'description' is another field
          );
        });

        const sortedData = searchedData.sort((a, b) => {
          const dateA = a.createdAt.seconds; // Assuming createdAt is a timestamp
          const dateB = b.createdAt.seconds;

          return sortOrder === "Newest" ? dateB - dateA : dateA - dateB;
        });
        // Set the state with the sorted data
        setCars(sortedData);
        setFilteredCars(sortedData);
        // Set the state with the filtered data
        // setCars(filteredData);
        // setFilteredCars(filteredData); // Initially, show filtered cars
        setLoading(false);

        // console.log(filteredData, "Filtered Data by userId");
      } catch (error) {
        console.error("Error getting cars:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [searchQuery]);
  useEffect(() => {
    if (!searchQuery) {
      setFilteredCars(cars);
      return;
    }

    const lowercasedQuery = searchQuery.toLowerCase();
    const filteredResults = cars.filter(
      (car) =>
        car.name?.toLowerCase().includes(lowercasedQuery) ||
        car.description?.toLowerCase().includes(lowercasedQuery)
    );

    setFilteredCars(filteredResults);
  }, [searchQuery, cars]);

  const paginatedData = cars
    .filter((val) => val.bookmarked === true)
    .slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const formatCategory = (category) => {
    return category
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
  };

  const parms = useLocation().pathname;
  return (
    <>
      <UserHeader parms={parms} />
      {/* Breadscrumb Section */}
      {/* <div className="breadcrumb-bar">
        <div className="container">
          <div className="row align-items-center text-center">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title">Bookmarks</h2>
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/index">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Bookmarks
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div class="container mt-3">
        <div class="row">
          <div class="col-12 text-start fw-bold">Home / Bookmarks</div>
        </div>
      </div> */}
      {/* /Breadscrumb Section */}
      {/* Bookmark Content */}
      <div
        className="dashboard-content"
        style={{
          marginTop: "5rem",
        }}
      >
        <div className="container">
          <div class="col-12 text-start text-dark " style={{fontSize:26,fontWeight:500}}>Home / Favourite</div>

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
              {/* <li className="active">
                <Link to="/bookmarks">
                  <i className="fas fa-solid fa-heart" /> <span>Favourite</span>
                </Link>
              </li> */}
              <li>
                <Link to="/messages">
                  <i className="fa-solid fa-comment-dots" />{" "}
                  <span>Messages</span>
                </Link>
              </li>
              <li>
                <Link to="/reviews">
                  <i className="fas fa-solid fa-star" /> <span>Reviews</span>
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

          {/* here show daa */}
          <div className="bookmarks-content grid-view featured-slider">
            <div className="row">
              {loading ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                  }}
                >
                  <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              ) : (
                paginatedData?.map((car) => (
                  <div className="col-lg-4 col-md-4 col-sm-6" key={car.id}>
                    <div
                      className="card aos aos-init aos-animate"
                      data-aos="fade-up"
                    >
                      <div className="blog-widget">
                        <div className="blog-img">
                          {/* <Link to="/service-details"> */}
                          <Link
                            to={`/service-details?id=${
                              car.id
                            }&callingFrom=${formatCategory(car.category)}`}
                          >
                            <img
                              style={{ height: "322px" }}
                              src={car.galleryImages[0]}
                              className="img-fluid"
                              alt="car-img"
                            />
                          </Link>
                          <div className="fav-item">
                            {car.FeaturedAds == "Featured Ads" ? (
                              <span className="Featured-text">
                                {car.FeaturedAds == "Featured Ads"
                                  ? "Featured"
                                  : ""}
                              </span>
                            ) : (
                              ""
                            )}
                            <Link to="#" className="fav-icon">
                              <FaHeart
                                style={{
                                  color: car.bookmarked ? "red" : "white",
                                  fontSize: "30px",
                                }}
                              />{" "}
                            </Link>
                          </div>
                        </div>
                        <div className="bloglist-content">
                          <div className="card-body">
                            <div className="blogfeaturelink">
                              <div className="grid-author">
                                <img src={ProfileAvatar02} alt="author" />
                              </div>
                              <div className="blog-features">
                                <Link to="#">
                                  <span>
                                    <i className="fa-regular fa-circle-stop" />{" "}
                                    {car.SubjectCategories}
                                  </span>
                                </Link>
                              </div>
                              <div className="blog-author text-end">
                                <span>
                                  <img src={eye} alt="views" />
                                  4000
                                </span>
                              </div>
                            </div>
                            <h6>
                              <Link to="/service-details">{car.title}</Link>
                            </h6>
                            <div className="blog-location-details">
                              <div className="location-info">
                                <i className="feather-map-pin" /> {car.City}
                              </div>
                              <div className="location-info">
                                <i className="fa-solid fa-calendar-days" />{" "}
                                {new Date(
                                  car.createdAt.seconds * 1000
                                ).toLocaleDateString()}
                              </div>
                            </div>
                            <div className="amount-details">
                              <div className="amount">
                                <span className="validrate">
                                  ${car.priceFrom}
                                </span>
                                <span>${car.priceTo}</span>
                              </div>
                              <div className="ratings">
                                <span>4.7</span> (50)
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {/* </div>
</div> */}

              {/*Pagination*/}
              <div className="blog-pagination">
                <nav>
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
                            onClick={() =>
                              setCurrentPage((prev) => Math.max(prev - 1, 1))
                            }
                          >
                            <i className="fas fa-regular fa-arrow-left" /> Prev
                          </Link>
                        </li>
                        <li className="justify-content-center pagination-center">
                          <div className="pagelink">
                            <ul>
                              {[
                                ...Array(
                                  Math.ceil(paginatedData.length / pageSize)
                                ),
                              ].map((_, index) => (
                                <li
                                  key={index}
                                  className={`page-item ${
                                    currentPage === index + 1 ? "active" : ""
                                  }`}
                                >
                                  <Link
                                    className="page-link"
                                    to="#"
                                    onClick={() => setCurrentPage(index + 1)}
                                  >
                                    {index + 1}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </li>
                        <li
                          className={`page-item nextlink ${
                            currentPage ===
                            Math.ceil(paginatedData.length / pageSize)
                              ? "disabled"
                              : ""
                          }`}
                        >
                          <Link
                            className="page-link"
                            to="#"
                            onClick={() =>
                              setCurrentPage((prev) =>
                                Math.min(
                                  prev + 1,
                                  Math.ceil(paginatedData.length / pageSize)
                                )
                              )
                            }
                          >
                            Next <i className="fas fa-regular fa-arrow-right" />
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </nav>
              </div>
              {/*/Pagination*/}
            </div>
          </div>
        </div>
      </div>
      {/* /Bookmark Content */}
      <Footer />
    </>
  );
};
export default Bookmarks;
