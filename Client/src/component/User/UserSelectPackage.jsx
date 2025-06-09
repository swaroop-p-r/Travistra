import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import UserNav from './UserNav';

import { Container, Card, Row, Col, Image } from 'react-bootstrap';
import { Modal, Button, Table } from 'react-bootstrap';


export default function UserSelectPackage() {
    const { id } = useParams();
    // console.log(`ID:${id}`)
    const [pkg, setPkg] = useState(null);
    const [loading, setLoading] = useState(true);

    const [bookingDate, setBookingDate] = useState('');
    const [bookingTime, setBookingTime] = useState('');


    // const [showModal, setShowModal] = useState(false);
    // const [vehicles, setVehicles] = useState([]);

    const token = localStorage.getItem('token');
    // console.log(token)

    const navigate = useNavigate();


    const fetchPackage = async () => {
        try {
            const res = await axios.get('http://localhost:4000/api/user/userselectpackage',
                {
                    headers: {
                        id: id
                    }
                }
            )
            setPkg(res.data);
            setLoading(false);
        } catch (err) {
            console.error('Failed to fetch package:', err);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPackage()
    }, []);

    if (loading) {
        return (
            <>
                <UserNav />
                <div className="text-center mt-10 text-lg">Loading package details...</div>
            </>
        );
    }

    if (!pkg) {
        return (
            <>
                <UserNav />
                <div className="text-center mt-10 text-red-500 text-lg">Package not found.</div>
            </>
        );
    }

    const handleBooking = async (id) => {
        // console.log(id)
        if (pkg.status === 'Inactive') {
            alert('Package is Inactive\nContact Admin');
        } else {
            try {
                const res = await axios.post('http://localhost:4000/api/user/userbookpackage',
                    { bookingDate, bookingTime },
                    {
                        headers: {
                            token: token,
                            packageid: id,
                        }
                    });
                if (res.data.status === false) {
                    alert(res.data.msg);
                    navigate('/login')
                }
                else {
                    if (res.data.status === 200) {
                        alert(res.data.msg)
                        navigate('/userbooking');
                    } else if (res.data.status === 400) {
                        alert(res.data.msg);

                    } else {
                        alert('Booking Failed. Please try later...');
                    }
                }
            } catch (err) {
                console.log("Failed to Book:", err);
                alert("Error Booking Package");
            }
        }
    }

    return (
        <>
            <UserNav />
            <Container className="my-4">
                <Card className="shadow-lg rounded-4 overflow-hidden">
                    {/* Main Image */}
                    <Card.Img
                        variant="top"
                        src={`http://localhost:4000/uploads/${pkg.images[0]}`}
                        alt={pkg.package_name}
                        style={{ objectFit: 'cover', height: '350px' }}
                    />

                    <Card.Body>
                        <Card.Title className="text-center fs-2 fw-bold mb-4">
                            {pkg.package_name}
                        </Card.Title>

                        {/* Package Info */}
                        <Row className="mb-4 text-secondary">
                            <Col md={6}><strong>📍 Destination:</strong> {pkg.destination}</Col>
                            <Col md={6}><strong>🕒 Duration:</strong> {pkg.duration}</Col>
                            <Col md={6}><strong>👥 Seats:</strong> {pkg.seats}/{pkg.total_seats}</Col>
                            <Col md={6}><strong>💰 Price:</strong> ₹{pkg.price}</Col>
                            <Col md={6}>
                                <strong>📦 Status:</strong>{' '}
                                <span className={`fw-semibold ${pkg.status === 'Active' ? 'text-success' : 'text-danger'}`}>
                                    {pkg.status}
                                </span>
                            </Col>
                        </Row>

                        {/* Itinerary */}
                        <div className="mb-4">
                            <h5 className="fw-semibold mb-2">📅 Itinerary</h5>
                            <ul className="ps-3 text-muted">
                                {pkg.itinerary.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>

                        {/* More Images */}
                        {pkg.images.length > 1 && (
                            <div className="mt-5">
                                <h5 className="fw-semibold mb-3">📷 More Images</h5>
                                <div className="d-flex gap-3 overflow-auto pb-2">
                                    {pkg.images.slice(1).map((img, idx) => (
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
                        <hr />
                        <div className='d-flex flex-column align-items-center ' >For Booking </div>
                        <hr />
                        {/* Date & Time Picker */}
                        <div className="mt-4 mb-3 text-center">
                            <div className="d-flex flex-column align-items-center gap-3">
                                <div>
                                    <label className="me-2 fw-semibold">📅 Select Date:</label>
                                    <input
                                        type="date"
                                        value={bookingDate}
                                        onChange={(e) => setBookingDate(e.target.value)}
                                        className="form-control"
                                        style={{ width: "200px", display: 'inline-block' }}
                                    />
                                </div>
                                <div>
                                    <label className="me-2 fw-semibold">⏰ Select Time:</label>
                                    <input
                                        type="time"
                                        value={bookingTime}
                                        onChange={(e) => setBookingTime(e.target.value)}
                                        className="form-control"
                                        style={{ width: "200px", display: 'inline-block' }}
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Book Now Button */}
                        <div className="text-center mt-4">
                            <button
                                className="btn btn-primary px-4 py-2 fw-bold"
                                onClick={() => {
                                    const confirmBooking = window.confirm("Are you sure you want to book this package?");
                                    if (confirmBooking) {
                                        handleBooking(pkg._id);
                                    }
                                }}
                            >
                                🧾 Book Now
                            </button>
                        </div>

                    </Card.Body>
                </Card>
            </Container>
            {/* <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title>Available Vehicles</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {vehicles.length > 0 ? (
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Model</th>
                                    <th>Type</th>
                                    <th>Seats</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vehicles.map((v, index) => (
                                    <tr key={index}>
                                        <td>{v.vehicle_name}</td>
                                        <td>{v.model}</td>
                                        <td>{v.type}</td>
                                        <td>{v.seat}</td>
                                        <td className={v.status ? 'text-success' : 'text-danger'}>
                                            {v.status ? 'Available' : 'Unavailable'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <p className="text-muted">No vehicles available currently.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal> */}
        </>
    );

}
