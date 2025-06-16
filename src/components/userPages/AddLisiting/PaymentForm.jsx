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
    const carId = props._Id; // The ID of the car document you want to update
    const carDocRef = doc(db, props.collectionName1, carId); // Reference to the specific document in the Cars collection

    try {
      // Step 1: Get the current document
      const docSnap = await getDoc(carDocRef);

      // Step 2: Check if the document exists
      if (docSnap.exists()) {
        const carData = docSnap.data();
        const featuredAdsValue = carData.FeaturedAds;

        // Step 3: If the FeaturedAds field is "Not Featured Ads", update it
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
            text: "This ads is already set to Featured Ads",
            icon: "error",
            timer: 1000,
          });
          console.log(
            "FeaturedAds is already set to Featured Ads or doesn't need updating."
          );
        }
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error updating FeaturedAds:", error);
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
    const carId = props._Id; // The ID of the car document you want to update
    const carDocRef = doc(db, props.collectionName1, carId);
    const docSnap = await getDoc(carDocRef);

    // Step 2: Check if the document exists
    if (docSnap.exists()) {
      const carData = docSnap.data();
      const featuredAdsValue = carData.FeaturedAds;

      // Step 3: If the FeaturedAds field is "Not Featured Ads", update it
      if (featuredAdsValue === "Featured Ads") {
        MySwal.fire({
          title: "Notice",
          text: "This advertisement is already marked as Featured Ads.",
          icon: "info",
          timer: 2000,
        });

        return;
      }
    }
    setLoading(true);

    if (!stripe || !elements) {
      console.error("Stripe or Elements are not loaded.");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      console.error("CardElement is not initialized.");
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

    try {
      const user = auth.currentUser;
      if (user) {
        // Create a custom document reference
        const userDocRef = doc(
          db,
          "payments",
          `payment_${new Date().getTime()}`
        ); // or use any unique ID logic

        const paymentData = {
          userId: user.uid,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          paymentMethodId: paymentMethod.id,
          amount: 10, // example amount in cents ($10)
          status: "Processing",
          timestamp: new Date(),
        };

        await setDoc(userDocRef, paymentData); // Use setDoc to write data to this specific document

        const paymentResponse = await fetch(
          "http://168.231.80.24:9002/api/charge",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: formData.name || "Unknown",
              userId: user.uid,
              productId: props._Id,
              amount: 10, // must be a number, in USD (your backend multiplies it by 100)
              paymentStatus: "Processing",
              paymentMethodId: paymentMethod.id,
            }),
          }
        );

        const paymentResult = await paymentResponse.json();

        if (paymentResult.success) {
          setPaymentSuccess(true);
          props.getpaymentSuccess(true);
          updateFeaturedAds();

          // After success, update the status of the payment document
          await updateDoc(userDocRef, { status: "Success" });
        } else {
          setPaymentSuccess(false);
          setError(paymentResult.error);
          await updateDoc(userDocRef, { status: "Failed" });
        }
      }
    } catch (error) {
      console.error("Error during payment processing:", error);
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded-lg shadow-xl">
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        Complete Your Payment
      </h2>

      <div className="mt-4">
        <h3 className="text-lg font-medium text-gray-700  border-2">
          Payment Information
        </h3>

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
                className="px-4 py-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 w-full"
              />
            </div>
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 mt-4 rounded-lg text-white font-semibold bg-dark ${
              loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? (
              <div className="animate-spin w-6 h-6 mx-auto border-t-4 border-white border-1 rounded-full  bg-dark"></div>
            ) : (
              "Pay Now"
            )}
          </button>
        </form>

        {paymentSuccess && (
          <div className="mt-4 text-green-500 text-center border-1">
            <p>Payment Successful! Thank you for your order.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentForm;
