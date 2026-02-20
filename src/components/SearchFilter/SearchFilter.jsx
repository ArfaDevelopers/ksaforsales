// ========================================
// NEW UNIFIED SEARCH FILTER COMPONENT
// Created to replace individual category filters
// This component is extracted from Search.jsx
// All changes are marked with "// [NEW FILTER]" comments for easy removal
// ========================================

import React from "react";
import { Accordion, Form, Row, Col } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import HorizantalLine from "../HorizantalLine";

const SearchFilter = ({
  filteredAdsCount,
  searchKeyword,
  setSearchKeyword,
  currentCategoryFilters,
  filterData,
  setFilterData,
  handleSearchKeyword,
  handleSubcategoryChange,
  handleFiltersChange,
  handleInputs,
  handleTwoInputs,
  getUrlText,
  getTextFromURL,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const subCategoryParam = searchParams.get("subcategory") || "";

  // Category data for the category filter accordion
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
      "Real Estate",
      "Services",
      "Sport & Game",
      "Pet & Animals",
      "Other",
      "Commercial",
    ],
  };

  return (
    <div className="side_bar_main_wrap">
      <h5
        style={{
          borderTopLeftRadius: "5px",
          borderTopRightRadius: "5px",
          backgroundColor: "#1E55B4",
          color: "white",
          width: "auto",
          height: "49.66px",
          paddingLeft: "12px",
          paddingTop: "12px",
        }}
      >
        Show Results by: <strong>{filteredAdsCount}</strong>
      </h5>

      <Form className="filter_innerwrap">
        {/* Search by Keywords */}
        <Row className="my-3">
          <Col>
            <div className="d-flex justify-content-between align-items-center">
              <Form.Label
                style={{
                  fontWeight: "bold",
                  color: "black",
                  paddingLeft: "8px",
                  marginBottom: 0,
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
              <div onSubmit={handleSearchKeyword}>
                <input
                  type="search"
                  placeholder="Search by title, make, model..."
                  className="form-control rounded-pill pe-5 input_feild search_by_keyword"
                  id="example-search-input"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSearchKeyword(e);
                    }
                  }}
                />
                <FaSearch
                  className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted"
                  style={{ pointerEvents: "none" }}
                />
              </div>
            </div>
          </Col>
        </Row>
        <HorizantalLine />

        {/* Category Filter */}
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
                          getUrlText(cat) === searchParams.get("category")
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

        {/* Subcategories */}
        {currentCategoryFilters.subcategories &&
          currentCategoryFilters.subcategories.length > 0 && (
            <>
              <Accordion className="mt-3">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Sub Categories</Accordion.Header>
                  <Accordion.Body>
                    <div style={{ maxWidth: "300px", margin: "20px" }}>
                      {currentCategoryFilters.subcategories.map((subcat) => {
                        const urlSubCategory = getUrlText(subcat.name);
                        return (
                          <Form.Group key={subcat.name}>
                            {subCategoryParam ? (
                              urlSubCategory === subCategoryParam && (
                                <>
                                  <div className="form-check mb-2">
                                    <input
                                      id={
                                        typeof subcat.name === "string" &&
                                        subcat.name.toLowerCase()
                                      }
                                      name="subcategory"
                                      className="form-check-input"
                                      type="checkbox"
                                      value={subcat.name}
                                      onChange={handleSubcategoryChange}
                                      checked={
                                        urlSubCategory === subCategoryParam
                                      }
                                    />
                                    <label
                                      htmlFor={
                                        typeof subcat.name === "string" &&
                                        subcat.name.toLowerCase()
                                      }
                                      className="form-check-label"
                                    >
                                      {subcat.name}
                                    </label>
                                  </div>

                                  {subcat.nestedSubCategories && (
                                    <Form.Label>Nested Categories</Form.Label>
                                  )}
                                  {subcat.nestedSubCategories &&
                                    subcat.nestedSubCategories.length > 0 &&
                                    subcat.nestedSubCategories.map(
                                      (nestedSubCat) => {
                                        const params =
                                          searchParams.getAll(
                                            "nestedSubCategory"
                                          );
                                        return (
                                          <div
                                            key={nestedSubCat.name}
                                            className="form-check mb-2"
                                          >
                                            <input
                                              id={nestedSubCat.name}
                                              name="nestedSubCategory"
                                              className="form-check-input"
                                              type="checkbox"
                                              value={nestedSubCat.name}
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
                                              htmlFor={nestedSubCat.name}
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
                                  checked={urlSubCategory === subCategoryParam}
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
                      })}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <HorizantalLine />
            </>
          )}

        {/* Dynamic Filters */}
        {Object.entries(currentCategoryFilters.filters || {}).map(
          ([filterKey, filterValue]) => (
            <React.Fragment key={filterKey}>
              <Accordion className="mt-3">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>{filterValue.name}</Accordion.Header>
                  <Accordion.Body>
                    <div
                      style={{
                        maxWidth: "300px",
                        margin: "20px",
                      }}
                    >
                      {filterValue.type === "checkbox" ? (
                        filterValue.options.map((value, valueIndex) => {
                          const id =
                            value.name && typeof value.name === "string"
                              ? value.name.toLowerCase()
                              : typeof value === "string"
                              ? value.toLowerCase()
                              : "";

                          const label = value.name ? value.name : value;

                          const paramValues = searchParams.getAll(filterKey);

                          const checkedFilter =
                            filterValue.select === "multiple"
                              ? paramValues &&
                                paramValues.find(
                                  (val) => val === getUrlText(label)
                                )
                              : searchParams.get(filterKey) ===
                                getUrlText(label);
                          return (
                            <Form.Group
                              key={`${filterKey}-${id}-${valueIndex}`}
                            >
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
                                  {checkedFilter && value.models.length > 0 && (
                                    <div
                                      style={{
                                        border: "1px solid black",
                                        borderRadius: "5px",
                                        padding: "5px",
                                      }}
                                    >
                                      <label htmlFor="">Brand Models</label>
                                      {value.models.map((model) => {
                                        return (
                                          <div
                                            key={model}
                                            className="form-check mb-2"
                                          >
                                            <input
                                              id={model}
                                              name={"brandModel"}
                                              className="form-check-input"
                                              type="checkbox"
                                              checked={searchParams
                                                .getAll("brandModel")
                                                .find(
                                                  (val) =>
                                                    val === getUrlText(model)
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
                                      filterValue.select === "multiple"
                                        ? paramValues &&
                                          paramValues.find(
                                            (val) => val === getUrlText(label)
                                          )
                                        : searchParams.get(filterKey) ===
                                          getUrlText(label)
                                    }
                                    value={label}
                                    onChange={(e) =>
                                      handleFiltersChange(e, filterValue.select)
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
                            <Form.Label>{filterValue.label}</Form.Label>
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
                            <Form.Label>{filterValue.label}</Form.Label>
                          )}
                          <Row>
                            <Col>
                              <Form.Control
                                type="text"
                                name={filterKey}
                                placeholder={filterValue.name}
                                value={filterData[filterKey]}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  // Only accept numeric values for price and mileage
                                  if (
                                    filterKey === "Price" ||
                                    filterKey === "Mileage" ||
                                    filterKey.toLowerCase().includes("price") ||
                                    filterKey.toLowerCase().includes("mileage")
                                  ) {
                                    if (
                                      value === "" ||
                                      /^\d*\.?\d*$/.test(value)
                                    ) {
                                      setFilterData((prev) => ({
                                        ...prev,
                                        [e.target.name]: value,
                                      }));
                                    }
                                  } else {
                                    setFilterData((prev) => ({
                                      ...prev,
                                      [e.target.name]: value,
                                    }));
                                  }
                                }}
                                min="0"
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
                              <Form.Label>{filterValue.label}</Form.Label>
                            )}
                            <Row>
                              <Col>
                                <Form.Control
                                  name={`from${filterValue.name}`}
                                  type="text"
                                  placeholder="From"
                                  value={filterData[`from${filterValue.name}`]}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    // Only accept numeric values for price and mileage
                                    if (
                                      filterValue.name === "Price" ||
                                      filterValue.name === "Mileage"
                                    ) {
                                      if (
                                        value === "" ||
                                        /^\d*\.?\d*$/.test(value)
                                      ) {
                                        setFilterData((prev) => ({
                                          ...prev,
                                          [e.target.name]: value,
                                        }));
                                      }
                                    } else {
                                      setFilterData((prev) => ({
                                        ...prev,
                                        [e.target.name]: value,
                                      }));
                                    }
                                  }}
                                  min="0"
                                />
                              </Col>
                              <Col>
                                <Form.Control
                                  name={`to${filterValue.name}`}
                                  type="text"
                                  placeholder="To"
                                  value={filterData[`to${filterValue.name}`]}
                                  onChange={(e) => {
                                    const value = e.target.value;
                                    // Only accept numeric values for price and mileage
                                    if (
                                      filterValue.name === "Price" ||
                                      filterValue.name === "Mileage"
                                    ) {
                                      if (
                                        value === "" ||
                                        /^\d*\.?\d*$/.test(value)
                                      ) {
                                        setFilterData((prev) => ({
                                          ...prev,
                                          [e.target.name]: value,
                                        }));
                                      }
                                    } else {
                                      setFilterData((prev) => ({
                                        ...prev,
                                        [e.target.name]: value,
                                      }));
                                    }
                                  }}
                                  min="0"
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
                                    from: filterData[`from${filterValue.name}`],
                                    to: filterData[`to${filterValue.name}`],
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
            </React.Fragment>
          )
        )}
      </Form>
    </div>
  );
};

export default SearchFilter;
