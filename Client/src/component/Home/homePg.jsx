import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeNav from "./homeNav";

export default function HomePg() {
  const destinations = [
    {
      name: "Paris",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
    },
    {
      name: "Tokyo",
      image: "https://images.unsplash.com/photo-1554797589-7241bb691973",
    },
    {
      name: "Bali",
      image: "https://images.unsplash.com/photo-1546484959-f19c3e60a5c7",
    },
  ];

  return (
    <>
      {/* <HomeNav /> */}
      <HomeNav/>

      {/* Hero Section */}
      <div
        className="text-white d-flex align-items-center justify-content-center"
        style={{
          height: "70vh",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          textShadow: "2px 2px 10px rgba(0,0,0,0.8)",
        }}
      >
        <h1 className="display-4 text-center">Discover Your Next Adventure</h1>
      </div>

      {/* Destinations */}
      <div className="container my-5">
        <h2 className="text-center mb-4">Top Destinations</h2>
        <div className="row">
          {destinations.map((dest) => (
            <div className="col-md-4 mb-4" key={dest.name}>
              <div className="card shadow">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{dest.name}</h5>
                  <p className="card-text">
                    Explore the beauty and culture of {dest.name} with our
                    exclusive travel packages.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white text-center p-3">
        &copy; 2025 Travistra. All rights reserved.
      </footer>
    </>
  );
}
