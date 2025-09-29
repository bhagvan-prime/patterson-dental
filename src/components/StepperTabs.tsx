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

interface StepStatus {
  completed: boolean;
  current: boolean;
}

// MOVE THIS OUTSIDE THE COMPONENT
const steps = [
  { 
    label: 'About You and Your Practice', 
    path: '/step1', 
    shortLabel: 'About You', 
    icon: <PersonIcon />,
    line1: 'About You and',
    line2: 'Your Practice'
  },
  { 
    label: 'Practice Licensing', 
    path: '/step2', 
    shortLabel: 'Licensing', 
    icon: <LicenseIcon />,
    line1: 'Practice',
    line2: 'Licensing'
  },
  { 
    label: 'Credit Account', 
    path: '/step3', 
    shortLabel: 'Credit', 
    icon: <CreditIcon />,
    line1: 'Credit',
    line2: 'Account'
  },
  { 
    label: 'Patterson Advantage', 
    path: '/step5', 
    shortLabel: 'Advantage', 
    icon: <LoyaltyIcon />,
    line1: 'Patterson',
    line2: 'Advantage'
  },
  { 
    label: 'Tax Exemption Status', 
    path: '/step6', 
    shortLabel: 'Tax Exempt', 
    icon: <TaxIcon />,
    line1: 'Tax Exemption',
    line2: 'Status'
  },
  { 
    label: 'Review and Submit', 
    path: '/step7', 
    shortLabel: 'Review', 
    icon: <ReviewIcon />,
    line1: 'Review and',
    line2: 'Submit'
  }
];

const StepperTabs: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

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
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {!isMobile && step.icon}
        
        {isDesktop ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
            <Typography variant="inherit" sx={{ fontSize: '0.8rem' }}>
              {step.line1}
            </Typography>
            <Typography variant="inherit" sx={{ fontSize: '0.8rem' }}>
              {step.line2}
            </Typography>
          </Box>
        ) : (
          <Typography variant="inherit">
            {step.shortLabel}
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
            textAlign: 'center', 
            fontWeight: 600,
            color: 'primary.main'
          }}
        >
          Customer Onboarding
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