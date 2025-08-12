import React, { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { auth } from "../../Firebase/FirebaseConfig";
import { db } from "../../Firebase/FirebaseConfig.jsx";
import {
  addDoc,
  collection,
  doc,
  setDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const PaymentForm = (props) => {
  const MySwal = withReactContent(Swal);

  console.log(props, "FeaturedAds__________________props");

  const [formData, setFormData] = useState({
    selectedFeature: "",
    email: "",
    phone: "",
    address: "8697-8747 Stirling Rd, Florida",
  });
  const [showPayment, setShowPayment] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const updateFeaturedAds = async () => {
    // Skip validation for testing
    const carId = props._Id || "test_car_id"; // Fallback for testing
    const collectionName = props.collectionName1 || "cars"; // Fallback for testing
    const carDocRef = doc(db, collectionName, carId);

    try {
      const docSnap = await getDoc(carDocRef);
      if (docSnap.exists()) {
        const carData = docSnap.data();
        const featuredAdsValue = carData.FeaturedAds;

        if (featuredAdsValue === "Not Featured Ads") {
          await updateDoc(carDocRef, {
            FeaturedAds: "Featured Ads",
          });
          MySwal.fire({
            title: "Updated!",
            text: "FeaturedAds updated successfully!",
            icon: "success",
            timer: 1000,
          });
          console.log("FeaturedAds updated successfully!");
        } else {
          MySwal.fire({
            title: "Error!",
            text: "This ad is already set to Featured Ads",
            icon: "error",
            timer: 1000,
          });
          console.log(
            "FeaturedAds is already set to Featured Ads or doesn't need updating."
          );
        }
      } else {
        MySwal.fire({
          title: "Error!",
          text: "No such document exists!",
          icon: "error",
          timer: 2000,
        });
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error updating FeaturedAds:", error);
      MySwal.fire({
        title: "Error!",
        text: "Failed to update FeaturedAds. Please try again.",
        icon: "error",
        timer: 2000,
      });
    }
  };

  useEffect(() => {
    if (formData.selectedFeature === "accept-credit-card") {
      setShowPayment(true);
    } else {
      setShowPayment(false);
    }
  }, [formData.selectedFeature]);

  const handleFeatureChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      selectedFeature: value,
    }));
  };

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (!stripe || !elements) {
        console.error("Stripe or Elements are not loaded.");
        setError("Stripe is not loaded. Please try again.");
        setLoading(false);
        return;
      }

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        console.error("CardElement is not initialized.");
        setError("Card information is not initialized.");
        setLoading(false);
        return;
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }

      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(
          db,
          "payments",
          `payment_${new Date().getTime()}`
        );
        const paymentData = {
          userId: user.uid,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          paymentMethodId: paymentMethod.id,
          amount: 10,
          status: "Processing",
          timestamp: new Date(),
        };

        await setDoc(userDocRef, paymentData);

        const paymentResponse = await fetch(
          "http://168.231.80.24:9002/api/charge",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: formData.name || "Unknown",
              userId: user.uid,
              productId: props._Id || "test_product_id", // Fallback for testing
              amount: 10,
              paymentStatus: "Processing",
              paymentMethodId: paymentMethod.id,
            }),
          }
        );

        const paymentResult = await paymentResponse.json();

        if (paymentResult.success) {
          setPaymentSuccess(true);
          // Check if getpaymentSuccess is a function before calling it
          if (typeof props.getpaymentSuccess === "function") {
            props.getpaymentSuccess(true);
          } else {
            console.warn(
              "getpaymentSuccess is not a function or not provided."
            );
          }
          await updateFeaturedAds();
          await updateDoc(userDocRef, { status: "Success" });
          setLoading(false);
          MySwal.fire({
            title: "Success!",
            text: "Payment processed successfully!",
            icon: "success",
            timer: 2000,
          });
        } else {
          setPaymentSuccess(false);
          setLoading(false);
          setError(paymentResult.error);
          await updateDoc(userDocRef, { status: "Failed" });
          MySwal.fire({
            title: "Error!",
            text: paymentResult.error || "Payment failed. Please try again.",
            icon: "error",
            timer: 2000,
          });
        }
      } else {
        setError("User is not authenticated.");

        setLoading(false);
        MySwal.fire({
          title: "Error!",
          text: "User is not authenticated.",
          icon: "error",
          timer: 2000,
        });
      }
    } catch (error) {
      console.error("Error during payment processing:", error);
      setError("An error occurred. Please try again.");
      setLoading(false);
      MySwal.fire({
        title: "Error!",
        text: "An error occurred during payment processing.",
        icon: "error",
        timer: 2000,
      });
    }
  };

  return (
    <div className="">
      <div className="mt-2">
        {/* <h3 className="text-lg font-medium text-gray-700 border-2 m-0 mb-3">
					Payment Information
				</h3> */}

        <form onSubmit={handlePaymentSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="card"
              className="block text-sm font-medium text-gray-600"
            >
              Card Information
            </label>
            <div className="mt-2">
              <CardElement
                id="card"
                className="mb-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 w-full"
              />
            </div>
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <button
            disabled={loading || paymentSuccess}
            type="submit"
            className={`blue_btn  ${
              loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? (
              <>
                <div className="animate-spin w-6 h-6 mx-auto border-t-4 border-white border-1 rounded-full bg-dark d-none"></div>
                <div
                  class="spinner-border"
                  style={{ width: "3rem", height: "3rem" }}
                  role="status"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
                <div
                  class="spinner-grow"
                  style={{ width: "3rem", height: "3rem" }}
                  role="status"
                >
                  <span class="visually-hidden">Loading...</span>
                </div>
              </>
            ) : (
              "Pay Now"
            )}
          </button>
        </form>

        {paymentSuccess && (
          <div className="mt-4 text-green-500 text-center border-1">
            <p>
              Great! Payment completed. You can now proceed to submit or feature
              your listing.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentForm;
