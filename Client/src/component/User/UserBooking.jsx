import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserNav from './UserNav';
import {
    Container,
    Row,
    Col,
    Card,
    Button,
    Spinner,
    Image,
} from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';



export default function UserBooking() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    const [showModal, setShowModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);

    const [showVehicleModal, setShowVehicleModal] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    const navigate = useNavigate();



    const fetchBookings = async () => {
        try {
            const res = await axios.get('http://localhost:4000/api/user/userbookings', {
                headers: { token },
            });
            setBookings(res.data);
        } catch (err) {
            console.error('Failed to fetch bookings:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleCancel = async (bookingid) => {
        if (!window.confirm("Are you sure you want to cancel this booking?")) return;
        try {
            const res = await axios.patch('http://localhost:4000/api/user/usercancelbooking', {}, {
                headers: { bookingid },
            });
            fetchBookings();
        } catch (err) {
            console.error("Cancellation failed", err);
            alert("Failed to cancel booking.");
        }
    };

    const handlePayNow = async (bookingId) => {
        navigate(`/userpayment/${bookingId}`)
    };

    const [selectedPayment, setSelectedPayment] = useState(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);


    const handleViewPayment = async (bookingid) => {
        try {
            const res = await axios.get('http://localhost:4000/api/user/userviewpayment',
                {
                    headers: {
                        bookingid,
                    }
                }
            )
            setSelectedPayment(res.data[0]);
            // console.log(selectedPayment)
            setShowPaymentModal(true);
        } catch (err) {
            console.log('Error fetching payment:', err);
            alert('Server error while fetching payment');
        }
    }

    // Function to format date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };


    const handleViewPackage = (bookingId) => {
        const booking = bookings.find(b => b._id === bookingId);
        if (booking) {
            setSelectedBooking(booking);
            setShowModal(true);
        }
    };

    // const handleViewVehicle = async (bookingId) => {
    //     const booking = bookings.find(b => b._id === bookingId);
    //     if (!booking || !booking.vehicle) {
    //         alert("No vehicle assigned for this booking.");
    //         return;
    //     }
    //     try {
    //         const res = await axios.get('http://localhost:4000/api/user/userviewassignedvehicle', {
    //             headers: { 
    //                 token,
    //                  vehicleid:booking.vehicle,
    //             },
    //         });
    //         setSelectedVehicle(res.data);
    //         setShowVehicleModal(true);
    //     } catch (err) {
    //         console.log("Failed to fetch vehicle details", err);
    //         alert("Unable to load vehicle information.");
    //     }
    // };

    const handleViewVehicle = (bookingId) => {
        const booking = bookings.find(b => b._id === bookingId);

        if (!booking || !booking.vehicle) {
            alert("No vehicle assigned for this booking.");
            return;
        }
        setSelectedVehicle(booking.vehicle);
        setShowVehicleModal(true);
    };

    const handleConfirm = async (id) => {
        try {
            const res = await axios.patch('http://localhost:4000/api/user/userconfirmpackage',
                {},
                {
                    headers: {
                        bookingid: id,
                        token: token,
                    }
                }
            )
            alert(res.data.msg)
            fetchBookings();
        } catch (err) {
            console.log('Error when Confirming', err)
            alert('Failed to confirm Booking')
        }
    }




    return (
        <>
            <style>
                {`
                    .cancelled-card {
                        opacity: 0.6;
                        transition: opacity 0.5s ease-in-out;
                    }

                    .cancelled-card:hover {
                        opacity: 0.8;
                    }
                `}
            </style>

            <UserNav />
            <Container className="py-4" style={{ maxWidth: 1200 }}>
                <h2 className="mb-4">🧾 My Bookings</h2>

                {loading ? (
                    <Row>
                        {[1, 2, 3].map((idx) => (
                            <Col key={idx} xs={12} className="mb-4">
                                <Card>
                                    <div className="d-flex">
                                        <div style={{ width: 250, height: 180, backgroundColor: '#e0e0e0' }} className="placeholder-glow" />
                                        <Card.Body>
                                            <div className="placeholder-glow">
                                                <span className="placeholder col-7 mb-2"></span>
                                                <span className="placeholder col-4"></span>
                                                <span className="placeholder col-6"></span>
                                                <span className="placeholder col-8"></span>
                                            </div>
                                        </Card.Body>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                ) : bookings.length === 0 ? (
                    <p className="text-muted">No bookings found.</p>
                ) : (
                    <Row>
                        {bookings.map((booking) => {
                            const isCancelled = booking.status === 'Cancelled' || booking.status === 'Admin Cancelled';

                            return (
                                <Col key={booking._id} xs={12} className="mb-4">
                                    <div title={isCancelled ? 'This Booking is Cancelled' : ''}>
                                        <Card className={`shadow-sm ${isCancelled ? 'cancelled-card' : ''}`}>
                                            <div className="d-flex">
                                                {/* Image Section */}
                                                <div style={{ width: 250, overflow: 'hidden', flexShrink: 0 }}>
                                                    {booking.package?.images?.[0] ? (
                                                        <Image
                                                            src={`http://localhost:4000/uploads/${booking.package.images[0]}`}
                                                            alt={booking.package.package_name}
                                                            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 6 }}
                                                            onError={(e) => {
                                                                e.target.onerror = null;
                                                                e.target.src = 'https://via.placeholder.com/300x180?text=No+Image';
                                                            }}
                                                        />
                                                    ) : (
                                                        <div style={{
                                                            width: '100%',
                                                            height: '100%',
                                                            backgroundColor: '#f0f0f0',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            minHeight: 180
                                                        }}>
                                                            <span className="text-muted">No image available</span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Body Section */}
                                                <Card.Body className="d-flex flex-column">
                                                    <div className="d-flex flex-column h-100">
                                                        <div>
                                                            <Card.Title className="mb-3">{booking.package?.package_name || 'Unnamed Package'}</Card.Title>

                                                            {/* Booking details */}
                                                            <div className="d-flex flex-wrap gap-4 mb-3">
                                                                <div className="d-flex align-items-center">
                                                                    <i className="bi bi-geo-alt me-2"></i>
                                                                    <span>{booking.package?.destination || 'Not specified'}</span>
                                                                </div>
                                                                <div className="d-flex align-items-center">
                                                                    <i className="bi bi-calendar me-2"></i>
                                                                    <span>{formatDate(booking.bookingDate)}</span>
                                                                </div>
                                                                <div className="d-flex align-items-center">
                                                                    <i className="bi bi-clock me-2"></i>
                                                                    <span>{booking.bookingTime || 'Not specified'}</span>
                                                                </div>
                                                            </div>

                                                            {/* Action buttons and status */}
                                                            <div className="d-flex flex-wrap align-items-center gap-3 mb-3">
                                                                <Button
                                                                    variant="outline-primary"
                                                                    size="sm"
                                                                    onClick={() => handleViewPackage(booking._id)}
                                                                    className="d-flex align-items-center"
                                                                    disabled={isCancelled}
                                                                >
                                                                    <i className="bi bi-briefcase-fill me-1"></i>View Package
                                                                </Button>
                                                                <Button
                                                                    variant="outline-primary"
                                                                    size="sm"
                                                                    onClick={() => handleViewVehicle(booking._id)}
                                                                    className="d-flex align-items-center"
                                                                    disabled={isCancelled}
                                                                >
                                                                    <i className="bi bi-bus-front me-1"></i> View Vehicle
                                                                </Button>

                                                                <div className="d-flex align-items-center ms-auto">
                                                                    <span className="me-2">Status:</span>
                                                                    <span className={`badge ${booking.status === 'Confirmed' ? 'bg-success' :
                                                                        booking.status === 'Cancelled' ? 'bg-danger' : 'bg-warning'}`}>
                                                                        {booking.status}
                                                                    </span>
                                                                </div>

                                                                <div className="d-flex align-items-center">
                                                                    <span className="me-2">Payment:</span>
                                                                    <span className={`badge ${booking.paymentStatus === 'Paid' ? 'bg-success' : 'bg-danger'}`}>
                                                                        {booking.paymentStatus}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Footer actions */}
                                                        <div className="mt-auto pt-2 border-top">
                                                            {booking.status !== 'Cancelled' && booking.status === 'Processing' && (
                                                                <Button
                                                                    variant="primary"
                                                                    size="sm"
                                                                    onClick={() => {
                                                                        if (window.confirm('After Confirming You Cannot Cancel Booking\nAre you sure you want to confirm this booking?')) {
                                                                            handleConfirm(booking._id);
                                                                        }
                                                                    }}
                                                                    className="me-2"
                                                                    disabled={isCancelled}
                                                                >
                                                                    <i className="bi bi-check2-circle me-1"></i> Confirm
                                                                </Button>
                                                            )}
                                                            {booking.paymentStatus === 'Paid' && (
                                                                <Button
                                                                    variant="success"
                                                                    size="sm"
                                                                    onClick={() => handleViewPayment(booking._id)}
                                                                    className="me-2"
                                                                    disabled={isCancelled}
                                                                >
                                                                    <i className="bi bi-credit-card me-1"></i> View Payment
                                                                </Button>
                                                            )}
                                                            {booking.status !== 'Cancelled' && booking.status === 'Confirm' && booking.paymentStatus === 'Pending' && (
                                                                <Button
                                                                    variant="success"
                                                                    size="sm"
                                                                    onClick={() => handlePayNow(booking._id)}
                                                                    className="me-2"
                                                                    disabled={isCancelled}
                                                                >
                                                                    <i className="bi bi-credit-card me-1"></i> Pay Now
                                                                </Button>
                                                            )}
                                                            {booking.status === 'Processing' && (
                                                                <Button
                                                                    variant="outline-danger"
                                                                    size="sm"
                                                                    onClick={() => handleCancel(booking._id)}
                                                                    disabled={isCancelled}
                                                                >
                                                                    <i className="bi bi-x-circle me-1"></i> Cancel Booking
                                                                </Button>
                                                            )}
                                                            {booking.status === 'Cancelled' && (
                                                                <i
                                                                    style={{ color: 'red' }}>
                                                                    This Booking is Cancelled By You.                                                          </i>
                                                            )}
                                                            {booking.status === 'Admin Cancelled' && (
                                                                <i
                                                                    style={{ color: 'red' }}>
                                                                    This Booking is Cancelled By Admin, <br />
                                                                    Contact Admin For More Details...                                                              </i>
                                                            )}
                                                        </div>
                                                    </div>
                                                </Card.Body>
                                            </div>
                                        </Card>
                                    </div>
                                </Col>
                            );
                        })}
                    </Row>

                )}
            </Container>


            {selectedBooking && (
                <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered scrollable>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedBooking.package.package_name} Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container className="my-2">
                            <Card className="shadow-lg rounded-4 overflow-hidden border-0">
                                <Card.Img
                                    variant="top"
                                    src={`http://localhost:4000/uploads/${selectedBooking.package.images[0]}`}
                                    alt={selectedBooking.package.package_name}
                                    style={{ objectFit: 'cover', height: '300px' }}
                                />
                                <Card.Body>
                                    <Card.Title className="text-center fs-3 fw-bold mb-4">
                                        {selectedBooking.package.package_name}
                                    </Card.Title>

                                    <Row className="mb-3 text-secondary">
                                        <Col md={6}><strong>📍 Destination:</strong> {selectedBooking.package.destination}</Col>
                                        <Col md={6}><strong>🕒 Duration:</strong> {selectedBooking.package.duration}</Col>
                                        <Col md={6}><strong>👥 Seats:</strong> {selectedBooking.package.seats}/{selectedBooking.package.total_seats}</Col>
                                        <Col md={6}><strong>💰 Price:</strong> ₹{selectedBooking.package.price}</Col>
                                        <Col md={6}>
                                            <strong>📦 Status:</strong>{' '}
                                            <span className={`fw-semibold ${selectedBooking.package.status === 'Active' ? 'text-success' : 'text-danger'}`}>
                                                {selectedBooking.package.status}
                                            </span>
                                        </Col>
                                    </Row>

                                    <div className="mb-3">
                                        <h5 className="fw-semibold mb-2">📅 Itinerary</h5>
                                        <ul className="ps-3 text-muted">
                                            {selectedBooking.package.itinerary.map((item, idx) => (
                                                <li key={idx}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    {selectedBooking.package.images.length > 1 && (
                                        <div className="mb-4">
                                            <h5 className="fw-semibold mb-3">📷 More Images</h5>
                                            <div className="d-flex gap-3 overflow-auto pb-2">
                                                {selectedBooking.package.images.slice(1).map((img, idx) => (
                                                    <Image
                                                        key={idx}
                                                        src={`http://localhost:4000/uploads/${img}`}
                                                        alt={`Image ${idx + 2}`}
                                                        height="200"
                                                        width="300"
                                                        rounded
                                                        style={{ objectFit: 'cover' }}
                                                        className="shadow-sm"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </Card.Body>
                            </Card>
                        </Container>
                    </Modal.Body>
                </Modal>
            )}

            {selectedVehicle && (
                <Modal show={showVehicleModal} onHide={() => setShowVehicleModal(false)} size="md" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>🚐 Vehicle Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Card className="shadow rounded-4 border-0 overflow-hidden">
                                <Card.Img
                                    variant="top"
                                    src={`http://localhost:4000/uploads/${selectedVehicle.image}`}
                                    alt={selectedVehicle.vehicle_name}
                                    style={{ objectFit: 'cover', height: '250px' }}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://via.placeholder.com/400x250?text=No+Image';
                                    }}
                                />
                                <Card.Body>
                                    <h4 className="fw-bold mb-3 text-center">{selectedVehicle.vehicle_name}</h4>
                                    <Row className="text-secondary">
                                        <Col md={6}><strong>🛠️ Model:</strong> {selectedVehicle.model}</Col>
                                        <Col md={6}><strong>🚗 Type:</strong> {selectedVehicle.type}</Col>
                                        <Col md={6}><strong>💺 Seat Capacity:</strong> {selectedVehicle.seat}</Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Container>
                    </Modal.Body>
                </Modal>
            )}


            {selectedPayment && (
                <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>💳 Payment Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedPayment ? (
                            <div>
                                <p><strong>Amount:</strong> ₹{selectedPayment.amount}</p>
                                <p><strong>Method:</strong> {selectedPayment.method}</p>
                                <p><strong>Status:</strong> {selectedPayment.status}</p>
                                <p><strong>Date:</strong> {new Date(selectedPayment.paidAt).toLocaleString()}</p>
                            </div>
                        ) : (
                            <p className="text-muted">No payment data available.</p>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowPaymentModal(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}


        </>
    );
}