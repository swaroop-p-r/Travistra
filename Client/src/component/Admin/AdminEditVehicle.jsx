import axios from 'axios';
import React, { use, useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import {
    Button,
    Image,
} from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function AdminEditVehicle({ show, onHide, vehicleData, onUpdated }) {

    const [formData, setFormData] = useState({
        vehicle_name: '',
        model: '',
        type: '',
        seat: '',
    });

    const [prevImage, setPrevImage] = useState('');
    const [newImage, setNewImage] = useState(null);

    useEffect(() => {
        if (vehicleData) {
            setFormData({
                vehicle_name: vehicleData.vehicle_name || '',
                model: vehicleData.model || '',
                type: vehicleData.type || '',
                seat: vehicleData.seat || '',
            });
            setPrevImage(`http://localhost:4000/uploads/${vehicleData.image}`)
        }
    }, [vehicleData])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setNewImage(file);
        if (file) {
            setPrevImage(URL.createObjectURL(file));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('vehicle_name', formData.vehicle_name);
        data.append('model', formData.model);
        data.append('type', formData.type);
        data.append('seat', formData.seat);
        if (newImage) {
            data.append('image', newImage);
        }


        try {
            const res = await axios.put('http://localhost:4000/api/admin/adminupdatevehicle',
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        vehicleid: vehicleData._id
                    }
                }
            )
            alert(res.data.msg);
            onHide();
            onUpdated();
        } catch (err) {
            if (err.response && err.response.data && err.response.data.msg) {
                alert(err.response.data.msg);
            }
            console.log('Something went wrong!', err);
            alert('Something went wrong');
        }

    }


    return (
        <>
            <Modal show={show} onHide={onHide} centered>
                <Form onSubmit={handleSubmit} encType="multipart/form-data">
                    <Modal.Header closeButton>
                        <Modal.Title>Update Vehicle</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Vehicle Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="vehicle_name"
                                        value={formData.vehicle_name}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Model</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="model"
                                        value={formData.model}
                                        onChange={handleChange}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Type</Form.Label>
                                    <Form.Select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="" disabled>Choose Type</option>
                                        <option value="Traveller">Traveller</option>
                                        <option value="Bus">Bus</option>
                                        <option value="Car">Car</option>
                                        <option value="Suv">Suv</option>
                                        <option value="Jeep">Jeep</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Seat</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="seat"
                                        value={formData.seat}
                                        onChange={handleChange}
                                        min={1}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Form.Group className="mb-3">
                            <Form.Label>Image</Form.Label>
                            {prevImage && (
                                <div className="mb-2">
                                    <Image
                                        src={prevImage}
                                        // thumbnail
                                        width={250}
                                        height={200}
                                        style={{ objectFit: 'fill' }}
                                    />
                                </div>
                            )}
                            <Form.Control
                                type="file"
                                name="image"
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                        </Form.Group>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={onHide}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="primary">
                            Update Vehicle
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}
