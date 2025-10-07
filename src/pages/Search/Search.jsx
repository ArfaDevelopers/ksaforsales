import React, { useEffect, useState } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
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
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category")
    ? searchParams.get("category")
    : "";
  let currentCategoryFilters =
    data.find((page) => page.path === `/${category}`) ?? "";
  if (!currentCategoryFilters) {
    currentCategoryFilters = data.find((page) => page.path === `/search`);
  }

  // function convert text to url
  const getUrlText = (text) => {
    return text
      .trim()
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9\s-]/g, "") // remove special chars
      .replace(/\s+/g, "-") // replace spaces with hyphen
      .replace(/-+/g, "-");
  };

  // function convert the url text to captilize text
  const getTextFromURL = (text) => {
    return text
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // const currentParams = Object.fromEntries(searchParams.entries());
  // console.log("current params..", currentParams);

  const [subcategory, setSubcategory] = useState("");
  const subCategoryParam = searchParams.get("subcategory")
    ? searchParams.get("subcategory")
    : "";
  console.log("subcategory param..", subCategoryParam);
  const [oneInput, setOneInput] = useState("");
  const [filterData, setFilterData] = useState({
    subCategory: "",
    nestedSubCategory: [],
    region: "",
    district: "",
    city: "",
    brand: "",
    brandModel: [],
    fromPrice: "",
    toPrice: "",
    fromYear: "",
    toYear: "",
    fromMileage: "",
    toMileage: "",
    addType: [],
    transmission: [],
    exteriorColor: [],
    interiorColor: [],
    additionalFeatures: [],
    condition: [],
    regionalSpec: [],
    fuelType: [],
    insurance: [],
    bodyType: [],
    noOfDoors: [],
    frequency: [],
    residenceType: [],
    noOfRooms: [],
    noOfBathrooms: [],
    area: [],
    furnished: [],
    facade: [],
    licenseNumber: "",
    streetWidth: "",
    floor: [],
    amenities: [],
    propertyAge: [],
    age: [],
  });

  const parms = useLocation().pathname;
  const navigate = useNavigate();
  // const [ImageURL, setImageURL] = useState(""); // ✅ Define the state

  // const getImageURL = async () => {
  //   const imageRef = ref(storage, "blank-profile-picture.webp"); // image path inside storage

  //   try {
  //     const url = await getDownloadURL(imageRef);
  //     console.log("Image URL:", url);

  //     return url;
  //   } catch (error) {
  //     console.error("Error fetching image URL:", error);
  //     return null;
  //   }
  // };

  // useEffect(() => {
  //   getImageURL().then((url) => {
  //     if (url) {
  //       setImageURL(url);
  //     }
  //   });
  // }, []);

  // handle change for subcategory and nested subcategory
  const handleSubcategoryChange = (e, selectType = "single") => {
    const { name, value, checked } = e.target;
    console.log("subcaegory name...", name);
    setSubcategory(checked ? value : "");
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      const currentValues = newParams.getAll(name);
      if (selectType === "multiple") {
        const currentValue = currentValues.find(
          (val) => val === getUrlText(value) || ""
        );
        if (checked) {
          if (!currentValue) {
            newParams.append(name, getUrlText(value));
          }
        } else {
          newParams.delete(name);
          currentValues
            .filter((val) => val !== getUrlText(value))
            .forEach((val) => newParams.append(name, val));
        }
      } else {
        if (checked) {
          newParams.set(name, getUrlText(value));
        } else {
          newParams.delete(name);
          if (name === "subcategory") {
            newParams.delete("nestedSubCategory");
          }
        }
      }
      return newParams;
    });
  };

  // handle Change for all filters
  const handleFiltersChange = (e, selectType) => {
    const { name, value, checked, type } = e.target || e;
    console.log("Name: ", name, "SelectType", selectType, "value: ", value);
    const lowerCaseName = typeof name === "string" ? name.toLowerCase() : name;
    const lowerCaseValue =
      typeof value === "string" ? value.toLowerCase() : value;
    setFilterData((prevData) => {
      return {
        ...prevData,
        [name]:
          type === "checkbox"
            ? checked
              ? lowerCaseValue
              : ""
            : lowerCaseValue,
      };
    });

    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (selectType === "multiple") {
        const currentValues = newParams.getAll(name);
        const currentValue = currentValues.find(
          (val) => val === getUrlText(value)
        );
        if (checked) {
          if (!currentValue) {
            newParams.append(name, getUrlText(value));
          }
        } else {
          newParams.delete(name);
          currentValues
            .filter((val) => val !== getUrlText(value))
            .forEach((val) => newParams.append(name, val));
        }
      } else if (selectType === "single") {
        if (checked) {
          newParams.set(name, getUrlText(lowerCaseValue));
        } else {
          newParams.delete(name);
          if (name === "brand") {
            newParams.delete("brandModel");
          }
        }
      } else {
        if (value) {
          newParams.set(name, getUrlText(lowerCaseValue));
        } else {
          newParams.delete(name);
        }
      }
      return newParams;
    });
  };

  // handles single input
  const handleInputs = (e, name, value, selectType = "") => {
    e.preventDefault();
    console.log("Name: ", name, "SelectType", selectType, "value: ", value);
    handleFiltersChange({ name, value }, selectType);
    setFilterData((prev) => ({ ...prev, [name]: "" }));
  };

  // handle two inputs
  const handleTwoInputs = (e, names, values, selectType = "") => {
    e.preventDefault();

    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      if (values.from) {
        newParams.set(names.from, values.from);
        setFilterData((prev) => ({ ...prev, [names.from]: "" }));
      } else {
        newParams.delete(names.from);
      }
      if (values.to) {
        newParams.set(names.to, values.to);
        setFilterData((prev) => ({ ...prev, [names.to]: "" }));
      } else {
        newParams.delete(names.to);
      }
      return newParams;
    });
  };

  // Object.entries(currentPage.filters).forEach(([key, value]) => {
  //   console.log(key, value);
  // });
  // console.log('currentparam...', currentParams['brand'])
  const categoryData = {
    name: "Category",
    type: "checkbox",
    select: "single",
    options: [
      "Motors",
      "Electronics",
      "Fashion Style",
      "Home & Furniture",
      "Job Board",
      "Realestate",
      "Services",
      "Sport & Game",
      "Pet & Animals",
      "Other",
      "Commercial",
    ],
  };

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
                navigate(
                  currentCategoryFilters.name === "Search"
                    ? `/search`
                    : `/search?category=${getUrlText(
                        currentCategoryFilters.name
                      )}`
                );
              }}
              className="btn"
              style={{
                background: window.innerWidth <= 576 ? "none" : "#E9EEFF",
                fontWeight: "500",
                padding: window.innerWidth <= 576 ? "0px" : "10px 15px",
              }}
            >
              {currentCategoryFilters.name}
            </button>

            {subCategoryParam && (
              <>
                {" "}
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
                  {getTextFromURL(subCategoryParam)}
                </button>{" "}
              </>
            )}
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

                        <button
                          onClick={() => setSearchParams({})}
                          type="button"
                          className="blue_btn"
                        >
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
                  {/* category */}
                  <Accordion className="mt-3">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Category</Accordion.Header>
                      <Accordion.Body>
                        <div
                          style={{
                            maxWidth: "300px",
                            margin: "20px",
                          }}
                        >
                          {categoryData.options.map((cat) => (
                            <Form.Group key={cat}>
                              <div className="form-check mb-2">
                                <input
                                  id={cat}
                                  name={cat}
                                  className="form-check-input"
                                  type="checkbox"
                                  style={{
                                    cursor: "pointer",
                                  }}
                                  checked={
                                    getUrlText(cat) ===
                                    searchParams.get("category")
                                  }
                                  value={cat}
                                  onChange={(e) => {
                                    if (e.target.value) {
                                      setSearchParams({
                                        category: getUrlText(e.target.value),
                                      });
                                    } else {
                                      setSearchParams({});
                                    }
                                  }}
                                />
                                <label
                                  htmlFor={cat}
                                  className="form-check-label"
                                  style={{
                                    cursor: "pointer",
                                  }}
                                >
                                  {cat}
                                </label>
                              </div>
                            </Form.Group>
                          ))}
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  <HorizantalLine />
                  {/* subcategories */}{" "}
                  {currentCategoryFilters.subcategories &&
                    currentCategoryFilters.subcategories.length > 0 && (
                      <>
                        {" "}
                        <Accordion className="mt-3">
                          <Accordion.Item eventKey="0">
                            <Accordion.Header>Sub Categories</Accordion.Header>
                            <Accordion.Body>
                              <div
                                style={{ maxWidth: "300px", margin: "20px" }}
                              >
                                {currentCategoryFilters.subcategories.map(
                                  (subcat) => {
                                    const urlSubCategory = getUrlText(
                                      subcat.name
                                    );
                                    return (
                                      <Form.Group key={subcat.name}>
                                        {/* <Form.Label>Select a Category</Form.Label> */}
                                        {subCategoryParam ? (
                                          urlSubCategory ===
                                            subCategoryParam && (
                                            <>
                                              <div className="form-check mb-2">
                                                <input
                                                  id={
                                                    typeof subcat.name ===
                                                      "string" &&
                                                    subcat.name.toLowerCase()
                                                  }
                                                  name="subcategory"
                                                  className="form-check-input"
                                                  type="checkbox"
                                                  value={subcat.name}
                                                  onChange={
                                                    handleSubcategoryChange
                                                  }
                                                  checked={
                                                    urlSubCategory ===
                                                    subCategoryParam
                                                  }
                                                />
                                                <label
                                                  htmlFor={
                                                    typeof subcat.name ===
                                                      "string" &&
                                                    subcat.name.toLowerCase()
                                                  }
                                                  className="form-check-label"
                                                >
                                                  {subcat.name}
                                                </label>
                                              </div>

                                              {subcat.nestedSubCategories && (
                                                <Form.Label>
                                                  Nested Categories
                                                </Form.Label>
                                              )}
                                              {subcat.nestedSubCategories &&
                                                subcat.nestedSubCategories
                                                  .length > 0 &&
                                                subcat.nestedSubCategories.map(
                                                  (nestedSubCat) => {
                                                    const params =
                                                      searchParams.getAll(
                                                        "nestedSubCategory"
                                                      );
                                                    return (
                                                      <div className="form-check mb-2">
                                                        <input
                                                          id={nestedSubCat.name}
                                                          name="nestedSubCategory"
                                                          className="form-check-input"
                                                          type="checkbox"
                                                          value={
                                                            nestedSubCat.name
                                                          }
                                                          onChange={(e) =>
                                                            handleSubcategoryChange(
                                                              e,
                                                              "multiple"
                                                            )
                                                          }
                                                          checked={
                                                            params &&
                                                            params.find(
                                                              (val) =>
                                                                val ===
                                                                getUrlText(
                                                                  nestedSubCat.name
                                                                )
                                                            )
                                                          }
                                                        />

                                                        <label
                                                          htmlFor={
                                                            nestedSubCat.name
                                                          }
                                                          className="form-check-label"
                                                        >
                                                          {nestedSubCat.name}
                                                        </label>
                                                      </div>
                                                    );
                                                  }
                                                )}
                                            </>
                                          )
                                        ) : (
                                          <div className="form-check mb-2">
                                            <input
                                              id={subcat.name}
                                              name="subcategory"
                                              className="form-check-input"
                                              type="checkbox"
                                              value={subcat.name}
                                              onChange={handleSubcategoryChange}
                                              checked={
                                                urlSubCategory ===
                                                subCategoryParam
                                              }
                                              style={{ cursor: "pointer" }}
                                            />
                                            <label
                                              htmlFor={subcat.name}
                                              className="form-check-label"
                                              style={{ cursor: "pointer" }}
                                            >
                                              {subcat.name}
                                            </label>
                                          </div>
                                        )}
                                      </Form.Group>
                                    );
                                  }
                                )}
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                        <HorizantalLine />{" "}
                      </>
                    )}
                  {/* filters */}
                  {Object.entries(currentCategoryFilters.filters || {}).map(
                    ([filterKey, filterValue]) => (
                      <>
                        <Accordion className="mt-3" key={filterValue.name}>
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

                                    const paramValues =
                                      searchParams.getAll(filterKey);

                                    const checkedFilter =
                                      filterValue.select === "multiple"
                                        ? paramValues &&
                                          paramValues.find(
                                            (val) => val === getUrlText(label)
                                          )
                                        : searchParams.get(filterKey) ===
                                          getUrlText(label);
                                    return (
                                      <Form.Group key={id}>
                                        {value.models ? (
                                          <>
                                            <div className="form-check mb-2">
                                              <input
                                                id={label}
                                                name={String(filterKey)}
                                                className="form-check-input"
                                                type="checkbox"
                                                checked={checkedFilter}
                                                value={label}
                                                onChange={(e) =>
                                                  handleFiltersChange(
                                                    e,
                                                    filterValue.select
                                                  )
                                                }
                                                style={{ cursor: "pointer" }}
                                              />
                                              <label
                                                htmlFor={label}
                                                className="form-check-label"
                                                style={{ cursor: "pointer" }}
                                              >
                                                {label}
                                              </label>
                                            </div>
                                            {checkedFilter &&
                                              value.models.length > 0 && (
                                                <div
                                                  style={{
                                                    border: "1px solid black",
                                                    borderRadius: "5px",
                                                    padding: "5px",
                                                  }}
                                                >
                                                  <label htmlFor="">
                                                    Brand Models
                                                  </label>
                                                  {value.models.map((model) => {
                                                    return (
                                                      <div className="form-check mb-2">
                                                        <input
                                                          id={model}
                                                          name={"brandModel"}
                                                          className="form-check-input"
                                                          type="checkbox"
                                                          checked={searchParams
                                                            .getAll(
                                                              "brandModel"
                                                            )
                                                            .find(
                                                              (val) =>
                                                                val ===
                                                                getUrlText(
                                                                  model
                                                                )
                                                            )}
                                                          value={model}
                                                          onChange={(e) =>
                                                            handleFiltersChange(
                                                              e,
                                                              "multiple"
                                                            )
                                                          }
                                                          style={{
                                                            cursor: "pointer",
                                                          }}
                                                        />
                                                        <label
                                                          htmlFor={model}
                                                          className="form-check-label"
                                                          style={{
                                                            cursor: "pointer",
                                                          }}
                                                        >
                                                          {model}
                                                        </label>
                                                      </div>
                                                    );
                                                  })}
                                                </div>
                                              )}
                                          </>
                                        ) : (
                                          <div className="form-check mb-2">
                                            <input
                                              id={label}
                                              name={String(filterKey)}
                                              className="form-check-input"
                                              type="checkbox"
                                              checked={
                                                filterValue.select ===
                                                "multiple"
                                                  ? paramValues &&
                                                    paramValues.find(
                                                      (val) =>
                                                        val ===
                                                        getUrlText(label)
                                                    )
                                                  : searchParams.get(
                                                      filterKey
                                                    ) === getUrlText(label)
                                              }
                                              value={label}
                                              onChange={(e) =>
                                                handleFiltersChange(
                                                  e,
                                                  filterValue.select
                                                )
                                              }
                                              style={{ cursor: "pointer" }}
                                            />
                                            <label
                                              htmlFor={label}
                                              className="form-check-label"
                                              style={{ cursor: "pointer" }}
                                            >
                                              {label}
                                            </label>
                                          </div>
                                        )}
                                      </Form.Group>
                                    );
                                  })
                                ) : filterValue.type === "select" ? (
                                  <Form.Group
                                    controlId="formStreetWidth"
                                    style={{
                                      maxWidth: "300px",
                                      marginTop: "20px",
                                    }}
                                  >
                                    {filterValue.label && (
                                      <Form.Label>
                                        {filterValue.label}
                                      </Form.Label>
                                    )}
                                    <Form.Select
                                      name={filterKey}
                                      onChange={handleFiltersChange}
                                      style={{ cursor: "pointer" }}
                                    >
                                      {filterValue.options.map((option) => (
                                        <option
                                          selected={
                                            searchParams.get(filterKey) ===
                                            getUrlText(option)
                                          }
                                          key={option}
                                          value={option}
                                          style={{ cursor: "pointer" }}
                                        >
                                          {option}
                                        </option>
                                      ))}
                                    </Form.Select>
                                  </Form.Group>
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
                                          name={filterKey}
                                          placeholder={filterValue.name}
                                          value={filterData[filterKey]}
                                          onChange={(e) =>
                                            setFilterData((prev) => ({
                                              ...prev,
                                              [e.target.name]: e.target.value,
                                            }))
                                          }
                                          min="0" // Prevent negative prices
                                        />
                                        <button
                                          onClick={(e) =>
                                            handleInputs(
                                              e,
                                              filterKey,
                                              filterData[filterKey],
                                              filterValue.select
                                            )
                                          }
                                          type="button"
                                          className="blue_btn"
                                          style={{
                                            marginTop: "10px",
                                            width: "100%",
                                            cursor: "pointer",
                                          }}
                                        >
                                          Apply
                                        </button>
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
                                              filterData[
                                                `from${filterValue.name}`
                                              ]
                                            }
                                            onChange={(e) =>
                                              setFilterData((prev) => ({
                                                ...prev,
                                                [e.target.name]: e.target.value,
                                              }))
                                            }
                                            min="0" // Prevent negative prices
                                          />
                                        </Col>
                                        <Col>
                                          <Form.Control
                                            name={`to${filterValue.name}`}
                                            type="text"
                                            placeholder="To"
                                            value={
                                              filterData[
                                                `to${filterValue.name}`
                                              ]
                                            }
                                            onChange={(e) =>
                                              setFilterData((prev) => ({
                                                ...prev,
                                                [e.target.name]: e.target.value,
                                              }))
                                            }
                                            min="0" // Prevent negative prices
                                          />
                                        </Col>
                                      </Row>
                                      <button
                                        onClick={(e) =>
                                          handleTwoInputs(
                                            e,
                                            {
                                              from: `from${filterValue.name}`,
                                              to: `to${filterValue.name}`,
                                            },
                                            {
                                              from: filterData[
                                                `from${filterValue.name}`
                                              ],
                                              to: filterData[
                                                `to${filterValue.name}`
                                              ],
                                            },
                                            filterValue.select
                                          )
                                        }
                                        type="button"
                                        className="blue_btn"
                                        style={{
                                          marginTop: "10px",
                                          width: "100%",
                                          cursor: "pointer",
                                        }}
                                      >
                                        Apply
                                      </button>
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
