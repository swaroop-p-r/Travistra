import React, { useEffect, useState } from 'react';
import {
  CalendarIcon,
  MapIcon,
  MapPinIcon,
  XIcon,
  MenuIcon,
  Clock,
  MapPin,
  Star,
  Users,
  CheckIcon, GlobeIcon, ShieldIcon, UserIcon,
  Mail, Phone,



} from 'lucide-react';
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Divider,
  Avatar,
  ListItemIcon,
  TextField,
  Paper,
  Link,
  Alert,
  Snackbar,

} from '@mui/material';

import {
  Facebook, Twitter, Instagram, YouTube,
  LocationOn,
  CheckCircle,

} from '@mui/icons-material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import HomeNav from './homeNav';



import bgImage from './HomeImage/blended.png'
import travistraBgImage from './HomeImage/travitsralogobg1.jpeg'

import { motion } from 'framer-motion';



export default function HomePg() {

  useEffect(() => {




    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        // Delay a bit to make sure all DOM is rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, []);

  // ===============================Heder==================
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const menuItems = [
    { label: 'Home', href: '#' },
    { label: 'Tours', href: '#tours' },
    { label: 'About', href: '#about' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  const toggleDrawer = () => setIsMenuOpen(!isMenuOpen);

  // ========================Tours==========================
  const tours = [
    {
      id: 1,
      title: 'Alpine Mountain Adventure',
      location: 'Swiss Alps',
      image:
        'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      price: 1299,
      duration: '7 days',
      rating: 4.8,
      groupSize: '10 people',
    },
    {
      id: 2,
      title: 'Tropical Island Getaway',
      location: 'Bali, Indonesia',
      image:
        'https://images.unsplash.com/photo-1520454974749-611b7248ffdb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      price: 1499,
      duration: '10 days',
      rating: 4.9,
      groupSize: '8 people',
    },
    {
      id: 3,
      title: 'Ancient City Exploration',
      location: 'Rome, Italy',
      image:
        'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1996&q=80',
      price: 1099,
      duration: '5 days',
      rating: 4.7,
      groupSize: '12 people',
    },
  ]

  // ==================test=========================
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80',
      text: 'Our trip to the Swiss Alps was absolutely incredible! The guides were knowledgeable and the views were breathtaking. I would highly recommend Travistra to anyone looking for an unforgettable adventure.',
      location: 'New York, USA',
      rating: 5,
    },
    {
      id: 2,
      name: 'Michael Chen',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80',
      text: 'The Bali tour exceeded all my expectations. The itinerary was perfectly balanced between adventure and relaxation. Our guide was fantastic and made sure we experienced the authentic culture of the island.',
      location: 'Toronto, Canada',
      rating: 5,
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      image:
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=1961&q=80',
      text: "Rome was magical! The historical tours were informative and engaging. I appreciated the small group size which allowed for a more personal experience. I'll definitely be booking with Travistra again.",
      location: 'London, UK',
      rating: 4,
    },
  ]
  // ====================About============================
  const features = [
    {
      icon: <GlobeIcon style={{ color: '#2563eb' }} />,
      title: 'Expert Local Guides',
      description:
        "Our guides are certified experts with deep knowledge of each destination's history, culture, and hidden gems.",
    },
    {
      icon: <ShieldIcon style={{ color: '#2563eb' }} />,
      title: 'Safe and Secure',
      description:
        'Your safety is our priority. We follow strict safety protocols and are fully insured for all activities.',
    },
    {
      icon: <UserIcon style={{ color: '#2563eb' }} />,
      title: 'Small Group Sizes',
      description:
        'We keep our groups small to ensure a personalized experience and minimize environmental impact.',
    },
  ]

  const points = [
    'Sustainable and responsible travel practices',
    'Authentic cultural experiences',
    'Handpicked accommodations with character',
    'Flexible itineraries with free time built-in',
  ]
  // =======================Contact=================================
  // =========================footer====================================
  const destinations = [
    'Swiss Alps',
    'Bali, Indonesia',
    'Rome, Italy',
    'Tokyo, Japan',
    'New York, USA',
    'Paris, France',
  ];

  const quickLinks = [
    { name: 'Home', href: '#' },
    { name: 'Tours', href: '#tours' },
    { name: 'About Us', href: '#about' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
    { name: 'Privacy Policy', href: '#' },
  ];



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

  const [success, setSuccess] = useState(false);

  const handleLogin = () => {
    setSuccess(true);
  }
  const handleCloseSnackbar = () => {
    setSuccess(false);
  };


  return (
    <>
      <div style={{ backgroundColor: 'black' }}>

        <HomeNav />
        {/* ====================Header============================= */}


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
                  <br />
                  <br />
                  <br />
                  <Stack

                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                    justifyContent="center"
                  >

                    <Button
                      onClick={handleLogin}
                      variant="contained"
                      color="primary"
                      startIcon={<CalendarIcon size={20} />}
                    >
                      Book a Tour
                    </Button>
                    <Button
                      onClick={handleLogin}
                      variant="outlined"
                      color="inherit"
                      startIcon={<MapIcon size={20} />}
                      sx={{
                        borderColor: 'white',
                        '&:hover': {
                          backgroundColor: 'white',
                          color: 'black',
                        },
                      }}
                    >
                      Explore Destinations
                    </Button>
                  </Stack>
                </Container>
              </Box>
            </div>
          </motion.div>
        </motion.div>
        {/* ===================LOGO========================= */}
        {/* <MouseAttractText/> */}
        {/* ==================Tour========================== */}
        <Box component="section" id="tours" sx={{ py: 8, bgcolor: 'transparent', width: '100%' }}>
          <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2 }}>
            <Box textAlign="center" mb={6}>
              <Typography color='white' variant="h4" fontWeight="bold" gutterBottom>
                Featured Tours
              </Typography>
              <Typography variant="body1" color="white" maxWidth={600} mx="auto">
                Explore our most popular destinations with hand-crafted itineraries designed to maximize your experience.
              </Typography>
            </Box>

            <Grid
              container
              spacing={4}
              justifyContent="center"
              alignItems="stretch"
            >
              {tours.map((tour) => (
                <Grid key={tour.id} sx={{ display: 'flex' }}>
                  <Card
                    elevation={4}
                    sx={{
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: 460, // fixed height for uniformity
                      // width:320,
                      transition: 'transform 0.3s',
                      '&:hover': { transform: 'scale(1.03)' },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="220"
                      image={tour.image}
                      alt={tour.title}
                    />
                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <Box display="flex" alignItems="center" mb={1}>
                        <MapPin size={16} style={{ color: '#2563eb', marginRight: 4 }} />
                        <Typography variant="caption" color="text.secondary">
                          {tour.location}
                        </Typography>
                      </Box>

                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {tour.title}
                      </Typography>

                      <Box display="flex" justifyContent="space-between" mb={2}>
                        <Box display="flex" alignItems="center">
                          <Clock size={16} style={{ marginRight: 4, color: '#6b7280' }} />
                          <Typography variant="caption" color="text.secondary">
                            {tour.duration}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                          <Users size={16} style={{ marginRight: 4, color: '#6b7280' }} />
                          <Typography variant="caption" color="text.secondary">
                            {tour.groupSize}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                          <Star size={16} style={{ marginRight: 4, color: '#facc15' }} />
                          <Typography variant="caption" color="text.secondary">
                            {tour.rating}
                          </Typography>
                        </Box>
                      </Box>

                      <Divider sx={{ my: 1 }} />

                      <Box mt="auto" display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" color="primary" fontWeight="bold">
                          ${tour.price}
                        </Typography>
                        <Button
                          onClick={handleLogin}
                          variant='outlined'
                          color='info'
                          size="small">
                          Book Now
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>


            <Box textAlign="center" mt={6}>
              <Button
                onClick={handleLogin}
                // variant="outlined"
                color='info'
                sx={{ bgcolor: 'transparent', px: 4, py: 1.5, textTransform: 'none', fontWeight: 500 }}
              >
                View All Tours
              </Button>
            </Box>
          </Box>
        </Box>


        {/* =====================test========================== */}
        <Box component="section" id="testimonials" sx={{ py: 8, bgcolor: 'transparent', width: '100%' }}>
          <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2 }}>
            <Box textAlign="center" mb={6}>
              <Typography variant="h4" fontWeight="bold" gutterBottom color="white">
                What Our Travelers Say
              </Typography>
              <Typography padding={3} variant="body1" color="white" maxWidth={600} mx="auto">
                Don&apos;t just take our word for it. Hear from travelers who&apos;ve experienced our tours firsthand.
              </Typography>
            </Box>

            {/* Horizontal Scrollable Card Row */}
            <Box
              sx={{
                display: 'flex',
                gap: 3,
                overflowX: 'auto',
                scrollSnapType: 'x mandatory',
                pb: 1,
              }}
            >
              {testimonials.map((testimonial) => (
                <Card
                  key={testimonial.id}
                  sx={{
                    width: 370,
                    flex: '0 0 auto',
                    backgroundColor: '#f9fafb',
                    borderRadius: 2,
                    p: 2,
                    boxShadow: 2,
                    scrollSnapAlign: 'start',
                  }}
                >
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <Avatar
                        src={testimonial.image}
                        alt={testimonial.name}
                        sx={{ width: 70, height: 70, mr: 4 }}
                      />
                      <Box>
                        <Typography paddingBottom={1} fontWeight="bold" color="text.primary">
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.location}
                        </Typography>
                      </Box>
                    </Box>

                    <Box display="flex" mb={1}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          style={{
                            color: i < testimonial.rating ? '#facc15' : '#e5e7eb',
                            marginRight: 4,
                            fill: i < testimonial.rating ? '#facc15' : 'none',
                            paddingTop: 2
                          }}
                        />
                      ))}
                    </Box>

                    <Typography paddingTop={2} variant="body2" color="text.secondary" fontStyle="italic">
                      "{testimonial.text}"
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        </Box>

        {/* ============================About================================= */}
        <Box component="section" id="about" sx={{ py: 8, bgcolor: 'transparent', width: '100%' }}>
          <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2 }}>
            <Grid container spacing={6} alignItems="center">
              {/* Text Section */}
              <Grid>
                <Typography variant="h4" fontWeight="bold" gutterBottom color="white">
                  About Travistra
                </Typography>

                <Typography variant="body1" color="white" paragraph>
                  Founded in 2010, Travistra has been creating unforgettable travel experiences
                  for over a decade. We believe in sustainable tourism that benefits local communities
                  while providing authentic adventures for our travelers.
                </Typography>

                <Typography variant="body1" color="white" paragraph>
                  Our team of experienced travel experts designs each tour to showcase the best of each
                  destination, from iconic landmarks to hidden local treasures.
                </Typography>

                <List dense disablePadding>
                  {points.map((point, i) => (
                    <ListItem key={i} sx={{ pl: 0 }}>
                      <ListItemIcon sx={{ minWidth: 30 }}>
                        <CheckIcon size={18} style={{ color: '#22c55e' }} />
                      </ListItemIcon>
                      <ListItemText primary={point} primaryTypographyProps={{ color: 'white' }} />
                    </ListItem>
                  ))}
                </List>
              </Grid>

              {/* Image Section */}
              <Grid>
                <Grid container spacing={2}>
                  <Grid maxWidth={150}>
                    <Box
                      sx={{
                        height: 260,
                        borderRadius: 2,
                        overflow: 'hidden',
                      }}
                    >
                      <img
                        src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=1974&q=80"
                        alt="Tour group hiking"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </Box>
                  </Grid>
                  <Grid >
                    <Box sx={{ height: 200, borderRadius: 2, overflow: 'hidden' }}>
                      <img
                        src="https://images.unsplash.com/photo-1504150558240-0b4fd8946624?auto=format&fit=crop&w=1964&q=80"
                        alt="Local market"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </Box>
                  </Grid>
                  <Grid>
                    <Box sx={{ height: 200, borderRadius: 2, overflow: 'hidden' }}>
                      <img
                        src="https://images.unsplash.com/photo-1519055548599-6d4d129508c4?auto=format&fit=crop&w=1970&q=80"
                        alt="Beachside relaxation"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/* Features Section */}
            <Grid container spacing={4} mt={6} justifyContent={'center'}>
              {features.map((feature, index) => (
                <Grid key={index}>
                  <Card
                    sx={{
                      p: 3,
                      maxWidth: 280,
                      borderRadius: 2,
                      backgroundColor: '#ffffff',
                      height: '100%',
                      boxShadow: 2,
                    }}
                  >
                    <CardContent>
                      <Box mb={2}>{feature.icon}</Box>
                      <Typography variant="h6" fontWeight="bold" gutterBottom color="text.primary">
                        {feature.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
        {/* =========================contact============================ */}
        <Box component="section" id="contact" sx={{ py: 8, bgcolor: 'transparent' }}>
          <Box sx={{ maxWidth: 1200, mx: 'auto', px: 2 }}>
            {/* Section Heading */}
            <Box textAlign="center" mb={6}>
              <Typography variant="h4" fontWeight="bold" gutterBottom color="white">
                Contact Us
              </Typography>
              <Typography variant="body1" color="white" maxWidth="600px" mx="auto">
                Have questions about our tours or need help planning your next adventure? Get in touch
                with our travel experts.
              </Typography>
            </Box>

            {/* Content Grid */}
            <Grid container spacing={6}>
              {/* Contact Form */}
              <Grid >
                <Paper elevation={1} sx={{ p: 4, bgcolor: '#f9fafb' }}>
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Send Us a Message
                  </Typography>
                  <Grid container spacing={2} mt={1}>
                    <Grid >
                      <TextField fullWidth label="Full Name" placeholder="John Doe" />
                    </Grid>
                    <Grid >
                      <TextField fullWidth label="Email Address" placeholder="john@example.com" />
                    </Grid>
                  </Grid>
                  <Box my={2}>
                    <TextField fullWidth label="Subject" placeholder="Tour Inquiry" />
                  </Box>
                  <Box mb={3}>
                    <TextField
                      fullWidth
                      label="Message"
                      multiline
                      rows={4}
                      placeholder="Tell us about your travel plans or questions..."
                    />
                  </Box>
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    sx={{ bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
                  >
                    Send Message
                  </Button>
                </Paper>
              </Grid>

              {/* Contact Info */}
              <Grid marginLeft={18} >
                <Typography color='white' variant="h5" fontWeight="bold" gutterBottom>
                  Contact Information
                </Typography>

                <Box maxHeight={70} mt={3} display="flex" gap={2}>
                  <MapPin style={{ color: 'white', marginTop: 4 }} />
                  <Box>
                    <Typography fontWeight="bold" color='white'>Our Office</Typography>
                    <Typography color="white">
                      123 Adventure Avenue
                      <br />
                      Traveler's District
                      <br />
                      San Francisco, CA 94103
                    </Typography>
                  </Box>
                </Box>

                <Box maxHeight={50} mt={4} display="flex" gap={2}>
                  <Phone style={{ color: 'white', marginTop: 4 }} />
                  <Box>
                    <Typography color='white' fontWeight="bold">Phone</Typography>
                    <Typography color="white">+1 (555) 123-4567</Typography>
                    <Typography color="white">Mon-Fri 9:00 AM - 6:00 PM PT</Typography>
                  </Box>
                </Box>

                <Box maxHeight={50} mt={4} display="flex" gap={2}>
                  <Mail style={{ color: 'white', marginTop: 4 }} />
                  <Box>
                    <Typography color='white' fontWeight="bold">Email</Typography>
                    <Typography color="white">info@travistra.com</Typography>
                    <Typography color="white">bookings@travistra.com</Typography>
                  </Box>
                </Box>


                <Divider sx={{ my: 4 }} />

                {/* Social Media */}
                <Typography color='white' variant="h6" fontWeight="bold" gutterBottom>
                  Follow Us
                </Typography>
                <Box display="flex" gap={2}>
                  <IconButton
                    href="#"
                    sx={{
                      bgcolor: '#e5e7eb',
                      '&:hover': { bgcolor: '#2563eb', color: '#fff' },
                    }}
                  >
                    <Facebook />
                  </IconButton>
                  <IconButton
                    href="#"
                    sx={{
                      bgcolor: '#e5e7eb',
                      '&:hover': { bgcolor: '#2563eb', color: '#fff' },
                    }}
                  >
                    <Twitter />
                  </IconButton>
                  <IconButton
                    href="#"
                    sx={{
                      bgcolor: '#e5e7eb',
                      '&:hover': { bgcolor: '#2563eb', color: '#fff' },
                    }}
                  >
                    <Instagram />
                  </IconButton>
                  <IconButton
                    href="#"
                    sx={{
                      bgcolor: '#e5e7eb',
                      '&:hover': { bgcolor: '#2563eb', color: '#fff' },
                    }}
                  >
                    <YouTube />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* ============================footer=============================== */}
        <Box component="footer" sx={{ bgcolor: 'grey.900', color: 'white', py: 8 }}>
          <Box className="container" sx={{ px: 2, mx: 'auto' }}>
            <Grid container spacing={4}>
              <Grid >
                <Box display="flex" alignItems="center" mb={2}>
                  <LocationOn sx={{ color: 'primary.main', mr: 1 }} />
                  <Typography variant="h6" fontWeight="bold">
                    Travistra
                  </Typography>
                </Box>
                <Typography variant="body2" color="grey.400" mb={2}>
                  Crafting unforgettable travel experiences since 2010. Your journey begins with us.
                </Typography>
                <Box display="flex" gap={1}>
                  {[Facebook, Twitter, Instagram, YouTube].map((Icon, index) => (
                    <IconButton
                      key={index}
                      size="small"
                      sx={{
                        bgcolor: 'grey.800',
                        color: 'white',
                        '&:hover': { bgcolor: 'primary.main' },
                      }}
                    >
                      <Icon fontSize="small" />
                    </IconButton>
                  ))}
                </Box>
              </Grid>

              <Grid >
                <Typography variant="h6" gutterBottom>
                  Popular Destinations
                </Typography>
                {destinations.map((place) => (
                  <Link
                    key={place}
                    href="#"
                    underline="hover"
                    variant="body2"
                    sx={{ display: 'block', color: 'grey.400', '&:hover': { color: 'primary.main' } }}
                  >
                    {place}
                  </Link>
                ))}
              </Grid>

              <Grid >
                <Typography variant="h6" gutterBottom>
                  Quick Links
                </Typography>
                {quickLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    underline="hover"
                    variant="body2"
                    sx={{ display: 'block', color: 'grey.400', '&:hover': { color: 'primary.main' } }}
                  >
                    {link.name}
                  </Link>
                ))}
              </Grid>

              <Grid >
                <Typography variant="h6" gutterBottom>
                  Newsletter
                </Typography>
                <Typography variant="body2" color="grey.400" mb={2}>
                  Subscribe to our newsletter for travel tips, new tours, and special offers.
                </Typography>
                <Box display="flex">
                  <TextField
                    size="small"
                    placeholder="Your email"
                    variant="outlined"
                    sx={{
                      bgcolor: 'grey.800',
                      input: { color: 'white' },
                      mr: 1,
                      flexGrow: 1,
                    }}
                  />
                  <Button variant="contained" color="primary">
                    Subscribe
                  </Button>
                </Box>
              </Grid>
            </Grid>

            <Divider sx={{ bgcolor: 'grey.800', my: 4 }} />

            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <Grid >
                <Typography variant="body2" color="grey.400">
                  © {new Date().getFullYear()} Travistra. All rights reserved.
                </Typography>
              </Grid>
              <Grid >
                <Box display="flex" gap={3}>
                  {['Terms of Service', 'Privacy Policy', 'Cookie Policy'].map((text) => (
                    <Link
                      key={text}
                      href="#"
                      underline="hover"
                      variant="body2"
                      sx={{ color: 'grey.400', '&:hover': { color: 'primary.main' } }}
                    >
                      {text}
                    </Link>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </div>

      {/* Success Toast */}
      <Snackbar
        open={success}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ mt: 6, mr: 2 }}
      >
        <Alert
          icon={false}
          severity='success'
          variant='standard'
          sx={{ width: '100%', display: 'flex', alignItems: 'center' }}
        >
          Login Here
          <KeyboardArrowUpIcon
            sx={{
              ml: 1,
              animation: 'bounceUp 1s infinite',
              fontSize: '1.5rem',
            }}
          />
        </Alert>
      </Snackbar>
    </>
  );
}
