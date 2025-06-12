import React, { useState } from 'react'
import AXIOS from 'axios'
import { useNavigate } from 'react-router-dom';
import HomeNav from './Home/homeNav';
import {
    Card,
    CardContent,
    TextField,
    Button,
    Typography,
    Link,
    Box,
    InputAdornment,
    IconButton,
    CircularProgress,
    Alert,
    Snackbar
} from '@mui/material';
import {
    Email as EmailIcon,
    Lock as LockIcon,
    Visibility,
    VisibilityOff,
    CheckCircle
} from '@mui/icons-material';

export default function Login() {
    const [record, setRecord] = useState({
        email: "",
        password: "",
    })

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate()

    const handleChange = (e) => {
        setRecord({ ...record, [e.target.name]: e.target.value })
    };

    const handleSubmit = async(e) => {
        try {
            e.preventDefault()
            const res=await AXIOS.post("http://localhost:4000/api/user/login", record)
            if (res.data.status === 200) {
                localStorage.setItem("token", res.data.token)
                setSuccess(true);
                setTimeout(() => {
                    const redirectPath = res.data.role === "admin" ? '/adminhome' : '/userhome';
                    navigate(redirectPath);
                }, 2000);
            } else {
                // alert(res.data.msg);
                setError(res.data.msg || 'LoginF')
            }
        } catch (err) {
            console.log(err)
            alert("user Login Failed")
        } finally {
            setLoading(false);
        }
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleCloseSnackbar = () => {
        setSuccess(false);
    };

return (
    <>
        <HomeNav />
        <br />
        <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '80vh',
                    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                    p: 2,
                }}
            >
                <Card
                    sx={{
                        width: '100%',
                        maxWidth: 450,
                        boxShadow: 3,
                        borderRadius: 2,
                        overflow: 'hidden'
                    }}
                >
                    <Box
                        sx={{
                            background: 'linear-gradient(45deg, #3f51b5 30%, #2196f3 90%)',
                            color: 'white',
                            textAlign: 'center',
                            py: 3
                        }}
                    >
                        <Typography variant="h4" component="h1">
                            Login
                        </Typography>
                        <Typography variant="subtitle1">
                            Welcome back! Please enter your details
                        </Typography>
                    </Box>

                    <CardContent sx={{ p: 4 }}>
                        {error && (
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {error}
                            </Alert>
                        )}

                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                value={record.email}
                                onChange={handleChange}
                                margin="normal"
                                variant="outlined"
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <TextField
                                fullWidth
                                label="Password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={record.password}
                                onChange={handleChange}
                                margin="normal"
                                variant="outlined"
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon color="action" />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    py: 1.5,
                                    background: 'linear-gradient(45deg, #3f51b5 30%, #2196f3 90%)',
                                    '&:hover': {
                                        background: 'linear-gradient(45deg, #303f9f 30%, #1976d2 90%)',
                                    }
                                }}
                                disabled={loading}
                            >
                                {loading ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    "Login"
                                )}
                            </Button>

                            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                                New user?{' '}
                                <Link href="/register" color="primary" underline="hover">
                                    Register here
                                </Link>
                            </Typography>
                        </form>
                    </CardContent>
                </Card>
            </Box>

            {/* Success Toast */}
            <Snackbar
                open={success}
                autoHideDuration={2000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    icon={<CheckCircle fontSize="inherit" />}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Login successful! Redirecting...
                </Alert>
            </Snackbar>
    </>
)
}
