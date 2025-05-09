import React, { useEffect, useState } from "react";
import Mylistings from "../../json/Mylisting";
import { Table } from "antd";
import { Link, useLocation } from "react-router-dom";
import Footer from "../../home/footer/Footer";
import Header from "../../home/header";
import UserHeader from "../Userheader";
import Loading1 from "../../../../public/Progress circle.png";
import { Modal, Button, Row, Col, Card, Form } from "react-bootstrap";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../Firebase/FirebaseConfig";
import Spinner from "react-bootstrap/Spinner";
import {
  collection,
  getDocs,
  getDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const MyListe = () => {
  const MySwal = withReactContent(Swal);

  const data = Mylistings.Mylistings;
  const dataSource = { data };
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [editData, setEditData] = useState(null);
  const [formData, setFormData] = useState({});
  const [itemCategory, setItemCategory] = useState("");
  const [itemId, setItemId] = useState(null);
  const [FormDataView, setFormDataView] = useState({});
  const [view, setView] = useState(false);
  const [change, setChange] = useState(false);
  const [filter, setFilter] = useState("All Listing");
  const [sortOrder, setSortOrder] = useState("Newest");
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

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
      }
    });

    return () => unsubscribe();
  }, []);

  const categoryMapping = {
    "Automotive": "Cars",
    "Sports & Game": "SPORTSGAMESComp",
    "Electronics": "ELECTRONICS",
    "Fashion Style": "FASHION",
    "Job Board": "JOBBOARD",
    "Real Estate": "REALESTATECOMP",
    "Other": "Education",
    "Services": "TRAVEL",
    "Pet & Animal": "PETANIMALCOMP",
    "Home & Furnituer": "HEALTHCARE",
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleView = () => setView(true);
  const handleCloseview = () => setView(false);
  const [showInvoiceColumn, setShowInvoiceColumn] = useState(false);
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
    setShowInvoiceColumn(selectedFilter === "Featured Ads");
    setCurrentPage(1);
    setChange(false);
  };

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const sportsCollectionRef = collection(db, "SPORTSGAMESComp");
        const sportsQuerySnapshot = await getDocs(sportsCollectionRef);
        const sportsData = sportsQuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          isDisabled: doc.data().isDisabled ?? false,
        }));

        const realEstateCollectionRef = collection(db, "REALESTATECOMP");
        const realEstateQuerySnapshot = await getDocs(realEstateCollectionRef);
        const realEstateData = realEstateQuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          isDisabled: doc.data().isDisabled ?? false,
        }));

        const CarsCollectionRef = collection(db, "Cars");
        const CarsQuerySnapshot = await getDocs(CarsCollectionRef);
        const CarsData = CarsQuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          isDisabled: doc.data().isDisabled ?? false,
        }));

        const ELECTRONICSCollectionRef = collection(db, "ELECTRONICS");
        const ELECTRONICSQuerySnapshot = await getDocs(ELECTRONICSCollectionRef);
        const ELECTRONICSData = ELECTRONICSQuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          isDisabled: doc.data().isDisabled ?? false,
        }));

        const EducationCollectionRef = collection(db, "Education");
        const EducationQuerySnapshot = await getDocs(EducationCollectionRef);
        const EducationData = EducationQuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          isDisabled: doc.data().isDisabled ?? false,
        }));

        const FASHIONCollectionRef = collection(db, "FASHION");
        const FASHIONQuerySnapshot = await getDocs(FASHIONCollectionRef);
        const FASHIONData = FASHIONQuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          isDisabled: doc.data().isDisabled ?? false,
        }));

        const HEALTHCARECollectionRef = collection(db, "HEALTHCARE");
        const HEALTHCAREQuerySnapshot = await getDocs(HEALTHCARECollectionRef);
        const HEALTHCAREData = HEALTHCAREQuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          isDisabled: doc.data().isDisabled ?? false,
        }));

        const JOBBOARDCollectionRef = collection(db, "JOBBOARD");
        const JOBBOARDQuerySnapshot = await getDocs(JOBBOARDCollectionRef);
        const JOBBOARDData = JOBBOARDQuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          isDisabled: doc.data().isDisabled ?? false,
        }));

        const MAGAZINESCOMPCollectionRef = collection(db, "MAGAZINESCOMP");
        const MAGAZINESCOMPQuerySnapshot = await getDocs(MAGAZINESCOMPCollectionRef);
        const MAGAZINESCOMPData = MAGAZINESCOMPQuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          isDisabled: doc.data().isDisabled ?? false,
        }));

        const PETANIMALCOMPCollectionRef = collection(db, "PETANIMALCOMP");
        const PETANIMALCOMPQuerySnapshot = await getDocs(PETANIMALCOMPCollectionRef);
        const PETANIMALCOMPData = PETANIMALCOMPQuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          isDisabled: doc.data().isDisabled ?? false,
        }));

        const TRAVELCollectionRef = collection(db, "TRAVEL");
        const TRAVELQuerySnapshot = await getDocs(TRAVELCollectionRef);
        const TRAVELData = TRAVELQuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          isDisabled: doc.data().isDisabled ?? false,
        }));

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

        const uniqueData = Array.from(
          new Map(combinedData.map((item) => [item.id, item])).values()
        );

        const user = auth.currentUser;
        if (!user) {
          console.log("No user logged in");
          setLoading(false);
          return;
        }

        const userId = user.uid;
        const filteredData = uniqueData.filter((item) => item.userId === userId);
        console.log(uniqueData, "+");
        console.log("Combined Data Count:", uniqueData.length);
        console.log("Filtered Data Count (by userId):", filteredData.length);

        setCars(filteredData);
        setFilteredCars(filteredData);
        setLoading(false);
      } catch (error) {
        console.error("Error getting cars:", error);
        setError("Failed to fetch listings");
        setLoading(false);
      }
    };

    fetchCars();
  }, []);
  const isMobile = window.innerWidth <= 576;
  useEffect(() => {
    let result = [...cars];

    if (filter === "Featured Ads") {
      result = result.filter((item) => item.FeaturedAds === "Featured Ads");
    } else if (filter === "Not Featured Ads") {
      result = result.filter((item) => item.FeaturedAds !== "Featured Ads");
    }

    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      result = result.filter(
        (car) =>
          car.title?.toLowerCase().includes(lowercasedQuery) ||
          car.description?.toLowerCase().includes(lowercasedQuery)
      );
    }

    result = result.sort((a, b) => {
      const dateA = a.createdAt?.seconds || 0;
      const dateB = b.createdAt?.seconds || 0;
      return sortOrder === "Newest" ? dateB - dateA : dateA - dateB;
    });

    console.log("Filtered Cars Count (after filter/search/sort):", result.length);
    setFilteredCars(result);
  }, [cars, filter, searchQuery, sortOrder]);

  const viewItem = async (id, category) => {
    try {
      const tableName = categoryMapping[category] || category;
      const docRef = doc(db, tableName, id);
      const docSnap = await getDoc(docRef);
      console.log(category, "category_________");
      console.log(id, "category_________id");

      if (docSnap.exists()) {
        console.log("Document Data:", docSnap.data());
        const filteredData = Object.fromEntries(
          Object.entries(docSnap.data()).filter(
            ([_, value]) => value !== "" && value !== null
          )
        );
        console.log("No document found with this ID.", filteredData);
        setFormDataView(filteredData);
        setItemId(id);
        setItemCategory(category);
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
      const trimmedCategory = category.trim();
      const tableName = categoryMapping[trimmedCategory];

      if (!tableName) {
        console.error("Invalid category:", category, "Mapped table:", tableName);
        return;
      }

      console.log("Category:", trimmedCategory, "Table Name:", tableName, "ID:", id);
      const docRef = doc(db, tableName, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document Data:", docSnap.data());
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
      await updateDoc(docRef, formData);
      console.log("Document successfully updated!");
      handleClose();
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const deleteItem = async (id, category) => {
    console.log(category, "combinedData___________category");
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
        MySwal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          timer: 1000,
        });
        try {
          const tableName = categoryMapping[category] || category;
          const docRef = doc(db, tableName, id);
          await deleteDoc(docRef);
          console.log(`Deleted item with ID: ${id} from collection: ${tableName}`);
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

  const toggleDisable = async (id, category, isDisabled) => {
    try {
      const tableName = categoryMapping[category] || category;
      const docRef = doc(db, tableName, id);
      await updateDoc(docRef, { isDisabled });

      setFilteredCars((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, isDisabled } : item
        )
      );
      setCars((prevData) =>
        prevData.map((item) =>
          item.id === id ? { ...item, isDisabled } : item
        )
      );
      console.log(`Toggled ${id} in ${category} to ${isDisabled ? 'disabled' : 'enabled'}`);
    } catch (error) {
      console.error("Error toggling disable status:", error);
      MySwal.fire({
        title: "Error",
        text: "Failed to toggle disable status.",
        icon: "error",
        timer: 1000,
      });
    }
  };

  const formatCategory = (category) => {
    return category
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
  };

  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const columns = [
    {
      title: "Image",
      dataIndex: "galleryImages",
      render: (images, record) => (
        <div className="listingtable-img">
          <Link
            to={record.isDisabled ? "#" : `/service-details?id=${record.id}&callingFrom=${formatCategory(record.category.trim() === 'Pet & Animals' ? "Pet" : formatCategory(record.category))}`}
            style={{
              pointerEvents: record.isDisabled ? "none" : "auto",
              opacity: record.isDisabled ? 0.5 : 1,
              cursor: record.isDisabled ? "not-allowed" : "pointer",
            }}
          >
            <img
              className="img-fluid avatar-img"
              src={images?.[0] || "placeholder.jpg"}
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
        (a.galleryImages?.[0]?.length || 0) - (b.galleryImages?.[0]?.length || 0),
    },
    {
      title: "Details",
      dataIndex: "title",
      render: (text, record) => (
        <>
          <h6>
            <Link
              to={record.isDisabled ? "#" : `/service-details?id=${record.id}&callingFrom=${formatCategory(record.category.trim() === 'Pet & Animals' ? "Pet" : formatCategory(record.category))}`}
              style={{
                pointerEvents: record.isDisabled ? "none" : "auto",
                opacity: record.isDisabled ? 0.5 : 1,
                cursor: record.isDisabled ? "not-allowed" : "pointer",
              }}
            >
              {text}
            </Link>
          </h6>
          <div className="listingtable-rate">
            <Link
              to={record.isDisabled ? "#" : `/service-details?id=${record.id}&callingFrom=${formatCategory(record.category.trim() === 'Pet & Animals' ? "Pet" : formatCategory(record.category))}`}
              className="cat-icon"
              style={{
                pointerEvents: record.isDisabled ? "none" : "auto",
                opacity: record.isDisabled ? 0.5 : 1,
                cursor: record.isDisabled ? "not-allowed" : "pointer",
              }}
            >
              <i className="fa-regular fa-circle-stop" /> {formatCategory(record.category)}
            </Link>{" "}
            <span className="discount-amt" style={{ color: "#2d4495" }}>
              ${record.Price}
            </span>
          </div>
          <p>{record.tagline}.</p>
        </>
      ),
      sorter: (a, b) => (a.title?.length || 0) - (b.title?.length || 0),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => <span className={record.bg}>{"Active"}</span>,
      sorter: (a, b) => (a.status?.length || 0) - (b.status?.length || 0),
    },
    ...(showInvoiceColumn ? [{
      title: "Invoice",
      dataIndex: "invoiceNumber",
      render: (text, record) => (
        <div 
          className="invoice-cell"
          onClick={() => {
            if (!record.isDisabled) {
              setSelectedInvoice(record);
              setShowInvoiceModal(true);
            }
          }}
          style={{
            cursor: record.isDisabled ? "not-allowed" : "pointer",
            opacity: record.isDisabled ? 0.5 : 1,
          }}
        >
          <div>
            <div><strong>Invoice #{text || 'N/A'}</strong></div>
            <div className="invoice-date">{record.invoiceDate}</div>
            <div className="invoice-status">{record.invoiceStatus}</div>
          </div>
        </div>
      ),
      sorter: (a, b) => (a.invoiceNumber?.length || 0) - (b.invoiceNumber?.length || 0),
    }] : []),
    {
      title: "Views",
      dataIndex: "numbers",
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => (a.numbers || 0) - (b.numbers || 0),
    },
    {
      title: "Action",
      dataIndex: "class",
      render: (text, record) => (
        <div
          className={text}
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "flex-start",
          }}
        >
          <Link
            to={record.isDisabled ? "#" : `/service-details?id=${record.id}&callingFrom=${formatCategory(record.category)}`}
            className="action-btn btn-view"
            onClick={() => {
              if (!record.isDisabled) {
                viewItem(record.id, formatCategory(record.category));
              }
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              pointerEvents: record.isDisabled ? "none" : "auto",
              opacity: record.isDisabled ? 0.5 : 1,
              cursor: record.isDisabled ? "not-allowed" : "pointer",
            }}
          >
            <i className="feather-eye" />
          </Link>
          <Link
            to={record.isDisabled ? "#" : `/add-listing?id=${record.id}&callingFrom=${formatCategory(record.category)}`}
            className="action-btn btn-edit"
            style={{
              display: "inline-flex",
              alignItems: "center",
              pointerEvents: record.isDisabled ? "none" : "auto",
              opacity: record.isDisabled ? 0.5 : 1,
              cursor: record.isDisabled ? "not-allowed" : "pointer",
            }}
          >
            <i className="feather-edit-3" />
          </Link>
          <button
            className={`action-btn ${record.isDisabled ? 'btn-disabled' : 'btn-enabled'}`}
            onClick={() => toggleDisable(record.id, formatCategory(record.category), !record.isDisabled)}
            style={{ 
              display: "inline-flex", 
              alignItems: "center", 
              backgroundColor: record.isDisabled ? "#cccccc" : "#2d4495",
              color: "#ffffff",
              cursor: "pointer",
              border: "none",
              padding: "5px 10px",
              borderRadius: "4px"
            }}
            title={record.isDisabled ? "Enable" : "Disable"}
          >
            <i className={record.isDisabled ? "feather-lock" : "feather-unlock"} />
          </button>
        </div>
      ),
      sorter: (a, b) => (a.class?.length || 0) - (b.class?.length || 0),
    },
  ];

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const paginatedData = filteredCars.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

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
                value && typeof value !== "object" && key !== "galleryImages" ? (
                  <div key={key} className="col-md-6">
                    <strong className="text-dark">
                      {key.replace(/([A-Z])/g, " $1").trim()}:
                    </strong>
                    <span className="ms-2 text-muted">{value}</span>
                  </div>
                ) : null
              )}
            </div>
            {FormDataView.galleryImages && FormDataView.galleryImages.length > 0 && (
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
        show={showInvoiceModal}
        onHide={() => setShowInvoiceModal(false)}
        style={{marginTop:"70px"}}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Invoice Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedInvoice && (
            <div className="invoice-detail">
              <h2>Invoice #{selectedInvoice.invoiceNumber}</h2>
              <p><strong>Date:</strong> {selectedInvoice.invoiceDate}</p>
              <p><strong>Status:</strong> {selectedInvoice.invoiceStatus}</p>
              <hr />
              <h3>Billing To:</h3>
              <p>
                {selectedInvoice.billingName}<br />
                Email: {selectedInvoice.billingEmail}<br />
                Phone: {selectedInvoice.billingPhone}
              </p>
              <h3>Ad Details:</h3>
              <p><strong>Title:</strong> {selectedInvoice.adTitle}</p>
              <p><strong>Ad ID:</strong> {selectedInvoice.adId}</p>
              <h3>Payment Details:</h3>
              <table className="invoice-items">
                <tr>
                  <th>Description</th>
                  <th>Amount</th>
                </tr>
                {selectedInvoice.paymentDetails?.map((item, index) => (
                  <tr key={index}>
                    <td>{item.description}</td>
                    <td>{item.amount}</td>
                  </tr>
                ))}
                <tr>
                  <td><strong>Total</strong></td>
                  <td><strong>{selectedInvoice.totalAmount}</strong></td>
                </tr>
              </table>
              <hr />
              <p>Payment Method: {selectedInvoice.paymentMethod}</p>
            </div>
          )}
        </Modal.Body>
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
                    <Form.Label>{key.replace(/([A-Z])/g, " $1").trim()}</Form.Label>
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
                  value && typeof value !== "object" && key !== "galleryImages" ? (
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

      <Header />

      <div className="dashboard-content" style={{ marginTop: "8rem" }}>
        <div className="container">
          <div className="col-12 text-start text-dark" style={{ fontSize: 26, fontWeight: 500 }}>
            Home / My Listing
          </div>

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
                  <i className="fa-solid fa-comment-dots" /> <span>Messages</span>
                </Link>
              </li>
              <li>
                <Link to="/reviews">
                  <i className="fas fa-solid fa-star" /> <span>Reviews</span>
                </Link>
              </li>
              <li>
                <Link to="/login">
                  <i className="fas fa-light fa-circle-arrow-left" /> <span>Logout</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="dash-listingcontent dashboard-info">
            <div className="dash-cards card">
            <div
      style={{
        display: 'flex',
        justifyContent: isMobile ? 'flex-start' : 'space-between',
        alignItems: isMobile ? 'flex-start' : 'center',
        padding: isMobile ? '10px' : '15px',
        backgroundColor: '#fff',
        borderBottom: '1px solid #e0e0e0',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '10px' : '0',
      }}
    >
      <h4
        style={{
          margin: '0',
          fontSize: isMobile ? '18px' : '20px',
          fontWeight: '600',
        }}
      >
        My Listings
      </h4>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? '5px' : '10px',
          flexDirection: isMobile ? 'row' : 'row', // Keep row for both mobile and desktop
          width: isMobile ? '100%' : 'auto',
          justifyContent: isMobile ? 'space-between' : 'flex-start',
        }}
      >
        <div style={{ position: 'relative', width: isMobile ? '50%' : 'auto' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ position: 'relative' }}>
              <Link
                to="#"
                className="dropdown-toggle pageviews-link"
                data-bs-toggle="dropdown"
                aria-expanded={change}
                onClick={() => {
                  setChange(!change);
                  console.log('Change:', change);
                }}
                style={{
                  textDecoration: 'none',
                  color: '#000',
                  padding: isMobile ? '6px 10px' : '8px 12px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  fontSize: isMobile ? '12px' : '14px',
                  width: isMobile ? '100%' : 'auto',
                  justifyContent: isMobile ? 'center' : 'flex-start',
                  textAlign: 'center',
                }}
              >
                <span>{filter}</span>
              </Link>
              <div
                className={`dropdown-menu dropdown-menu-end ${change ? 'show' : ''}`}
                style={{
                  position: 'absolute',
                  top: 'calc(100% + 5px)',
                  left: isMobile ? '0' : 'auto',
                  right: isMobile ? '0' : '0',
                  backgroundColor: '#fff',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  borderRadius: '4px',
                  minWidth: isMobile ? '120px' : '150px',
                  zIndex: 1000,
                }}
              >
                <Link
                  className="dropdown-item"
                  to="#"
                  onClick={() => handleFilterChange('All Listing')}
                  style={{
                    display: 'block',
                    padding: isMobile ? '6px 12px' : '8px 16px',
                    textDecoration: 'none',
                    color: '#000',
                    fontSize: isMobile ? '12px' : '14px',
                  }}
                >
                  All Listing
                </Link>
                <Link
                  className="dropdown-item"
                  to="#"
                  onClick={() => handleFilterChange('Featured Ads')}
                  style={{
                    display: 'block',
                    padding: isMobile ? '6px 12px' : '8px 16px',
                    textDecoration: 'none',
                    color: '#000',
                    fontSize: isMobile ? '12px' : '14px',
                  }}
                >
                  Featured Ads
                </Link>
                <Link
                  className="dropdown-item"
                  to="#"
                  onClick={() => handleFilterChange('Not Featured Ads')}
                  style={{
                    display: 'block',
                    padding: isMobile ? '6px 12px' : '8px 16px',
                    textDecoration: 'none',
                    color: '#000',
                    fontSize: isMobile ? '12px' : '14px',
                  }}
                >
                  Not Featured Ads
                </Link>
              </div>
            </li>
          </ul>
        </div>
        <Link
          className="nav-link header-login add-listing"
          to="/add-listing"
          style={{
            backgroundColor: '#2d4495',
            color: '#fff',
            padding: isMobile ? '6px 10px' : '8px 12px',
            borderRadius: '4px',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: isMobile ? '12px' : '14px',
            width: isMobile ? '50%' : 'auto',
            justifyContent: isMobile ? 'center' : 'flex-start',
            textAlign: 'center',
          }}
        >
          <i className="fa-solid fa-plus" style={{ fontSize: isMobile ? '12px' : '14px' }} />
          Add Listing
        </Link>
      </div>
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
                <div className="table-responsive">
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
                          animation: "spin 1s linear infinite",
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
                    <Table
                      className="listing-table datatable"
                      columns={columns}
                      dataSource={paginatedData}
                      rowKey={(record) => record.id}
                      pagination={false}
                    />
                  )}
                </div>
                <div className="blog-pagination">
                  <nav>
                    <ul className="pagination">
                      <li
                        className={`page-item previtem ${currentPage === 1 ? "disabled" : ""}`}
                      >
                        <Link
                          className="page-link"
                          to="#"
                          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        >
                          <i className="fas fa-regular fa-arrow-left" /> Prev
                        </Link>
                      </li>
                      <li className="justify-content-center pagination-center">
                        <div className="pagelink">
                          <ul>
                            {[...Array(Math.ceil(filteredCars.length / pageSize))].map((_, index) => (
                              <li
                                key={index}
                                className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
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
                          currentPage === Math.ceil(filteredCars.length / pageSize) ? "disabled" : ""
                        }`}
                      >
                        <Link
                          className="page-link"
                          to="#"
                          onClick={() =>
                            setCurrentPage((prev) =>
                              Math.min(prev + 1, Math.ceil(filteredCars.length / pageSize))
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
      <Footer />
    </>
  );
};

export default MyListe;