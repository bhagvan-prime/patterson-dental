import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Link,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  agreedToTerms: boolean;
}

interface FormErrors {
  email: string;
}

const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    agreedToTerms: false,
  });
  const [errors, setErrors] = useState<FormErrors>({
    email: '',
  });

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

  const handleInputChange = (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    let value: string | boolean = target.type === 'checkbox' ? target.checked : target.value;

    if (field === 'email') {
      if (errors.email) {
        setErrors(prev => ({ ...prev, email: '' }));
      }
    }

    setFormData(prev => ({ ...prev, [field]: value as any }));
  };

  const handleContinue = (event: React.FormEvent) => {
    event.preventDefault(); 

    const emailError = validateEmail(formData.email);
    
    if (emailError) {
      setErrors({ email: emailError });
      return; 
    }

    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.agreedToTerms) {
        return; 
    }

    console.log('Registration Data:', formData);
    navigate('/create-password');
  };

  const handleCancel = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      agreedToTerms: false,
    });
    setErrors({ email: '' });
  };

  const isContinueDisabled =
    !formData.firstName.trim() ||
    !formData.lastName.trim() ||
    !formData.email.trim() ||
    !formData.agreedToTerms ||
    !!errors.email;

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
            Signup
          </Typography>

          {/* Form fields - Wrapped in a semantic <form> element */}
          <Box component="form" onSubmit={handleContinue} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            
            {/* First Name */}
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
                Enter Your First Name*
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter your First Name"
                value={formData.firstName}
                onChange={handleInputChange('firstName')}
                variant="outlined"
                required
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

            {/* Last Name */}
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
                Enter Your Last Name*
              </Typography>
              <TextField
                fullWidth
                placeholder="Enter your Last Name"
                value={formData.lastName}
                onChange={handleInputChange('lastName')}
                variant="outlined"
                required
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

            {/* Terms */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.agreedToTerms}
                  onChange={handleInputChange('agreedToTerms')}
                  // required
                  sx={{
                    color: '#666666',
                    '&.Mui-checked': {
                      color: '#7F56D9',
                    },
                    mr: 1,
                  }}
                />
              }
              label={
                <Typography
                  sx={{
                    fontFamily: 'Arial, Inter, sans-serif',
                    fontWeight: 400,
                    fontSize: '12px',
                    color: '#666666',
                  }}
                >
                  By clicking on continue you have confirm that you have read and understood our{' '}
                  <Link href="#" underline="always" sx={{ color: '#1976d2', fontSize: '12px' }}>
                    Privacy Policies
                  </Link>
                </Typography>
              }
              sx={{
                alignItems: 'flex-start',
                pl: 0,
              }}
            />

            {/* Buttons */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={handleCancel}
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
                Cancel
              </Button>

              <Button
                type="submit"
                variant="contained"
                disabled={isContinueDisabled}
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
                Continue
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default RegistrationPage;