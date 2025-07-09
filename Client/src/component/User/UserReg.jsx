import React, { useRef, useState, } from 'react';
import AXIOS from 'axios';
import HomeNav from '../Home/homeNav';
import { useNavigate } from 'react-router-dom';
// import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';

import {
  Card,
  CardContent,
  Container,
  TextField,
  Button,
  Typography,
  Link,
  Box,
  InputAdornment,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
  Snackbar,
  Alert,
  Divider,
  Avatar,
  IconButton
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Phone as PhoneIcon,
  Home as HomeIcon,
  Cake as CakeIcon,
  Male as MaleIcon,
  Female as FemaleIcon,
  Transgender as OtherIcon,
  CameraAlt as CameraIcon,
  Close as CloseIcon,
  CheckCircle,
  Visibility,
  VisibilityOff,
} from '@mui/icons-material';

//=============BG============
import bgImage from '../Home/HomeImage/blended.png'
import travistraBgImage from '../Home/HomeImage/travitsralogobg1.jpeg'

import { motion } from 'framer-motion';


export default function UserReg() {

  const [record, setRecord] = useState({
    username: "",
    address: "",
    email: "",
    password: "",
    dob: '',
    phone: '',
    gender: '',
  });

  const [profileImage, setProfileImage] = useState(null);
  const [profilePrev, setProfilePrev] = useState(null);
  const [image, setImage] = useState(null);
  const [imagePrev, setImagePrev] = useState(null);
  const profileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // const handleChange = (e) => {
  //   setRecord({ ...record, [e.target.name]: e.target.value })
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'username') {
      // Allow only letters (both uppercase and lowercase)
      const lettersOnly = /^[A-Za-z\s]*$/;
      if (!lettersOnly.test(value)) return;
    } else if (name === 'phone') {
      const numbersOnly = /^[0-9]{0,10}$/;
      if (!numbersOnly.test(value)) return;
    }

    setRecord((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleProfileImage = (e) => {
    const file = e.target.files[0]
    setProfileImage(file);
    if (file) {
      setProfilePrev(URL.createObjectURL(file));
    }
  }
  const handleRemoveProfileImage = () => {
    setProfileImage(null);
    setProfilePrev(null);
    if (profileInputRef.current) {
      profileInputRef.current.value = '';
    }
  }

  const handleImage = (e) => {
    const file = e.target.files[0]
    setImage(file);
    if (file) {
      setImagePrev(URL.createObjectURL(file));
    }
  }
  const handleRemoveImage = () => {
    setImage(null);
    setImagePrev(null);
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(record)

    const formData = new FormData();
    formData.append('username', record.username);
    formData.append('address', record.address);
    formData.append('email', record.email);
    formData.append('password', record.password);
    formData.append('dob', record.dob);
    formData.append('phone', record.phone);
    formData.append('gender', record.gender);
    if (!record.gender) {
      return setError('Gender is required')
    }
    if (profileImage) {
      formData.append('profile_image', profileImage)
    }
    if (image) {
      formData.append('image', image);
    } else {
      return setError('ID Photo is Required')
    }
    try {
      const res = await AXIOS.post("http://localhost:4000/api/user/register", formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
      if (res.data.status === 200) {
        setSuccess(true);
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(res.data.msg);
      }
    } catch (err) {
      console.log(err)
      setError("Registration failed");
    } finally {
      setLoading(false);
    }
  }

  const handleCloseSnackbar = () => {
    setSuccess(false);
    setError(null);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };


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


  return (
    <>
      <HomeNav />
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
      {/* ============Reg=================== */}
      <motion.div initial="hidden"
        animate="visible"
        variants={staggerContainer}>
        <motion.div variants={slideUp}>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '80vh',
              // background: 'linear-gradient(135deg,rgb(13, 13, 14) 0%, #c3cfe2 100%)',
              p: 2
            }}
          >
            <Card
              sx={{
                width: '100%',
                maxWidth: 900,
                boxShadow: 3,
                borderRadius: 2,
                overflow: 'hidden'
              }}
            >
              <Box
                sx={{
                  background: 'linear-gradient(45deg,rgb(36, 37, 41) 30%,rgb(88, 96, 103) 90%)',
                  color: 'white',
                  textAlign: 'center',
                  py: 3
                }}
              >
                <Typography variant="h4" component="h1">
                  Registration
                </Typography>
                <Typography variant="subtitle1">
                  Create your account
                </Typography>
              </Box>

              <CardContent sx={{ p: 4 }}>
                {error && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                  </Alert>
                )}

                <form onSubmit={handleSubmit}>
                  {/* Basic Info Row */}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
                    <TextField
                      fullWidth
                      label="Username"
                      name="username"
                      value={record.username}
                      onChange={handleChange}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PersonIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ flex: '1 1 200px' }}
                    />
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={record.phone}
                      onChange={handleChange}
                      pattern="[0-9]{10}"
                      required
                      inputProps={{ pattern: "[0-9]{10}" }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PhoneIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ flex: '1 1 200px' }}
                    />
                    <TextField
                      fullWidth
                      label="Date of Birth"
                      name="dob"
                      type="date"
                      value={record.dob}
                      onChange={handleChange}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CakeIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                      InputLabelProps={{ shrink: true }}
                      sx={{ flex: '1 1 200px' }}
                    />
                  </Box>

                  {/* Gender, Address, Email, Password */}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
                    <FormControl sx={{ flex: '1 1 200px' }}>
                      <FormLabel>Gender<sup> *</sup></FormLabel>
                      <RadioGroup
                        row
                        name="gender"
                        value={record.gender}
                        onChange={handleChange}
                        required
                      >
                        <FormControlLabel
                          value="male"
                          control={<Radio />}
                          label={<Box sx={{ display: 'flex', alignItems: 'center' }}><MaleIcon sx={{ mr: 1 }} /> Male</Box>}
                        />
                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          label={<Box sx={{ display: 'flex', alignItems: 'center' }}><FemaleIcon sx={{ mr: 1 }} /> Female</Box>}
                        />
                        <FormControlLabel
                          value="other"
                          control={<Radio />}
                          label={<Box sx={{ display: 'flex', alignItems: 'center' }}><OtherIcon sx={{ mr: 1 }} /> Other</Box>}
                        />
                      </RadioGroup>
                    </FormControl>
                    <TextField
                      fullWidth
                      label="Address"
                      name="address"
                      value={record.address}
                      onChange={handleChange}
                      required
                      multiline
                      rows={2}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <HomeIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ flex: '1 1 300px' }}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={record.email}
                      onChange={handleChange}
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <EmailIcon color="action" />
                          </InputAdornment>
                        ),
                      }}
                      sx={{ flex: '1 1 300px' }}
                    />
                    <TextField
                      fullWidth
                      label="Password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={record.password}
                      onChange={handleChange}
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
                      sx={{ flex: '1 1 300px' }}
                    />
                  </Box>

                  <Divider sx={{ my: 3 }} />

                  {/* Image Uploads */}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mb: 3 }}>
                    <Box sx={{ flex: '1 1 300px' }}>
                      <Typography variant="subtitle1" gutterBottom>
                        Profile Image (Optional)
                      </Typography>
                      <Button
                        variant="outlined"
                        component="label"
                        startIcon={<CameraIcon />}
                        fullWidth
                      >
                        Upload Profile Image
                        <input
                          type="file"
                          hidden
                          onChange={handleProfileImage}
                          ref={profileInputRef}
                          accept="image/*"
                        />
                      </Button>
                      {profilePrev && (
                        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar
                            src={profilePrev}
                            alt="Profile Preview"
                            sx={{ width: 80, height: 80 }}
                          />
                          <IconButton color="error" onClick={handleRemoveProfileImage}>
                            <CloseIcon />
                          </IconButton>
                        </Box>
                      )}
                    </Box>

                    <Box sx={{ flex: '1 1 300px' }}>
                      <Typography variant="subtitle1" gutterBottom>
                        ID Photo (Required)
                      </Typography>
                      <Button
                        variant="outlined"
                        component="label"
                        startIcon={<CameraIcon />}
                        fullWidth
                        required
                      >
                        Upload ID Photo
                        <input
                          type="file"
                          hidden
                          onChange={handleImage}
                          ref={imageInputRef}
                          accept="image/*"
                        />
                      </Button>
                      {imagePrev && (
                        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                          <Avatar
                            src={imagePrev}
                            alt="ID Preview"
                            sx={{ width: 80, height: 80 }}
                            variant='rounded'
                          />
                          <IconButton color="error" onClick={handleRemoveImage}>
                            <CloseIcon />
                          </IconButton>
                        </Box>
                      )}
                    </Box>
                  </Box>

                  <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      sx={{
                        px: 6,
                        py: 1.5,
                        background: 'linear-gradient(45deg,rgb(44, 44, 49) 30%,rgb(97, 106, 114) 90%)',
                        '&:hover': {
                          background: 'linear-gradient(45deg,rgb(25, 26, 28) 30%,rgb(30, 32, 34) 90%)',
                        }
                      }}
                      disabled={loading}
                    >
                      {loading ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        "Register"
                      )}
                    </Button>
                  </Box>

                  <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                    Already have an account?{' '}
                    <Link href="/login" color="primary" underline="hover">
                      Login here
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
        sx={{mt:8,mr:2}}
      >
        <Alert
          icon={<CheckCircle fontSize="inherit" />}
          severity="success"
          variant='standard'
          sx={{ width: '100%' }}
        >
          Registration successful!  Redirecting to login...
        </Alert>
      </Snackbar>
    </>

  );
}