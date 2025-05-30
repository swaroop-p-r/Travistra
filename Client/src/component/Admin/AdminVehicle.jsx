import React, { useState, useRef } from 'react';
import AdminNav from './AdminNav';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import AXIOS from 'axios'

export default function AdminVehicle() {

    const [formData, setFormData] = useState({
        vehicle_name: '',
        registration_no: '',
        model: '',
        type: '',
        seat: '',
    })

    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null)



    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            setPreview(URL.createObjectURL(file));
        }

    }

    const handleRemoveImage = () => {
        setImage(null);
        setPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData()
        data.append('vehicle_name', formData.vehicle_name)
        data.append('registration_no', formData.registration_no)
        data.append('model', formData.model)
        data.append('type', formData.type)
        data.append('seat', formData.seat)
        data.append('image', image)

        try {
            const res=await AXIOS.post('http://localhost:4000/api/admin/adminvehicle',
                data,
                {
                headers:{'Content-Type':'multipart/form-data'}
            });
            alert(res.data.msg);
        } catch (err) {
            console.log("Error Adding Vehicle", err)
            alert("Error Adding Vehicle");
        }
    };

    return (
        <>
            <AdminNav />
            <div style={{ maxWidth: '600px', margin: 'auto' }}>
                <h2>Add Vehicle</h2>
                <Form noValidate onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group
                            as={Col}
                            md="4"
                            controlId="vehicleName"
                            className="position-relative"
                        >
                            <Form.Label>Vehicle Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="vehicle_name"
                                placeholder="Vehicle Name"
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="4"
                            controlId="registrationNumber"
                            className="position-relative"
                        >
                            <Form.Label>Registration Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="registration_no"
                                placeholder="Registration Number"
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group
                            as={Col}
                            md="4"
                            controlId="vehicleModel"
                            className="position-relative"
                        >
                            <Form.Label>Vehicle Model</Form.Label>
                            <Form.Control
                                type="text"
                                name="model"
                                placeholder="Vehicle Model"
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="vehicleType" className="position-relative zindex-fix">
                            <Form.Label>Type</Form.Label>
                            <Form.Select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>Select Vehicle Type</option>
                                <option value="Traveller">Tempo Traveller</option>
                                <option value="Bus">Bus</option>
                                <option value="Car">Car</option>
                                <option value="Suv">SUV</option>
                                <option value="Jeep">Jeep</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group
                            as={Col}
                            md="6"
                            controlId="vehicleSeat"
                            className="position-relative"
                        >
                            <Form.Label>Seat</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Seat"
                                name="seat"
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Row>
                    <Row className='mb-3'>
                        <Col md={12}>
                            <Form.Group controlId='vehicleImage' className="position-relative mb-3">
                                <Form.Label>Vehicle Image</Form.Label>
                                <Form.Control
                                    type="file"
                                    required
                                    name="image"
                                    onChange={handleImage}
                                    ref={fileInputRef}
                                />
                            </Form.Group>
                            {preview && (
                                <div className="mb-3 text-center">
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        style={{ borderRadius:8, width: '70%', maxHeight: '200px',objectFit:'contain' }}
                                    />
                                    <Button variant="danger" size="sm" className="mt-2" onClick={handleRemoveImage}>
                                        Remove Image
                                    </Button>
                                </div>
                            )}
                        </Col>
                    </Row>

                    <Button type="submit">Add Vehicle</Button>
                </Form>
            </div>
        </>
    );
}
