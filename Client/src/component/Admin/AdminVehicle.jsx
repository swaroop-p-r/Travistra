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
            const res = await AXIOS.post('http://localhost:4000/api/admin/adminvehicle',
                data,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            alert(res.data.msg);
            if (res.status === 200) {
                setFormData({
                    vehicle_name: '',
                    registration_no: '',
                    model: '',
                    type: '',
                    seat: ''
                });

                setImage(null);
                setPreview(null);

                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.msg) {
                alert(err.response.data.msg)
            }
            else {
                console.log("Error Adding Vehicle", err)
                alert("Error Adding Vehicle");
            }

        }
    };

    return (
        <>
            <AdminNav />
            <div style={{ maxWidth: '800px', margin: 'auto', padding: '20px', backgroundColor: 'black', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <h2 style={{ color: 'white', marginBottom: '25px', textAlign: 'center', fontWeight: '600' }}>Add New Vehicle</h2>

                <Form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '25px', borderRadius: '8px' }}>
                    <Row className="mb-4">
                        <Form.Group as={Col} md="6" controlId="vehicleName" className="mb-3">
                            <Form.Label style={{ fontWeight: '500' }}>Vehicle Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="vehicle_name"
                                placeholder="Enter vehicle name"
                                value={formData.vehicle_name}
                                onChange={handleChange}
                                required
                                style={{ padding: '10px', borderRadius: '5px' }}
                            />
                        </Form.Group>

                        <Form.Group as={Col} md="6" controlId="registrationNumber" className="mb-3">
                            <Form.Label style={{ fontWeight: '500' }}>Registration Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="registration_no"
                                value={formData.registration_no}
                                placeholder="Enter registration number"
                                onChange={handleChange}
                                required
                                style={{ padding: '10px', borderRadius: '5px' }}
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-4">
                        <Form.Group as={Col} md="6" controlId="vehicleModel" className="mb-3">
                            <Form.Label style={{ fontWeight: '500' }}>Vehicle Model</Form.Label>
                            <Form.Control
                                type="text"
                                name="model"
                                value={formData.model}
                                placeholder="Enter vehicle model"
                                onChange={handleChange}
                                required
                                style={{ padding: '10px', borderRadius: '5px' }}
                            />
                        </Form.Group>

                        <Form.Group as={Col} md="6" controlId="vehicleType" className="mb-3">
                            <Form.Label style={{ fontWeight: '500' }}>Vehicle Type</Form.Label>
                            <Form.Select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                required
                                style={{ padding: '10px', borderRadius: '5px', height: '42px' }}
                            >
                                <option value="" disabled>Select vehicle type</option>
                                <option value="Traveller">Tempo Traveller</option>
                                <option value="Bus">Bus</option>
                                <option value="Car">Car</option>
                                <option value="Suv">SUV</option>
                                <option value="Jeep">Jeep</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <Row className="mb-4">
                        <Form.Group as={Col} md="6" controlId="vehicleSeat" className="mb-3">
                            <Form.Label style={{ fontWeight: '500' }}>Seating Capacity</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter seat count"
                                name="seat"
                                value={formData.seat}
                                onChange={handleChange}
                                required
                                style={{ padding: '10px', borderRadius: '5px' }}
                            />
                        </Form.Group>

                        <Form.Group as={Col} md="6" controlId="vehicleImage" className="mb-3">
                            <Form.Label style={{ fontWeight: '500' }}>Vehicle Image</Form.Label>
                            <Form.Control
                                type="file"
                                required
                                name="image"
                                onChange={handleImage}
                                ref={fileInputRef}
                                style={{ padding: '5px', borderRadius: '5px' }}
                            />
                        </Form.Group>
                    </Row>

                    {preview && (
                        <Row className="mb-4">
                            <Col md={12} className="text-center">
                                <div >
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        style={{
                                            borderRadius: '8px',
                                            maxWidth: '100%',
                                            maxHeight: '150px',
                                            objectFit: 'cover',
                                            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                                        }}
                                    />
                                    <div className="mt-3">
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={handleRemoveImage}
                                            style={{ padding: '5px 15px', borderRadius: '20px' }}
                                        >
                                            Remove Image
                                        </Button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    )}

                    <div className="text-center mt-4">
                        <Button
                            type="submit"
                            style={{
                                backgroundColor: 'black',
                                borderColor: '#3498db',
                                padding: '8px 30px',
                                borderRadius: '20px',
                                fontWeight: '500'
                            }}
                        >
                            Add Vehicle
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    );
}
