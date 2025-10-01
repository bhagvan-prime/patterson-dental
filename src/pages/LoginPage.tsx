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
import { useTheme } from '@mui/material/styles';

// Layout
import AuthLayout from '../components/layout/AuthLayout';

// Common components
import CommonInput from '../components/commons/inputs/PRInput';
import CommonButton from '../components/commons/buttons/PRButton';
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

  const isLoginDisabled =
    !formData.email.trim() ||
    !formData.password.trim() ||
    !formData.agreedToPrivacy ||
    !!errors.email ||
    !!errors.password;

  return (
    <AuthLayout>
      <Container
        maxWidth="sm"
        sx={{
          width: { xs: '100%', sm: '100%', md: '470px' },
          maxWidth: { xs: '326px', sm: '400px', md: '470px' },
          borderRadius: { xs: '10px', md: '12px' },
          border: { xs: 'none', md: '1px solid #E6E7EA' },
          p: { xs: 0, sm: 2, md: 4 },
          backgroundColor: '#FFFFFF',
          boxShadow: { xs: 'none', md: '0 1px 2px rgba(10,13,18,0.04)' },
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 2.5, md: 3 },
          mt: { xs: 0, md: '60px' },
        }}
      >
        <Typography
          sx={{
            fontFamily: 'Poppins',
            fontWeight: 600,
            fontSize: { xs: '20px', sm: '22px', md: '24px' },
            color: theme.palette.text.primary,
            lineHeight: { xs: 1.2, md: 1 },
          }}
        >
          {t('auth:login.title')}
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Poppins',
            fontWeight: 400,
            fontSize: { xs: '14px', sm: '15px', md: '16px' },
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
    </AuthLayout>
  );
};

export default LoginPage;