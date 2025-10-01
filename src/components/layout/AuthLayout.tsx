// src/components/layouts/AuthLayout.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const { t } = useTranslation();

  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        overflowX: 'hidden',
      }}
    >
      {/* LEFT: Blue marketing panel */}
      <Box
        sx={{
          width: { xs: '100%', md: '50%' },
          minHeight: { xs: '500px', md: '100vh' },
          backgroundColor: '#1849A9',
          color: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pt: { xs: 6, sm: 8, md: 10, lg: 14, xl: 16 },
          pb: { xs: 6, sm: 8, md: 10, lg: 14, xl: 16 },
          px: { xs: 3, sm: 5, md: 8, lg: 12, xl: 16 },
        }}
      >
        {/* Logo */}
        <Box
          component="img"
          src="/images/logo.png"
          alt="Patterson Dental Logo"
          sx={{
            position: { xs: 'relative', md: 'absolute' },
            top: { md: '40px', lg: '45px', xl: '50px' },
            left: { md: '40px', lg: '45px', xl: '50px' },
            width: { xs: '60px', sm: '80px', md: '90px', lg: '110px', xl: '130px' },
            height: { xs: '28px', sm: '37px', md: '42px', lg: '51px', xl: '60px' },
            objectFit: 'contain',
            alignSelf: { xs: 'flex-start', md: 'auto' },
            mt: { xs: '-25px', sm: '0px', md: '0px' },
            mb: { xs: '40px', sm: '32px', md: 0 },
          }}
        />

        {/* Center content container - image + text */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: { xs: '280px', sm: '320px', md: '380px', lg: '432px' },
            gap: { xs: '24px', sm: '32px', md: '40px', lg: '56px', xl: '64px' },
            // Center within the blue panel and align with right side
            alignSelf: 'center',
            mt: { xs: 0, md: '40px' },
            mb: { xs: 0, md: 'auto' },
          }}
        >
          {/* Dental office image */}
          <Box
            component="img"
            src="/images/dental.png"
            alt="Dental Office"
            sx={{
              width: { xs: '280px', sm: '320px', md: '432px', lg: '432px', xl: '432px' },
              height: { xs: '226px', sm: '258px', md: '348px', lg: '348px', xl: '348px' },
              borderRadius: '10px',
              objectFit: 'cover',
            }}
          />

          {/* Text content */}
          <Box
            sx={{
              textAlign: 'center',
              mt: { xs: 0.5, sm: 0.75, md: 1, lg: 1.25, xl: 1.5 },
              px: { xs: 2, sm: 3, md: 0 },
              maxWidth: { xs: '100%', sm: '90%', md: '100%' },
            }}
          >
            {/* Company Name */}
            <Typography
              sx={{
                fontFamily: 'Poppins',
                fontWeight: 700,
                fontSize: { xs: '24px', sm: '28px', md: '32px', lg: '36px', xl: '40px' },
                lineHeight: { xs: '24px', sm: '24px', md: '24px', lg: '24px', xl: '24px' },
                textAlign: 'center',
              }}
            >
              {t('common:branding.companyName')}
            </Typography>

            {/* Tagline */}
            <Typography
              sx={{
                fontFamily: 'Poppins',
                fontWeight: 400,
                fontSize: { xs: '16px', sm: '18px', md: '20px', lg: '22px', xl: '24px' },
                lineHeight: { xs: '24px', sm: '24px', md: '24px', lg: '24px', xl: '24px' },
                textAlign: 'center',
                mt: '24px',
              }}
            >
              {t('common:branding.tagline')}
            </Typography>

            {/* Description */}
            <Typography
              sx={{
                fontFamily: 'Poppins',
                fontWeight: 400,
                fontSize: { xs: '12px', sm: '14px', md: '15px', lg: '16px', xl: '16px' },
                lineHeight: { xs: '20px', sm: '22px', md: '24px', lg: '26px', xl: '26px' },
                textAlign: 'center',
                mt: '24px',
              }}
            >
              {t('common:branding.description')}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* RIGHT: Content area (passed as children) */}
      <Box
        sx={{
          width: { xs: '100%', md: '50%' },
          minHeight: { xs: 'auto', md: '100vh' },
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#FFFFFF',
          px: { xs: 3, sm: 4, md: 6, lg: 8 },
          py: { xs: 5, sm: 6, md: 8, lg: 10 },
          pt: { xs: 5, sm: 6, md: '90px', lg: '90px' },
        }}
      >
        <Box sx={{ width: '100%', maxWidth: { xs: '400px', md: '450px', lg: '500px' } }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;
