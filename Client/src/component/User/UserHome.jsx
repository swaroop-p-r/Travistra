import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  CircularProgress,
  Divider,
  Chip,
  Paper,
} from '@mui/material';
import {
  Person,
  DirectionsCar,
  Event,
  ConfirmationNumber,
  Cancel,
  Payment,
  DirectionsBus,
  AirlineSeatIndividualSuite,
  LocalTaxi,
  CardTravel,
  People
} from '@mui/icons-material';
import { green, blue, orange, red, purple, teal, indigo } from '@mui/material/colors';
import UserNav from './UserNav';
import { useNavigate } from 'react-router-dom';

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } }
};

const slideUp = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function UserHome() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');
  const navigate=useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/user/userhomedetails',
          {
            headers: {
              token
            }
          }
        );
        if (response.data.status === false) {
          alert('Login Again')
          navigate('/login')
        }
        setUserData(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Typography color="error">Error loading data: {error}</Typography>
      </Box>
    );
  }

  return (
    <>
      <UserNav />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <Box p={3}>
          {/* User Profile Header */}
          <motion.div variants={slideUp}>
            <Card elevation={3} sx={{ mb: 4 }}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <Avatar
                    src={`http://localhost:4000/uploads/${userData.userProfilePhoto}`}
                    sx={{ width: 80, height: 80, mr: 3 }}
                  >
                    <Person fontSize="large" />
                  </Avatar>
                  <Box>
                    <Typography variant="h4" gutterBottom>
                      Welcome, {userData.username}
                    </Typography>
                    <Box display="flex" flexWrap="wrap" gap={2}>
                      <Paper
                        elevation={1}
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 1,
                          px: 2,
                          py: 0.5,
                          backgroundColor: userData.userStatus ? 'success.light' : 'warning.light',
                          color: 'black',
                          borderRadius: 4
                        }}
                      >
                        <Person fontSize="small" />
                        Status: {userData.userStatus ? 'Active' : 'Inactive'}
                      </Paper>

                      <Box display="flex" flexWrap="wrap" gap={2}>
                        <Paper
                          elevation={1}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            px: 2,
                            py: 0.5,
                            borderRadius: 4,
                            backgroundColor: 'primary.light',
                            color: 'primary.contrastText',
                          }}
                        >
                          <Payment fontSize="small" />
                          Email: {userData.userEmail}
                        </Paper>

                        {userData.userPhone && (
                          <Paper
                            elevation={1}
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 1,
                              px: 2,
                              py: 0.5,
                              borderRadius: 4,
                              backgroundColor: 'secondary.light',
                              color: 'secondary.contrastText',
                            }}
                          >
                            <Payment fontSize="small" />
                            Phone: {userData.userPhone}
                          </Paper>
                        )}
                      </Box>

                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>

          {/* Stats Grid */}
          <Grid container spacing={3}>
            {/* Bookings Summary */}
            <Grid item xs={12} md={6} lg={4}>
              <motion.div variants={fadeIn}>
                <Card elevation={3} sx={{ height: '100%' }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Avatar sx={{ bgcolor: blue[100], color: blue[600], mr: 2 }}>
                        <ConfirmationNumber />
                      </Avatar>
                      <Typography variant="h6"> Your Bookings Summary</Typography>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Card variant="outlined" sx={{ p: 1.5, textAlign: 'center' }}>
                          <Typography variant="h5">{userData.totalBookings}</Typography>
                          <Typography variant="body2">Total Bookings</Typography>
                        </Card>
                      </Grid>
                      <Grid item xs={6}>
                        <Card variant="outlined" sx={{ p: 1.5, textAlign: 'center', borderColor: green[500] }}>
                          <Typography variant="h5" color={green[600]}>{userData.confirmedBooking}</Typography>
                          <Typography variant="body2">Confirmed</Typography>
                        </Card>
                      </Grid>
                      <Grid item xs={6}>
                        <Card variant="outlined" sx={{ p: 1.5, textAlign: 'center', borderColor: red[500] }}>
                          <Typography variant="h5" color={red[600]}>{userData.cancelledBooking}</Typography>
                          <Typography variant="body2">Cancelled</Typography>
                        </Card>
                      </Grid>
                      <Grid item xs={6}>
                        <Card variant="outlined" sx={{ p: 1.5, textAlign: 'center' }}>
                          <Typography variant="h5">{userData.totalPayment}</Typography>
                          <Typography variant="body2">Payments</Typography>
                        </Card>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            {/* Vehicle Summary */}
            <Grid item xs={12} md={6} lg={4}>
              <motion.div variants={fadeIn}>
                <Card elevation={3} sx={{ height: '100%' }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Avatar sx={{ bgcolor: teal[100], color: teal[600], mr: 2 }}>
                        <DirectionsCar />
                      </Avatar>
                      <Typography variant="h6">Our Vehicles</Typography>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Card variant="outlined" sx={{ p: 1.5, textAlign: 'center' }}>
                          <Typography variant="h5">{userData.totalVehicle}</Typography>
                          <Typography variant="body2">Total Vehicles</Typography>
                        </Card>
                      </Grid>
                      <Grid item xs={6}>
                        <Card variant="outlined" sx={{ p: 1.5, textAlign: 'center' }}>
                          <Typography variant="h5">{userData.totalTraveller}</Typography>
                          <Typography variant="body2">Travellers</Typography>
                        </Card>
                      </Grid>
                      <Grid item xs={6}>
                        <Card variant="outlined" sx={{ p: 1.5, textAlign: 'center' }}>
                          <Typography variant="h5">{userData.totalBus}</Typography>
                          <Typography variant="body2">Buses</Typography>
                        </Card>
                      </Grid>
                      <Grid item xs={6}>
                        <Card variant="outlined" sx={{ p: 1.5, textAlign: 'center' }}>
                          <Typography variant="h5">{userData.totalCar}</Typography>
                          <Typography variant="body2">Cars</Typography>
                        </Card>
                      </Grid>
                      <Grid item xs={6}>
                        <Card variant="outlined" sx={{ p: 1.5, textAlign: 'center' }}>
                          <Typography variant="h5">{userData.totalJeep}</Typography>
                          <Typography variant="body2">Jeeps</Typography>
                        </Card>
                      </Grid>
                      
                    </Grid>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            {/* Horizontal System Overview */}
            <Grid item xs={12}>
              <motion.div variants={fadeIn}>
                <Card elevation={3}>
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Avatar sx={{ bgcolor: purple[100], color: purple[600], mr: 2 }}>
                        <People />
                      </Avatar>
                      <Typography variant="h6">Our System Overview</Typography>
                    </Box>
                    <Divider sx={{ mb: 2 }} />
                    <Grid container spacing={2}>
                      {/* Total Users */}
                      <Grid item xs={12} sm={4} md={4} lg={4}>
                        <motion.div whileHover={{ scale: 1.03 }}>
                          <Card variant="outlined" sx={{ p: 2, height: '100%' }}>
                            <Box display="flex" alignItems="center">
                              <Avatar sx={{ bgcolor: indigo[100], color: indigo[600], mr: 2 }}>
                                <Person />
                              </Avatar>
                              <Box>
                                <Typography variant="h5">{userData.totalUsers}</Typography>
                                <Typography variant="body2">Total Users</Typography>
                              </Box>
                            </Box>
                          </Card>
                        </motion.div>
                      </Grid>

                      {/* Travel Packages */}
                      <Grid item xs={12} sm={4} md={4} lg={4}>
                        <motion.div whileHover={{ scale: 1.03 }}>
                          <Card variant="outlined" sx={{ p: 2, height: '100%' }}>
                            <Box display="flex" alignItems="center">
                              <Avatar sx={{ bgcolor: orange[100], color: orange[600], mr: 2 }}>
                                <CardTravel />
                              </Avatar>
                              <Box>
                                <Typography variant="h5">{userData.totalPackage}</Typography>
                                <Typography variant="body2">Travel Packages</Typography>
                              </Box>
                            </Box>
                          </Card>
                        </motion.div>
                      </Grid>

                      {/* Total Vehicles */}
                      <Grid item xs={12} sm={4} md={4} lg={4}>
                        <motion.div whileHover={{ scale: 1.03 }}>
                          <Card variant="outlined" sx={{ p: 2, height: '100%' }}>
                            <Box display="flex" alignItems="center">
                              <Avatar sx={{ bgcolor: green[100], color: green[600], mr: 2 }}>
                                <DirectionsBus />
                              </Avatar>
                              <Box>
                                <Typography variant="h5">{userData.totalVehicle}</Typography>
                                <Typography variant="body2">Total Vehicles</Typography>
                              </Box>
                            </Box>
                          </Card>
                        </motion.div>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </Box>
      </motion.div>
    </>
  );
}