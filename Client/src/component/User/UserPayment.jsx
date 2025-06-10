import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Container,
    Typography,
    Card,
    CardContent,
    Button,
    Tabs,
    Tab,
    Box,
    TextField,
    Divider,
    CircularProgress,
    Alert,
    Dialog,
    DialogContent,
    DialogActions,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import UserNav from './UserNav';
import axios from 'axios';
import Lottie from 'lottie-react';
import success from '../../../src/animations/success.json';

export default function UserPayment() {
    const { id: bookingid } = useParams();
    const navigate = useNavigate();
    const [tab, setTab] = useState(0);
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [paymentData, setPaymentData] = useState({
        upiId: '',
        cardNumber: '',
        expiry: '',
        cvv: '',
        bankName: ''
    });
    const [validationErrors, setValidationErrors] = useState({});
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const modalRef = useRef(null);

    const fetchBookingDetails = async () => {
        try {
            const res = await axios.get('http://localhost:4000/api/user/userviewbookingforpayment', {
                headers: { id: bookingid }
            });
            setBooking(res.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch booking details');
            setLoading(false);
            console.error('Error fetching booking:', err);
        }
    };

    useEffect(() => {
        fetchBookingDetails();
    }, [bookingid]);

    const handleTabChange = (e, newValue) => {
        setTab(newValue);
        setValidationErrors({});
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentData(prev => ({ ...prev, [name]: value }));
    };

    const validatePayment = () => {
        const errors = {};
        if (tab === 0) {
            if (!paymentData.upiId) {
                errors.upiId = 'UPI ID is required';
            } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/.test(paymentData.upiId)) {
                errors.upiId = 'Enter a valid UPI ID (e.g. example@upi)';
            }
        } else if (tab === 1) {
            if (!paymentData.cardNumber) {
                errors.cardNumber = 'Card number is required';
            } else if (!/^\d{16}$/.test(paymentData.cardNumber.replace(/\s/g, ''))) {
                errors.cardNumber = 'Enter a valid 16-digit card number';
            }
            if (!paymentData.expiry) {
                errors.expiry = 'Expiry date is required';
            } else if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(paymentData.expiry)) {
                errors.expiry = 'Enter valid expiry (MM/YY)';
            }
            if (!paymentData.cvv) {
                errors.cvv = 'CVV is required';
            } else if (!/^\d{3}$/.test(paymentData.cvv)) {
                errors.cvv = 'Enter valid 3 digit CVV';
            }
        } else if (tab === 2) {
            if (!paymentData.bankName) {
                errors.bankName = 'Bank name is required';
            }
        }
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handlePayment = async () => {
        if (!validatePayment()) return;
        
        setIsProcessing(true);
        try {
            const res = await axios.post('http://localhost:4000/api/user/userpayment', {
                amount: booking.package.price,
                paymentMethod: tab === 0 ? 'UPI' : tab === 1 ? 'CARD' : 'NETBANKING',
                paymentDetails: paymentData
            }, {
                headers: {
                    userid: booking.user._id,
                    bookingid,
                }
            });
            
            if (res.data.status === 200) {
                setOpenSuccessModal(true);
            } else {
                alert(res.data.msg || 'Payment failed');
            }
        } catch (err) {
            alert('Payment failed. Please try again.');
            console.error('Payment error:', err);
        } finally {
            setIsProcessing(false);
        }
    };

    const handleCloseModal = () => {
        setOpenSuccessModal(false);
        navigate('/userbooking');
    };

    if (loading) {
        return (
            <>
                <UserNav />
                <Container maxWidth="sm" sx={{ mt: 4, textAlign: 'center' }}>
                    <CircularProgress />
                    <Typography>Loading booking details...</Typography>
                </Container>
            </>
        );
    }

    if (error) {
        return (
            <>
                <UserNav />
                <Container maxWidth="sm" sx={{ mt: 4 }}>
                    <Alert severity="error">{error}</Alert>
                </Container>
            </>
        );
    }

    return (
        <>
            <UserNav />
            <Container maxWidth="sm" sx={{ mt: 4 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    🧾 Payment
                </Typography>

                <Card elevation={4}>
                    <CardContent>
                        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                            Paying to: <strong>Travistra Tours Pvt. Ltd.</strong>
                        </Typography>

                        <Typography variant="h6">
                            Booking User : <strong>{booking.user.username}</strong>
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                            Phone: <strong>{booking.user.phone}</strong>
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                            Package Name: <strong>{booking.package.package_name}</strong>
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                            Vehicle Name: <strong>{booking.vehicle ? `${booking.vehicle.vehicle_name}` : 'Null'}</strong>
                        </Typography>

                        <Typography variant="h5" color="primary" sx={{ mt: 2 }}>
                            Amount: ₹{booking.package.price}
                        </Typography>

                        <Divider sx={{ my: 2 }} />

                        <Tabs
                            value={tab}
                            onChange={handleTabChange}
                            variant="fullWidth"
                            textColor="primary"
                            indicatorColor="primary"
                        >
                            <Tab label="UPI" />
                            <Tab label="Card" />
                            <Tab label="Net Banking" />
                        </Tabs>

                        <Box sx={{ mt: 3 }}>
                            {tab === 0 && (
                                <>
                                    <TextField
                                        fullWidth
                                        label="Enter UPI ID"
                                        name="upiId"
                                        value={paymentData.upiId}
                                        onChange={handleInputChange}
                                        placeholder="example@upi"
                                        error={!!validationErrors.upiId}
                                        helperText={validationErrors.upiId}
                                    />
                                </>
                            )}
                            {tab === 1 && (
                                <>
                                    <TextField
                                        fullWidth
                                        label="Card Number"
                                        name="cardNumber"
                                        value={paymentData.cardNumber}
                                        onChange={handleInputChange}
                                        sx={{ mb: 2 }}
                                        error={!!validationErrors.cardNumber}
                                        helperText={validationErrors.cardNumber}
                                    />
                                    <Box display="flex" gap={2}>
                                        <TextField
                                            fullWidth
                                            label="Expiry"
                                            name="expiry"
                                            value={paymentData.expiry}
                                            onChange={handleInputChange}
                                            placeholder="MM/YY"
                                            error={!!validationErrors.expiry}
                                            helperText={validationErrors.expiry}
                                        />
                                        <TextField
                                            fullWidth
                                            label="CVV"
                                            name="cvv"
                                            type="password"
                                            value={paymentData.cvv}
                                            onChange={handleInputChange}
                                            error={!!validationErrors.cvv}
                                            helperText={validationErrors.cvv}
                                        />
                                    </Box>
                                </>
                            )}
                            {tab === 2 && (
                                <>
                                    <TextField
                                        fullWidth
                                        label="Bank Name"
                                        name="bankName"
                                        value={paymentData.bankName}
                                        onChange={handleInputChange}
                                        placeholder="e.g. HDFC, SBI"
                                        error={!!validationErrors.bankName}
                                        helperText={validationErrors.bankName}
                                    />
                                </>
                            )}
                        </Box>

                        <Button
                            fullWidth
                            variant="contained"
                            color="success"
                            size="large"
                            sx={{ mt: 4 }}
                            onClick={handlePayment}
                            disabled={!booking || isProcessing}
                        >
                            {isProcessing ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                `Pay ₹${booking?.package?.price || 0}`
                            )}
                        </Button>
                    </CardContent>
                </Card>
            </Container>

            {/* Success Modal */}
            <Dialog 
                open={openSuccessModal} 
                maxWidth="xs" 
                fullWidth
                onClose={handleCloseModal}
                disableRestoreFocus // Fixes accessibility warning
                ref={modalRef}
            >
                <DialogContent sx={{ 
                    textAlign: 'center', 
                    p: 4,
                    backgroundColor: '#f8fff8'
                }}>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseModal}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    
                    <Lottie 
                        animationData={success} 
                        loop={false} 
                        style={{ height: 150 }} 
                    />
                    
                    <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold' }}>
                        Payment Successful!
                    </Typography>
                    
                    <Box sx={{ 
                        mt: 3, 
                        p: 2, 
                        backgroundColor: '#e8f5e9', 
                        borderRadius: 2,
                        borderLeft: '4px solid #4caf50'
                    }}>
                        <Typography variant="subtitle1">
                            Amount Paid
                        </Typography>
                        <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
                            ₹{booking?.package?.price || 0}
                        </Typography>
                    </Box>
                    
                    <Typography variant="body1" sx={{ mt: 3, color: '#616161' }}>
                        Booking ID: <strong>{bookingid}</strong>
                    </Typography>
                    
                    <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic' }}>
                        Redirecting to bookings page...
                    </Typography>
                    
                    <CircularProgress 
                        size={24} 
                        sx={{ mt: 3, color: '#4caf50' }} 
                    />
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
                    <Button 
                        variant="contained"
                        color="success"
                        onClick={handleCloseModal}
                        sx={{ borderRadius: 2, px: 4 }}
                    >
                        View Booking
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}