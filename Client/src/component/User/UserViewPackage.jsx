import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserNav from './UserNav';
import {useNavigate} from 'react-router-dom'

// import Grid from '@mui/material/Unstable_Grid2';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Container,
    Grid,
    CardActionArea,
} from '@mui/material';

export default function UserViewPackage() {

    const API_BASE_URL = import.meta.env.VITE_API_URL;
    // console.log(API_BASE_URL);

    const token = localStorage.getItem('token');
    const [packages, setPackages] = useState([]);

    const navigate=useNavigate();

    const fetchPackages = async () => {
        try {
            const res = await axios.get(`${API_BASE_URL}/api/user/userviewpackages`, {
                headers: { token }
            });
            setPackages(res.data);
        } catch (err) {
            console.log('Error Fetching Packages', err);
            alert('Error Fetching Packages');
        }
    };

    useEffect(() => {
        fetchPackages();
    }, []);

    return (
        <>
            <UserNav />
            <Container sx={{ mt: 4 }}>
                <Typography variant="h5" gutterBottom paddingBottom={3}>Our Packages</Typography>
                <Grid container spacing={3}>
                    {packages.length > 0 ? (
                        packages.map((pkg, index) => (
                            <Grid key={index}
                            >
                                <Card
                                    sx={{
                                        maxWidth: 345,
                                        borderRadius: 3,
                                        boxShadow: 3,
                                        opacity: 0.8,
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease, opacity 0.3s ease',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                            boxShadow: 6,
                                            cursor: 'pointer',
                                            opacity: 1,
                                        },

                                    }}
                                >
                                    <CardActionArea onClick={() => navigate(`/userselectpackage/${pkg._id}`)}>

                                        <CardMedia
                                            component="img"
                                            height="180"
                                            image={`${API_BASE_URL}/uploads/${pkg.images[0]}`}
                                            alt={`Image of ${pkg.package_name}`}
                                            style={{ width: 300, height: 180 }}
                                        />
                                        <CardContent>
                                            <Typography variant="h6" component="div" gutterBottom>
                                                {pkg.package_name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                <strong>Location:</strong> {pkg.destination}
                                                <br />
                                                <strong>Duration:</strong> {pkg.duration}
                                                <br />
                                                <strong>Group Size:</strong> {pkg.seats}
                                                <br />
                                                <strong>Price:</strong> ₹{pkg.price}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>

                            </Grid>
                        ))
                    ) : (
                        <Typography>No packages available.</Typography>
                    )}
                </Grid>

            </Container>
        </>
    );
}
