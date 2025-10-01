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
import { useTheme } from '@mui/material/styles';

// Layout
import AuthLayout from '../components/layout/AuthLayout';

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
  const theme = useTheme();

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

  const isContinueDisabled =
    !formData.firstName.trim() ||
    !formData.lastName.trim() ||
    !formData.email.trim() ||
    !formData.agreedToTerms ||
    !!errors.email;

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
          mt: { xs: 0, md: '40px', lg: '60px' },
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
          {t('auth:register.title')}
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
          {t('auth:register.subtitle')}
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
                  fontFamily: 'Poppins',
                  fontWeight: 400,
                  fontSize: '12px',
                  color: theme.palette.text.secondary,
                  lineHeight: '18px'
                }}
              >
                {t('auth:register.termsAgreement')}
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
              disabled={isContinueDisabled}
              loading={isSubmitting}
              sx={{ flex: 1 }}
            >
              {t('common:buttons.createAccount')}
            </CommonButton>
          </Box>

          <Box sx={{ textAlign: 'center', mt: 1 }}>
            <Typography
              sx={{
                fontFamily: 'Poppins',
                fontSize: '16px',
                color: theme.palette.text.secondary,
              }}
            >
              {t('auth:register.haveAccount')}{' '}
              <Link
                href="/login"
                underline="always"
                sx={{
                  fontSize: '16px',
                  fontWeight: 400,
                  fontFamily: 'Poppins',
                }}
              >
                {t('auth:register.logIn')}
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </AuthLayout>
  );
};

export default RegistrationPage;