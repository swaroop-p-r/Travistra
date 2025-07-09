import React, { useState, useEffect } from 'react'
import { Modal, Button, Form, Row, Col, Image } from 'react-bootstrap'
import axios from 'axios'

export default function EditPackageModal({ show, onHide, packageData, onUpdated }) {
    const [formData, setFormData] = useState({
        package_name: '',
        destination: '',
        duration: '',
        price: '',
        seats: '',
        total_seats: '',
    })

    const [itinerary, setItinerary] = useState([''])
    const [existingImages, setExistingImages] = useState([])
    const [newImages, setNewImages] = useState([])

    useEffect(() => {
        if (packageData) {
            setFormData({
                package_name: packageData.package_name || '',
                destination: packageData.destination || '',
                duration: packageData.duration || '',
                price: packageData.price || '',
                seats: packageData.seats || '',
                total_seats: packageData.total_seats || '',
            })
            setItinerary(packageData.itinerary || [''])
            setExistingImages(packageData.images || [])

            setNewImages([])

        }
    }, [packageData])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleItineraryChange = (index, value) => {
        const updated = [...itinerary]
        updated[index] = value
        setItinerary(updated)
    }

    const handleAddItinerary = () => {
        setItinerary([...itinerary, ''])
    }

    const handleRemoveItinerary = (index) => {
        const updated = itinerary.filter((_, i) => i !== index)
        setItinerary(updated)
    }


    const handleImage = (e) => {
        const selectedFiles = Array.from(e.target.files)
        const sortedFiles = selectedFiles.sort((a, b) => a.lastModified - b.lastModified)
        setNewImages((prev) => [...prev, ...sortedFiles])
        e.target.value = null

    }

    const handleSubmit = async () => {
        const data = new FormData()
        for (let key in formData) {
            data.append(key, formData[key])
        }

        itinerary.forEach((point) => {

            data.append('itinerary', point.trim())
        })

        newImages.forEach((file) => {
            data.append('images', file)
        })


        try {
            const res = await axios.patch('http://localhost:4000/api/admin/updatepackage', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    userid: packageData._id,
                },
            })
            if (res.data.status === 200) {
                alert('Package updated successfully')
                onHide()
                onUpdated()
            } else {
                alert(res.data.msg)
            }
        } catch (err) {
            console.error(err)
            alert('Server error')
        }
    }

    return (
        <Modal show={show} onHide={onHide} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Edit Package</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {['package_name', 'destination', 'duration', 'price', 'seats', 'total_seats'].map(field => (
                        <Form.Group key={field} className="mb-3">
                            <Form.Label>{field.replace('_', ' ').toUpperCase()}</Form.Label>
                            <Form.Control
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                            />
                        </Form.Group>
                    ))}

                    <Form.Group className="mb-3">
                        <Form.Label>Itinerary</Form.Label>
                        {itinerary.map((point, i) => (
                            <Row key={i} className="mb-2">
                                <Col xs={10}>
                                    <Form.Control
                                        type="text"

                                        value={point}


                                        onChange={e => handleItineraryChange(i, e.target.value)}
                                    />
                                </Col>
                                <Col xs={2}>
                                    {itinerary.length > 1 && (
                                        <Button variant="danger" size="sm" onClick={() => handleRemoveItinerary(i)}>
                                            X
                                        </Button>
                                    )}
                                </Col>
                            </Row>
                        ))}
                        <Button size="sm" variant="secondary" onClick={handleAddItinerary}>
                            + Add Point
                        </Button>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Existing Images</Form.Label>
                        <div className="d-flex flex-wrap gap-2">
                            {existingImages.map((img, i) => (
                                <Image
                                    key={i}
                                    src={`http://localhost:4000/uploads/${img}`}
                                    thumbnail

                                    alt={`package-img-${i}`}
                                    style={{ borderRadius: 8, width: '100px', height: '100px', objectFit: 'cover' }}
                                />
                            ))}
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Upload New Images (optional)</Form.Label>

                        <div className="card-body">
                            <input type="file" multiple onChange={handleImage} />
                            <div className="d-flex flex-wrap gap-2 mt-2">
                                {newImages.map((file, i) => (
                                    <div key={i} className="badge bg-secondary p-2">
                                        {file.name}
                                    </div>
                                ))}
                            </div>
                        </div>

                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancel</Button>
                <Button variant="primary" onClick={handleSubmit}>Update Package</Button>
            </Modal.Footer>
        </Modal>
    )
}
