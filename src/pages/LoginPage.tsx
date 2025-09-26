// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Link,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email: string): string => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      return 'Email Id is required.';
    }
    
    // Basic email regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return 'Please enter a valid email address.';
    }
    
    return '';
  };

  const validatePassword = (password: string): string => {
    if (!password) {
      return 'Password is required.';
    }
    return '';
  };

  const handleInputChange = (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear errors when user starts typing
    if (field === 'email' && errors.email) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
    if (field === 'password' && errors.password) {
      setErrors(prev => ({ ...prev, password: '' }));
    }
  };

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
      });
      return;
    }

    console.log('Login Data:', formData);
    // Navigate to step1 after successful login
    navigate('/step1');
  };

  const handleReset = () => {
    setFormData({
      email: '',
      password: '',
    });
    setErrors({
      email: '',
      password: '',
    });
  };

  const isLoginDisabled =
    !formData.email.trim() ||
    !formData.password.trim() ||
    !!errors.email ||
    !!errors.password;

  return (
    <Box
      component="main"
      sx={{
        // Set fixed desktop height
        minHeight: { xs: '100vh', lg: '923px' }, 
        maxWidth: { lg: '1440px' },
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'row' },
        overflowY: 'auto', 
      }}
    >
      {/* LEFT: Blue marketing panel (mobile: top, desktop: left) */}
      <Box
        sx={{
          // FIXED DESKTOP DIMENSIONS
          width: { xs: '100%', lg: '708px' },
          height: { xs: '392px', lg: '923px' }, // Match total height
          
          backgroundColor: '#003473',
          color: '#FFFFFF',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          
          // Apply specified desktop padding for vertical centering of content
          justifyContent: { xs: 'flex-start', lg: 'center' },
          pt: { xs: 3, lg: '164px' }, 
          pb: { xs: 4, lg: '164px' },
          px: { xs: 3, lg: '144px' }, 
          gap: { lg: '10px' }, 
        }}
      >
        {/* Logo (top-left absolute on desktop) */}
        <Box
          component="img"
          src="/images/logo.png"
          alt="Patterson Dental Logo"
          sx={{
            position: { xs: 'relative', lg: 'absolute' },
            top: { lg: '33px' }, 
            left: { lg: '53px' }, 
            
            // >>>>>> CORRECTED LOGO DIMENSIONS BASED ON YOUR LATEST SPECS <<<<<<
            width: { xs: '41px', lg: '113px' }, 
            height: { xs: '19px', lg: '53px' },   
            objectFit: 'contain',
            
            // Mobile alignment within the blue box
            alignSelf: {xs: 'flex-start', lg: 'auto'},
            mt: { xs: 1, lg: 0 },
            mb: { xs: 2, lg: 0 },
            // Removed specific mobile left margin as alignSelf and parent padding should handle it
          }}
        />

        {/* Image */}
        <Box
          component="img"
          src="/images/dental.png"
          alt="Dental Office"
          sx={{
            width: { xs: 167, lg: 420 },
            height: { xs: 134, lg: 348 },
            borderRadius: '10px',
            objectFit: 'cover',
            mt: { xs: 3, lg: 0 },
            mb: { xs: 2, lg: 4 },
          }}
        />

        {/* Text block */}
        <Box
          sx={{
            textAlign: 'center',
            px: { xs: 2, lg: 4 },
            maxWidth: { xs: 280, lg: '480px' },
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Poppins, Roboto, Arial, sans-serif',
              fontWeight: 700,
              fontSize: { xs: '24px', lg: '2.5rem' },
              lineHeight: 1.1,
              mb: { xs: 0.5, lg: 1 },
            }}
          >
            Patterson Dental
          </Typography>

          <Typography
            sx={{
              fontFamily: 'Poppins, Roboto, Arial, sans-serif',
              fontWeight: 400,
              fontSize: { xs: '16px', lg: '1.25rem' },
              mb: { xs: 1, lg: 1.5 },
            }}
          >
            Patterson equipment solutions
          </Typography>

          <Typography
            sx={{
              fontFamily: 'Inter, Roboto, Arial, sans-serif',
              fontWeight: 400,
              fontSize: { xs: '12px', lg: '1rem' },
              lineHeight: 1.5,
            }}
          >
            Access your account to explore our Comprehensive range of dental equipment and innovative solutions
          </Typography>
        </Box>
      </Box>

      {/* RIGHT: Form panel (mobile: below, desktop: right) */}
      <Box
        sx={{
          flex: 1,
          minHeight: { xs: 'auto', lg: '923px' }, // Match left height
          
          // KEEP SIGNUP BOX IN MIDDLE OF RIGHT SECTION
          display: 'flex',
          alignItems: 'center', // Centers vertically
          justifyContent: 'center', // Centers horizontally
          
          backgroundColor: '#FFFFFF',
          pt: { xs: '42px', lg: 0 },
          pb: { xs: '42px', lg: 0 },
          px: { xs: '32px', lg: 4 },
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            width: { xs: '100%', sm: '100%', md: '470px' },
            maxWidth: { xs: '326px', md: '470px' },
            borderRadius: { xs: '10px', md: '12px' },
            border: { xs: 'none', md: '1px solid #E6E7EA' },
            p: { xs: 0, md: 4 },
            backgroundColor: '#FFFFFF',
            boxShadow: { xs: 'none', md: '0 1px 2px rgba(10,13,18,0.04)' },
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}
        >
          {/* Title */}
          <Typography
            sx={{
              fontFamily: 'Poppins, Roboto, Arial, sans-serif',
              fontWeight: 600,
              fontSize: { xs: '24px', md: '2rem' },
              textAlign: 'center',
              color: '#4B5563',
              mt: { xs: 0, md: 1 },
            }}
          >
            Login
          </Typography>

          {/* Form fields - Wrapped in a semantic <form> element */}
          <Box component="form" onSubmit={handleLogin} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            
            {/* Email Id */}
            <Box>
              <Typography
                sx={{
                  fontFamily: 'Inter, Arial, sans-serif',
                  fontWeight: 500,
                  fontSize: '14px',
                  color: '#414651',
                  mb: 1,
                }}
              >
                Enter Email Id*
              </Typography>
              <TextField
                fullWidth
                type="email"
                placeholder="Enter Email Id"
                value={formData.email}
                onChange={handleInputChange('email')}
                variant="outlined"
                required
                error={!!errors.email}
                helperText={errors.email}
                InputProps={{
                  sx: {
                    borderRadius: '8px',
                    height: '44px',
                    backgroundColor: '#FFFFFF',
                    boxShadow: '0px 1px 2px 0px rgba(10,13,18,0.05)',
                    '& input': {
                      padding: '10px 14px',
                    },
                  },
                }}
              />
            </Box>

            {/* Password */}
            <Box>
              <Typography
                sx={{
                  fontFamily: 'Inter, Arial, sans-serif',
                  fontWeight: 500,
                  fontSize: '14px',
                  color: '#414651',
                  mb: 1,
                }}
              >
                Enter Password*
              </Typography>
              <TextField
                fullWidth
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange('password')}
                variant="outlined"
                required
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: '8px',
                    height: '44px',
                    backgroundColor: '#FFFFFF',
                    boxShadow: '0px 1px 2px 0px rgba(10,13,18,0.05)',
                    '& input': {
                      padding: '10px 14px',
                    },
                  },
                }}
              />
            </Box>

            {/* Forgot Password Link */}
            <Box sx={{ textAlign: 'right' }}>
              <Link 
                href="#" 
                underline="always" 
                sx={{ 
                  color: '#1976d2', 
                  fontSize: '12px',
                  fontFamily: 'Inter, Arial, sans-serif',
                }}
              >
                Forgot Password?
              </Link>
            </Box>

            {/* Buttons */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={handleReset}
                sx={{
                  minWidth: 90,
                  height: '44px',
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontSize: '1rem',
                  color: '#666666',
                  border: '1px solid #D5D7DA',
                  boxShadow: '0px 1px 2px rgba(10,13,18,0.05)',
                  flex: 1,
                }}
              >
                Reset
              </Button>

              <Button
                type="submit"
                variant="contained"
                disabled={isLoginDisabled}
                sx={{
                  minWidth: 107,
                  height: '44px',
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontFamily: 'Inter, Arial, sans-serif',
                  fontWeight: 600,
                  fontSize: '16px',
                  lineHeight: '24px',
                  letterSpacing: '0%',
                  color: '#FFFFFF',
                  backgroundColor: '#7F56D9',
                  border: '1px solid #7F56D9',
                  boxShadow: '0px 1px 2px rgba(10,13,18,0.05)',
                  flex: 1,
                  '&:hover': { backgroundColor: '#6941C6' },
                  '&.Mui-disabled': { 
                    backgroundColor: '#E5E7EB', 
                    color: '#9CA3AF',
                    border: '1px solid #E5E7EB',
                  }
                }}
              >
                Login
              </Button>
            </Box>

            {/* Don't have account link */}
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography
                sx={{
                  fontFamily: 'Inter, Arial, sans-serif',
                  fontSize: '14px',
                  color: '#666666',
                }}
              >
                Don't have an account?{' '}
                <Link 
                  href="/" 
                  underline="always" 
                  sx={{ 
                    color: '#1976d2', 
                    fontSize: '14px',
                    fontWeight: 500,
                  }}
                >
                  Sign up here
                </Link>
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LoginPage;