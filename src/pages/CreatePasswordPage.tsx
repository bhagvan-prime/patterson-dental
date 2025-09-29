// src/pages/CreatePasswordPage.tsx - REFACTORED VERSION
import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';

// ✅ Import our common components
import CommonInput from '../components/commons/inputs/PRInput';
import CommonButton from '../components/commons/buttons/PRButton';

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
  const [isSaving, setIsSaving] = useState(false); // ✅ For loading state

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

  const validateConfirmPassword = (
    confirmPassword: string,
    password: string
  ): string => {
    if (!confirmPassword) {
      return 'Please confirm your password.';
    }
    if (confirmPassword !== password) {
      return 'Passwords do not match.';
    }
    return '';
  };

  const handleInputChange = (field: keyof FormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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

  const handleSave = async (event: React.FormEvent) => {
    event.preventDefault();

    const passwordError = validatePassword(formData.password);
    const confirmPasswordError = validateConfirmPassword(
      formData.confirmPassword,
      formData.password
    );

    if (passwordError || confirmPasswordError) {
      setErrors({
        password: passwordError,
        confirmPassword: confirmPasswordError,
      });
      return;
    }

    // ✅ Show loading state
    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      console.log('Password created successfully');
      setIsSaving(false);
      navigate('/login');
    }, 1500);
  };

  const handleBack = () => {
    navigate(-1);
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
        minHeight: { xs: '100vh', lg: '923px' },
        maxWidth: { lg: '1440px' },
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'row' },
        overflowY: 'auto',
      }}
    >
      {/* LEFT: Blue marketing panel */}
      <Box
        sx={{
          width: { xs: '100%', lg: '708px' },
          height: { xs: '392px', lg: '923px' },
          backgroundColor: '#003473',
          color: '#FFFFFF',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: { xs: 'flex-start', lg: 'center' },
          pt: { xs: 3, lg: '164px' },
          pb: { xs: 4, lg: '164px' },
          px: { xs: 3, lg: '144px' },
          gap: { lg: '10px' },
        }}
      >
        {/* Logo */}
        <Box
          component="img"
          src="/images/logo.png"
          alt="Patterson Dental Logo"
          sx={{
            position: { xs: 'relative', lg: 'absolute' },
            top: { lg: '33px' },
            left: { lg: '53px' },
            width: { xs: '41px', lg: '113px' },
            height: { xs: '19px', lg: '53px' },
            objectFit: 'contain',
            alignSelf: { xs: 'flex-start', lg: 'auto' },
            mt: { xs: 1, lg: 0 },
            mb: { xs: 2, lg: 0 },
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
            Access your account to explore our Comprehensive range of dental
            equipment and innovative solutions
          </Typography>
        </Box>
      </Box>

      {/* RIGHT: Form panel */}
      <Box
        sx={{
          flex: 1,
          minHeight: { xs: 'auto', lg: '923px' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
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

          {/* Form */}
          <Box
            component="form"
            onSubmit={handleSave}
            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
          >
            {/* ✅ COMMON INPUT - Password */}
            <CommonInput
              type={showPassword ? 'text' : 'password'}
              label="Password"
              value={formData.password}
              onChange={handleInputChange('password')}
              required
              errorMessage={errors.password}
              slotProps={{
                input: {
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
                },
              }}
            />

            {/* ✅ COMMON INPUT - Confirm Password */}
            <CommonInput
              type={showConfirmPassword ? 'text' : 'password'}
              label="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange('confirmPassword')}
              required
              errorMessage={errors.confirmPassword}
              slotProps={{
                input: {
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
                },
              }}
            />

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
                <Typography
                  sx={{
                    fontFamily: 'Inter, Arial, sans-serif',
                    fontSize: '11px',
                    color: '#666666',
                    lineHeight: 1.4,
                  }}
                >
                  • At least 8 characters
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'Inter, Arial, sans-serif',
                    fontSize: '11px',
                    color: '#666666',
                    lineHeight: 1.4,
                  }}
                >
                  • One uppercase letter (A-Z)
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'Inter, Arial, sans-serif',
                    fontSize: '11px',
                    color: '#666666',
                    lineHeight: 1.4,
                  }}
                >
                  • One lowercase letter (a-z)
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'Inter, Arial, sans-serif',
                    fontSize: '11px',
                    color: '#666666',
                    lineHeight: 1.4,
                  }}
                >
                  • One number (0-9)
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'Inter, Arial, sans-serif',
                    fontSize: '11px',
                    color: '#666666',
                    lineHeight: 1.4,
                  }}
                >
                  • One special character (@$!%*?&)
                </Typography>
              </Box>
            </Box>

            {/* ✅ COMMON BUTTONS - Back & Save */}
            <Box sx={{ display: 'flex', gap: 2 }}>
              <CommonButton
                variant="secondary"
                onClick={handleBack}
                sx={{ flex: 1 }}
              >
                Back
              </CommonButton>

              <CommonButton
                type="submit"
                variant="primary"
                disabled={isSaveDisabled}
                loading={isSaving}
                sx={{ flex: 1 }}
              >
                Save
              </CommonButton>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default CreatePasswordPage;