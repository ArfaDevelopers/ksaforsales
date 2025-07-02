import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const PaymentForm = () => {
  const MySwal = withReactContent(Swal);
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState("");

  // Options for CardElement to customize its appearance
  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    console.log("Payment submission started...");

    try {
      if (!stripe || !elements) {
        setError("Stripe not initialized.");
        setLoading(false);
        return;
      }

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        setError("CardElement not found.");
        setLoading(false);
        return;
      }

      const { error: stripeError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
        });

      if (stripeError) {
        setError(stripeError.message);
        setLoading(false);
        // Do NOT reset cardElement on client-side validation errors (e.g., incomplete card number)
        // Only reset on actual payment attempt failures or after a successful transaction.
        return;
      }

      const response = await fetch(
        "http://168.231.80.24:9002/api/chargestripe",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentMethodId: paymentMethod.id }),
        }
      );

      const result = await response.json();

      if (result.success) {
        setPaymentSuccess(true);
        // Reset the CardElement only on success to clear out the card details
        cardElement.clear();

        MySwal.fire({
          title: "Success!",
          text: "Payment completed successfully.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        setPaymentSuccess(false);
        setError(result.error || "Payment failed.");
        // Consider resetting the CardElement on server-side failure as well
        // if you want to force the user to re-enter details.
        cardElement.clear();

        MySwal.fire({
          title: "Error!",
          text: result.error || "Payment failed. Please try again.",
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      console.error("Payment error:", err);
      setError("Something went wrong. Please try again.");
      // Reset the CardElement on unexpected errors
      const cardElement = elements.getElement(CardElement);
      if (cardElement) {
        cardElement.clear();
      }
      MySwal.fire({
        title: "Error!",
        text: "Unexpected error during payment.",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded-lg shadow-xl">
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        Complete Your Payment
      </h2>

      <form onSubmit={handlePaymentSubmit} className="space-y-6 mt-4">
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
              options={CARD_ELEMENT_OPTIONS} // Apply custom styles
              className="px-4 py-2 border rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 w-full"
            />
          </div>
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <button
          type="submit"
          disabled={loading || !stripe || !elements} // Disable if stripe or elements not ready
          className={`w-full py-2 mt-4 rounded-lg text-white font-semibold ${
            loading || !stripe || !elements
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {loading ? (
            <div className="animate-spin w-6 h-6 mx-auto border-t-4 border-white border-1 rounded-full" />
          ) : (
            "Pay Now"
          )}
        </button>

        {paymentSuccess && (
          <div className="mt-4 text-green-500 text-center">
            Payment Successful! Thank you.
          </div>
        )}
      </form>
    </div>
  );
};

export default PaymentForm;
