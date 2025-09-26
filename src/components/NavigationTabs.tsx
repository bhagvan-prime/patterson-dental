import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Tabs, 
  Tab, 
  Paper, 
  Container,
  useTheme,
  useMediaQuery 
} from '@mui/material';
import {
  Home as HomeIcon,
  Info as InfoIcon,
  LinearScale as StepperIcon,
  ViewList as VerticalIcon
} from '@mui/icons-material';

const NavigationTabs: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [value, setValue] = useState(0);

  const tabs = [
    { label: 'Home', path: '/home', icon: <HomeIcon /> },
    // { label: 'About', path: '/about', icon: <InfoIcon /> },
    // { label: 'Stepper', path: '/stepper', icon: <StepperIcon /> },
    // { label: 'Vertical Stepper', path: '/vertical', icon: <VerticalIcon /> },
  ];

  // Update tab value based on current location
  useEffect(() => {
    const currentTabIndex = tabs.findIndex(tab => tab.path === location.pathname);
    if (currentTabIndex !== -1) {
      setValue(currentTabIndex);
    }
  }, [location.pathname]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    navigate(tabs[newValue].path);
  };

  return (
    <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 2 }, py: 2 }}>
      <Paper 
        elevation={2} 
        sx={{ 
          borderRadius: 2,
          overflow: 'hidden',
          backgroundColor: 'background.paper'
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant={isMobile ? "scrollable" : "fullWidth"}
          scrollButtons={isMobile ? "auto" : false}
          allowScrollButtonsMobile
          aria-label="navigation tabs"
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTab-root': {
              minHeight: isMobile ? 48 : 64,
              textTransform: 'none',
              fontSize: isMobile ? '0.875rem' : '1rem',
              fontWeight: 500,
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.04)',
              },
              '&.Mui-selected': {
                color: 'primary.main',
                fontWeight: 600,
              }
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
          {tabs.map((tab, index) => (
            <Tab
              key={tab.path}
              label={tab.label}
              icon={tab.icon}
              iconPosition={isMobile ? "top" : "start"}
              id={`nav-tab-${index}`}
              aria-controls={`nav-tabpanel-${index}`}
              sx={{
                '& .MuiSvgIcon-root': {
                  fontSize: isMobile ? '1.2rem' : '1.25rem',
                }
              }}
            />
          ))}
        </Tabs>
      </Paper>
    </Container>
  );
};

export default NavigationTabs;