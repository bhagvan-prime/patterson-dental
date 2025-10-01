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

// Layout
import AuthLayout from '../components/layout/AuthLayout';

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
    if (!/\d/.test(password)) {
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

  const isSaveDisabled =
    !formData.password.trim() ||
    !formData.confirmPassword.trim() ||
    !!errors.password ||
    !!errors.confirmPassword;

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
            fontFamily: 'Poppins, Roboto, Arial, sans-serif',
            fontWeight: 600,
            fontSize: { xs: '20px', sm: '22px', md: '24px', lg: '28px' },
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
    </AuthLayout>
  );
};

export default CreatePasswordPage;