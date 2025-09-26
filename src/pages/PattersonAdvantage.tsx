import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  useTheme,
  useMediaQuery,
  Modal,
  TextField,
  Backdrop
} from '@mui/material';
import {
  NavigateNext as NextIcon,
  NavigateBefore as BackIcon,
  Computer as ComputerIcon,
  SavingsOutlined as PiggyBankIcon,
  AttachMoney as DollarIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const PattersonAdvantage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [enrollmentData, setEnrollmentData] = useState({
    name: '',
    email: ''
  });

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEnrollmentData({ name: '', email: '' });
  };

  const handleEnrollment = () => {
    console.log('Enrollment data:', enrollmentData);
    // Handle enrollment logic here
    setModalOpen(false);
    setEnrollmentData({ name: '', email: '' });
  };

  const handleInputChange = (field: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEnrollmentData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleBackStep = () => {
    console.log('Going back to previous step');
    navigate('/step4');
  };

  const handleNextStep = () => {
    console.log('Moving to next step');
    navigate('/step6');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 1 }}>
      <Paper elevation={1} sx={{ p: { xs: 2, md: 4 }, borderRadius: 2 }}>
        
        {/* Header Section */}
        <Typography 
          variant="h5" 
          sx={{ 
            mb: 3, 
            fontWeight: 'bold',
            color: 'text.primary',
            textAlign: 'left'
          }}
        >
          Get rewards for your purchases
        </Typography>

        {/* Description Text */}
        <Typography 
          variant="body1" 
          sx={{ 
            mb: 4,
            lineHeight: 1.6,
            textAlign: 'left',
            color: 'text.secondary'
          }}
        >
          As a valued customer, you save money with exclusive promotions, earn rewards for your purchases, 
          receive priority scheduling for service and support plus much more. The Patterson Advantage Loyalty 
          Reward program is built around one core idea - making it easier and more affordable for you to 
          invest in practice Growth. See how purchases you make with Patterson can help bring your practice 
          vision to life.
        </Typography>

        {/* Logo Section */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          mb: 5 
        }}>
          {/* Custom Logo */}
          <Box sx={{ 
            position: 'relative',
            mb: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            {/* Double Circle with A Pattern */}
            <Box sx={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              border: '4px solid #1976d2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              mb: 2,
              background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)'
            }}>
              {/* Inner Circle */}
              <Box sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                border: '2px solid #1565c0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#ffffff'
              }}>
                {/* Pyramid A Pattern with Dots */}
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 0.5
                }}>
                  <Box sx={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: '#1976d2' }} />
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <Box sx={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: '#1976d2' }} />
                    <Box sx={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: '#1976d2' }} />
                  </Box>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <Box sx={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: '#1976d2' }} />
                    <Box sx={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: '#1976d2' }} />
                    <Box sx={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: '#1976d2' }} />
                  </Box>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <Box sx={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: '#1976d2' }} />
                    <Box sx={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: '#1976d2' }} />
                    <Box sx={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: '#1976d2' }} />
                    <Box sx={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: '#1976d2' }} />
                  </Box>
                </Box>
              </Box>
            </Box>
            
            {/* Logo Text */}
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 'bold',
                color: '#1565c0',
                mb: 0.5
              }}
            >
              Advantage
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#1976d2'
              }}
            >
              Patterson Rewards
            </Typography>
          </Box>
        </Box>

        {/* How It Works Section */}
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 4, 
            fontWeight: 'bold',
            color: '#1976d2',
            textAlign: 'center'
          }}
        >
          How It Works
        </Typography>

        {/* Three Step Process */}
        <Box sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: 4,
          justifyContent: 'center',
          mb: 5
        }}>
          
          {/* Purchase Box */}
          <Box sx={{
            flex: 1,
            maxWidth: 300,
            textAlign: 'center',
            p: 3,
            borderRadius: 2,
            backgroundColor: '#f8f9fa',
            border: '1px solid #e3f2fd'
          }}>
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 2,
                fontWeight: 'bold',
                color: '#1976d2'
              }}
            >
              Purchase
            </Typography>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
              <ComputerIcon sx={{ fontSize: 60, color: '#1565c0' }} />
            </Box>
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#424242',
                lineHeight: 1.5
              }}
            >
              Make purchases through our platform and automatically start earning points with every transaction. 
              <Box component="span" sx={{ color: '#1976d2', fontWeight: 500 }}>
                Every dollar counts towards your rewards.
              </Box>
            </Typography>
          </Box>

          {/* Earn Box */}
          <Box sx={{
            flex: 1,
            maxWidth: 300,
            textAlign: 'center',
            p: 3,
            borderRadius: 2,
            backgroundColor: '#f8f9fa',
            border: '1px solid #e3f2fd'
          }}>
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 2,
                fontWeight: 'bold',
                color: '#1976d2'
              }}
            >
              Earn
            </Typography>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
              <PiggyBankIcon sx={{ fontSize: 60, color: '#1565c0' }} />
            </Box>
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#424242',
                lineHeight: 1.5
              }}
            >
              Accumulate points and unlock exclusive benefits. 
              <Box component="span" sx={{ color: '#1976d2', fontWeight: 500 }}>
                Watch your savings grow with each purchase
              </Box> 
              and gain access to special promotions.
            </Typography>
          </Box>

          {/* Redeem & Repeat Box */}
          <Box sx={{
            flex: 1,
            maxWidth: 300,
            textAlign: 'center',
            p: 3,
            borderRadius: 2,
            backgroundColor: '#f8f9fa',
            border: '1px solid #e3f2fd'
          }}>
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 2,
                fontWeight: 'bold',
                color: '#1976d2'
              }}
            >
              Redeem & Repeat
            </Typography>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
              <Box sx={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                border: '3px solid #1565c0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#e3f2fd'
              }}>
                <DollarIcon sx={{ fontSize: 30, color: '#1565c0' }} />
              </Box>
            </Box>
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#424242',
                lineHeight: 1.5
              }}
            >
              Use your earned points for discounts, free products, or priority services. 
              <Box component="span" sx={{ color: '#1976d2', fontWeight: 500 }}>
                The cycle continues with every new purchase.
              </Box>
            </Typography>
          </Box>

        </Box>

        {/* Enroll Now Button */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mt: 4 
        }}>
          <Button
            variant="contained"
            size="medium"
            onClick={handleOpenModal}
            sx={{ 
              minWidth: 140,
              py: 1,
              fontSize: '0.95rem',
              fontWeight: 600
            }}
          >
            Enroll Now
          </Button>
        </Box>

        {/* Enrollment Modal */}
        <Modal
          open={modalOpen}
          onClose={handleCloseModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isMobile ? '90%' : 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}>
            <Typography 
              variant="h5" 
              sx={{ 
                mb: 3,
                fontWeight: 600,
                color: 'text.primary',
                textAlign: 'center'
              }}
            >
              Enroll in Patterson Advantage
            </Typography>

            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Full Name"
                value={enrollmentData.name}
                onChange={handleInputChange('name')}
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={enrollmentData.email}
                onChange={handleInputChange('email')}
                variant="outlined"
              />
            </Box>

            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              gap: 2
            }}>
              <Button
                variant="outlined"
                onClick={handleCloseModal}
                sx={{ 
                  minWidth: 100,
                  py: 1
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleEnrollment}
                sx={{ 
                  minWidth: 100,
                  py: 1
                }}
              >
                Enroll
              </Button>
            </Box>
          </Box>
        </Modal>

      </Paper>
      
      {/* Navigation Buttons */}
      <Box sx={{ 
        mt: 3, 
        display: 'flex', 
        justifyContent: 'space-between'
      }}>
        <Button
          variant="outlined"
          size="medium"
          startIcon={<BackIcon />}
          onClick={handleBackStep}
          sx={{ 
            minWidth: 140,
            py: 1,
            fontSize: '0.95rem',
            fontWeight: 600
          }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          size="medium"
          endIcon={<NextIcon />}
          onClick={handleNextStep}
          sx={{ 
            minWidth: 140,
            py: 1,
            fontSize: '0.95rem',
            fontWeight: 600
          }}
        >
          Next Step
        </Button>
      </Box>
    </Container>
  );
};

export default PattersonAdvantage;