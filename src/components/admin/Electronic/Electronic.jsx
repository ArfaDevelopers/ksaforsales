import React, { useState } from "react";
import { db } from "./../../Firebase/FirebaseConfig.jsx";
import { addDoc, collection } from "firebase/firestore";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

// For date picker
import DatePicker, { registerLocale } from "react-datepicker";
import { enUS } from "date-fns/locale"; // Import English locale
import "react-datepicker/dist/react-datepicker.css";

// Cloudinary upload
import axios from "axios";

// Register the English locale
registerLocale("en-US", enUS);

const Electronic = () => {
  const [imgUrls, setImgUrls] = useState(Array(6).fill("")); // For storing image URLs from Cloudinary
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [link, setLink] = useState("");
  const [timeAgo, setTimeAgo] = useState(new Date()); // Default to current date
  const [imageFiles, setImageFiles] = useState(Array(6).fill(null)); // For storing selected image files
  const [electronicType, setElectronicType] = useState(""); // For storing selected electronic type
  const [sellerType, setSellerType] = useState("Agency");
  const [registeredCity, setRegisteredCity] = useState("Un-Registered");
  const [assembly, setAssembly] = useState("Imported");
  const [engineCapacity, setEngineCapacity] = useState("1500CC");
  const [bodyType, setBodyType] = useState("Cross-over");
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [condition, setCondition] = useState("Used");
  const [exteriorColor, setExteriorColor] = useState("Black");
  const [purpose, setPurpose] = useState("Sell");
  const [model, setModel] = useState("2022");
  const [color, setColor] = useState("Black");
  const [whatsapp, setWhatsapp] = useState("03189391781");
  const [type, setType] = useState("Sale");

  // Handle image upload to Cloudinary
  const handleImageUpload = async (file, index) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");
    formData.append("cloud_name", "dv26wjoay");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dv26wjoay/image/upload",
        formData
      );
      const newImgUrls = [...imgUrls];
      newImgUrls[index] = response.data.secure_url; // Save the image URL from Cloudinary
      setImgUrls(newImgUrls);
      console.log("Image uploaded successfully:", response.data.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image.");
    }
  };

  // Handle file selection for images
  const handleFileChange = (index) => (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImageFiles = [...imageFiles];
      newImageFiles[index] = file;
      setImageFiles(newImageFiles);
      handleImageUpload(file, index); // Upload the selected file
    }
  };

  // Function to add a new listing to Firestore
  const handleAddListing = async (e) => {
    e.preventDefault();

    if (imgUrls.some((url) => !url)) {
      alert("Please upload all images before submitting.");
      return;
    }

    try {
      // Get a reference to the 'listings' collection
      const listingsCollection = collection(db, "Electronic");

      // Add a new document to the 'listings' collection
      const docRef = await addDoc(listingsCollection, {
        img: imgUrls[0], // img1
        img2: imgUrls[1], // img2
        img3: imgUrls[2], // img3
        img4: imgUrls[3], // img4
        img5: imgUrls[4], // img5

        img6: imgUrls[5], // img6
        title: title,
        description: description,
        location: location,
        price: price,
        link: link,
        electronicType: electronicType,
        sellerType: sellerType,
        registeredCity: registeredCity,
        assembly: assembly,
        engineCapacity: engineCapacity,
        bodyType: bodyType,
        lastUpdated: lastUpdated.toISOString(),
        condition: condition,
        exteriorColor: exteriorColor,
        purpose: purpose,
        model: model,
        color: color,
        whatsapp: whatsapp,
        type: type,
        timeAgo: timeAgo.toISOString(), // Convert to ISO string to store the date
      });

      alert("Listing added successfully!");
      // Reset all fields
      // setTitle("");
      // setImgUrls(Array(6).fill("")); // Reset all image URLs
      // setImageFiles(Array(6).fill(null)); // Reset all image files
      // setLocation("");
      // setPrice("");
      // setLink("");
      // setDescription("");
      setTimeAgo(new Date()); // Reset time to current date
      // setElectronicType("");
      setSellerType("Agency");
      setRegisteredCity("Un-Registered");
      setAssembly("Imported");
      setEngineCapacity("1500CC");
      setBodyType("Cross-over");
      setCondition("Used");
      setExteriorColor("Black");
      setPurpose("Sell");
      setModel("2022");
      setColor("Black");
      setWhatsapp("03189391781");
      setType("Sale");
    } catch (error) {
      console.error("Error adding listing: ", error);
      alert("Error adding listing.");
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card>
            <Card.Header className="text-center">
              <h3>Add a New Electronic Item</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleAddListing}>
                {/* Title */}
                <Form.Group controlId="formTitle" className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter listing title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </Form.Group>

                {/* Image Uploads */}
                {[...Array(6)].map((_, index) => (
                  <Form.Group
                    controlId={`formImageUrl${index + 1}`}
                    className="mb-3"
                    key={index}
                  >
                    <Form.Label>{`Image Upload ${index + 1}`}</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange(index)}
                      required
                    />
                  </Form.Group>
                ))}

                {/* Electronic Type */}
                <Form.Group controlId="formElectronicType" className="mb-3">
                  <Form.Label>Electronic Type</Form.Label>
                  <Form.Control
                    as="select"
                    value={electronicType}
                    onChange={(e) => setElectronicType(e.target.value)}
                    required
                  >
                    <option value="">Select Electronic Type</option>
                    <option value="Charger">Charger</option>
                    <option value="Head Phones">Head Phones</option>
                    <option value="Speaker">Speaker</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Processor">Processor</option>
                  </Form.Control>
                </Form.Group>

                {/* Location */}
                <Form.Group controlId="formLocation" className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </Form.Group>

                {/* Price */}
                <Form.Group controlId="formPrice" className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </Form.Group>

                {/* Link */}
                <Form.Group controlId="formLink" className="mb-3">
                  <Form.Label>Link</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter link"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    required
                  />
                </Form.Group>

                {/* Description */}
                <Form.Group
                  controlId="form 
Description"
                  className="mb-3"
                >
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </Form.Group>

                {/* Time Ago */}
                <Form.Group controlId="formTimeAgo" className="mb-3">
                  <Form.Label>Time Ago (Date Posted)</Form.Label>
                  <DatePicker
                    selected={timeAgo}
                    onChange={(date) => setTimeAgo(date)} // Update the date state
                    dateFormat="MMMM d, yyyy"
                    showYearDropdown
                    scrollableYearDropdown
                    className="form-control"
                    required
                  />
                </Form.Group>

                {/* Seller Type */}
                <Form.Group controlId="formSellerType" className="mb-3">
                  <Form.Label>Seller Type</Form.Label>
                  <Form.Control
                    as="select"
                    value={sellerType}
                    onChange={(e) => setSellerType(e.target.value)}
                    required
                  >
                    <option value="Agency">Agency</option>
                    <option value="Individual">Individual</option>
                  </Form.Control>
                </Form.Group>

                {/* Registered City */}
                <Form.Group controlId="formRegisteredCity" className="mb-3">
                  <Form.Label>Registered City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter registered city"
                    value={registeredCity}
                    onChange={(e) => setRegisteredCity(e.target.value)}
                    required
                  />
                </Form.Group>

                {/* Assembly */}
                <Form.Group controlId="formAssembly" className="mb-3">
                  <Form.Label>Assembly</Form.Label>
                  <Form.Control
                    as="select"
                    value={assembly}
                    onChange={(e) => setAssembly(e.target.value)}
                    required
                  >
                    <option value="Imported">Imported</option>
                    <option value="Local">Local</option>
                  </Form.Control>
                </Form.Group>

                {/* Engine Capacity */}
                <Form.Group controlId="formEngineCapacity" className="mb-3">
                  <Form.Label>Engine Capacity</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter engine capacity"
                    value={engineCapacity}
                    onChange={(e) => setEngineCapacity(e.target.value)}
                    required
                  />
                </Form.Group>

                {/* Body Type */}
                <Form.Group controlId="formBodyType" className="mb-3">
                  <Form.Label>Body Type</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter body type"
                    value={bodyType}
                    onChange={(e) => setBodyType(e.target.value)}
                    required
                  />
                </Form.Group>

                {/* Condition */}
                <Form.Group controlId="formCondition" className="mb-3">
                  <Form.Label>Condition</Form.Label>
                  <Form.Control
                    as="select"
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    required
                  >
                    <option value="New">New</option>
                    <option value="Used">Used</option>
                  </Form.Control>
                </Form.Group>

                {/* Exterior Color */}
                <Form.Group controlId="formExteriorColor" className="mb-3">
                  <Form.Label>Exterior Color</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter exterior color"
                    value={exteriorColor}
                    onChange={(e) => setExteriorColor(e.target.value)}
                    required
                  />
                </Form.Group>

                {/* Purpose */}
                <Form.Group controlId="formPurpose" className="mb-3">
                  <Form.Label>Purpose</Form.Label>
                  <Form.Control
                    as="select"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    required
                  >
                    <option value="Sell">Sell</option>
                    <option value="Rent">Rent</option>
                  </Form.Control>
                </Form.Group>

                {/* Model */}
                <Form.Group controlId="formModel" className="mb-3">
                  <Form.Label>Model</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter model year"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    required
                  />
                </Form.Group>

                {/* Color */}
                <Form.Group controlId="formColor" className="mb-3">
                  <Form.Label>Color</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    required
                  />
                </Form.Group>

                {/* WhatsApp */}
                <Form.Group controlId="formWhatsapp" className="mb-3">
                  <Form.Label>WhatsApp</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter WhatsApp number"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    required
                  />
                </Form.Group>

                {/* Type */}
                <Form.Group controlId="formType" className="mb-3">
                  <Form.Label>Type</Form.Label>
                  <Form.Control
                    as="select"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                  >
                    <option value="Sale">Sale</option>
                    <option value="Lease">Lease</option>
                  </Form.Control>
                </Form.Group>

                {/* Submit Button */}
                <Button variant="primary" type="submit" block>
                  Add Listing
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Electronic;
