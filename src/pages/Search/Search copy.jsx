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

  if (!currentPage) {
    return <Navigate to={"/"} replace />;
  }

  console.log(slug);
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
  // Handle city selection

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
                navigate("/job-board");
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
                  {Object.entries(currentPage).map(([key, value]) => (
                    <>
                      <Accordion className="mt-3">
                        <Accordion.Item eventKey="0">
                          {typeof value === "string" && (
                            <Accordion.Header>{value.name}</Accordion.Header>
                          )}
                          {/* <Accordion.Body>
                            <div style={{ maxWidth: "300px", margin: "20px" }}>
                              {currentPage.filters.brand.options.map((make) => (
                                <Form.Group>
                                  <div
                                    key={make.name}
                                    className="form-check mb-2"
                                  >
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                    />
                                    <label className="form-check-label">
                                      {make.name ? make.name : make}
                                    </label>
                                  </div>
                                </Form.Group>
                              ))}
                            </div>
                          </Accordion.Body> */}
                        </Accordion.Item>
                      </Accordion>
                      <HorizantalLine />
                    </>
                  ))}
                  <HorizantalLine />
                  {/*Subcategories*/}
                 
                  {/*Brand*/}
                  {currentPage && currentPage.filters.brand.isExist && (
                    <>
                      <Accordion className="mt-3">
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>
                            {currentPage.filters.brand.name}
                          </Accordion.Header>
                          <Accordion.Body>
                            <div style={{ maxWidth: "300px", margin: "20px" }}>
                              {currentPage.filters.brand.options.map((make) => (
                                <Form.Group>
                                  {/* <Form.Label>Select a Category</Form.Label> */}
                                  <div
                                    key={make.name}
                                    className="form-check mb-2"
                                  >
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                    />
                                    <label className="form-check-label">
                                      {make.name ? make.name : make}
                                    </label>
                                  </div>
                                </Form.Group>
                              ))}
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                      <HorizantalLine />
                    </>
                  )}
                  {/*Price*/}
                  {currentPage && currentPage.filters.price.isExist && (
                    <>
                      <Accordion className="mt-3">
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>
                            {currentPage.filters.price.name}
                          </Accordion.Header>
                          <Accordion.Body>
                            <Form.Group className="mb-3">
                              <Row>
                                <Col>
                                  <Form.Control
                                    type="text"
                                    placeholder="From"
                                    // value={fromValue}
                                    // onChange={handleFromChange}
                                    min="0" // Prevent negative prices
                                  />
                                </Col>
                                <Col>
                                  <Form.Control
                                    type="text"
                                    placeholder="To"
                                    // value={toValue}
                                    // onChange={handleToChange}
                                    min="0" // Prevent negative prices
                                  />
                                </Col>
                              </Row>
                            </Form.Group>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                      <HorizantalLine />
                    </>
                  )}
                  {/*year*/}
                  {currentPage && currentPage.filters.year.isExist && (
                    <>
                      <Accordion className="mt-3">
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>
                            {currentPage.filters.year.name}
                          </Accordion.Header>
                          <Accordion.Body>
                            <Form.Group className="mb-3">
                              <Row>
                                <Col>
                                  <Form.Control
                                    type="text"
                                    placeholder="From"
                                    // value={fromValue}
                                    // onChange={handleFromChange}
                                    min="0" // Prevent negative prices
                                  />
                                </Col>
                                <Col>
                                  <Form.Control
                                    type="text"
                                    placeholder="To"
                                    // value={toValue}
                                    // onChange={handleToChange}
                                    min="0" // Prevent negative prices
                                  />
                                </Col>
                              </Row>
                            </Form.Group>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                      <HorizantalLine />
                    </>
                  )}
                  {/*mileage*/}
                  {currentPage && currentPage.filters.mileage.isExist && (
                    <>
                      <Accordion className="mt-3">
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>
                            {currentPage.filters.mileage.name}
                          </Accordion.Header>
                          <Accordion.Body>
                            <Form.Group className="mb-3">
                              <Form.Label>
                                {currentPage.filters.mileage.description}
                              </Form.Label>
                              <Row>
                                <Col>
                                  <Form.Control
                                    type="text"
                                    placeholder="From"
                                    // value={fromValue}
                                    // onChange={handleFromChange}
                                    min="0" // Prevent negative prices
                                  />
                                </Col>
                                <Col>
                                  <Form.Control
                                    type="text"
                                    placeholder="To"
                                    // value={toValue}
                                    // onChange={handleToChange}
                                    min="0" // Prevent negative prices
                                  />
                                </Col>
                              </Row>
                            </Form.Group>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                      <HorizantalLine />
                    </>
                  )}
                  {/*Add Type*/}
                  {currentPage && currentPage.filters.addType.isExist && (
                    <>
                      <Accordion className="mt-3">
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>
                            {currentPage.filters.addType.name}
                          </Accordion.Header>
                          <Accordion.Body>
                            <div style={{ maxWidth: "300px", margin: "20px" }}>
                              {currentPage.filters.addType.options.map(
                                (type) => (
                                  <Form.Group>
                                    {/* <Form.Label>Select a Category</Form.Label> */}
                                    <div
                                      key={type.name}
                                      className="form-check mb-2"
                                    >
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                      />
                                      <label className="form-check-label">
                                        {type.name ? type.name : type}
                                      </label>
                                    </div>
                                  </Form.Group>
                                )
                              )}
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                      <HorizantalLine />
                    </>
                  )}
                  {/*frequency*/}
                  {currentPage &&
                    currentPage.filters.frequency &&
                    currentPage.filters.frequency.isExist && (
                      <>
                        <Accordion className="mt-3">
                          <Accordion.Item eventKey="0">
                            <Accordion.Header>
                              {currentPage.filters.frequency.name}
                            </Accordion.Header>
                            <Accordion.Body>
                              <div
                                style={{ maxWidth: "300px", margin: "20px" }}
                              >
                                {currentPage.filters.frequency.options.map(
                                  (type) => (
                                    <Form.Group>
                                      {/* <Form.Label>Select a Category</Form.Label> */}
                                      <div
                                        key={type.name}
                                        className="form-check mb-2"
                                      >
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                        />
                                        <label className="form-check-label">
                                          {type.name ? type.name : type}
                                        </label>
                                      </div>
                                    </Form.Group>
                                  )
                                )}
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                        <HorizantalLine />
                      </>
                    )}
                  {/*residenceType*/}
                  {currentPage && currentPage.filters.residenceType.isExist && (
                    <>
                      <Accordion className="mt-3">
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>
                            {currentPage.filters.residenceType.name}
                          </Accordion.Header>
                          <Accordion.Body>
                            <div style={{ maxWidth: "300px", margin: "20px" }}>
                              {currentPage.filters.residenceType.options.map(
                                (type) => (
                                  <Form.Group>
                                    {/* <Form.Label>Select a Category</Form.Label> */}
                                    <div
                                      key={type.name}
                                      className="form-check mb-2"
                                    >
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                      />
                                      <label className="form-check-label">
                                        {type.name ? type.name : type}
                                      </label>
                                    </div>
                                  </Form.Group>
                                )
                              )}
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                      <HorizantalLine />
                    </>
                  )}
                  {/*no of rooms*/}
                  {currentPage && currentPage.filters.noOfRooms.isExist && (
                    <>
                      <Accordion className="mt-3">
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>
                            {currentPage.filters.noOfRooms.name}
                          </Accordion.Header>
                          <Accordion.Body>
                            <div style={{ maxWidth: "300px", margin: "20px" }}>
                              {currentPage.filters.noOfRooms.options.map(
                                (type) => (
                                  <Form.Group>
                                    {/* <Form.Label>Select a Category</Form.Label> */}
                                    <div
                                      key={type.name}
                                      className="form-check mb-2"
                                    >
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                      />
                                      <label className="form-check-label">
                                        {type.name ? type.name : type}
                                      </label>
                                    </div>
                                  </Form.Group>
                                )
                              )}
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                      <HorizantalLine />
                    </>
                  )}{" "}
                  {/*no Of Bathrooms*/}
                  {currentPage && currentPage.filters.noOfBathrooms.isExist && (
                    <>
                      <Accordion className="mt-3">
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>
                            {currentPage.filters.noOfBathrooms.name}
                          </Accordion.Header>
                          <Accordion.Body>
                            <div style={{ maxWidth: "300px", margin: "20px" }}>
                              {currentPage.filters.noOfBathrooms.options.map(
                                (type) => (
                                  <Form.Group>
                                    {/* <Form.Label>Select a Category</Form.Label> */}
                                    <div
                                      key={type.name}
                                      className="form-check mb-2"
                                    >
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                      />
                                      <label className="form-check-label">
                                        {type.name ? type.name : type}
                                      </label>
                                    </div>
                                  </Form.Group>
                                )
                              )}
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                      <HorizantalLine />
                    </>
                  )}
                  {/*area*/}
                  {currentPage && currentPage.filters.area.isExist && (
                    <>
                      <Accordion className="mt-3">
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>
                            {currentPage.filters.area.name}
                          </Accordion.Header>
                          <Accordion.Body>
                            <div style={{ maxWidth: "300px", margin: "20px" }}>
                              {currentPage.filters.area.options.map((type) => (
                                <Form.Group>
                                  {/* <Form.Label>Select a Category</Form.Label> */}
                                  <div
                                    key={type.name}
                                    className="form-check mb-2"
                                  >
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                    />
                                    <label className="form-check-label">
                                      {type.name ? type.name : type}
                                    </label>
                                  </div>
                                </Form.Group>
                              ))}
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                      <HorizantalLine />
                    </>
                  )}{" "}
                  {/*furnished*/}
                  {currentPage && currentPage.filters.furnished.isExist && (
                    <>
                      <Accordion className="mt-3">
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>
                            {currentPage.filters.furnished.name}
                          </Accordion.Header>
                          <Accordion.Body>
                            <div style={{ maxWidth: "300px", margin: "20px" }}>
                              {currentPage.filters.furnished.options.map(
                                (type) => (
                                  <Form.Group>
                                    {/* <Form.Label>Select a Category</Form.Label> */}
                                    <div
                                      key={type.name}
                                      className="form-check mb-2"
                                    >
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                      />
                                      <label className="form-check-label">
                                        {type.name ? type.name : type}
                                      </label>
                                    </div>
                                  </Form.Group>
                                )
                              )}
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                      <HorizantalLine />
                    </>
                  )}{" "}
                  {/*Facade*/}
                  {currentPage && currentPage.filters.facade.isExist && (
                    <>
                      <Accordion className="mt-3">
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>
                            {currentPage.filters.facade.name}
                          </Accordion.Header>
                          <Accordion.Body>
                            <div style={{ maxWidth: "300px", margin: "20px" }}>
                              {currentPage.filters.facade.options.map(
                                (type) => (
                                  <Form.Group>
                                    {/* <Form.Label>Select a Category</Form.Label> */}
                                    <div
                                      key={type.name}
                                      className="form-check mb-2"
                                    >
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                      />
                                      <label className="form-check-label">
                                        {type.name ? type.name : type}
                                      </label>
                                    </div>
                                  </Form.Group>
                                )
                              )}
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                      <HorizantalLine />
                    </>
                  )}{" "}
                  {/*licenseNumber*/}
                  {currentPage && currentPage.filters.licenseNumber.isExist && (
                    <>
                      <Accordion className="mt-3">
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>
                            {currentPage.filters.licenseNumber.name}
                          </Accordion.Header>
                          <Accordion.Body>
                            <Form.Group className="mb-3">
                              <Row>
                                <Col>
                                  <Form.Control
                                    type="text"
                                    placeholder="License Number"
                                    // value={fromValue}
                                    // onChange={handleFromChange}
                                    min="0" // Prevent negative prices
                                  />
                                </Col>
                              </Row>
                            </Form.Group>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                      <HorizantalLine />
                    </>
                  )}
                  {/*streetWidth*/}
                  {currentPage && currentPage.filters.streetWidth.isExist && (
                    <>
                      <Accordion className="mt-3">
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>
                            {currentPage.filters.streetWidth.name}
                          </Accordion.Header>
                          <Accordion.Body>
                            <div style={{ maxWidth: "300px", margin: "20px" }}>
                              {currentPage.filters.streetWidth.options.map(
                                (type) => (
                                  <Form.Group>
                                    {/* <Form.Label>Select a Category</Form.Label> */}
                                    <div
                                      key={type.name}
                                      className="form-check mb-2"
                                    >
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                      />
                                      <label className="form-check-label">
                                        {type.name ? type.name : type}
                                      </label>
                                    </div>
                                  </Form.Group>
                                )
                              )}
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                      <HorizantalLine />
                    </>
                  )}
                  {/*floor*/}
                  {currentPage && currentPage.filters.floor.isExist && (
                    <>
                      <Accordion className="mt-3">
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>
                            {currentPage.filters.floor.name}
                          </Accordion.Header>
                          <Accordion.Body>
                            <div style={{ maxWidth: "300px", margin: "20px" }}>
                              {currentPage.filters.floor.options.map((type) => (
                                <Form.Group>
                                  {/* <Form.Label>Select a Category</Form.Label> */}
                                  <div
                                    key={type.name}
                                    className="form-check mb-2"
                                  >
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                    />
                                    <label className="form-check-label">
                                      {type.name ? type.name : type}
                                    </label>
                                  </div>
                                </Form.Group>
                              ))}
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                      <HorizantalLine />
                    </>
                  )}{" "}
                  {/*amenities*/}
                  {currentPage && currentPage.filters.amenities.isExist && (
                    <>
                      <Accordion className="mt-3">
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>
                            {currentPage.filters.amenities.name}
                          </Accordion.Header>
                          <Accordion.Body>
                            <div style={{ maxWidth: "300px", margin: "20px" }}>
                              {currentPage.filters.amenities.options.map(
                                (type) => (
                                  <Form.Group>
                                    {/* <Form.Label>Select a Category</Form.Label> */}
                                    <div
                                      key={type.name}
                                      className="form-check mb-2"
                                    >
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                      />
                                      <label className="form-check-label">
                                        {type.name ? type.name : type}
                                      </label>
                                    </div>
                                  </Form.Group>
                                )
                              )}
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                      <HorizantalLine />
                    </>
                  )}{" "}
                  {/*propertyAge*/}
                  {currentPage && currentPage.filters.propertyAge.isExist && (
                    <>
                      <Accordion className="mt-3">
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>
                            {currentPage.filters.propertyAge.name}
                          </Accordion.Header>
                          <Accordion.Body>
                            <div style={{ maxWidth: "300px", margin: "20px" }}>
                              {currentPage.filters.propertyAge.options.map(
                                (type) => (
                                  <Form.Group>
                                    {/* <Form.Label>Select a Category</Form.Label> */}
                                    <div
                                      key={type.name}
                                      className="form-check mb-2"
                                    >
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                      />
                                      <label className="form-check-label">
                                        {type.name ? type.name : type}
                                      </label>
                                    </div>
                                  </Form.Group>
                                )
                              )}
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                      <HorizantalLine />
                    </>
                  )}
                  {/*Transmission*/}
                  {currentPage && currentPage.filters.transmission.isExist && (
                    <>
                      <Accordion className="mt-3">
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>
                            {currentPage.filters.transmission.name}
                          </Accordion.Header>
                          <Accordion.Body>
                            <div style={{ maxWidth: "300px", margin: "20px" }}>
                              {currentPage.filters.transmission.options.map(
                                (type) => (
                                  <Form.Group>
                                    {/* <Form.Label>Select a Category</Form.Label> */}
                                    <div
                                      key={type.name}
                                      className="form-check mb-2"
                                    >
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                      />
                                      <label className="form-check-label">
                                        {type.name ? type.name : type}
                                      </label>
                                    </div>
                                  </Form.Group>
                                )
                              )}
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                      <HorizantalLine />
                    </>
                  )}
                  {/*Exterior Color*/}
                  {currentPage && currentPage.filters.exteriorColor.isExist && (
                    <>
                      <Accordion className="mt-3">
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>
                            {currentPage.filters.exteriorColor.name}
                          </Accordion.Header>
                          <Accordion.Body>
                            <div style={{ maxWidth: "300px", margin: "20px" }}>
                              {currentPage.filters.exteriorColor.options.map(
                                (type) => (
                                  <Form.Group>
                                    {/* <Form.Label>Select a Category</Form.Label> */}
                                    <div
                                      key={type.name ? type.name : type}
                                      className="form-check mb-2"
                                    >
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                      />
                                      <label className="form-check-label">
                                        {type.name ? type.name : type}
                                      </label>
                                    </div>
                                  </Form.Group>
                                )
                              )}
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                      <HorizantalLine />
                    </>
                  )}
                  {/*addtional features*/}
                  {currentPage &&
                    currentPage.filters.additionalFeatures.isExist && (
                      <>
                        <Accordion className="mt-3">
                          <Accordion.Item eventKey="0">
                            <Accordion.Header>
                              {currentPage.filters.additionalFeatures.name}
                            </Accordion.Header>
                            <Accordion.Body>
                              <div
                                style={{ maxWidth: "300px", margin: "20px" }}
                              >
                                {currentPage.filters.additionalFeatures.options.map(
                                  (type) => (
                                    <Form.Group>
                                      {/* <Form.Label>Select a Category</Form.Label> */}
                                      <div
                                        key={type.name}
                                        className="form-check mb-2"
                                      >
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                        />
                                        <label className="form-check-label">
                                          {type.name ? type.name : type}
                                        </label>
                                      </div>
                                    </Form.Group>
                                  )
                                )}
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                        <HorizantalLine />
                      </>
                    )}{" "}
                  {/*Condition*/}
                  {currentPage && currentPage.filters.condition.isExist && (
                    <>
                      <Accordion className="mt-3">
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>
                            {currentPage.filters.condition.name}
                          </Accordion.Header>
                          <Accordion.Body>
                            <div style={{ maxWidth: "300px", margin: "20px" }}>
                              {currentPage.filters.condition.options.map(
                                (type) => (
                                  <Form.Group>
                                    {/* <Form.Label>Select a Category</Form.Label> */}
                                    <div
                                      key={type.name}
                                      className="form-check mb-2"
                                    >
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                      />
                                      <label className="form-check-label">
                                        {type.name ? type.name : type}
                                      </label>
                                    </div>
                                  </Form.Group>
                                )
                              )}
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                      <HorizantalLine />
                    </>
                  )}
                  {/*Interior Color*/}
                  {currentPage && currentPage.filters.interiorColor.isExist && (
                    <>
                      <Accordion className="mt-3">
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>
                            {currentPage.filters.interiorColor.name}
                          </Accordion.Header>
                          <Accordion.Body>
                            <div style={{ maxWidth: "300px", margin: "20px" }}>
                              {currentPage.filters.interiorColor.options.map(
                                (type) => (
                                  <Form.Group>
                                    {/* <Form.Label>Select a Category</Form.Label> */}
                                    <div
                                      key={type.name ? type.name : type}
                                      className="form-check mb-2"
                                    >
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                      />
                                      <label className="form-check-label">
                                        {type.name ? type.name : type}
                                      </label>
                                    </div>
                                  </Form.Group>
                                )
                              )}
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                      <HorizantalLine />
                    </>
                  )}
                  {/*Regional spec*/}
                  {currentPage && currentPage.filters.regionalSpec.isExist && (
                    <>
                      <Accordion className="mt-3">
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>
                            {currentPage.filters.regionalSpec.name}
                          </Accordion.Header>
                          <Accordion.Body>
                            <div style={{ maxWidth: "300px", margin: "20px" }}>
                              {currentPage.filters.regionalSpec.options.map(
                                (type) => (
                                  <Form.Group>
                                    {/* <Form.Label>Select a Category</Form.Label> */}
                                    <div
                                      key={type.name ? type.name : type}
                                      className="form-check mb-2"
                                    >
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                      />
                                      <label className="form-check-label">
                                        {type.name ? type.name : type}
                                      </label>
                                    </div>
                                  </Form.Group>
                                )
                              )}
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                      <HorizantalLine />
                    </>
                  )}
                  {/*Fuel type*/}
                  {currentPage && currentPage.filters.fuelType.isExist && (
                    <>
                      <Accordion className="mt-3">
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>
                            {currentPage.filters.fuelType.name}
                          </Accordion.Header>
                          <Accordion.Body>
                            <div style={{ maxWidth: "300px", margin: "20px" }}>
                              {currentPage.filters.fuelType.options.map(
                                (type) => (
                                  <Form.Group>
                                    {/* <Form.Label>Select a Category</Form.Label> */}
                                    <div
                                      key={type.name ? type.name : type}
                                      className="form-check mb-2"
                                    >
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                      />
                                      <label className="form-check-label">
                                        {type.name ? type.name : type}
                                      </label>
                                    </div>
                                  </Form.Group>
                                )
                              )}
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                      <HorizantalLine />
                    </>
                  )}
                  {/*Insurance*/}
                  {currentPage && currentPage.filters.insurance.isExist && (
                    <>
                      <Accordion className="mt-3">
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>
                            {currentPage.filters.insurance.name}
                          </Accordion.Header>
                          <Accordion.Body>
                            <div style={{ maxWidth: "300px", margin: "20px" }}>
                              {currentPage.filters.insurance.options.map(
                                (type) => (
                                  <Form.Group>
                                    {/* <Form.Label>Select a Category</Form.Label> */}
                                    <div
                                      key={type.name ? type.name : type}
                                      className="form-check mb-2"
                                    >
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                      />
                                      <label className="form-check-label">
                                        {type.name ? type.name : type}
                                      </label>
                                    </div>
                                  </Form.Group>
                                )
                              )}
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                      <HorizantalLine />
                    </>
                  )}
                  {/*body type*/}
                  {currentPage && currentPage.filters.bodyType.isExist && (
                    <>
                      <Accordion className="mt-3">
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>
                            {currentPage.filters.bodyType.name}
                          </Accordion.Header>
                          <Accordion.Body>
                            <div style={{ maxWidth: "300px", margin: "20px" }}>
                              {currentPage.filters.bodyType.options.map(
                                (type) => (
                                  <Form.Group>
                                    {/* <Form.Label>Select a Category</Form.Label> */}
                                    <div
                                      key={type.name ? type.name : type}
                                      className="form-check mb-2"
                                    >
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                      />
                                      <label className="form-check-label">
                                        {type.name ? type.name : type}
                                      </label>
                                    </div>
                                  </Form.Group>
                                )
                              )}
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                      <HorizantalLine />
                    </>
                  )}
                  {/*No of doors*/}
                  {currentPage && currentPage.filters.noOfDoors.isExist && (
                    <>
                      <Accordion className="mt-3">
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>
                            {currentPage.filters.noOfDoors.name}
                          </Accordion.Header>
                          <Accordion.Body>
                            <div style={{ maxWidth: "300px", margin: "20px" }}>
                              {currentPage.filters.noOfDoors.options.map(
                                (type) => (
                                  <Form.Group>
                                    {/* <Form.Label>Select a Category</Form.Label> */}
                                    <div
                                      key={type.name ? type.name : type}
                                      className="form-check mb-2"
                                    >
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                      />
                                      <label className="form-check-label">
                                        {type.name ? type.name : type}
                                      </label>
                                    </div>
                                  </Form.Group>
                                )
                              )}
                            </div>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                      <HorizantalLine />
                    </>
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
