// src/pages/CreatePasswordPage.tsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface FormData {
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  password: string;
  confirmPassword: string;
}

const CreatePasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FormErrors>({
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validatePassword = (password: string): string => {
    if (!password) {
      return 'Password is required.';
    }
    if (password.length < 8) {
      return 'Password must be at least 8 characters long.';
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return 'Password must contain at least one lowercase letter.';
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return 'Password must contain at least one uppercase letter.';
    }
    if (!/(?=.*\d)/.test(password)) {
      return 'Password must contain at least one number.';
    }
    if (!/(?=.*[@$!%*?&])/.test(password)) {
      return 'Password must contain at least one special character.';
    }
    return '';
  };

  const validateConfirmPassword = (confirmPassword: string, password: string): string => {
    if (!confirmPassword) {
      return 'Please confirm your password.';
    }
    if (confirmPassword !== password) {
      return 'Passwords do not match.';
    }
    return '';
  };

  const handleInputChange = (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear errors when user starts typing
    if (field === 'password' && errors.password) {
      setErrors(prev => ({ ...prev, password: '' }));
    }
    if (field === 'confirmPassword' && errors.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: '' }));
    }
  };

  const handleSave = (event: React.FormEvent) => {
    event.preventDefault();

    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(formData.confirmPassword, formData.password);

    if (passwordError || confirmPasswordError) {
      setErrors({
        password: passwordError,
        confirmPassword: confirmPasswordError,
      });
      return;
    }

    console.log('Password created successfully');
    // Navigate to login page
    navigate('/login');
  };

  const handleBack = () => {
    navigate(-1); // Go back to previous page (registration page)
  };

  const isSaveDisabled =
    !formData.password.trim() ||
    !formData.confirmPassword.trim() ||
    !!errors.password ||
    !!errors.confirmPassword;

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
            Create Password
          </Typography>

          {/* Form fields - Wrapped in a semantic <form> element */}
          <Box component="form" onSubmit={handleSave} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            
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

            {/* Confirm Password */}
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
                Confirm Password*
              </Typography>
              <TextField
                fullWidth
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange('confirmPassword')}
                variant="outlined"
                required
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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

            {/* Password Requirements */}
            <Box sx={{ mt: 1 }}>
              <Typography
                sx={{
                  fontFamily: 'Inter, Arial, sans-serif',
                  fontWeight: 400,
                  fontSize: '12px',
                  color: '#666666',
                  mb: 1,
                }}
              >
                Password must contain:
              </Typography>
              <Box sx={{ pl: 2 }}>
                <Typography sx={{ fontFamily: 'Inter, Arial, sans-serif', fontSize: '11px', color: '#666666', lineHeight: 1.4 }}>
                  • At least 8 characters
                </Typography>
                <Typography sx={{ fontFamily: 'Inter, Arial, sans-serif', fontSize: '11px', color: '#666666', lineHeight: 1.4 }}>
                  • One uppercase letter (A-Z)
                </Typography>
                <Typography sx={{ fontFamily: 'Inter, Arial, sans-serif', fontSize: '11px', color: '#666666', lineHeight: 1.4 }}>
                  • One lowercase letter (a-z)
                </Typography>
                <Typography sx={{ fontFamily: 'Inter, Arial, sans-serif', fontSize: '11px', color: '#666666', lineHeight: 1.4 }}>
                  • One number (0-9)
                </Typography>
                <Typography sx={{ fontFamily: 'Inter, Arial, sans-serif', fontSize: '11px', color: '#666666', lineHeight: 1.4 }}>
                  • One special character (@$!%*?&)
                </Typography>
              </Box>
            </Box>

            {/* Buttons */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={handleBack}
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
                Back
              </Button>

              <Button
                type="submit"
                variant="contained"
                disabled={isSaveDisabled}
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
                Save
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default CreatePasswordPage;