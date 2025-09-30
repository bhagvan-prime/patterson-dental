// src/pages/CreatePasswordPage.tsx
import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Visibility, VisibilityOff } from '@mui/icons-material';

// Common components
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
  const { t } = useTranslation();
  
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Get email from registration
  // const registrationEmail = localStorage.getItem('registration_email');

  // Redirect if no email found
  // useEffect(() => {
  //   if (!registrationEmail) {
  //     navigate('/');
  //   }
  // }, [registrationEmail, navigate]);

  // FIXED PASSWORD VALIDATION
  const validatePassword = (password: string): string => {
    if (!password) {
      return t('common:validation.passwordRequired');
    }
    if (password.length < 8) {
      return t('common:validation.passwordTooShort');
    }
    
    // Check for lowercase
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter.';
    }
    
    // Check for uppercase
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter.';
    }
    
    // Check for digit
    if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one number.';
    }
    
    // Check for special character - FIXED REGEX
    if (!/[@$!%*?&#^()_+=\-[\]{}|;:'",.<>/\\]/.test(password)) {
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
      return t('common:validation.passwordMismatch');
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

    setIsSubmitting(true);

    // SIMPLIFIED: Store and navigate (no API call)
    setTimeout(() => {
      
      // Clear registration data
      localStorage.removeItem('registration_email');
      localStorage.removeItem('registration_name');
      
      setSuccessMessage(t('auth:createPassword.success'));
      setIsSubmitting(false);
      
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }, 500);
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
          backgroundColor: '#1849A9',
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

        <Box
          sx={{
            textAlign: 'center',
            px: { xs: '16px', lg: 0 },
            maxWidth: { xs: '100%', lg: '420px' },
            mx: 'auto',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Poppins',
              fontWeight: 700,
              fontSize: { xs: '20px', lg: '40px' },
              lineHeight: { xs: '24px', lg: '40px' },
              mb: { xs: '16px', lg: '24px' },
            }}
          >
            {t('common:branding.companyName')}
          </Typography>

          <Typography
            sx={{
              fontFamily: 'Poppins',
              fontWeight: 400,
              fontSize: { xs: '14px', lg: '24px' },
              lineHeight: { xs: '18px', lg: '24px' },
              mb: { xs: '12px', lg: '24px' },
            }}
          >
            {t('common:branding.tagline')}
          </Typography>

          <Typography
            sx={{
              fontFamily: 'Poppins',
              fontWeight: 400,
              fontSize: { xs: '12px', lg: '16px' },
              lineHeight: { xs: '18px', lg: '26px' },
            }}
          >
            {t('common:branding.description')}
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
            {t('auth:createPassword.title')}
          </Typography>

          {/* Success Message */}
          {successMessage && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMessage}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSave}
            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
          >
            <CommonInput
              type={showPassword ? 'text' : 'password'}
              label={t('auth:createPassword.password')}
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

            <CommonInput
              type={showConfirmPassword ? 'text' : 'password'}
              label={t('auth:createPassword.confirmPassword')}
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
                {t('common:validation.passwordRequirements.title')}
              </Typography>
              <Box sx={{ pl: 2 }}>
                <Typography sx={{ fontFamily: 'Inter, Arial, sans-serif', fontSize: '11px', color: '#666666', lineHeight: 1.4 }}>
                  • {t('common:validation.passwordRequirements.minLength')}
                </Typography>
                <Typography sx={{ fontFamily: 'Inter, Arial, sans-serif', fontSize: '11px', color: '#666666', lineHeight: 1.4 }}>
                  • {t('common:validation.passwordRequirements.uppercase')}
                </Typography>
                <Typography sx={{ fontFamily: 'Inter, Arial, sans-serif', fontSize: '11px', color: '#666666', lineHeight: 1.4 }}>
                  • {t('common:validation.passwordRequirements.lowercase')}
                </Typography>
                <Typography sx={{ fontFamily: 'Inter, Arial, sans-serif', fontSize: '11px', color: '#666666', lineHeight: 1.4 }}>
                  • {t('common:validation.passwordRequirements.number')}
                </Typography>
                <Typography sx={{ fontFamily: 'Inter, Arial, sans-serif', fontSize: '11px', color: '#666666', lineHeight: 1.4 }}>
                  • {t('common:validation.passwordRequirements.special')}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>

              <CommonButton
                type="submit"
                variant="primary"
                disabled={isSaveDisabled}
                loading={isSubmitting}
                sx={{ flex: 1 }}
              >
                {t('common:buttons.savePassword')}
              </CommonButton>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default CreatePasswordPage;