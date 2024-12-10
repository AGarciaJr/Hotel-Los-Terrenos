import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const PUBLIC_KEY = 'pk_test_51QTVpLBe3gWPFy5sOMYdWqktgczbyXfzS5u9zDAHTSYiWtBF0rqLstSTvob5JmCWmqmGRt5ZloHWZRQzkWRgnMe800LK84IdcO';
const stripePromise = loadStripe(PUBLIC_KEY);

const StripeContainer = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
};

export default StripeContainer;
