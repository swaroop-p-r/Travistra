import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Row, Col, Badge, Spinner } from 'react-bootstrap';
import AdminNav from './AdminNav';

export default function AdminViewPayment() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPayments = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/admin/adminviewpayments');
      if (res.data.status === 200) {
        setPayments(res.data.payment);
      } else {
        alert('Failed to load payments');
      }
    } catch (err) {
      console.error('Error fetching payments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <>
    <AdminNav/>
    <div className="container py-4">
      <h4 className="mb-4">All Payments</h4>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Row>
          {payments.length === 0 && <p>No payments found.</p>}
          {payments.map((payment) => (
            <Col key={payment._id} xs={12} md={6} lg={4} className="mb-4">
              <Card className="shadow-sm h-100">
                <Card.Body>
                  <Card.Title className="mb-2">
                    ₹ {payment.amount}
                    <Badge
                      bg={
                        payment.status === 'Completed'
                          ? 'success'
                          : payment.status === 'Failed'
                          ? 'danger'
                          : 'warning'
                      }
                      className="ms-2"
                    >
                      {payment.status}
                    </Badge>
                  </Card.Title>
                  <div className="mb-2">
                    <strong>Method:</strong> {payment.method}
                  </div>
                  <div className="mb-2">
                    <strong>Booking ID:</strong> {payment.booking?._id || 'N/A'}
                  </div>
                  <div className="mb-2">
                    <strong>User ID:</strong> {payment.user?._id || 'N/A'}
                  </div>
                  <div className="mb-2">
                    <strong>Paid At:</strong> {new Date(payment.paidAt).toLocaleString()}
                  </div>
                  {payment.method === 'UPI' && (
                    <div><strong>UPI ID:</strong> {payment.paymentDetails?.upiId || 'N/A'}</div>
                  )}
                  {payment.method === 'CARD' && (
                    <>
                      <div><strong>Card Number:</strong> {payment.paymentDetails?.cardNumber || 'N/A'}</div>
                      <div><strong>Expiry:</strong> {payment.paymentDetails?.expiry || 'N/A'}</div>
                    </>
                  )}
                  {payment.method === 'NETBANKING' && (
                    <div><strong>Bank:</strong> {payment.paymentDetails?.bankName || 'N/A'}</div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
    </>
  );
}
