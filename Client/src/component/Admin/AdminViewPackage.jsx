import React, { useState, useEffect } from 'react'
import AXIOS from 'axios'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

import AdminNav from './AdminNav'
import EditPackageModal from './AdminEditPackage';

export default function AdminViewPackage() {

  const [packages, setPackages] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);
  const [modelTitle, setModelTitle] = useState('')
  const [showEditModal, setShowEditModal] = useState(false);
  const [editPackageData, setEditPackageData] = useState(null);


  const fetchPackage = () => {
    AXIOS.get('http://localhost:4000/api/admin/adminviewpackage')
      .then((res) => {
        // console.log(res.data)
        setPackages(res.data)
      }).catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    fetchPackage()
  }, [])



  const handleImageClick = (images, packageName) => {
    const urls = images.map(img => `http://localhost:4000/uploads/${img}`);
    setCurrentImages(urls);
    setModelTitle(packageName)
    setShowModal(true);
  };



  const handleToogle = (id) => {
    AXIOS.patch("http://localhost:4000/api/admin/packagestatus",
      {},
      {
        headers: { userid: id }
      })
      .then((res) => {
        alert(res.data.msg)
        fetchPackage()
      }).catch((err) => {
        console.log(err)
      })
  }

  const handleDelete = (id) => {
    if (!window.confirm('Are sure you want to delete this Package?')) return;
    AXIOS.delete("http://localhost:4000/api/admin/deletepackage",
      {
        headers: { userid: id }
      }
    ).then((res) => {
      alert(res.data.msg)
      fetchPackage()
    }).catch((err) => {
      console.log(err)
    })
  }
  const handleEdit = async (id) => {
    AXIOS.get(`http://localhost:4000/api/admin/adminviewpackagebyid/${id}`)
      .then((res) => {
        setEditPackageData(res.data)
        setShowEditModal(true)
      }).catch((err) => {
        console.log(err)
        alert('Failed to fetch Package data')
      })
  }

  return (
    <>
      <AdminNav />
      <div style={{ padding: 25 }}>
        <h1>Package</h1>

        <div style={{
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Images</th>
                <th>Package Name</th>
                <th>Destination</th>
                <th>Duration</th>
                <th>Price</th>
                <th>Itinerary</th>
                <th>Seats</th>
                <th>Total Seats</th>
                <th>Status</th>
                <th colSpan={2}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {packages.length > 0 ? (
                packages.map((item, index) => {
                  return (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>
                        <div
                          style={{
                            display: 'flex',
                            overflowX: 'auto',
                            maxWidth: '300px',
                          }}
                        >
                          {item.images.map((imgName, idx) => (
                            <img
                              key={idx}
                              src={`http://localhost:4000/uploads/${imgName}`}
                              alt={`Package ${idx + 1}`}
                              onClick={() => handleImageClick(item.images, item.package_name)}
                              style={{
                                width: '100px',
                                height: '100px',
                                objectFit: 'cover',
                                marginRight: '5px',
                                cursor: 'pointer',
                                borderRadius: '5px',
                              }}
                            />
                          ))}
                        </div>
                      </td>
                      <td>{item.package_name}</td>
                      <td>{item.destination}</td>
                      <td>{item.duration}</td>
                      <td>{item.price}</td>
                      <td>
                        <ul style={{ paddingLeft: "20px", margin: 0 }}>
                          {item.itinerary.map((step, idx) => (
                            <li key={idx}>{step}</li>
                          ))}
                        </ul>
                      </td>
                      <td>{item.seats}</td>
                      <td>{item.total_seats}</td>
                      <td>
                        <Button
                          style={{ width: 130 }}
                          variant={item.status == "Active" ? "success" : "warning"}
                          onClick={() => handleToogle(item._id)}>
                          {item.status === "Active" ? "Activated" : "Deactivated"}
                        </Button>
                      </td>
                      <td><Button variant="danger" onClick={() => handleDelete(item._id)}>Delete</Button></td>
                      <td><Button variant="warning" onClick={() => handleEdit(item._id)}>Edit</Button></td>
                    </tr>
                  )
                })

              ) : (
                <tr>
                  <td colSpan="11" className="text-center text-muted py-4">
                    No Packages Found!.
                  </td>
                </tr>
              )}

            </tbody>
          </Table >
        </div>
      </div>
      {/* for imgModal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>{modelTitle} Images</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{
              display: 'flex',
              overflowX: 'auto',
              gap: '10px',
              paddingBottom: '10px',
            }}
          >
            {currentImages.map((imgUrl, idx) => (
              <img
                key={idx}
                src={imgUrl}
                alt={`Image ${idx + 1}`}
                style={{
                  height: '300px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
            ))}
          </div>
        </Modal.Body>
      </Modal>
      {/* for updateModal */}
      {editPackageData && (
        <EditPackageModal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          packageData={editPackageData}
          onUpdated={fetchPackage}  // refresh list after update
        />
      )}

    </>
  )
}

