// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  InputAdornment,
  IconButton,
  Link,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Visibility, VisibilityOff } from '@mui/icons-material';

// Common components
import CommonInput from '../components/commons/inputs/PRInput';
import CommonButton from '../components/commons/buttons/PRButton';
import { useTheme } from '@mui/material/styles';
import CommonCheckbox from '../components/commons/inputs/PRCheckbox';

interface FormData {
  email: string;
  password: string;
  agreedToPrivacy: boolean;
}

interface FormErrors {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    agreedToPrivacy: false,
  });

  const [errors, setErrors] = useState<FormErrors>({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // SIMPLE EMAIL VALIDATION
  const validateEmail = (email: string): string => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      return t('common:validation.emailRequired');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return t('common:validation.emailInvalid');
    }
    return '';
  };

  // SIMPLE PASSWORD VALIDATION (just check if not empty)
  const validatePassword = (password: string): string => {
    if (!password) {
      return t('common:validation.passwordRequired');
    }
    return '';
  };

  const handleInputChange = (field: keyof FormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const target = event.target as HTMLInputElement;
    let value: string | boolean =
      target.type === 'checkbox' ? target.checked : target.value;

    setFormData(prev => ({ ...prev, [field]: value as any }));

    // Clear errors when user types
    if (field === 'email' && errors.email) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
    if (field === 'password' && errors.password) {
      setErrors(prev => ({ ...prev, password: '' }));
    }
  };

  const handleLogin = async (event: React.FormEvent) => {
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

    if (!formData.agreedToPrivacy) {
      return;
    }

    setIsSubmitting(true);

    // SIMPLIFIED: Store and navigate (no API call)
    setTimeout(() => {
      setSuccessMessage(t('auth:login.success'));
      setIsSubmitting(false);

      setTimeout(() => {
        navigate('/step1');
      }, 1000);
    }, 500);
  };

  const handleReset = () => {
    setFormData({ email: '', password: '', agreedToPrivacy: false });
    setErrors({ email: '', password: '' });
    setSuccessMessage('');
  };

  const isLoginDisabled =
    !formData.email.trim() ||
    !formData.password.trim() ||
    !formData.agreedToPrivacy ||
    !!errors.email ||
    !!errors.password;
    
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
              fontFamily: 'Poppins',
              fontWeight: 600,
              fontSize: { xs: '20px', md: '24px' },
              color: theme.palette.text.primary,
              lineHeight: 1,
            }}
          >
            {t('auth:login.title')}
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Poppins',
              fontWeight: 400,
              fontSize: { xs: '14px', md: '16px' },
              color: theme.palette.text.secondary,
              lineHeight: 1.2,
              mt: 0.25,
            }}
          >
            {t('auth:login.subtitle')}
          </Typography>

          {/* Success Message */}
          {successMessage && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMessage}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleLogin}
            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
          >
            <CommonInput
              type="email"
              label={t('auth:login.email')}
              value={formData.email}
              onChange={handleInputChange('email')}
              required
              errorMessage={errors.email}
            />

            <CommonInput
              type={showPassword ? 'text' : 'password'}
              label={t('auth:login.password')}
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

            <CommonCheckbox
              checked={formData.agreedToPrivacy}
              onChange={handleInputChange('agreedToPrivacy')}
              label={
                <Typography
                  sx={{
                    fontFamily: 'Poppins',
                    fontWeight: 400,
                    fontSize: '12px',
                    color: theme.palette.text.secondary,
                    lineHeight: '18px'
                  }}
                >
                  
                  {t('auth:login.termsAgreement')}
                  <Link
                    href="#"
                    underline="always"
                    sx={{
                      fontSize: '12px',
                      fontFamily: 'Poppins',
                      fontWeight: 400,
                      lineHeight: '18px'
                    }}
                  >
                    {t('auth:register.privacyPolicy')}
                  </Link>
                  .
                </Typography>
              }
              checkboxProps={{
                sx: {
                  mr: 1,
                }
              }}
              labelProps={{
                sx: {
                  alignItems: 'flex-start',
                  pl: 0,
                }
              }}
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <CommonButton
                type="submit"
                variant="primary"
                disabled={isLoginDisabled}
                loading={isSubmitting}
                sx={{ flex: 1 }}
              >
                {t('common:buttons.login')}
              </CommonButton>
            </Box>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <Typography
                sx={{
                  fontFamily: 'Poppins',
                  fontSize: '16px',
                  fontWeight: 400,
                  color: '#717680',
                }}
              >
                {t('auth:login.noAccount')}{' '}
                <Link
                  href="/"
                  underline="always"
                  sx={{
                    fontSize: '16px',
                    fontWeight: 500,
                    fontFamily: 'Poppins'
                  }}
                >
                  {t('auth:login.signUpLink')}
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