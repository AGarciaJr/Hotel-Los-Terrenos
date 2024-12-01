import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreditCard, Lock } from 'lucide-react';

const PaymentPage = ({ roomDetails, totalPrice }) => {
    const [paymentMethod, setPaymentMethod] = useState('credit');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryMonth, setExpiryMonth] = useState('');
    const [expiryYear, setExpiryYear] = useState('');
    const [cvv, setCvv] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically integrate with a payment processing service
        console.log('Payment submitted', {
            roomDetails,
            totalPrice,
            paymentMethod,
            cardDetails: {
                cardNumber,
                expiryMonth,
                expiryYear,
                cvv,
                name
            }
        });
        // NEED TO tie to payment process in backend
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>Complete Your Booking</span>
                        <CreditCard className="text-primary" size={32} />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {/* Booking Summary */}
                    <div className="mb-6 p-4 bg-gray-100 rounded-lg">
                        <h3 className="text-lg font-semibold mb-2">Booking Details</h3>
                        <p>Room: {roomDetails?.name || 'Selected Room'}</p>
                        <p>Total Price: ${totalPrice?.toFixed(2) || 'Calculating...'}</p>
                    </div>

                    {/* Payment Method Selection */}
                    <div className="mb-4">
                        <Label>Payment Method</Label>
                        <Select
                            value={paymentMethod}
                            onValueChange={setPaymentMethod}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Payment Method" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="credit">Credit Card</SelectItem>
                                <SelectItem value="debit">Debit Card</SelectItem>
                                <SelectItem value="paypal">PayPal</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Payment Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label>Cardholder Name</Label>
                            <Input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="John Doe"
                                required
                            />
                        </div>

                        <div>
                            <Label>Card Number</Label>
                            <Input
                                type="text"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                placeholder="1234 5678 9012 3456"
                                maxLength={19}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <Label>Expiry Month</Label>
                                <Select
                                    value={expiryMonth}
                                    onValueChange={setExpiryMonth}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="MM" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {[...Array(12)].map((_, i) => (
                                            <SelectItem
                                                key={i + 1}
                                                value={(i + 1).toString().padStart(2, '0')}
                                            >
                                                {(i + 1).toString().padStart(2, '0')}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label>Expiry Year</Label>
                                <Select
                                    value={expiryYear}
                                    onValueChange={setExpiryYear}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="YYYY" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {[...Array(10)].map((_, i) => {
                                            const year = new Date().getFullYear() + i;
                                            return (
                                                <SelectItem key={year} value={year.toString()}>
                                                    {year}
                                                </SelectItem>
                                            );
                                        })}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label>CVV</Label>
                                <Input
                                    type="text"
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value)}
                                    placeholder="123"
                                    maxLength={4}
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center text-sm text-gray-500 mt-4">
                            <Lock className="mr-2" size={16} />
                            Secure payment with 256-bit encryption
                        </div>

                        <Button
                            type="submit"
                            className="w-full mt-6"
                            disabled={!name || !cardNumber || !expiryMonth || !expiryYear || !cvv}
                        >
                            Pay Now
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default PaymentPage;