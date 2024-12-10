import React, { useState, useEffect } from 'react';
import './RefundPage.css';

const RefundPage = () => {
    const [paymentId, setPaymentId] = useState('');
    const [refundAmount, setRefundAmount] = useState('');
    const [message, setMessage] = useState('');
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        // Load transactions from local storage
        const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
        setTransactions(storedTransactions);
    }, []);

    const handleRefund = () => {
        if (!paymentId) {
            setMessage('Please enter a valid payment ID.');
            return;
        }

        // Find the transaction in the local storage
        const transaction = transactions.find((t) => t.id === paymentId);

        if (!transaction) {
            setMessage('Payment ID not found.');
            return;
        }

        const refundAmountCents = refundAmount ? parseInt(refundAmount, 10) * 100 : transaction.amount;

        if (refundAmountCents > transaction.amount) {
            setMessage('Refund amount exceeds the original transaction amount.');
            return;
        }

        // Update the transaction with the refunded amount
        const updatedTransactions = transactions.map((t) =>
            t.id === paymentId ? { ...t, refunded: refundAmountCents } : t
        );

        // Save the updated transactions to local storage
        localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
        setTransactions(updatedTransactions);

        setMessage(`Refund processed for Payment ID: ${paymentId}, Amount: $${(refundAmountCents / 100).toFixed(2)}`);
    };

    return (
        <div className="refund-container">
            <h1>Refund Payment</h1>
            <div className="refund-form">
                <label>Payment ID:</label>
                <input
                    type="text"
                    value={paymentId}
                    onChange={(e) => setPaymentId(e.target.value)}
                    placeholder="Enter Payment ID"
                />

                <label>Refund Amount (optional):</label>
                <input
                    type="number"
                    value={refundAmount}
                    onChange={(e) => setRefundAmount(e.target.value)}
                    placeholder="Enter amount (in dollars)"
                />

                <button onClick={handleRefund}>Process Refund</button>
                {message && <p className="refund-message">{message}</p>}
            </div>
            <div className="transaction-history">
                <h2>Transaction History</h2>
                {transactions.length > 0 ? (
                    <ul>
                        {transactions.map((t) => (
                            <li key={t.id}>
                                <p>Payment ID: {t.id}</p>
                                <p>Amount: ${t.amount / 100}</p>
                                <p>Refunded: ${t.refunded ? t.refunded / 100 : 0}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No transactions found.</p>
                )}
            </div>
        </div>
    );
};

export default RefundPage;
