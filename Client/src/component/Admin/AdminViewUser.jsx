import React from 'react'
import AXIOS from 'axios'
import AdminNav from './AdminNav'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useState } from 'react'
import { useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import {
    Spinner,
} from 'react-bootstrap';
import { Form } from 'react-bootstrap';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

export default function AdminViewUser() {
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [currentImage, setCurrentImage] = useState('');
    const [modalTitle, setModalTitle] = useState('')
    // search filter
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    //pagenation
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;


    const fetchUser = () => {
        // setLoading(true);
        AXIOS.get("http://localhost:4000/api/admin/viewusers")
            .then((res) => {
                setUser(res.data)
            }).catch((err) => {
                console.log(err)
            }).finally(() => {
                setLoading(false);
            })
    }

    useEffect(() => {
        fetchUser();
    }, [])

    const handleImageClick = (image, username, type) => {
        const imageUrl = `http://localhost:4000/uploads/${image}`;
        setCurrentImage(imageUrl);
        setModalTitle(`${username} - ${type}`);
        setShowModal(true);
    };

    const adminToggleUserStatus = (id) => {
        // console.log("For status:",id)
        AXIOS.patch("http://localhost:4000/api/admin/userstatus",
            {},// 2nd parameter for  body 
            {
                headers: { userid: id }
            })
            .then((res) => {
                toast.success(res.data.msg);
                fetchUser()
            }).catch((err) => {
                console.log("frontend catch", err)
            })
    }

    const deleteUser = (id) => {
        // console.log("deleteduserid:", id)
        if (!window.confirm('Are sure you want to delete this User?')) return;
        AXIOS.delete("http://localhost:4000/api/admin/deleteuser", { headers: { userid: id } })
            .then((res) => {
                toast.success("User Deleted Sccessfully");
                fetchUser()
            }).catch((err) => {
                console.log(err)
            })
    }

    if (loading) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" role="status" />
                <p className="mt-2">Loading Users...</p>
            </div>
        );
    }



    const filterUsers = user.filter((item) => {
        const matchesSearch =
            item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.phone.toString().includes(searchTerm) ||
            item.email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === '' ||
            (statusFilter === 'active' && item.status === true) ||
            (statusFilter === 'deactive' && item.status === false);

        return matchesSearch && matchesStatus;
    });

    // Pagination
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filterUsers.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(filterUsers.length / usersPerPage);


    return (
        <>
            <AdminNav />
            <ToastContainer
                position="top-right"
                autoClose={2000}
                style={{
                    top: '80px',
                    right: '30px',
                    zIndex: 9999
                }}
            />
            <div style={{ padding: 25 }}>
                <h1>User</h1>

                {/* Search Filter */}
                <Form.Group className="mb-3" controlId="search">
                    <div className="d-flex align-items-center gap-2 flex-wrap">
                        <Form.Control
                            type="text"
                            placeholder="Search by Username, Phone, or Email"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ maxWidth: '20rem' }}
                        />
                        <Button
                            variant="outline-success"
                            onClick={() => setStatusFilter('active')}
                            active={statusFilter === 'active'}
                        >
                            Active
                        </Button>
                        <Button
                            variant="outline-danger"
                            onClick={() => setStatusFilter('deactive')}
                            active={statusFilter === 'deactive'}
                        >
                            Deactive
                        </Button>
                        <Button
                            variant="outline-secondary"
                            onClick={() => setStatusFilter('')}
                            active={statusFilter === ''}
                        >
                            All
                        </Button>
                    </div>
                </Form.Group>

                <div
                    style={{
                        borderRadius: 20,
                        overflow: 'hidden',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    }}
                >
                    {/* 👇 Responsive scroll wrapper */}
                    <div style={{ overflowX: 'auto' }}>
                        <Table striped bordered hover responsive style={{ minWidth: 1000 }}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Profile Photo</th>
                                    <th>Username</th>
                                    <th>Phone No</th>
                                    <th>Gender</th>
                                    <th>DOB</th>
                                    <th>Email</th>
                                    <th>Address</th>
                                    <th>ID Card</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-center align-middle">
                                {currentUsers.length > 0 ? (
                                    currentUsers.map((item, index) => (
                                        <tr key={item._id}>
                                            <td>{indexOfFirstUser + index + 1}</td>
                                            <td>
                                                <img
                                                    src={`http://localhost:4000/uploads/${item.profile_image}`}
                                                    alt="Profile"
                                                    style={{
                                                        width: 'auto',
                                                        maxHeight: '125px',
                                                        objectFit: 'cover',
                                                        borderRadius: 8,
                                                    }}
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = '/project_image/profile_error.png';
                                                        e.target.style.objectFit = 'contain';
                                                    }}
                                                    onClick={() =>
                                                        handleImageClick(item.profile_image, item.username, 'Profile Photo')
                                                    }
                                                />
                                            </td>
                                            <td>{item.username}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.gender}</td>
                                            <td>{new Date(item.dob).toLocaleDateString()}</td>
                                            <td>{item.email}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <img
                                                    src={`http://localhost:4000/uploads/${item.image}`}
                                                    alt="ID"
                                                    style={{
                                                        width: '200px',
                                                        height: '125px',
                                                        objectFit: 'cover',
                                                        borderRadius: 8,
                                                    }}
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = '/project_image/profile_error.png';
                                                        e.target.style.objectFit = 'contain';
                                                    }}
                                                    onClick={() =>
                                                        handleImageClick(item.image, item.username, 'ID Image')
                                                    }
                                                />
                                            </td>
                                            <td>
                                                <Button
                                                    style={{ width: 130 }}
                                                    variant={item.status ? 'success' : 'warning'}
                                                    onClick={() => adminToggleUserStatus(item._id)}
                                                >
                                                    {item.status ? 'Activated' : 'Deactivated'}
                                                </Button>
                                            </td>
                                            <td>
                                                <Button variant="danger" onClick={() => deleteUser(item._id)}>
                                                    Delete
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="11" className="text-center text-muted py-4">
                                            No User found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>

                    {/* pagenation */}
                    <div className="d-flex justify-content-center align-items-center mt-3 gap-2 flex-wrap">
                        <Button
                            variant="secondary"
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </Button>

                        {[...Array(totalPages)].map((_, idx) => (
                            <Button
                                key={idx}
                                variant={currentPage === idx + 1 ? 'primary' : 'outline-primary'}
                                onClick={() => setCurrentPage(idx + 1)}
                            >
                                {idx + 1}
                            </Button>
                        ))}

                        <Button
                            variant="secondary"
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </Button>
                    </div>

                </div>
            </div>


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
    )
}
