import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import Cookies from 'js-cookie';
import { AppRoutes } from '@/constant/constant';
import toast from 'react-hot-toast';

const CheckoutForm = ({ template, planId, onSuccess, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    try {
      // 1. Create payment intent first
      const authToken = Cookies.get('authToken');
      const response = await axios.post(
        `${AppRoutes.createSubscription}`,
        {
          templateId: template._id,
          planId
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          }
        }
      );

      const { clientSecret } = response.data;

      // 2. Confirm payment with Stripe
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          }
        }
      );

      if (stripeError) {
        setError(stripeError.message);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        onSuccess();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Payment failed');
      console.error('Payment error:', err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <CardElement 
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <DialogFooter>
        <Button variant="outline" onClick={onClose} type="button">
          Cancel
        </Button>
        <Button type="submit" disabled={!stripe || processing}>
          {processing ? 'Processing...' : `Pay $${planId === 'monthly' ? '9.99' : '99.99'}`}
        </Button>
      </DialogFooter>
    </form>
  );
};

export function StripePaymentModal({ 
  isOpen, 
  onClose,
  template,
  planId
}) {
  const [stripePromise] = useState(() => 
    loadStripe("pk_test_51QcyA8CTrcueSOa0nezi9vg0AOjGcFBVsf6l18ruXvUKbOikIDZmSDM7bTLlqfjCxxmV47IE6kOoS6trN1intvxi00ZyNe5DPJsk_test_51QcyA8CTrcueSOa0H6Vw0wMP9wSNzBPd00uiaHZS9JgTAnlXJCYSRdwc1B8naFy7gPp1oUWad17n4mmsTMB11xuB00Jqf3qOOK")
  );

  const handleSuccess = () => {
    onClose();
    toast.success('Subscription created successfully!');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>
            {planId === 'monthly' ? 'Monthly' : 'Yearly'} Payment for {template?.name}
          </DialogTitle>
        </DialogHeader>
        {stripePromise && (
          <Elements stripe={stripePromise}>
            <CheckoutForm 
              template={template}
              planId={planId}
              onSuccess={handleSuccess}
              onClose={onClose}
            />
          </Elements>
        )}
      </DialogContent>
    </Dialog>
  );
}