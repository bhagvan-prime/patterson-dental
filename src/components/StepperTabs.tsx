import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Tabs,
  Tab,
  Box,
  Paper,
  Container,
  useTheme,
  useMediaQuery,
  Typography,
} from '@mui/material';
import {
  Person as PersonIcon,
  VerifiedUser as LicenseIcon,
  CreditCard as CreditIcon,
  Loyalty as LoyaltyIcon,
  AccountBalance as TaxIcon,
  CheckCircle as ReviewIcon
} from '@mui/icons-material';

import { useTranslation } from 'react-i18next';

interface StepStatus {
  completed: boolean;
  current: boolean;
}

  const steps = [
    { 
      path: '/step1', 
      icon: <PersonIcon />,
      translationKey: 'aboutYou'
    },
    { 
      path: '/step2', 
      icon: <LicenseIcon />,
      translationKey: 'licensing'
    },
    { 
      path: '/step3', 
      icon: <CreditIcon />,
      translationKey: 'credit'
    },
    { 
      path: '/step5', 
      icon: <LoyaltyIcon />,
      translationKey: 'advantage'
    },
    { 
      path: '/step6', 
      icon: <TaxIcon />,
      translationKey: 'taxExempt'
    },
    { 
      path: '/step7', 
      icon: <ReviewIcon />,
      translationKey: 'review'
    }
  ];

const StepperTabs: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const { t } = useTranslation();

  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [value, setValue] = useState(0);
  const [stepStatuses, setStepStatuses] = useState<StepStatus[]>([
    { completed: false, current: true },
    { completed: false, current: false },
    { completed: false, current: false },
    { completed: false, current: false },
    { completed: false, current: false },
    { completed: false, current: false }
  ]);

  // Update tab value based on current location
  useEffect(() => {
    const currentTabIndex = steps.findIndex(step => step.path === location.pathname);
    if (currentTabIndex !== -1) {
      setValue(currentTabIndex);
      setStepStatuses(prev => prev.map((status, index) => ({
        completed: index < currentTabIndex,
        current: index === currentTabIndex
      })));
    }
  }, [location.pathname]); // Now ESLint won't complain

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    navigate(steps[newValue].path);
  };

  const getTabColor = (index: number) => {
    const status = stepStatuses[index];
    if (status.completed) return 'success.main';
    if (status.current) return 'primary.main';
    return 'text.secondary';
  };

  const getTabStyle = (index: number) => {
    const status = stepStatuses[index];
    return {
      color: getTabColor(index),
      '&.Mui-selected': {
        color: status.completed ? 'success.main' : 'primary.main',
        fontWeight: 600,
      },
      '&:hover': {
        backgroundColor: status.completed ? 'rgba(46, 125, 50, 0.04)' : 'rgba(25, 118, 210, 0.04)',
      }
    };
  };

  const renderTabLabel = (step: typeof steps[0]) => {
    const stepKey = step.translationKey;
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {!isMobile && step.icon}
        
        {isDesktop ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
            <Typography variant="inherit" sx={{ fontSize: '0.8rem' }}>
              {t(`stepper:steps.${stepKey}.line1`)}
            </Typography>
            <Typography variant="inherit" sx={{ fontSize: '0.8rem' }}>
              {t(`stepper:steps.${stepKey}.line2`)}
            </Typography>
          </Box>
        ) : (
          <Typography variant="inherit">
            {t(`stepper:steps.${stepKey}.short`)}
          </Typography>
        )}
      </Box>
    );
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 2 }, pt: 3, pb: 1 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ 
            textAlign: 'left', 
            fontWeight: 600,
            color: 'primary.main',
            fontSize: '24px',
            alignItems: 'left'
          }}
        >
          Setup your account
        </Typography>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ 
            textAlign: 'left', 
            fontWeight: 400,
            fontFamily: 'Poppins',
            fontSize: '16px',
            color: '#666666',
          }}
        >
          Please provide your professional information to get started with Patterson service
        </Typography>
      </Container>

      <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 2 }, pb: 3 }}>
        <Paper 
          elevation={3} 
          sx={{ 
            borderRadius: 2,
            overflow: 'hidden',
            backgroundColor: 'background.paper'
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            variant={isMobile ? "scrollable" : "fullWidth"}
            scrollButtons={isMobile ? "auto" : false}
            allowScrollButtonsMobile
            indicatorColor="primary"
            textColor="primary"
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              '& .MuiTab-root': {
                minHeight: isMobile ? 48 : isDesktop ? 72 : 56,
                textTransform: 'none',
                fontSize: isMobile ? '0.7rem' : isTablet ? '0.8rem' : '0.9rem',
                fontWeight: 500,
                minWidth: isMobile ? 80 : isTablet ? 100 : 140,
                px: isMobile ? 1 : 1.5,
                transition: 'all 0.2s ease-in-out',
              },
              '& .MuiTabs-indicator': {
                height: 3,
                borderRadius: '3px 3px 0 0',
              },
              '& .MuiTabs-scrollButtons': {
                '&.Mui-disabled': {
                  opacity: 0.3,
                },
              },
            }}
          >
            {steps.map((step, index) => (
              <Tab
                key={step.path}
                label={renderTabLabel(step)}
                id={`tab-${index}`}
                aria-controls={`tabpanel-${index}`}
                sx={getTabStyle(index)}
              />
            ))}
          </Tabs>
        </Paper>
      </Container>
    </>
  );
};

export default StepperTabs;