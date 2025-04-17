"use client";

import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Cookies from "js-cookie";
import { AppRoutes } from "@/constant/constant";
import { toast } from "react-hot-toast";

export const StripePaymentForm = ({ onSuccess, onClose, product }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    try {
      // 1. Create payment intent on your server
      const user = Cookies.get("user");
      const userDetails = user ? JSON.parse(user) : null;
      const authToken = Cookies.get("authToken");

      const response = await axios.post(
        `${AppRoutes.payment}`,
        {
          productId: product._id,
          price: product.price,
          name: product.name
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const { clientSecret } = response.data;

      // 2. Confirm the payment with Stripe
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: userDetails?.name || "Customer",
          },
        },
      });

      if (error) {
        toast.error(error.message);
      } else if (paymentIntent.status === "succeeded") {
        // 3. Save subscription to your database
        await axios.post(
          `${AppRoutes.payment}`,
          {
            productId: product._id,
            paymentIntentId: paymentIntent.id,
            amount: paymentIntent.amount,
            status: paymentIntent.status
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        toast.success("Payment successful!");
        onSuccess();
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="border rounded-md p-4">
        <CardElement 
          options={{
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
          }}
        />
      </div>

      <div className="flex justify-end gap-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          disabled={!stripe || loading}
          className="bg-[#B5132C] hover:bg-[#9e1126]"
        >
          {loading ? "Processing..." : `Pay $${product?.price || "9.99"}`}
        </Button>
      </div>
    </form>
  );
};