import React, { useState } from 'react'
import AXIOS from 'axios'
import { useNavigate } from 'react-router-dom';
import HomeNav from './Home/homeNav';
import {
    Card,
    CardContent,
    TextField,
    Container,
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

//=============BG============
import bgImage from './Home/HomeImage/blended.png'
import travistraBgImage from './Home/HomeImage/travitsralogobg1.jpeg'

import { motion } from 'framer-motion';



export default function Login() {

    // ===========BG==============
    const fadeIn = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: .8 } }
    };

    const slideUp = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 1.5 } }
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

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const res = await AXIOS.post("http://localhost:4000/api/user/login", record)
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
            {/* ============BG=================== */}
            {/* === Fixed Background === */}
            <div
                style={{
                    position: 'fixed',
                    top: 70,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'black',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: -1,
                    filter: 'blur(2px)',
                    transform: 'scale(1.05)',
                }}
            >
                <style>
                    {`
                        @keyframes animateBg {
                          0% { background-position-x: 0; }
                              100% { background-position-x: -200px; }
                                         }
                            @keyframes bounceUp {
                           0%, 100% {
                                        transform: translateY(0);
                                    }
                                      50% {
                                   transform: translateY(-6px);
                                          }
                                    }
                            `}
                </style>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={staggerContainer}>

                    <h1 id='travistrahead' style={{
                        marginTop: '-30px',
                        textAlign: 'center',
                        zIndex: -1,
                        fontSize: '15vw',
                        fontFamily: "'Cinzel', serif",
                        backgroundImage: `url(${travistraBgImage})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',       // needed for Safari/Chrome
                        color: 'rgba(255, 255, 255, 0.5)',
                        animation: 'animateBg 10s linear infinite',
                    }}>
                        <motion.div variants={slideUp}>
                            Travistra
                        </motion.div>
                    </h1>


                    {/* ==================Hero================== */}
                    <motion.div variants={fadeIn}>
                        <div style={{ padding: 70, backgroundColor: 'transparent', marginTop: '-150px' }}>

                            <Box
                                component="section" id="/"
                                sx={{
                                    position: 'relative',
                                    width: '100%',
                                    height: '700px',
                                    // clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)',
                                    // backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1530789253388-582c481c54b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
                                    backgroundImage: `url(${bgImage})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginTop: -9,
                                    color: 'white',
                                }}
                            >
                                <Container maxWidth="md" sx={{ textAlign: 'center', }}>
                                    <Typography variant="h2" fontWeight="bold" gutterBottom>
                                        Discover the World with Us
                                    </Typography>
                                    <Typography variant="h5" sx={{ mb: 4 }}>
                                        Unforgettable adventures await. Experience breathtaking destinations
                                        with our expert guides.
                                    </Typography>
                                </Container>
                            </Box>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
            {/* ============Login=================== */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}>
                <motion.div variants={slideUp}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minHeight: '80vh',
                            // background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
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
                                    background: 'linear-gradient(45deg,rgb(18, 18, 23) 30%,rgb(116, 123, 129) 90%)',
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
                                            background: 'linear-gradient(45deg,rgb(36, 37, 43) 30%,rgb(121, 129, 135) 90%)',
                                            '&:hover': {
                                                background: 'linear-gradient(45deg,rgb(8, 8, 9) 30%,rgb(22, 24, 26) 90%)',
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
                </motion.div>
            </motion.div>

            {/* Success Toast */}
            <Snackbar
                open={success}
                autoHideDuration={2000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                sx={{ mt: 6 }}
            >
                <Alert
                    icon={<CheckCircle fontSize="inherit" />}
                    severity="success"
                    variant='standard'
                    sx={{ width: '100%' }}
                >
                    Login successful! Redirecting...
                </Alert>
            </Snackbar>
        </>
    )
}