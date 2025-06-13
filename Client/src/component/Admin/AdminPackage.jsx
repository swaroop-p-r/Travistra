import React, { useState, useRef } from 'react'
import AXIOS from 'axios'
import AdminNav from './AdminNav'

export default function AdminPackage() {

    const [formData, setFormData] = useState({
        package_name: '',
        destination: '',
        duration: '',
        price: '',
        seats: '',
        total_seats: '',
        status: 'Active',
        itinerary: []
    })

    const [newItineraryItem, setnewItineraryItem] = useState('');
    const [images, setImages] = useState([]);

    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleImage = (e) => {
        setImages([...e.target.files]);
    }

    const addItineraryItem = () => {
        if (newItineraryItem.trim() !== '') {
            setFormData((prev) => ({
                ...prev,
                itinerary: [...prev.itinerary, newItineraryItem.trim()]
            }))
            setnewItineraryItem('')
        }
    }

    const removeItineraryItem = (indexToRemove) => {
        setFormData((prev) => ({
            ...prev,
            itinerary: prev.itinerary.filter((_, index) => index !== indexToRemove)
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData();
        if (formData.itinerary.length === 0) {
            alert("Please add at least one itinerary item.");
            return;
        }
        if (images.length === 0) {
            alert("Please add at least one image.");
            return;
        }
        data.append('package_name', formData.package_name)
        data.append('destination', formData.destination)
        data.append('duration', formData.duration)
        data.append('price', formData.price)
        data.append('seats', formData.seats)
        data.append('total_seats', formData.total_seats)
        data.append('status', formData.status)

        formData.itinerary.forEach((item, index) => {
            data.append(`itinerary[${index}]`, item)
        })

        images.forEach((file) => {
            data.append('images', file)
        })
        try {
            const res = await AXIOS.post('http://localhost:4000/api/admin/adminpackage', data,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
            alert(res.data.msg);
            if (res.status === 200) {
                setFormData({
                    package_name: '',
                    destination: '',
                    duration: '',
                    price: '',
                    seats: '',
                    total_seats: '',
                    status: 'Active',
                    itinerary: []
                });
                setImages([]);
                setnewItineraryItem('');
                if (fileInputRef.current) {
                    fileInputRef.current.value = null;
                }
            }
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <>
            <AdminNav />
            <div className="container" style={{ maxWidth: '800px', margin: '2rem auto' }}>
                <div className="card shadow">
                    <div className="card-header bg-black text-white">
                        <h2 className="mb-0">Add New Tour Package</h2>
                    </div>

                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="row mb-4">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Package Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="package_name"
                                        value={formData.package_name}
                                        onChange={handleChange}
                                        placeholder="Package Name"
                                        required
                                    />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Destination</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="destination"
                                        value={formData.destination}
                                        onChange={handleChange}
                                        placeholder="Destination"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="row mb-4">
                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Duration</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="duration"
                                        value={formData.duration}
                                        onChange={handleChange}
                                        placeholder="4 D, 3 N"
                                        required
                                    />
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Price ($)</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        placeholder="Price"
                                        required
                                    />
                                </div>

                                <div className="col-md-4 mb-3">
                                    <label className="form-label">Status</label>
                                    <select
                                        className="form-select"
                                        name="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row mb-4">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Available Seats</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="seats"
                                        value={formData.seats}
                                        onChange={handleChange}
                                        placeholder="Available Seats"
                                        required
                                    />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Total Seats</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="total_seats"
                                        value={formData.total_seats}
                                        onChange={handleChange}
                                        placeholder="Total Seats"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="card border-0 shadow-sm mb-3">
                                    <div className="card-header bg-light">
                                        <h4 className="mb-0">Itinerary</h4>
                                    </div>
                                    <div className="card-body">
                                        <div className="input-group mb-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={newItineraryItem}
                                                onChange={(e) => setnewItineraryItem(e.target.value)}
                                                placeholder="Add itinerary item"
                                            />
                                            <button
                                                className="btn btn-outline-primary"
                                                type="button"
                                                onClick={addItineraryItem}
                                            >
                                                Add
                                            </button>
                                        </div>

                                        <ul className="list-group">
                                            {formData.itinerary.map((item, index) => (
                                                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                                    {item}
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() => removeItineraryItem(index)}
                                                    >
                                                        Remove
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="card border-0 shadow-sm">
                                    <div className="card-header bg-light">
                                        <h4 className="mb-0">Package Images</h4>
                                    </div>
                                    <div className="card-body">
                                        <input
                                            type="file"
                                            className="form-control mb-3"
                                            multiple
                                            accept="image/*"
                                            onChange={handleImage}
                                            ref={fileInputRef}
                                        />

                                        <div className="d-flex flex-wrap gap-2">
                                            {Array.from(images).map((file, i) => (
                                                <div key={i} className="badge bg-secondary p-2">
                                                    {file.name}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="d-grid">
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg bg-black"

                                >
                                    Add Package
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
