import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, message } from 'antd';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      message.error(error.message);
    } else {
      // Send paymentMethod.id to your server (see backend section)
      const response = await fetch('/api/create-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentMethodId: paymentMethod.id }),
      });

      const subscription = await response.json();

      if (subscription.error) {
        message.error(subscription.error);
      } else {
        message.success('Subscription successful!');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <Button type="primary" htmlType="submit" disabled={!stripe}>
        Subscribe
      </Button>
    </form>
  );
};

export default CheckoutForm;
