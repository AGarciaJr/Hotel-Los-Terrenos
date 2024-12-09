import React, { useState } from 'react';
import {
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import './CheckoutForm.css';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [cardLabel, setCardLabel] = useState('');
    const [zipCode, setZipCode] = useState('');

    const handleCardNumberChange = (event) => {
        if (event.brand) {
            setCardLabel(event.brand.charAt(0).toUpperCase() + event.brand.slice(1));
        } else {
            setCardLabel('');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        setIsProcessing(true);

        try {
            const cardNumberElement = elements.getElement(CardNumberElement);

            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardNumberElement,
                billing_details: {
                    address: {
                        postal_code: zipCode,
                    },
                },
            });

            if (error) {
                setErrorMessage(error.message);
            } else {
                setPaymentSuccess(true);
                setErrorMessage('');
            }
        } catch (error) {
            setErrorMessage('An unexpected error occurred.');
        }

        setIsProcessing(false);
    };

    const orderItems = [
        { name: "Private Dance", price: 400 },
        { name: "CBD", price: 69.60 },
    ];

    const shipping = 100.0;
    const taxes = 25.0;
    const total = orderItems.reduce((sum, item) => sum + item.price, 0) + shipping + taxes;

    return (
        <div className="checkout-container">
            {/* Payment Options */}
            <div className="payment-section">
                <h1>Secure Checkout</h1>
                <div className="express-checkout-buttons">
                    <button className="express-button apple-pay">
                        <img src={`${process.env.PUBLIC_URL}/apple-pay-logo.png`}/>
                    </button>
                    <button className="express-button google-pay">
                        <img src={`${process.env.PUBLIC_URL}/google-pay-logo.png`}/>
                    </button>
                </div>
                <h2>Card Payment</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Card Number</label>
                        <div className="card-input-with-label">
                            <CardNumberElement
                                className="card-element"
                                options={{
                                    style: {
                                        base: {
                                            fontSize: '16px',
                                            color: '#333',
                                            '::placeholder': {
                                                color: '#888',
                                            },
                                        },
                                    },
                                }}
                                onChange={handleCardNumberChange}
                            />
                            {cardLabel && <span className="card-label">{cardLabel}</span>}
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Expiration Date</label>
                        <CardExpiryElement className="card-element" />
                    </div>
                    <div className="form-group">
                        <label>CVV</label>
                        <CardCvcElement className="card-element" />
                    </div>
                    <div className="form-group">
                        <label>ZIP Code</label>
                        <input
                            type="text"
                            className="zip-code-input"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value)}
                            placeholder="12345"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={!stripe || isProcessing}
                        className="submit-button"
                    >
                        {isProcessing ? 'Processing...' : 'Pay Now'}
                    </button>
                </form>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {paymentSuccess && <p className="success-message">Payment Successful!</p>}
            </div>

            {/* Order Summary */}
            <div className="order-summary">
                <h2>Order Summary</h2>
                {orderItems.map((item, index) => (
                    <div key={index} className="summary-item">
                        <p>{item.name}</p>
                        <span>${item.price.toFixed(2)}</span>
                    </div>
                ))}
                <hr />
                <div className="summary-item">
                    <p>Shipping</p>
                    <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="summary-item">
                    <p>Taxes</p>
                    <span>${taxes.toFixed(2)}</span>
                </div>
                <hr />
                <div className="summary-total">
                    <p>Total</p>
                    <span>${total.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};

export default CheckoutForm;