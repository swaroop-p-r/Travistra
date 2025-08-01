import React, { useEffect, useState } from 'react';
import AdminNav from './AdminNav';
import axios from 'axios';
import {
    Container, Row, Col, Card, Button, Image, Modal, Form
} from 'react-bootstrap';
import Select from 'react-select';

export default function AdminViewBookings() {

    const API_BASE_URL = import.meta.env.VITE_API_URL;
    // console.log(API_BASE_URL);

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showPackageModal, setShowPackageModal] = useState(false);

    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [showVehicleModal, setShowVehicleModal] = useState(false);


    const [vehicles, setVehicles] = useState([]);  // All vehicles for assigning
    const [assignVehicleId, setAssignVehicleId] = useState(''); // Vehicle selected to assign
    const [isAssignMode, setIsAssignMode] = useState(false);


    // Fetch bookings and vehicles on mount

    const fetchData = async () => {
        try {
            const bookingRes = await axios.get(`${API_BASE_URL}/api/admin/adminviewbookings`);
            setBookings(bookingRes.data);
            // console.log("Bookings response:", bookingRes.data);

            const vehicleRes = await axios.get(`${API_BASE_URL}/api/admin/adminviewvehiclestoassign`);
            setVehicles(vehicleRes.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    // Format date helper
    const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString();

    // View package modal
    const handleViewPackage = (booking) => {
        setSelectedBooking(booking);
        setShowPackageModal(true);
    };

    const handleViewVehicle = (booking) => {
        if (booking.vehicle) {
            setSelectedVehicle(booking.vehicle);
            setSelectedBooking(null); // Ensure assign mode is off
            setIsAssignMode(false);
            setShowVehicleModal(true);
        } else {
            alert('No vehicle assigned to this booking');
        }
    };

    const handleAssignVehicle = (booking) => {
        setSelectedBooking(booking);
        setAssignVehicleId(booking.vehicle?._id || '');
        setSelectedVehicle(null); // Clear any previously viewed vehicle
        setIsAssignMode(true);
        setShowVehicleModal(true);
    };


    // Assign vehicle API call
    const assignVehicleToBooking = async (id) => {
        try {
            const res = await axios.put(`${API_BASE_URL}/api/admin/adminassignvehicle`, {}, {
                headers: {
                    id: id,
                    vehicleid: assignVehicleId,
                }
            });

            if (res.data.status === 200) {
                alert('Vehicle assigned successfully');

                // Directly update the booking in local state if needed
                const updatedBooking = res.data.booking;

                // Optional: update that booking in the bookings array if you're maintaining local state
                setBookings(prev =>
                    prev.map(b => b._id === updatedBooking._id ? updatedBooking : b)
                );

                setShowVehicleModal(false);
                setSelectedBooking(null);
                setAssignVehicleId('');

                // Optional: refetch if your data changes elsewhere
                await fetchData();
            } else {
                alert(res.data.msg || 'Assignment failed');
            }
        } catch (err) {
            console.error(err);
            alert('Failed to assign vehicle');
        }
    };



    const vehicleOptions = vehicles.map(vehicle => ({
        value: vehicle._id,
        label: (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={`${API_BASE_URL}/uploads/${vehicle.image}`} alt={vehicle.vehicle_name} style={{ width: 125, height: 70, marginRight: 10 }} />
                <span style={{ color: !vehicle.status ? 'red' : 'black' }}>{vehicle.vehicle_name} - {vehicle.registration_no} - {vehicle.model} ({vehicle.type}) [{vehicle.seat} seats] - {vehicle.status ? 'Active' : 'Inactive'}</span>
            </div>
        )
    }));
    const sortedVehicleOptions = vehicleOptions.sort((a, b) => {
        const requiredSeats = selectedBooking?.package?.seats || 0;
        const aScore = vehicles.find(v => v._id === a.value).seat < requiredSeats ? 1 : 0;
        const bScore = vehicles.find(v => v._id === b.value).seat < requiredSeats ? 1 : 0;
        return aScore - bScore || vehicles.find(v => v._id === a.value).seat - vehicles.find(v => v._id === b.value).seat;
    });

    const [selectedPayment, setSelectedPayment] = useState(null);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const handleViewPayment = async (bookingid) => {
        try {
            const res = await axios.get(`${API_BASE_URL}/api/admin/adminviewpaymentinbooking`,
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

    const handleCancel = async (bookingid) => {
        if (!window.confirm("Are you sure you want to cancel this booking?")) return;
        try {
            const res = await axios.patch(`${API_BASE_URL}/api/admin/admincancelbooking`, {}, {
                headers: { bookingid },
            });
            fetchData();
        } catch (err) {
            console.log("Cancellation failed", err);
            alert("Failed to cancel booking.");
        }
    };

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

            <AdminNav />
            <Container className="py-4" style={{ maxWidth: 1200 }}>
                <h2 className="mb-4">🧾 All Bookings</h2>

                {loading ? (
                    <Row>
                        {[1, 2, 3].map((idx) => (
                            <Col key={idx} xs={12} className="mb-4">
                                <Card>
                                    <div className="d-flex">
                                        <div
                                            style={{ width: 250, height: 180, backgroundColor: '#e0e0e0' }}
                                            className="placeholder-glow"
                                        />
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
                        {bookings.map((booking) => (
                            <Col key={booking._id} xs={12} className="mb-4">
                                <Card className={`shadow-sm mb-4 ${booking.status === 'Cancelled' || booking.status === 'Admin Cancelled' ? 'cancelled-card' : ''}`}>
                                    <div className="row g-0">
                                        {/* Image Section */}
                                        <div className="col-12 col-md-2">
                                            {booking.package?.poster? (
                                                <Image
                                                    src={`${API_BASE_URL}/uploads/${booking.package.poster}`}
                                                    alt={booking.package.package_name}
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover',
                                                        borderRadius: '6px 0 0 6px',
                                                        minHeight: '180px',
                                                    }}
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = 'https://via.placeholder.com/300x180?text=No+Image';
                                                    }}
                                                />
                                            ) : (
                                                <div
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        backgroundColor: '#f0f0f0',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        minHeight: 180,
                                                        borderRadius: '6px 0 0 6px',
                                                    }}
                                                >
                                                    <span className="text-muted">No image available</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Content Section */}
                                        <div className="col-12 col-md-8">
                                            <Card.Body className="d-flex flex-column h-100">
                                                <div className="mb-3">
                                                    <Card.Title className="mb-2">
                                                        {booking.user?.username} --- {booking.user?.email} <br />
                                                        {booking.package?.package_name || 'Unnamed Package'}
                                                    </Card.Title>

                                                    <div className="d-flex flex-wrap gap-3 mb-2">
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

                                                    {/* Button Actions */}
                                                    <div className="d-flex flex-wrap gap-2 mb-3">
                                                        <Button
                                                            variant="outline-primary"
                                                            size="sm"
                                                            onClick={() => handleViewPackage(booking)}
                                                            className="d-flex align-items-center"
                                                        >
                                                            <i className="bi bi-briefcase-fill me-1"></i> View Package
                                                        </Button>

                                                        <Button
                                                            variant="outline-primary"
                                                            size="sm"
                                                            onClick={() => handleViewVehicle(booking)}
                                                            className="d-flex align-items-center"
                                                            disabled={!booking.vehicle}
                                                        >
                                                            <i className="bi bi-truck-front-fill me-1"></i> View Vehicle
                                                        </Button>

                                                        <Button
                                                            variant={booking.vehicle ? 'outline-danger' : 'outline-success'}
                                                            size="sm"
                                                            onClick={() => handleAssignVehicle(booking)}
                                                            disabled={booking.status === 'Cancelled' || booking.status === 'Admin Cancelled'}
                                                        >
                                                            <i className="bi bi-pencil-square me-1"></i>
                                                            {booking.vehicle ? 'Edit Vehicle' : 'Assign Vehicle'}
                                                        </Button>

                                                        {booking.paymentStatus === 'Paid' && (
                                                            <Button
                                                                variant="outline-success"
                                                                size="sm"
                                                                onClick={() => handleViewPayment(booking._id)}
                                                            >
                                                                <i className="bi bi-credit-card me-1"></i> View Payment
                                                            </Button>
                                                        )}
                                                    </div>

                                                    {/* Status and Payment */}
                                                    <div className="d-flex flex-wrap align-items-center justify-between gap-3">
                                                        <div className="d-flex align-items-center">
                                                            <span className="me-2">Status:</span>
                                                            <span
                                                                className={`badge ${booking.status === 'Confirmed'
                                                                        ? 'bg-success'
                                                                        : booking.status === 'Cancelled'
                                                                            ? 'bg-danger'
                                                                            : 'bg-warning'
                                                                    }`}
                                                            >
                                                                {booking.status}
                                                            </span>
                                                        </div>

                                                        <div className="d-flex align-items-center">
                                                            <span className="me-2">Payment:</span>
                                                            <span
                                                                className={`badge ${booking.paymentStatus === 'Paid' ? 'bg-success' : 'bg-danger'
                                                                    }`}
                                                            >
                                                                {booking.paymentStatus}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Cancellation Info */}
                                                {(booking.status === 'Cancelled' || booking.status === 'Admin Cancelled') && (
                                                    <>
                                                        <hr />
                                                        <span style={{ color: 'red' }}>
                                                            This Booking is Cancelled By {booking.status === 'Cancelled' ? 'User' : 'Admin'}
                                                        </span>
                                                    </>
                                                )}

                                                {(booking.status === 'Confirmed' || booking.status === 'Processing') && (
                                                    <>
                                                        <hr />
                                                        <Button
                                                            variant="outline-danger"
                                                            size="sm"
                                                            onClick={() => handleCancel(booking._id)}
                                                        >
                                                            <i className="bi bi-x-circle me-1"></i> Cancel Booking
                                                        </Button>
                                                    </>
                                                )}
                                            </Card.Body>
                                        </div>
                                    </div>
                                </Card>

                            </Col>
                        ))}
                    </Row>
                )}
            </Container>


            {/* Package Details Modal */}
            {selectedBooking && (
                <Modal show={showPackageModal} onHide={() => setShowPackageModal(false)} size="lg" centered scrollable>
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedBooking.package.package_name} Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container className="my-2">
                            <Card className="shadow-lg rounded-4 overflow-hidden border-0">
                                <Card.Img
                                    variant="top"
                                    src={`${API_BASE_URL}/uploads/${selectedBooking.package.poster}`}
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
                                                {selectedBooking.package.images.map((img, idx) => (
                                                    <Image
                                                        key={idx}
                                                        src={`${API_BASE_URL}/uploads/${img}`}
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

            {/* Vehicle View / Assign Modal */}
            <Modal show={showVehicleModal} onHide={() => setShowVehicleModal(false)} size="md" centered>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedBooking ? 'Assign Vehicle' : 'Vehicle Details'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {isAssignMode ? (

                        <>
                            <Form.Group className="mb-3">
                                <Form.Label>Select Vehicle</Form.Label>
                                <Select
                                    options={sortedVehicleOptions}
                                    onChange={(selectedOption) => setAssignVehicleId(selectedOption.value)}
                                    placeholder="-- Select Vehicle --"
                                />
                            </Form.Group>

                            <Button
                                variant="primary"
                                onClick={() => assignVehicleToBooking(selectedBooking._id)}
                                disabled={!assignVehicleId}
                            >
                                {selectedBooking?.vehicle ? 'Edit Vehicle' : 'Assign Vehicle'}

                            </Button>

                        </>
                    ) : selectedVehicle ? (
                        <Container>
                            <Card className="shadow rounded-4 border-0 overflow-hidden">
                                <Card.Img
                                    variant="top"
                                    src={`${API_BASE_URL}/uploads/${selectedVehicle.image}`}
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
                    ) : (
                        <p>No vehicle details available.</p>
                    )}
                </Modal.Body>
            </Modal>

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
