"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { StripePaymentForm } from "./StripePaymentForm";
import { useState } from "react";

const stripePromise = loadStripe("pk_test_51QcyA8CTrcueSOa0nezi9vg0AOjGcFBVsf6l18ruXvUKbOikIDZmSDM7bTLlqfjCxxmV47IE6kOoS6trN1intvxi00ZyNe5DPJ");

export function PaymentModal({ open, setOpen, product }) {
  const [success, setSuccess] = useState(false);

  const handleSuccess = () => {
    setSuccess(true);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle>Subscribe to {product?.name || "Premium Plan"}</DialogTitle>
          <DialogDescription>
            {success 
              ? 'Thank you for your subscription! You now have access to premium features.'
              : `Subscribe to our ${product?.name || "premium plan"} for $${product?.price || "9.99"}/month. Cancel anytime.`}
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="py-4 text-center">
            <svg
              className="mx-auto h-12 w-12 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="mt-2 text-lg font-medium text-gray-900">
              Subscription Successful!
            </p>
            <div className="mt-6">
              <Button onClick={() => setOpen(false)}>Close</Button>
            </div>
          </div>
        ) : (
          <Elements stripe={stripePromise}>
            <StripePaymentForm 
              product={product}
              onSuccess={handleSuccess} 
              onClose={() => setOpen(false)} 
            />
          </Elements>
        )}
      </DialogContent>
    </Dialog>
  );
}