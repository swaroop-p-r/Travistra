import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserNav from './UserNav';
import axios from 'axios';
import { Card, Table, Spinner, Image, Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
// import { jwtDecode } from 'jwt-decode';

export default function UserProfile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [currentImage, setCurrentImage] = useState('');
    const [modalTitle, setModalTitle] = useState('')

    const navigate=useNavigate();

    const fetchUser = async () => {
        const token = localStorage.getItem('token');
        // console.log('Token:', token);
        if (!token) {
            alert("No token found. Please log in.");
            setLoading(false);
            return;
        }
        try {
            const res = await axios.get('http://localhost:4000/api/user/userprofile', {
                headers: {
                    token: token
                    // token: decodedToken.id
                }
            });

            if (res.data.status === false) {
                alert(res.data.msg || "Unauthorized");
            } else {
                setUser(res.data);
            }
        } catch (err) {
            console.error('Fetch error:', err);
            alert("Failed to load user profile");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    const handleImageClick = (image, type) => {
        const imageUrl = `http://localhost:4000/uploads/${image}`;
        setCurrentImage(imageUrl);
        setModalTitle(type);
        setShowModal(true);
    };

    const handleEdit=async(id)=>{
        navigate(`/edituser/${id}`);
    }

    if (loading) {
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
            </div>
        );
    }

    if (!user) {
        return null; // Render nothing if user still null after loading
    }

    return (
        <>
            <UserNav />
            <Card className="mx-auto mt-5 shadow " style={{ width: '90%', maxWidth: '1200px' }}>
                <Card.Header className="text-center bg-black text-white d-flex align-items-center justify-content-between">
                    <div>
                        <h4 className="mb-0">{user.username.charAt(0).toUpperCase() + user.username.slice(1)}</h4>
                        <p className="mb-0">{user.role}</p>
                    </div>
                    <div>
                        <Button variant="outline-primary" onClick={()=>handleEdit(user._id)}>Edit Profile</Button>
                    </div>
                </Card.Header>
                <Card.Body>
                    <div className="d-flex bg-white flex-wrap align-items-center">
                        <Image
                            src={user.profile_image ? `http://localhost:4000/uploads/${user.profile_image}` : 'https://via.placeholder.com/120?text=No+Image'}
                            roundedCircle
                            width={120}
                            height={120}
                            alt="User"
                            className="mr-3 mb-3"
                            onClick={()=>handleImageClick(user.profile_image,'Profile Photo')}
                        />
                        <div style={{ padding: 10, minWidth: 200 }}>
                            <p className="mb-1">{user.email}</p>
                            <p className="mb-1">{user.phone}</p>
                        </div>

                        <div className="d-flex flex-column align-items-center ms-auto" style={{ minWidth: 130, marginLeft: 'auto' }}>
                            <div style={{ textAlign: 'right', width: '100%' }}>ID Photo</div>
                            <div style={{ padding: 10 }}>
                                {user.image ? (
                                    <Image
                                        src={`http://localhost:4000/uploads/${user.image}`}
                                        rounded
                                        width={120}
                                        height={120}
                                        alt="ID Photo"
                                        onClick={()=>handleImageClick(user.image,'ID Photo')}
                                    />
                                ) : (
                                    <span>No ID Photo</span>
                                )}
                            </div>
                        </div>
                    </div>
                    <hr />
                    <h5 style={{color:'white'}}>Individual Information</h5>
                    <Table striped bordered hover>
                        <tbody>
                            <tr><th>Gender</th><td>{user.gender}</td></tr>
                            <tr><th>Date of Birth</th><td>{new Date(user.dob).toLocaleDateString()}</td></tr>
                            <tr><th>Address</th><td>{user.address}</td></tr>
                            <tr><th>Status</th><td>{user.status ? "Active" : "Inactive"}</td></tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={() => setShowModal(false)} size='lg' centered>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    {currentImage ? (
                        <img
                            src={currentImage}
                            alt="Preview"
                            style={{
                                maxHeight: '300px',
                                width: '100%',
                                objectFit: 'contain',
                                borderRadius: '8px',
                            }}
                        />
                    ) : (
                        <p>No image available.</p>
                    )}
                </Modal.Body>
            </Modal>

        </>
    );
}
