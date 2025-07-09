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
import { Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import AdminEditVehicle from './AdminEditVehicle';

export default function AdminViewVehicle1() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const [modalTitle, setModalTitle] = useState('')
  const [showEditModal, setShowEditModal] = useState(false);
  const [editVehicleData, setEditVehicleData] = useState(null);

  const fetchVehicles = async () => {
    try {
      const res = await axios.get('http://localhost:4000/api/admin/adminviewvehicle');
      setVehicles(res.data);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.msg) {
        alert(err.response.data.msg)
        return;
      }
      else {
        console.log('Error fetching vehicles:', err);
        alert('Something went wrong11')
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleImageClick = (image, vehicle_name) => {
    const imageUrl = `http://localhost:4000/uploads/${image}`;
    setCurrentImage(imageUrl);
    setModalTitle(vehicle_name);
    setShowModal(true);
  };

  const handleStatus = async (id) => {
    // alert(`Vehicle is now ${id}`)
    try {
      const res = await axios.patch('http://localhost:4000/api/admin/vehiclestatus',
        {},
        {
          headers: { vehicleid: id }
        })
      alert(res.data.msg);
      fetchVehicles();
    } catch (err) {
      if (err.response && err.response.data && err.response.data.msg) {
        alert(res.data.msg)
      }
      else {
        console.log('Status Update Error', err)
        alert('Something went wrong!')
      }
    }
  }
  const handleUpdate = async (id) => {
    // alert(`Update vehicle ID: ${id}`)
    try {
      const res = await axios.get('http://localhost:4000/api/admin/adminviewvehiclebyid',
        {
          headers: { vehicleid: id }
        }
      )
      // console.log(res.data)
      setEditVehicleData(res.data);
      setShowEditModal(true);

    } catch (err) {
      console.log('Error Updating', err)
    }
  };
  const handleDelete = async (id) => {
    // alert(`Delete vehicle ID: ${id}`)
    if (!window.confirm('Are sure you want to delete this Vehicle?')) return;
    try {
      const res = await axios.delete('http://localhost:4000/api/admin/admindeletevehicle',
        {
          headers: { vehicleid: id }
        }
      )
      alert(res.data.msg);
      fetchVehicles();
    } catch (err) {
      if (err.response && err.response.data && err.response.data.msg) {
        alert(err.response.data.msg)
      }
      else {
        console.log('Error Deleting', err)
        alert("Something went wrong!")
      }
    }
  };

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

        <div
          className="bg-white"
          style={{
            borderRadius: 8,
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          <Table striped bordered responsive hover className="mb-0">
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
                    <td style={{ width: '250px' }}>
                      <img
                        src={`http://localhost:4000/uploads/${vehicle.image}`}
                        alt="Vehicle"
                        className="img-thumbnail"
                        style={{ width: "200px", height: "125px", objectFit: "cover" }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';;
                        }}
                        onClick={() => handleImageClick(vehicle.image, vehicle.vehicle_name)}
                      />
                    </td>
                    <td>{vehicle.vehicle_name}</td>
                    <td>{vehicle.registration_no}</td>
                    <td>{vehicle.model}</td>
                    <td>{vehicle.type}</td>
                    <td>{vehicle.seat}</td>
                    <td>
                      <Button onClick={() => handleStatus(vehicle._id)} variant={vehicle.status ? 'success' : 'danger'}>
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

      <Modal show={showModal} onHide={() => setShowModal(false)} size='lg' centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle} Image</Modal.Title>
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

      {editVehicleData && (
        <AdminEditVehicle
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          vehicleData={editVehicleData}
          onUpdated={fetchVehicles}
        />
      )}

    </>
  );
}
