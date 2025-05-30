import React, { useState } from 'react'
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
        status: '',
        itinerary: []
    })

    const [newItineraryItem, setnewItineraryItem] = useState('');
    const [images, setImages] = useState([]);

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
            const res=await AXIOS.post('http://localhost:4000/api/admin/adminpackage', data,
                {
                    headers: { 'Content-Type': 'multipart/form-data' }
                })
            alert(res.data.msg);
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <>
            <AdminNav />
            <div style={{ maxWidth: '600px', margin: 'auto' }}>
                <h2>Add New Tour Package</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="package_name"
                        value={formData.package_name}
                        onChange={handleChange}
                        placeholder="Package Name"
                        required
                    />
                    <input
                        type="text"
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        placeholder="Destination"
                        required
                    />
                    <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        placeholder="Duration (e.g. 4 D, 3 N)"
                        required
                    />
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Price"
                        required
                    />
                    <input
                        type="number"
                        name="seats"
                        value={formData.seats}
                        onChange={handleChange}
                        placeholder="Available Seats"
                        required
                    />
                    <input
                        type="number"
                        name="total_seats"
                        value={formData.total_seats}
                        onChange={handleChange}
                        placeholder="Total Seats"
                        required
                    />

                    <select name="status" value={formData.status} onChange={handleChange}>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>

                    <h3>Itinerary</h3>
                    <input
                        type="text"
                        value={newItineraryItem}
                        onChange={(e) => setnewItineraryItem(e.target.value)}
                        placeholder="Add itinerary item"
                    />
                    <button type="button" onClick={addItineraryItem}>Add</button>
                    <ul>
                        {formData.itinerary.map((item, index) => (
                            <li key={index}>
                                {item} <button type="button" onClick={() => removeItineraryItem(index)}>Remove</button>
                            </li>
                        ))}
                    </ul>

                    <h3>Upload Images</h3>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImage}
                    />
                    <ul>
                        {Array.from(images).map((file, i) => (
                            <li key={i}>{file.name}</li>
                        ))}
                    </ul>

                    <button type="submit">Add Package</button>
                </form>
            </div>
        </>
    )
}
