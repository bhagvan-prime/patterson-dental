import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Menu,
} from '@mui/material';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <Box
            component="img"
            src="/images/logo.png"
            alt="Patterson Dental Logo"
            sx={{
              position: { xs: 'relative', lg: 'absolute' },
              top: { lg: '5px' },
              left: { lg: '53px' },

              // >>>>>> CORRECTED LOGO DIMENSIONS BASED ON YOUR LATEST SPECS <<<<<<
              width: { xs: '60px', lg: '91px' },
              height: { xs: '30px', lg: '51px' },
              objectFit: 'contain',

              // Mobile alignment within the blue box
              alignSelf: { xs: 'flex-start', lg: 'auto' },
              mt: { xs: 1, lg: 0 },
              mb: { xs: 2, lg: 0 },
              // Removed specific mobile left margin as alignSelf and parent padding should handle it
            }}
          />

          {/* Desktop Navigation */}
          {/* <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <Button color="inherit" onClick={() => navigate('/home')}>
              Home
            </Button>
            <Button color="inherit" onClick={() => navigate('/about')}>
              About
            </Button>
            <Button color="inherit" onClick={() => navigate('/stepper')}>
              Horizontal Stepper
            </Button>
            <Button color="inherit" onClick={() => navigate('/vertical')}>
              Vertical Stepper
            </Button>
          </Box> */}

          {/* Mobile Navigation */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            {/* <IconButton
              size="large"
              edge="start"
              color="inherit"
              onClick={handleMenuClick}
            >
              <MenuIcon />
            </IconButton> */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {/* <MenuItem onClick={() => handleNavigation('/')}>Home</MenuItem>
              <MenuItem onClick={() => handleNavigation('/about')}>About</MenuItem>
              <MenuItem onClick={() => handleNavigation('/stepper')}>Stepper</MenuItem> */}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) => theme.palette.grey[200],
        }}
      >
        <Typography variant="body2" color="text.secondary" align="center">
          © 2025 My MUI App. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Layout;