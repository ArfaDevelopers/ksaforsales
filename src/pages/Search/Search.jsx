import React, { useEffect, useState } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom"; // Import Link from react-router-dom
import Header from "../../components/home/header"; // Ensure Header is correctly implemented and imported
import Footer from "../../components/home/footer/Footer";
import { MdKeyboardArrowRight } from "react-icons/md";
import { ref, getDownloadURL } from "firebase/storage";
import ComercialsAds from "../../components/home/ComercialsAds/ComercialsAds.jsx";
import LatestBlog from "../../components/blog/BlogList/LatestBlog/LatestBlog.jsx";
import { Accordion } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { Container, Row, Col, Form } from "react-bootstrap";
import { storage } from "../../components/Firebase/FirebaseConfig"; // Ensure the correct Firebase import
import { data } from "../../utils/data";
import HorizantalLine from "../../components/HorizantalLine";

const Search = () => {
  const { slug } = useParams();
  const currentPage = data.find((page) => page.path === `/${slug}`);
  const [filterData, setFilterData] = useState({
    subCategory: "",
    nestedSubCategory: "",
    region: "",
    district: "",
    city: "",
    brand: "",
    brandModel: "",
    fromPrice: "",
    toPrice: "",
    fromYear: "",
    toYear: "",
    fromMileage: "",
    toMileage: "",
    addType: "",
    transmission: "",
    exteriorColor: "",
    interiorColor: "",
    additionalFeatures: "",
    condition: "",
    regionalSpec: "",
    fuelType: "",
    insurance: "",
    bodyType: "",
    noOfDoors: "",
    frequency: "",
    residenceType: "",
    noOfRooms: "",
    noOfBathrooms: "",
    area: "",
    furnished: "",
    facade: "",
    licenseNumber: "",
    streetWidth: "",
    floor: "",
    amenities: "",
    propertyAge: "",
    age: "",
  });
  if (!currentPage) {
    return <Navigate to={"/"} replace />;
  }
  const parms = useLocation().pathname;
  const navigate = useNavigate();
  const [ImageURL, setImageURL] = useState(""); // ✅ Define the state

  const getImageURL = async () => {
    const imageRef = ref(storage, "blank-profile-picture.webp"); // image path inside storage

    try {
      const url = await getDownloadURL(imageRef);
      console.log("Image URL:", url);

      return url;
    } catch (error) {
      console.error("Error fetching image URL:", error);
      return null;
    }
  };
  useEffect(() => {
    getImageURL().then((url) => {
      if (url) {
        setImageURL(url);
      }
    });
  }, []);

  const handleFiltersChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFilterData((prevData) => ({
      ...prevData,
      [name]: type === "checked" ? (checked ? value : "") : value,
    }));
    console.log(filterData);
  };
  // Object.entries(filterData).forEach(([key, value]) => {
  //   console.log(key, value);
  // });

  console.log(filterData);

  return (
    <>
      <div className="main-wrapper">
        <Header parms={parms} />

        <Container
          className="parent-main category"
          style={{
            color: "black", // Text color
            marginTop: window.innerWidth <= 768 ? "8rem" : "12rem",
          }}
        >
          <div
            className="adsCategory_head"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              marginTop: "40px",
              marginBottom: "20px",
              alignItems: "center",
            }}
          >
            <button
              onClick={() => {
                navigate("/");
              }}
              className="btn"
              style={{
                background: window.innerWidth <= 576 ? "none" : "#E9EEFF",
                fontWeight: "500",
                // pointerEvents: "none",
                padding: window.innerWidth <= 576 ? "0px" : "10px 15px",
              }}
            >
              Home
            </button>
            <span>
              <MdKeyboardArrowRight />
            </span>

            <button
              onClick={() => {
                navigate(currentPage.path);
              }}
              className="btn"
              style={{
                background: window.innerWidth <= 576 ? "none" : "#E9EEFF",
                fontWeight: "500",
                padding: window.innerWidth <= 576 ? "0px" : "10px 15px",
              }}
            >
              {currentPage.name}
            </button>

            <span>
              <MdKeyboardArrowRight />
            </span>
            <button
              className="btn"
              style={{
                background: window.innerWidth <= 576 ? "none" : "#E9EEFF",
                fontWeight: "500",
                pointerEvents: "none",
                padding: window.innerWidth <= 576 ? "0px" : "10px 15px",
              }}
            >
              subCatgory
            </button>
          </div>
        </Container>
        {/*  filters and ads */}
        <Container
          style={{
            color: "black",
          }}
        >
          <Row className="filter_outterwrap">
            {/* Sidebar */}
            <Col
              lg={3}
              className="filter_main_wrap style={{ height: '200px' }}"
            >
              <div className="side_bar_main_wrap">
                <h5
                  style={{
                    borderTopLeftRadius: "5px",
                    borderTopRightRadius: "5px",
                    backgroundColor: "#2D4495",
                    color: "white",
                    width: "auto",
                    height: "49.66px",
                    paddingLeft: "12px",
                    paddingTop: "12px",
                  }}
                >
                  Show Results by:
                </h5>

                <Form className="filter_innerwrap">
                  <Row className="my-3">
                    <Col>
                      <div className="d-flex justify-content-between align-items-center">
                        <Form.Label
                          style={{
                            fontWeight: "bold",
                            color: "black",
                            paddingLeft: "8px",
                            marginBottom: 0, // Keep aligned vertically
                          }}
                        >
                          Search by Keywords
                        </Form.Label>

                        <button type="button" className="blue_btn">
                          Clear
                        </button>
                      </div>

                      <div className="position-relative mt-2">
                        <input
                          type="search"
                          placeholder="Search here"
                          className="form-control rounded-pill pe-5 input_feild search_by_keyword"
                          id="example-search-input"
                        />
                        <FaSearch
                          className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted"
                          style={{ pointerEvents: "none" }}
                        />
                      </div>
                    </Col>
                  </Row>
                  <HorizantalLine />
                  {/* subcategories */}{" "}
                  <Accordion className="mt-3">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Sub Categories</Accordion.Header>
                      <Accordion.Body>
                        <div style={{ maxWidth: "300px", margin: "20px" }}>
                          {currentPage &&
                            currentPage.subcategories.map((subcategory) => (
                              <Form.Group>
                                {/* <Form.Label>Select a Category</Form.Label> */}
                                <div
                                  key={subcategory.name}
                                  className="form-check mb-2"
                                >
                                  <input
                                    id={
                                      typeof subcategory.name === "string" &&
                                      subcategory.name.toLowerCase()
                                    }
                                    name="subCategory"
                                    className="form-check-inputF"
                                    type="checkbox"
                                  />
                                  <label
                                    htmlFor={
                                      typeof subcategory.name === "string" &&
                                      subcategory.name.toLowerCase()
                                    }
                                    className="form-check-label"
                                  >
                                    {subcategory.name}
                                  </label>
                                </div>
                              </Form.Group>
                            ))}
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  <HorizantalLine />
                  {/* filters */}
                  {Object.entries(currentPage.filters || {}).map(
                    ([filterKey, filterValue]) => (
                      <>
                        <Accordion className="mt-3">
                          <Accordion.Item eventKey="0">
                            <Accordion.Header>
                              {filterValue.name}
                            </Accordion.Header>
                            <Accordion.Body>
                              <div
                                style={{
                                  maxWidth: "300px",
                                  margin: "20px",
                                }}
                              >
                                {filterValue.type === "checkbox" ? (
                                  filterValue.options.map((value) => {
                                    const id =
                                      value.name &&
                                      typeof value.name === "string"
                                        ? value.name.toLowerCase()
                                        : typeof value === "string"
                                        ? value.toLowerCase()
                                        : "";

                                    const label = value.name
                                      ? value.name
                                      : value;

                                    return (
                                      <Form.Group>
                                        <div
                                          key={label}
                                          className="form-check mb-2"
                                        >
                                          <input
                                            id={id}
                                            name={String(id)}
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={filterData[String(id)]}
                                            value={label}
                                            onChange={handleFiltersChange}
                                          />
                                          <label
                                            htmlFor={id}
                                            className="form-check-label"
                                          >
                                            {label}
                                          </label>
                                        </div>
                                      </Form.Group>
                                    );
                                  })
                                ) : filterValue.type === "oneInput" ? (
                                  <Form.Group className="mb-3">
                                    {filterValue.label && (
                                      <Form.Label>
                                        {filterValue.label}
                                      </Form.Label>
                                    )}
                                    <Row>
                                      <Col>
                                        <Form.Control
                                          type="text"
                                          name={String(filterKey)}
                                          placeholder={filterValue.name}
                                          value={filterData[String(filterKey)]}
                                          onChange={handleFiltersChange}
                                          min="0" // Prevent negative prices
                                        />
                                      </Col>
                                    </Row>
                                  </Form.Group>
                                ) : (
                                  filterValue.type === "twoInput" && (
                                    <Form.Group className="mb-3">
                                      {filterValue.label && (
                                        <Form.Label>
                                          {filterValue.label}
                                        </Form.Label>
                                      )}
                                      <Row>
                                        <Col>
                                          <Form.Control
                                            name={`from${filterValue.name}`}
                                            type="text"
                                            placeholder="From"
                                            value={
                                              filterData[String(filterKey)]
                                            }
                                            onChange={handleFiltersChange}
                                            min="0" // Prevent negative prices
                                          />
                                        </Col>
                                        <Col>
                                          <Form.Control
                                            name={`to${filterValue.name}`}
                                            type="text"
                                            placeholder="To"
                                            value={
                                              filterData[String(filterKey)]
                                            }
                                            onChange={handleFiltersChange}
                                            min="0" // Prevent negative prices
                                          />
                                        </Col>
                                      </Row>
                                    </Form.Group>
                                  )
                                )}
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                        <HorizantalLine />
                      </>
                    )
                  )}
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
        <div
          className="container"
          style={{
            color: "black",
            paddingTop: "20px",
            paddingBottom: "30px",
          }}
        >
          <Row>
            {/* <Col>
              <div className="cars data">
               
              </div>
            </Col> */}
          </Row>
        </div>

        <ComercialsAds />
        <LatestBlog />
      </div>

      <Footer />
    </>
  );
};

export default Search;
