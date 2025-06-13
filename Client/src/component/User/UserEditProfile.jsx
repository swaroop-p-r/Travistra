import React, { useEffect, useRef, useState, } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import UserNav from './UserNav';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';


export default function UserEditProfile() {

    const params = useParams();
    const id = params.id;
    // console.log('userId :', params.id);

    const [record, setRecord] = useState({});

    const [profileImage, setProfileImage] = useState(null);
    const [profilePrev, setProfilePrev] = useState(null);
    const [image, setImage] = useState(null);
    const [imagePrev, setImagePrev] = useState(null);
    const profileInputRef = useRef(null);
    const imageInputRef = useRef(null);

    const fetchUser = async () => {
        try {
            const res = await axios.get('http://localhost:4000/api/user/userprofilebyid',
                {
                    headers: {
                        id: id
                    }
                }
            )
            setRecord(res.data);
            // console.log(res.data);
            if (res.data.profile_image) {
                setProfilePrev(`http://localhost:4000/uploads/${res.data.profile_image}`);
            }
            if (res.data.image) {
                setImagePrev(`http://localhost:4000/uploads/${res.data.image}`);
            }

        } catch (err) {
            console.log('Error Updating', err)
            alert('Error Updating', err)
        }
    }

    useEffect(() => {
        fetchUser();
    }, [])


    const handleChange = (e) => {
        // setRecord({ ...record, [e.target.name]: e.target.value })
        const { name, value } = e.target;

        if (name === 'username') {
            const lettersOnly = /^[A-Za-z\s]*$/;
            if (!lettersOnly.test(value)) return;
        } else if (name === 'phone') {
            const numbersOnly = /^[0-9]{0,10}$/;
            if (!numbersOnly.test(value)) return;
        }

        setRecord((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleProfileImage = (e) => {
        const file = e.target.files[0]
        setProfileImage(file);
        if (file) {
            setProfilePrev(URL.createObjectURL(file));
        }
    }
    const handleRemoveProfileImage = () => {
        setProfileImage(null);
        setProfilePrev(null);
        if (profileInputRef.current) {
            profileInputRef.current.value = '';
        }

    }

    const handleImage = (e) => {
        const file = e.target.files[0]
        setImage(file);
        if (file) {
            setImagePrev(URL.createObjectURL(file));
        }
    }
    const handleRemoveImage = () => {
        setImage(null);
        setImagePrev(null);
        if (imageInputRef.current) {
            imageInputRef.current.value = '';
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('username', record.username);
        formData.append('address', record.address);
        formData.append('email', record.email);
        formData.append('password', record.password);
        formData.append('dob', record.dob);
        formData.append('phone', record.phone);
        formData.append('gender', record.gender);

        if (profileImage) {
            formData.append('profile_image', profileImage);
        }

        if (image) {
            formData.append('image', image); // Optional on edit, unless required
        }

        try {
            const res = await axios.put('http://localhost:4000/api/user/usereditprofile',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        id: id
                    },
                }
            )
            console.log(res.data);
            alert(res.data.msg);
            if (res.data.status === 200) {
                // Optional: Redirect or refresh
            }
        } catch (err) {
            console.log('Profile update failed', err)
            alert('Profile update failed');
        }
    };




    return (
        <>
            <UserNav />
            <Container className="mt-4 mb-5 bg-black" style={{borderRadius:8,paddingTop:10,height:'820px'}}>
                <div className="text-center mb-4">
                    <h2 className="fw-bold" style={{ color: 'white' }}>Profile Update</h2>
                    <p className="text-#3498db" style={{color:'silver'}}>Update your personal information</p>
                </div>
                <div >
                    <Form onSubmit={handleSubmit} className="p-4 rounded-3 shadow-sm" style={{ backgroundColor: '#f8f9fa' }}>
                        {/* Basic Info Section */}
                        <div className="mb-4">
                            <h5 className="mb-3 fw-semibold" style={{ color: '#3498db' }}>Basic Information</h5>
                            <Row className="g-3">
                                <Col xs={12} md={4}>
                                    <Form.Group controlId="formUsername">
                                        <Form.Label className="fw-medium">Username</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="username"
                                            placeholder="Enter name"
                                            onChange={handleChange}
                                            required
                                            pattern="[A-Za-z\s]+"
                                            title="Username must be letters"
                                            value={record.username || ''}
                                            className="py-2"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={4}>
                                    <Form.Group controlId="formPhone">
                                        <Form.Label className="fw-medium">Phone No</Form.Label>
                                        <Form.Control
                                            type="tel"
                                            name="phone"
                                            placeholder="Enter phone"
                                            onChange={handleChange}
                                            required
                                            pattern="[0-9]{10}"
                                            title="Phone number must be 10 digits"
                                            value={record.phone || ''}
                                            className="py-2"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={4}>
                                    <Form.Group controlId="dob">
                                        <Form.Label className="fw-medium">Date of Birth</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="dob"
                                            onChange={handleChange}
                                            required
                                            value={record.dob ? new Date(record.dob).toISOString().split('T')[0] : ''}
                                            className="py-2"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>

                        {/* Personal Details Section */}
                        <div className="mb-4">
                            <h5 className="mb-3 fw-semibold" style={{ color: '#3498db' }}>Personal Details</h5>
                            <Row className="g-3">
                                <Col xs={12} md={2}>
                                    <Form.Group>
                                        <Form.Label className="fw-medium d-block">Gender</Form.Label>
                                        <div className="d-flex flex-column gap-2">
                                            <Form.Check
                                                type="radio"
                                                label="Male"
                                                name="gender"
                                                value="male"
                                                onChange={handleChange}
                                                required
                                                checked={record.gender === "male"}
                                                className="fw-normal"
                                            />
                                            <Form.Check
                                                type="radio"
                                                label="Female"
                                                name="gender"
                                                value="female"
                                                onChange={handleChange}
                                                checked={record.gender === "female"}
                                                required
                                                className="fw-normal"
                                            />
                                            <Form.Check
                                                type="radio"
                                                label="Other"
                                                name="gender"
                                                value="other"
                                                onChange={handleChange}
                                                required
                                                checked={record.gender === "other"}
                                                className="fw-normal"
                                            />
                                        </div>
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={5}>
                                    <Form.Group controlId="formAddress">
                                        <Form.Label className="fw-medium">Address</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            name="address"
                                            placeholder="Enter your complete address"
                                            onChange={handleChange}
                                            required
                                            value={record.address || ''}
                                            className="py-2"
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={5}>
                                    <Form.Group controlId="formPassword">
                                        <Form.Label className="fw-medium">Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name="password"
                                            placeholder="Enter new password"
                                            value={record.password || ''}
                                            onChange={handleChange}
                                            required
                                            className="py-2"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>

                        {/* Images Section */}
                        <div className="mb-4">
                            <h5 className="mb-3 fw-semibold" style={{ color: '#3498db' }}>Upload Documents</h5>
                            <Row className="g-3">
                                <Col xs={12} md={6}>
                                    <Form.Group controlId="formProfileImage">
                                        <Form.Label className="fw-medium">Profile Image (Optional)</Form.Label>
                                        <Form.Control
                                            type="file"
                                            name="profile_image"
                                            onChange={handleProfileImage}
                                            ref={profileInputRef}
                                            accept="image/*"
                                            className="py-2"
                                        />
                                        {profilePrev && (
                                            <div className="mt-3 d-flex flex-column flex-md-row align-items-center gap-3">
                                                <Image
                                                    src={profilePrev}
                                                    alt="Profile Preview"
                                                    fluid
                                                    rounded
                                                    style={{
                                                        maxHeight: '125px',
                                                        objectFit: 'cover',
                                                        border: '1px solid #dee2e6'
                                                    }}
                                                />
                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                    onClick={handleRemoveProfileImage}
                                                    className="align-self-start align-self-md-center"
                                                >
                                                    <i className="bi bi-trash me-1"></i> Remove
                                                </Button>
                                            </div>
                                        )}
                                    </Form.Group>
                                </Col>

                                <Col xs={12} md={6}>
                                    <Form.Group controlId="formIDImage">
                                        <Form.Label className="fw-medium">ID Photo (Required)</Form.Label>
                                        <Form.Control
                                            type="file"
                                            name="image"
                                            onChange={handleImage}
                                            ref={imageInputRef}
                                            accept="image/*"
                                            className="py-2"
                                        />
                                        {imagePrev && (
                                            <div className="mt-3 d-flex flex-column flex-md-row align-items-center gap-3">
                                                <Image
                                                    src={imagePrev}
                                                    alt="ID Preview"
                                                    fluid
                                                    rounded
                                                    style={{
                                                        maxHeight: '125px',
                                                        objectFit: 'cover',
                                                        border: '1px solid #dee2e6'
                                                    }}
                                                />
                                                <Button
                                                    variant="outline-danger"
                                                    size="sm"
                                                    onClick={handleRemoveImage}
                                                    className="align-self-start align-self-md-center"
                                                >
                                                    <i className="bi bi-trash me-1"></i> Remove
                                                </Button>
                                            </div>
                                        )}
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>

                        {/* Submit Button */}
                        <div className="text-center mt-4">
                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                className="px-4 py-2 fw-medium"
                                style={{ backgroundColor: '#3498db', borderColor: '#3498db' }}
                            >
                                <i className="bi bi-save me-2"></i> Update Profile
                            </Button>
                        </div>
                    </Form>
                </div>
            </Container>
        </>
    )
}
