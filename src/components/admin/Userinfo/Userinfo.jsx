import React from "react";

 import { Table } from "antd";
import { useLocation, useParams } from "react-router-dom";
// import Footer from "../../home/footer/Footer";
import Footer from "../../home/footer/Footer";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // For the heart icon
// import { timeAgo } from "./your-utils"; // Assuming you have a timeAgo function for "Updated about"
 import { useEffect, useState } from "react";
// import { Modal, Button, Form } from "react-bootstrap";
import { Modal, Button, Row, Col, Card, Form } from "react-bootstrap";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase/FirebaseConfig"; // Ensure the correct Firebase import
// import Spinner from "react-bootstrap/Spinner";
import Spinner from "react-bootstrap/Spinner";
import Loading1 from "../../../../public/Progress circle.png";

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
import UserHeader from "../../../components/userPages/Userheader";
const Userinfo = () => {
  const MySwal = withReactContent(Swal);

  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [userId, setUserId] = useState(""); // State for image preview
  const [error, setError] = useState(""); // ✅ Error state

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
    FashionStyle: "FASHION",
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
  const toggleBookmark = (id) => {
    console.log(`Toggling bookmark for item ${id}`);
    // Add your bookmark logic here
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
      const trimmedCategory = category.trim(); // Remove unexpected spaces
      const tableName = categoryMapping[trimmedCategory];

      if (!tableName) {
        console.error(
          "Invalid category:",
          category,
          "Mapped table:",
          tableName
        );
        return;
      }

      console.log(
        "Category:",
        trimmedCategory,
        "Table Name:",
        tableName,
        "ID:",
        id
      );

      const docRef = doc(db, tableName, id);
      const docSnap = await getDoc(docRef);

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
        setItemCategory(category);
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
  const { id } = useParams();
  const location = useLocation(); // Access the full location object

  const getQueryParam = (param) => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get(param);
  };
  const [_Id, setId] = useState(null); // State to store ads data
  const [callingFrom, setCallingFrom] = useState(null); // State to store ads data
  console.log("callingFrom______ID:ids15555", _Id);

  useEffect(() => {
    const callingFrom = getQueryParam("callingFrom");
    const ids = getQueryParam("id");

    console.log("callingFrom______ID:ids1111", ids);
    console.log("callingFrom______Calling From:", callingFrom);
    setCallingFrom(callingFrom);
    setId(ids);
  }, [id, location]);
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
        const callingFrom = getQueryParam("callingFrom");
        const ids = getQueryParam("id");
    
        console.log("callingFrom______ID:ids1111", ids);
        console.log("callingFrom______Calling From:", callingFrom);
        setCallingFrom(callingFrom);
        setId(ids);
        const filteredData = combinedData.filter(
          (item) => item.userId == ids
        );
        console.log(combinedData, "combinedData___________");
        console.log(filteredData, "combinedData___________");

        const searchedData = filteredData.filter((item) => {
          return (
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) || // Assuming 'title' is a field in your data
            item.description.toLowerCase().includes(searchQuery.toLowerCase()) // Assuming 'description' is another field
          );
        });
        console.log(ids, "combinedData___________1filteredData");

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
  const paginatedData = cars.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const formatCategory = (category) => {
    return category
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "galleryImages",
      render: (images, record) => (
        <div className="listingtable-img">
          <Link
            to={`/service-details?id=${record.id}&callingFrom=${formatCategory(
              record.category
            )}`}
          >
            <img
              className="img-fluid avatar-img"
              src={images?.[0] || "placeholder.jpg"} // Handle undefined case
              alt=""
              style={{
                width: "150px",
                height: "100px",
                objectFit: "cover",
                marginBottom: "10px",
              }}
            />
          </Link>
        </div>
      ),
      sorter: (a, b) =>
        (a.galleryImages?.[0]?.length || 0) -
        (b.galleryImages?.[0]?.length || 0),
    },
    {
      title: "Details",
      dataIndex: "title",
      render: (text, record) => (
        <>
          <h6>
            <Link to="/service-details">{text}</Link>
          </h6>
          <div className="listingtable-rate">
            <Link to="#" className="cat-icon">
              <i className="fa-regular fa-circle-stop" />{" "}
              {formatCategory(record.category)}
            </Link>{" "}
            <span className="discount-amt">${record.Price}</span>
          </div>
          <p>{record.tagline}.</p>
        </>
      ),
      sorter: (a, b) => (a.title?.length || 0) - (b.title?.length || 0), // Fixed incorrect sorter
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   render: (text, record) => <span className={record.bg}>{"Active"}</span>,
    //   sorter: (a, b) => (a.status?.length || 0) - (b.status?.length || 0),
    // },
    // {
    //   title: "Views",
    //   dataIndex: "numbers",
    //   render: (text) => <span>{text}</span>,
    //   sorter: (a, b) => (a.numbers || 0) - (b.numbers || 0), // Ensure numbers are valid
    // },
    // {
    //   title: "Action",
    //   dataIndex: "class",
    //   render: (text, record) => (
    //     <div
    //       className={text}
    //       style={{
    //         display: "flex",
    //         gap: "10px",
    //         justifyContent: "flex-start",
    //       }}
    //     >
    //       <Link
    //         to="#"
    //         className="action-btn btn-view"
    //         onClick={() => viewItem(record.id, formatCategory(record.Category))}
    //         style={{ display: "inline-flex", alignItems: "center" }}
    //       >
    //         <i className="feather-eye" />
    //       </Link>
    //       <Link
    //         to="#"
    //         className="action-btn btn-edit"
    //         onClick={() => {
    //           console.log("Record ID:__", record.id);
    //           console.log("Record ID:___", record.Category);

    //           editItem(record.id, formatCategory(record.Category));
    //         }}
    //         style={{ display: "inline-flex", alignItems: "center" }}
    //       >
    //         <i className="feather-edit-3" />
    //       </Link>
    //       <Link
    //         to="#"
    //         className="action-btn btn-trash"
    //         onClick={() =>
    //           deleteItem(record.id, formatCategory(record.Category))
    //         }
    //         style={{ display: "inline-flex", alignItems: "center" }}
    //       >
    //         <i className="feather-trash-2" />
    //       </Link>
    //     </div>
    //   ),
    //   sorter: (a, b) => (a.class?.length || 0) - (b.class?.length || 0),
    // },
  ];

  const parms = useLocation().pathname;
  return (
    <>
      <Modal show={view} onHide={handleCloseview} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">Property Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container p-3">
            <div className="row g-3">
              {Object.entries(FormDataView).map(([key, value]) =>
                value &&
                typeof value !== "object" &&
                key !== "galleryImages" ? (
                  <div key={key} className="col-md-6">
                    <strong className="text-dark">
                      {key.replace(/([A-Z])/g, " $1").trim()}:
                    </strong>
                    <span className="ms-2 text-muted">{value}</span>
                  </div>
                ) : null
              )}
            </div>
            {FormDataView.galleryImages &&
              FormDataView.galleryImages.length > 0 && (
                <div className="mt-4">
                  <strong className="text-dark">Gallery Images:</strong>
                  <div className="d-flex flex-wrap gap-3 mt-3">
                    {FormDataView.galleryImages.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Gallery ${index}`}
                        className="img-thumbnail rounded"
                        style={{ width: 100, height: 100, objectFit: "cover" }}
                      />
                    ))}
                  </div>
                </div>
              )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseview}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        style={{ marginTop: "3%", overflow: "scroll" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{show ? "Edit Item" : "View Item Details"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {show ? (
            Object.keys(formData).length > 0 ? (
              <Form>
                {Object.keys(formData).map((key) => (
                  <Form.Group className="mt-3" key={key}>
                    <Form.Label>
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                    />
                  </Form.Group>
                ))}
              </Form>
            ) : (
              <p>No fields available to edit.</p>
            )
          ) : (
            <div className="container">
              <Row>
                {Object.entries(formData).map(([key, value]) =>
                  value &&
                  typeof value !== "object" &&
                  key !== "galleryImages" ? (
                    <Col md={6} key={key} className="mb-3">
                      <strong className="text-primary">
                        {key.replace(/([A-Z])/g, " $1").trim()}:
                      </strong>
                      <p className="text-muted mb-0">{value}</p>
                    </Col>
                  ) : null
                )}
              </Row>
              {formData.galleryImages && formData.galleryImages.length > 0 && (
                <div className="mt-4">
                  <h5 className="text-primary">Gallery Images:</h5>
                  <Row className="g-2">
                    {formData.galleryImages.map((img, index) => (
                      <Col xs={4} sm={3} md={2} key={index}>
                        <Card className="border-0 shadow-sm">
                          <Card.Img
                            variant="top"
                            src={img}
                            alt={`Gallery ${index}`}
                            className="rounded"
                            style={{
                              width: "100%",
                              height: "100px",
                              objectFit: "cover",
                            }}
                          />
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </div>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {show && (
            <Button variant="primary" onClick={updateItem}>
              Save Changes
            </Button>
          )}
        </Modal.Footer>
      </Modal>
      <UserHeader parms={parms} />
      {/* Breadscrumb Section */}
      {/* <div className="breadcrumb-bar">
        <div className="container">
          <div className="row align-items-center text-center">
            <div className="col-md-12 col-12">
              <h2 className="breadcrumb-title">My Listing</h2>
              <nav aria-label="breadcrumb" className="page-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/index">Home</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    My Listing
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>
      <div class="container mt-3">
        <div class="row">
          <div class="col-12 text-start fw-bold">Home / My Listing</div>
        </div>
      </div> */}
      {/* /Breadscrumb Section */}
      {/* Dashboard Content */}
      <div
        className="dashboard-content"
        style={{
          marginTop: "5rem",
        }}
      >
        <div className="container">
          <div class="col-12 text-start text-dark " style={{fontSize:26,fontWeight:500}}>Home / User Listing</div>


          {/* <div className="">
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
              <li className="active">
                <Link to="/my-listing">
                  <i className="feather-list" /> <span>My Listing</span>
                </Link>
              </li>
              <li>
                <Link to="/bookmarks">
                  <i className="fas fa-solid fa-heart" /> <span>Favourite</span>
                </Link>
              </li>
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
          </div> */}

          <div className="dash-listingcontent dashboard-info">
            <div className="dash-cards card">
              <div className="card-header">
                <h4>User Listings</h4>
                <Link
                  className="nav-link header-login add-listing"
                  to="/add-listing"
                >
                  <i className="fa-solid fa-plus" /> Add your Listing
                </Link>
              </div>
              <div className="card-body">
                <div className="listing-search">
                  <div className="filter-content form-group">
                    <div className="group-img">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                      />

                      <i className="feather-search" />
                    </div>
                  </div>
                  <div className="sorting-div">
                    <div className="sortbyset">
                      <span className="sortbytitle">Sort by</span>
                      <div className="sorting-select">
                        <select
                          className="form-control select"
                          value={sortOrder}
                          onChange={handleSortChange}
                        >
                          <option value="Newest">Newest</option>
                          <option value="Oldest">Oldest</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="table-responsive">
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
                    <Table
                      className="listing-table datatable"
                      columns={columns}
                      dataSource={paginatedData} // Use manually paginated data
                      rowKey={(record) => record.id}
                      pagination={false} // Disable built-in pagination
                    />
                  )}
                </div> */}
                <div>
      {loading ? (
          <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <img
            src={Loading1}
            alt="Loading..."
            style={{
              width: "200px",
              height: "200px",
              animation: "spin 1s linear infinite", // Apply the spin animation
            }}
          />
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
      ) : (
        paginatedData.map((item, index) => (
          <Card key={index} className="mt-3">
            <Row className="g-0">
              {/* Image Section */}
              <Col md={4} style={{ position: "relative" }}>
                {/* Featured Label */}
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    backgroundColor: "#36A680",
                    color: "white",
                    padding: "5px 10px",
                    fontWeight: "bold",
                    borderRadius: "5px",
                    zIndex: 2,
                  }}
                >
                  Featured
                </div>

                {/* Heart Icon */}
                <div
                  style={{
                    position: "absolute",
                    top: "11%",
                    left: "90%",
                    transform: "translate(-50%, -50%)",
                    borderRadius: "50%",
                    padding: "10px",
                    zIndex: 3,
                    cursor: "pointer",
                  }}
                  onClick={() => toggleBookmark(item.id)}
                >
                  <FaHeart
                    style={{
                      color: item.bookmarked && item.userId === userId ? "red" : "gray",
                      fontSize: "30px",
                    }}
                  />
                </div>

                {/* Image */}
                <Link
                  to={`/service-details?id=${item.id}&callingFrom=${formatCategory(item.category)}`}
                >
                  <Card.Img
                    src={item.galleryImages?.[0] || "https://via.placeholder.com/150"}
                    alt={item.title || "Item"}
                    style={{
                      width: "100%",
                      height: "250px",
                      borderTopLeftRadius: "20px",
                      borderBottomLeftRadius: "20px",
                      objectFit: "cover",
                    }}
                  />
                </Link>
              </Col>

              {/* Details Section */}
              <Col md={8}>
                <Card.Body>
                  {/* Title */}
                  <Card.Title style={{ color: "#2D4495" }}>
                    {item.title || "Item"}
                  </Card.Title>

                  {/* Location and Description */}
                  <Card.Text style={{ color: "black" }}>
                    <small className="text-muted">
                      <i
                        className="fas fa-map-marker-alt"
                        style={{
                          marginRight: "5px",
                          color: "#6c757d",
                        }}
                      />
                      <span style={{ color: "black" }}>
                        {item.City || "Location"}
                      </span>
                    </small>
                    <br />
                    {item.tagline || "Description not available."}
                  </Card.Text>

                  {/* Price and Updated Time */}
                  <Col className="align-items-center" style={{ position: "relative" }}>
                    {/* Price */}
                    <p
                      style={{
                        position: "absolute",
                        top: "-100px",
                        left: "500px",
                        fontWeight: "bold",
                        fontSize: "20px",
                        zIndex: 2,
                        color: "#2D4495",
                      }}
                    >
                      {item.Price ? `$${item.Price}` : "Price not available"}
                    </p>
                  </Col>


                  {/* Buttons */}
                  <Row className="gx-2 gy-2 mt-4 mt-sm-5 text-center" style={{ margin: 0 }}>
                    {/* Call Button */}
                    <Col xs={6} sm={3} lg={2} className="p-0 d-flex align-items-center justify-content-center">
                      <button
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "5px",
                          padding: "12px 20px",
                          border: "none",
                          borderRadius: "20px",
                          backgroundColor: "#2d4fad",
                          color: "white",
                          fontSize: "13px",
                          cursor: "pointer",
                          width: "100%",
                          maxWidth: "150px",
                          margin: "5px",
                        }}
                      >
                        <i className="fas fa-phone" /> Call
                      </button>
                    </Col>

                    {/* Message Button */}
                    <Col xs={6} sm={3} lg={2} className="p-0 d-flex align-items-center justify-content-center">
                      <button
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "5px",
                          padding: "12px 12px",
                          border: "1px solid #2d4fad",
                          borderRadius: "20px",
                          backgroundColor: "white",
                          color: "#2d4fad",
                          fontSize: "13px",
                          cursor: "pointer",
                          width: "100%",
                          maxWidth: "150px",
                          margin: "5px",
                        }}
                      >
                        <i className="fas fa-comment" /> Message
                      </button>
                    </Col>

                    {/* WhatsApp Button */}
                    <Col xs={6} sm={3} lg={2} className="p-0 d-flex align-items-center justify-content-center">
                      <button
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "5px",
                          padding: "12px 10px",
                          border: "1px solid #2d4fad",
                          borderRadius: "20px",
                          backgroundColor: "white",
                          color: "#2d4fad",
                          fontSize: "13px",
                          cursor: "pointer",
                          width: "100%",
                          maxWidth: "150px",
                          margin: "5px",
                        }}
                      >
                        <i className="fab fa-whatsapp" style={{ color: "#2D4495" }} /> WhatsApp
                      </button>
                    </Col>

                    {/* Favorite Button */}
                    <Col
                      xs={6}
                      sm={3}
                      lg={2}
                      className="p-0 d-flex align-items-center justify-content-center position-relative"
                      style={{ marginLeft: 5 }}
                    >
                      <button
                        style={{
                          border: "1px solid #2D4495",
                          backgroundColor: "white",
                          borderRadius: "5px",
                          cursor: "pointer",
                          color: "#2D4495",
                          width: "fit-content",
                          height: "fit-content",
                          padding: "8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          margin: "5px",
                          marginRight: "60px",
                        }}
                      >
                        <FaRegHeart
                          onClick={() => toggleBookmark(item.id)}
                          style={{
                            color: item.bookmarked && item.userId === userId ? "red" : "#2D4495",
                            fontSize: "30px",
                          }}
                        />
                      </button>
                    </Col>
                  </Row>


                </Card.Body>
              </Col>
            </Row>
          </Card>
        ))
      )}
    </div>
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
                            {[...Array(Math.ceil(cars.length / pageSize))].map(
                              (_, index) => (
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
                              )
                            )}
                          </ul>
                        </div>
                      </li>
                      <li
                        className={`page-item nextlink ${
                          currentPage === Math.ceil(cars.length / pageSize)
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
                                Math.ceil(cars.length / pageSize)
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
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* /Dashboard Content */}
      <Footer />
    </>
  );
};
export default Userinfo;
