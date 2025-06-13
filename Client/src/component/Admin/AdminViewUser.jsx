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

export default function AdminViewUser() {
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [currentImage, setCurrentImage] = useState('');
    const [modalTitle, setModalTitle] = useState('')

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
                alert(res.data.msg)
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
                alert(res.data.msg)
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


    return (
        <>
            <AdminNav />
            <div style={{ padding: 25 }}>
        <h1>User</h1>

        <div style={{
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
            <Table striped bordered hover style={{borderRadius:8}}>
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
                    {user.length > 0 ? (
                            user.map((item, index) => {
                                return (
                                    <tr key={item._id} >
                                        <td>{index + 1}</td>
                                        <td>
                                            <img src={`http://localhost:4000/uploads/${item.profile_image}`}
                                                alt="Profile photo"
                                                // className="img-thumbnail"
                                                style={{ width: "auto", maxHeight: '125px', objectFit: "cover", borderRadius: 8, alignContent: 'center' }}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = '/project_image/profile_error.png';
                                                    e.target.style.objectFit = 'contain';
                                                }}
                                                onClick={() => handleImageClick(item.profile_image, item.username, 'Profile Photo')}

                                            />
                                        </td>
                                        <td>{item.username}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.gender}</td>
                                        {/* <td>{item.dob}</td> */}
                                        <td>{new Date(item.dob).toLocaleDateString()}</td>
                                        <td>{item.email}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <img src={`http://localhost:4000/uploads/${item.image}`}
                                                alt="Profile photo"
                                                // className="img-thumbnail"
                                                style={{ width: "200px", height: "125px", objectFit: "cover", borderRadius: 8, alignContent: 'center' }}
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = '/project_image/profile_error.png';
                                                    e.target.style.objectFit = 'contain';
                                                }}
                                                onClick={() => handleImageClick(item.image, item.username, 'ID Image')}

                                            />
                                        </td>
                                        <td><Button style={{ width: 130 }} variant={item.status ? "success" : "warning"} onClick={() => adminToggleUserStatus(item._id)}>{item.status ? "Activated" : "Deactivated"}</Button></td>
                                        <td><Button variant="danger" onClick={() => deleteUser(item._id)}>Delete</Button></td>

                                    </tr>
                                )
                            })
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
