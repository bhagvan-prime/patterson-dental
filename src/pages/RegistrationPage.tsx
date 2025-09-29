// src/pages/RegistrationPage.tsx
import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Redux
// import { useRegisterMutation } from '../services/api';

// Common components
import CommonInput from '../components/commons/inputs/PRInput';
import CommonButton from '../components/commons/buttons/PRButton';
import CommonCheckbox from '../components/commons/inputs/PRCheckbox';

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
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    agreedToTerms: false,
  });
  
  const [errors, setErrors] = useState<FormErrors>({
    email: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // SIMPLE EMAIL VALIDATION - accepts any format with @ and .
  const validateEmail = (email: string): string => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      return t('common:validation.emailRequired');
    }
    // Very basic check: has @ and at least one dot after @
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return t('common:validation.emailInvalid');
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

    // Clear email error when user types
    if (field === 'email' && errors.email) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const handleContinue = async (event: React.FormEvent) => {
    event.preventDefault();

    const emailError = validateEmail(formData.email);

    if (emailError) {
      setErrors({ email: emailError });
      return;
    }

    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.agreedToTerms
    ) {
      return;
    }

    setIsSubmitting(true);

    // SIMPLIFIED: Store data and navigate (no API call for now)
    setTimeout(() => {
      localStorage.setItem('registration_email', formData.email);
      localStorage.setItem('registration_name', `${formData.firstName} ${formData.lastName}`);
      
      setSuccessMessage(t('auth:register.success'));
      setIsSubmitting(false);
      
      setTimeout(() => {
        navigate('/create-password');
      }, 1000);
    }, 500);
  };

  const handleCancel = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      agreedToTerms: false,
    });
    setErrors({ email: '' });
    setSuccessMessage('');
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
            {t('common:branding.companyName')}
          </Typography>

          <Typography
            sx={{
              fontFamily: 'Poppins, Roboto, Arial, sans-serif',
              fontWeight: 400,
              fontSize: { xs: '16px', lg: '1.25rem' },
              mb: { xs: 1, lg: 1.5 },
            }}
          >
            {t('common:branding.tagline')}
          </Typography>

          <Typography
            sx={{
              fontFamily: 'Inter, Roboto, Arial, sans-serif',
              fontWeight: 400,
              fontSize: { xs: '12px', lg: '1rem' },
              lineHeight: 1.5,
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
          alignItems: { xs: 'center', lg: 'flex-start' },
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
            mt: { xs: 0, lg: '180px' },
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
            {t('auth:register.title')}
          </Typography>

          {/* Success Message */}
          {successMessage && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {successMessage}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleContinue}
            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
          >
            <CommonInput
              label={t('auth:register.firstName')}
              value={formData.firstName}
              onChange={handleInputChange('firstName')}
              required
            />

            <CommonInput
              label={t('auth:register.lastName')}
              value={formData.lastName}
              onChange={handleInputChange('lastName')}
              required
            />

            <CommonInput
              type="email"
              label={t('auth:register.email')}
              value={formData.email}
              onChange={handleInputChange('email')}
              required
              errorMessage={errors.email}
            />

            <CommonCheckbox
              checked={formData.agreedToTerms}
              onChange={handleInputChange('agreedToTerms')}
              label={
                <Typography
                  sx={{
                    fontFamily: 'Arial, Inter, sans-serif',
                    fontWeight: 400,
                    fontSize: '12px',
                    color: '#666666',
                  }}
                >
                  {t('auth:register.termsAgreement')}
                  <Link
                    href="#"
                    underline="always"
                    sx={{ color: '#1976d2', fontSize: '12px' }}
                  >
                    {t('auth:register.privacyPolicy')}
                  </Link>
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
                variant="secondary"
                onClick={handleCancel}
                sx={{ flex: 1 }}
                disabled={isSubmitting}
              >
                {t('common:buttons.cancel')}
              </CommonButton>

              <CommonButton
                type="submit"
                variant="primary"
                disabled={isContinueDisabled}
                loading={isSubmitting}
                sx={{ flex: 1 }}
              >
                {t('common:buttons.continue')}
              </CommonButton>
            </Box>

            <Box sx={{ textAlign: 'center', mt: 1 }}>
              <Typography
                sx={{
                  fontFamily: 'Inter, Arial, sans-serif',
                  fontSize: '14px',
                  color: '#666666',
                }}
              >
                {t('auth:register.haveAccount')}{' '}
                <Link
                  href="/login"
                  underline="always"
                  sx={{
                    color: '#1976d2',
                    fontSize: '14px',
                    fontWeight: 500,
                  }}
                >
                  {t('auth:register.signInLink')}
                </Link>
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default RegistrationPage;