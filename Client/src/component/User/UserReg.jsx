import React, { useRef, useState, } from 'react';
import AXIOS from 'axios';
import HomeNav from '../Home/homeNav';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';

export default function UserReg() {

  const [record, setRecord] = useState({
    username: "",
    address: "",
    email: "",
    password: "",
    dob: '',
    phone: '',
    gender: '',
  });

  const [profileImage, setProfileImage] = useState(null);
  const [profilePrev, setProfilePrev] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePrev, setImagePrev] = useState(null);
  const profileInputRef = useRef(null);
  const imageInputRef = useRef(null);


  const handleChange = (e) => {
    setRecord({ ...record, [e.target.name]: e.target.value })
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

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(record)

    const formData = new FormData();
    formData.append('username', record.username);
    formData.append('address', record.address);
    formData.append('email', record.email);
    formData.append('password', record.password);
    formData.append('dob', record.dob);
    formData.append('phone', record.phone);
    formData.append('gender', record.gender);
    if (profileImage) {
      formData.append('profile_image', profileImage)
    }
    if (image) {
      formData.append('image', image);
    }

    AXIOS.post("http://localhost:4000/api/user/register", formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then((res) => {
        console.log(res.data)
        alert(res.data.msg)
        if (res.data.status === 200) {
          navigate('/login')
        }
      }).catch((err) => {
        console.log(err)
        alert("Registration failed");
      })
  }

  return (
    <>
      <HomeNav />
      <Container className="mt-4">
        <h2 className="text-center mb-4">Register</h2>
        <Form onSubmit={handleSubmit}>
          <hr />
          {/* Basic Info */}
          <Row className="mb-3">
            <Col xs={12} md={4}>
              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  placeholder="Enter name"
                  onChange={handleChange}
                  required
                  pattern="[A-Za-z\s]+"
                  title="Username must be letters"
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Form.Group controlId="formPhone">
                <Form.Label>Phone No</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  placeholder="Enter phone"
                  onChange={handleChange}
                  required
                  pattern="[0-9]{10}"
                  title="Phone number must be 10 digits"
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Form.Group controlId="dob">
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  name="dob"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          {/* Gender, Address, Email, Password */}
          <Row className="mb-3">
            <Col xs={9} md={1}>
              <Form.Group>
                <Form.Label>Gender</Form.Label>
                <div>
                  <Form.Check
                    type="radio"
                    label="Male"
                    name="gender"
                    value="male"
                    onChange={handleChange}
                    required
                  />
                  <Form.Check
                    type="radio"
                    label="Female"
                    name="gender"
                    value="female"
                    onChange={handleChange}
                  />
                  <Form.Check
                    type="radio"
                    label="Other"
                    name="gender"
                    value="other"
                    onChange={handleChange}
                  />
                </div>
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Form.Group controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="address"
                  placeholder="Enter address"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={4}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  onChange={handleChange}
                  required
                  pattern="[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$"
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={3}>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={record.password}
                  onChange={handleChange}
                  required
                  pattern="[A-Za-z0-9@]{6,}"
                  title='Password must have 6 digits'
                />
              </Form.Group>
            </Col>
          </Row>

          <hr />
          {/* Images */}
          <Row className="mb-3">
            <Col xs={12} md={6}>
              <Form.Group controlId="formProfileImage">
                <Form.Label>Profile Image (Optional)</Form.Label>
                <Form.Control
                  type="file"
                  name="profile_image"
                  onChange={handleProfileImage}
                  ref={profileInputRef}
                  accept="image/*"
                />
                {profilePrev && (
                  <div className="mt-2 d-flex flex-column flex-md-row align-items-center gap-2">
                    <Image
                      src={profilePrev}
                      alt="Profile Preview"
                      fluid
                      rounded
                      style={{ maxHeight: '125px', objectFit: 'contain' }}
                    />
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={handleRemoveProfileImage}
                    >
                      Remove
                    </Button>
                  </div>
                )}
              </Form.Group>
            </Col>

            <Col xs={12} md={6}>
              <Form.Group controlId="formIDImage">
                <Form.Label>ID Photo (Required)</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  onChange={handleImage}
                  ref={imageInputRef}
                  accept="image/*"
                  required
                />
                {imagePrev && (
                  <div className="mt-2 d-flex flex-column flex-md-row align-items-center gap-2">
                    <Image
                      src={imagePrev}
                      alt="ID Preview"
                      fluid
                      rounded
                      style={{ maxHeight: '125px', objectFit: 'contain' }}
                    />
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={handleRemoveImage}
                    >
                      Remove
                    </Button>
                  </div>
                )}
              </Form.Group>
            </Col>
          </Row>

          <div className="text-center mt-4">
            <hr />
            <Button type="submit" variant="primary">Register</Button>
          </div>

          <div className="text-center mt-3">
            <p>Already have an account? <a href="/login">Login here</a></p>
          </div>
        </Form>
      </Container>
    </>

  );
}