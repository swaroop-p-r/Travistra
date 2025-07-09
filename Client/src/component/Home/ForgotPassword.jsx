import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    CircularProgress,
    Alert,
    Box,
    Container
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockResetIcon from '@mui/icons-material/LockReset';
import PasswordIcon from '@mui/icons-material/Password';
import HomeNav from './homeNav';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ForgotPassword() {

    const API_BASE_URL = import.meta.env.VITE_API_URL;
    // console.log(API_BASE_URL);


    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [passwordReset, setPasswordReset] = useState(false);
    const [status, setStatus] = useState(false);

    const navigate = useNavigate();


    const handleSendOtp = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const response = await axios.post(`${API_BASE_URL}/api/user/sendotp`, { email });
            setMsg(response.data.msg);
            if (response.data.status === 200) {
                setOtpSent(true);
                setStatus(true);
            } else {
                setStatus(false);
            }
        } catch (error) {
            setMsg(
                error.response?.data?.msg || 'Failed to send OTP. Try again later.'
            );
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMsg("Passwords don't match");
            setStatus(false);
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(`${API_BASE_URL}/api/user/resetpassword`, {
                email,
                otp,
                newPassword
            });
            setMsg(response.data.msg);
            setPasswordReset(true);
            if (response.data.status === 200) {
                setStatus(true);
                toast.success("Password updated, Redirecting...");
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setStatus(false);
            }
        } catch (error) {
            setMsg(
                error.response?.data?.msg || 'Failed to reset password. Try again later.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>

            <HomeNav />

            <div>
                <ToastContainer style={{marginTop:50,}} />
            </div>

            <Container maxWidth="sm" sx={{ mt: 8 }}>
                <Card elevation={6}>
                    <CardContent sx={{ p: 4 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                            <LockResetIcon color="primary" sx={{ fontSize: 60 }} />
                        </Box>

                        <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
                            {passwordReset ? 'Password Reset Successful' : 'Forgot Password'}
                        </Typography>

                        {passwordReset ? (
                            <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
                                Your password has been reset successfully. You can now login with your new password.
                            </Typography>
                        ) : (
                            <>
                                <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
                                    {otpSent
                                        ? 'Enter the OTP sent to your email and your new password'
                                        : 'Enter your email address to receive an OTP to reset your password'}
                                </Typography>

                                <form onSubmit={otpSent ? handleResetPassword : handleSendOtp}>
                                    {!otpSent ? (
                                        <TextField
                                            fullWidth
                                            label="Email Address"
                                            type="email"
                                            variant="outlined"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            sx={{ mb: 3 }}
                                            InputProps={{
                                                startAdornment: (
                                                    <EmailIcon color="action" sx={{ mr: 1 }} />
                                                )
                                            }}
                                        />
                                    ) : (
                                        <>
                                            <TextField
                                                fullWidth
                                                label="OTP"
                                                type="text"
                                                variant="outlined"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value)}
                                                required
                                                sx={{ mb: 3 }}
                                                InputProps={{
                                                    startAdornment: (
                                                        <PasswordIcon color="action" sx={{ mr: 1 }} />
                                                    )
                                                }}
                                            />
                                            <TextField
                                                fullWidth
                                                label="New Password"
                                                type="password"
                                                variant="outlined"
                                                value={newPassword}
                                                onChange={(e) => setNewPassword(e.target.value)}
                                                required
                                                sx={{ mb: 3 }}
                                            />
                                            <TextField
                                                fullWidth
                                                label="Confirm Password"
                                                type="password"
                                                variant="outlined"
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                required
                                                sx={{ mb: 3 }}
                                            />
                                        </>
                                    )}

                                    <Button
                                        fullWidth
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        disabled={loading}
                                        sx={{ py: 1.5, mb: 2 }}
                                    >
                                        {loading ? (
                                            <CircularProgress size={24} color="inherit" />
                                        ) : (
                                            otpSent ? 'Reset Password' : 'Send OTP'
                                        )}
                                    </Button>
                                </form>
                            </>
                        )}

                        {msg && (
                            <Alert severity={status ? 'success' : 'error'} sx={{ mt: 3 }}>
                                {msg}
                            </Alert>
                        )}

                    </CardContent>
                </Card>
            </Container>
        </>
    );
}