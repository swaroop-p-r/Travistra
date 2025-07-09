import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  CircularProgress,
  Button,
  Box
} from '@mui/material';
import { 
  People as PeopleIcon,
  CalendarToday as BookingIcon,
  DirectionsCar as VehicleIcon,
  MonetizationOn as RevenueIcon,
  CheckCircle as ActiveIcon,
  Cancel as InactiveIcon,
  LocalShipping as BusIcon,
  DirectionsCarFilled as CarIcon,
  AirlineSeatReclineExtra as TravellerIcon,
  DirectionsBus as JeepIcon,
  Inventory as PackageIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { GiJeep } from "react-icons/gi";
import { FaBus } from "react-icons/fa";
import { motion } from 'framer-motion';
import AdminNav from './AdminNav';

// ... rest of your component code remains the same ...

// Animation variants
const cardVariants = {
  offscreen: {
    y: 50,
    opacity: 0
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8
    }
  }
};

const StatCard = ({ icon, title, value, color }) => (
  <Card 
    sx={{ 
      minWidth: 275, 
      borderRadius: 3,
      boxShadow: 3,
      background: color,
      color: 'white'
    }}
    component={motion.div}
    initial="offscreen"
    whileInView="onscreen"
    viewport={{ once: true, amount: 0.2 }}
    variants={cardVariants}
  >
    <CardContent>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <div>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" fontWeight="bold">
            {value}
          </Typography>
        </div>
        <Box 
          sx={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: '50%',
            width: 60,
            height: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const SubStatCard = ({ icon, title, value, color }) => (
  <Card 
    sx={{ 
      minWidth: 200,
      borderRadius: 2,
      boxShadow: 2,
      background: 'white',
      borderLeft: `4px solid ${color}`
    }}
    component={motion.div}
    whileHover={{ scale: 1.03 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    <CardContent sx={{ padding: '12px !important' }}>
      <Box display="flex" alignItems="center" gap={2}>
        <Box 
          sx={{
            backgroundColor: `${color}20`,
            borderRadius: '50%',
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: color
          }}
        >
          {icon}
        </Box>
        <div>
          <Typography variant="subtitle2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            {value}
          </Typography>
        </div>
      </Box>
    </CardContent>
  </Card>
);



export default function AdminHome() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:4000/api/admin/adminhomedetails');
      if (res.data.status === 200) {
        setData(res.data);
        setError(null);
      } else {
        throw new Error('Failed to fetch dashboard data');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <>
        <AdminNav />
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress size={60} />
        </Box>
      </>
    );
  }

  if (error) {
    return (
      <>
        <AdminNav />
        <Box textAlign="center" p={4}>
          <Typography color="error" gutterBottom>
            Error: {error}
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={fetchData}
            startIcon={<RefreshIcon />}
          >
            Retry
          </Button>
        </Box>
      </>
    );
  }

  return (
    <>
      <AdminNav />
      <Box p={4}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
          Admin Dashboard
        </Typography>

        {/* Main Statistics */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid>
            <StatCard
              icon={<PeopleIcon fontSize="large" />}
              title="Total Users"
              value={data.totalUsers}
              color="linear-gradient(135deg, #3f51b5, #2196f3)"
            />
          </Grid>
          <Grid>
            <StatCard
              icon={<BookingIcon fontSize="large" />}
              title="Total Bookings"
              value={data.totalBookings}
              color="linear-gradient(135deg, #4caf50, #8bc34a)"
            />
          </Grid>
          <Grid>
            <StatCard
              icon={<RevenueIcon fontSize="large" />}
              title="Total Revenue"
              value={`₹${data.totalRevenue.toLocaleString()}`}
              color="linear-gradient(135deg, #ff9800, #ffc107)"
            />
          </Grid>
          <Grid>
            <StatCard
              icon={<VehicleIcon fontSize="large" />}
              title="Total Vehicles"
              value={data.totalVehicle}
              color="linear-gradient(135deg, #9c27b0, #e91e63)"
            />
          </Grid>
        </Grid>

        {/* User Statistics */}
        <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2, fontWeight: 'bold' }}>
          User Statistics
        </Typography>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid>
            <SubStatCard
              icon={<ActiveIcon />}
              title="Active Users"
              value={data.activeUsers}
              color="#4caf50"
            />
          </Grid>
          <Grid>
            <SubStatCard
              icon={<InactiveIcon />}
              title="Inactive Users"
              value={data.inActiveUsers}
              color="#f44336"
            />
          </Grid>
        </Grid>

        {/* Booking Statistics */}
        <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2, fontWeight: 'bold' }}>
          Booking Statistics
        </Typography>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid >
            <SubStatCard
              icon={<ActiveIcon />}
              title="Confirmed"
              value={data.confirmedBooking}
              color="#4caf50"
            />
          </Grid>
          <Grid >
            <SubStatCard
              icon={<InactiveIcon />}
              title="Cancelled"
              value={data.cancelledBooking}
              color="#f44336"
            />
          </Grid>
          <Grid >
            <SubStatCard
              icon={<BookingIcon />}
              title="Total Payments"
              value={data.totalPayment}
              color="#2196f3"
            />
          </Grid>
        </Grid>

        {/* Vehicle Statistics */}
        <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2, fontWeight: 'bold' }}>
          Vehicle Statistics
        </Typography>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid >
            <SubStatCard
              icon={<ActiveIcon />}
              title="Active Vehicles"
              value={data.activeVehicle}
              color="#4caf50"
            />
          </Grid>
          <Grid >
            <SubStatCard
              icon={<InactiveIcon />}
              title="Inactive Vehicles"
              value={data.inActiveVehicle}
              color="#f44336"
            />
          </Grid>
          <Grid >
            <SubStatCard
              icon={<TravellerIcon />}
              title="Travellers"
              value={data.totalTraveller}
              color="#673ab7"
            />
          </Grid>
          <Grid >
            <SubStatCard
              icon={<FaBus />}
              title="Buses"
              value={data.totalBus}
              color="#ff9800"
            />
          </Grid>
          <Grid >
            <SubStatCard
              icon={<CarIcon />}
              title="Cars"
              value={data.totalCar}
              color="#e91e63"
            />
          </Grid>
          <Grid >
            <SubStatCard
              icon={<GiJeep />}
              title="Jeeps"
              value={data.totalJeep}
              color="#009688"
            />
          </Grid>
        </Grid>

        {/* Package Statistics */}
        <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2, fontWeight: 'bold' }}>
          Package Statistics
        </Typography>
        <Grid container spacing={2}>
          <Grid >
            <SubStatCard
              icon={<PackageIcon />}
              title="Total Packages"
              value={data.totalPackage}
              color="#3f51b5"
            />
          </Grid>
          <Grid >
            <SubStatCard
              icon={<ActiveIcon />}
              title="Active Packages"
              value={data.activePackage}
              color="#4caf50"
            />
          </Grid>
          <Grid>
            <SubStatCard
              icon={<InactiveIcon />}
              title="Inactive Packages"
              value={data.inActivePackage}
              color="#f44336"
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}