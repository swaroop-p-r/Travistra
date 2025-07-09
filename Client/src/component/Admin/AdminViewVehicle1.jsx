<<<<<<< HEAD
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ReactSortable } from 'react-sortablejs';  // ✅ Correct

import AXIOS from 'axios';

export default function DragDropSortableUploader() {
  const [files, setFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    setFiles((prev) => [...prev, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: true });

  const handleUpload = async () => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file);
    });

    try {
      const res = await AXIOS.post('http://localhost:4000/api/admin/adminpackage', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert(res.data.msg);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">Drag & Drop + Sort Files</h2>
      <div
        {...getRootProps()}
        className="border border-secondary p-4 text-center bg-light"
        style={{ cursor: 'pointer' }}
      >
        <input {...getInputProps()} />
        <p>Drag & drop some files here, or click to select files</p>
      </div>

      <ReactSortable
  list={files}
  setList={setFiles}
  className="d-flex flex-wrap gap-2 mt-3"
>
  {files.map((file, index) => (
    <div key={index} className="badge bg-secondary p-2">
      {file.name}
    </div>
  ))}
</ReactSortable>


      <button className="btn btn-primary mt-4" onClick={handleUpload} disabled={files.length === 0}>
        Upload in Sorted Order
      </button>
    </div>
=======
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNav from './AdminNav';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {
  Table,
  Button,
  Container,
  Spinner,
  Badge,
} from 'react-bootstrap';

export default function AdminViewVehicle1() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVehicles = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/admin/adminviewvehicle');
      setVehicles(res.data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleStatus=(id)=>{
    alert(`Vehicle is now ${id}`)
  }
  const handleUpdate = (id) => alert(`Update vehicle ID: ${id}`);
  const handleDelete = (id) => alert(`Delete vehicle ID: ${id}`);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" role="status" />
        <p className="mt-2">Loading vehicles...</p>
      </div>
    );
  }

  return (
    <>
      <AdminNav />
      <Container className="py-7">
        <h2 className="mb-4 fw-bold text-dark">Vehicle Management</h2>
        <div className="bg-white">
          <Table bordered responsive hover >
            <thead className="table-light text-uppercase text-secondary">
              <tr className="text-center align-middle">
                <th>#</th>
                <th>Image</th>
                <th>Vehicle Name</th>
                <th>Reg. No</th>
                <th>Model</th>
                <th>Type</th>
                <th>Seats</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="text-center align-middle">
              {vehicles.length > 0 ? (
                vehicles.map((vehicle, index) => (
                  <tr key={vehicle._id}>
                    <td>{index + 1}</td>
                    <td style={{width:'250px'}}>
                      <img
                        src={`http://localhost:4000/uploads/${vehicle.image}`}
                        alt="Vehicle"
                        className="img-thumbnail"
                        style={{ width: "200px", height: "125px", objectFit: "cover" }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/120x80';
                        }}
                      />
                    </td>
                    <td>{vehicle.vehicle_name}</td>
                    <td>{vehicle.registration_no}</td>
                    <td>{vehicle.model}</td>
                    <td>{vehicle.type}</td>
                    <td>{vehicle.seat}</td>
                    <td>
                      <Button onClick={()=>handleStatus(vehicle._id)} bg={vehicle.status ? 'success' : 'danger'}>
                        {vehicle.status ? 'Active' : 'Inactive'}
                      </Button>
                    </td>
                    <td className="text-center">
                      <Button
                        variant="outline-primary"
                        size="lg"
                        className="me-2"
                        onClick={() => handleUpdate(vehicle._id)}
                      >
                        <i className="bi bi-pencil"></i>
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="lg"
                        onClick={() => handleDelete(vehicle._id)}
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center text-muted py-4">
                    No vehicles found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Container>
    </>
>>>>>>> 25996e7ea3407f167a894d9653326ed9065c58da
  );
}
