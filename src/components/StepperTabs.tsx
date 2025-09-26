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
  Chip
} from '@mui/material';
import {
  Person as PersonIcon,
  VerifiedUser as LicenseIcon,
  CreditCard as CreditIcon,
  Payment as PaymentIcon,
  Loyalty as LoyaltyIcon,
  AccountBalance as TaxIcon,
  CheckCircle as ReviewIcon
} from '@mui/icons-material';

interface StepStatus {
  completed: boolean;
  current: boolean;
}

const StepperTabs: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [value, setValue] = useState(0);
  const [stepStatuses, setStepStatuses] = useState<StepStatus[]>([
    { completed: false, current: true },
    { completed: false, current: false },
    { completed: false, current: false },
    { completed: false, current: false },
    { completed: false, current: false },
    { completed: false, current: false },
    { completed: false, current: false }
  ]);

  const steps = [
    { label: 'About You and your Practice', path: '/step1', shortLabel: 'About You', icon: <PersonIcon /> },
    { label: 'Practitioner Licensing', path: '/step2', shortLabel: 'Licensing', icon: <LicenseIcon /> },
    { label: 'Customer Line of Credit', path: '/step3', shortLabel: 'Credit', icon: <CreditIcon /> },
    { label: 'Auto Pay Enrollment', path: '/step4', shortLabel: 'Auto Pay', icon: <PaymentIcon /> },
    { label: 'Loyalty Enrollment', path: '/step5', shortLabel: 'Loyalty', icon: <LoyaltyIcon /> },
    { label: 'Tax Exempt', path: '/step6', shortLabel: 'Tax Exempt', icon: <TaxIcon /> },
    { label: 'Review and Finalize', path: '/step7', shortLabel: 'Review', icon: <ReviewIcon /> }
  ];

  // Update tab value based on current location
  useEffect(() => {
    const currentTabIndex = steps.findIndex(step => step.path === location.pathname);
    if (currentTabIndex !== -1) {
      setValue(currentTabIndex);
      // Update step statuses
      setStepStatuses(prev => prev.map((status, index) => ({
        completed: index < currentTabIndex,
        current: index === currentTabIndex
      })));
    }
  }, [location.pathname]);

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

  return (
    <>
      {/* Move heading outside the tabs container */}
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
          Customer on Boarding Process
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
                minHeight: isMobile ? 48 : 64,
                textTransform: 'none',
                fontSize: isMobile ? '0.75rem' : '0.875rem',
                fontWeight: 500,
                minWidth: isMobile ? 80 : 120,
                px: isMobile ? 1 : 2,
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
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {!isMobile && step.icon}
                    <Typography variant="inherit">
                      {index + 1}. {isMobile ? step.shortLabel : step.label}
                    </Typography>
                  </Box>
                }
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