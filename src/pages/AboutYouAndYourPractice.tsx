import React, { useState } from 'react';
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Button,
  Paper,
  TextField,
  FormControlLabel,
  Checkbox,
  useTheme,
  useMediaQuery,
  IconButton
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Save as SaveIcon,
  NavigateNext as NextIcon,
  Edit as EditIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';

const AboutYouAndYourPractice: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  
  const [expanded, setExpanded] = useState<string | false>('panel1');
  const [editMode, setEditMode] = useState({
    panel1: true, // Start with first panel in edit mode
    panel2: false,
    panel3: false
  });
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    practiceType: '',
    yearsInPractice: '',
    numberOfPractitioners: '',
    acceptsInsurance: false,
    offersCashPay: false,
    hearAboutUs: '',
    specialRequirements: '',
    agreeToTerms: false,
    receiveMarketing: false
  });

  const handleAccordionChange = (panel: string) => (
    event: React.SyntheticEvent, 
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleInputChange = (field: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleEdit = (panel: keyof typeof editMode) => {
    setEditMode(prev => ({
      ...prev,
      [panel]: !prev[panel]
    }));
  };

  const handleSave = (section: string) => {
    console.log(`Saving ${section}:`, formData);
    if (section === 'basic-info') {
      setEditMode(prev => ({ ...prev, panel1: false }));
    } else if (section === 'practice-details') {
      setEditMode(prev => ({ ...prev, panel2: false }));
    } else if (section === 'additional-info') {
      setEditMode(prev => ({ ...prev, panel3: false }));
    }
  };

  const handleNext = (section: string) => {
    console.log(`Next from ${section}:`, formData);
    if (section === 'basic-info') {
      setExpanded('panel2');
      setEditMode(prev => ({ ...prev, panel1: false, panel2: true }));
    } else if (section === 'practice-details') {
      setExpanded('panel3');
      setEditMode(prev => ({ ...prev, panel2: false, panel3: true }));
    }
  };

  const handleNextStep = () => {
    console.log('Moving to next step (Licensing):', formData);
    navigate('/step2'); // Navigate to licensing step
  };

  return (
    <Container maxWidth="lg" sx={{ py: 1 }}>
      <Paper elevation={1} sx={{ p: { xs: 1.5, md: 2 }, borderRadius: 2 }}>
        <Box sx={{ width: '100%' }}>
          
          {/* Accordion 1: Basic Information */}
          <Accordion 
            expanded={expanded === 'panel1'} 
            onChange={handleAccordionChange('panel1')}
            sx={{ mb: 1.5, borderRadius: 1, '&:before': { display: 'none' } }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ 
                backgroundColor: 'primary.light',
                color: 'primary.contrastText',
                minHeight: 48,
                '&.Mui-expanded': {
                  backgroundColor: 'primary.main',
                  minHeight: 48
                },
                '& .MuiAccordionSummary-content': {
                  margin: '8px 0'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  1. Basic Information
                </Typography>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit('panel1');
                  }}
                  sx={{ 
                    color: 'inherit',
                    mr: 1,
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                  }}
                >
                  {editMode.panel1 ? <CloseIcon /> : <EditIcon />}
                </IconButton>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 1.5 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Business Name"
                    value={formData.businessName}
                    onChange={handleInputChange('businessName')}
                    variant="outlined"
                    disabled={!editMode.panel1}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Contact Name"
                    value={formData.contactName}
                    onChange={handleInputChange('contactName')}
                    variant="outlined"
                    disabled={!editMode.panel1}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    variant="outlined"
                    disabled={!editMode.panel1}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange('phone')}
                    variant="outlined"
                    disabled={!editMode.panel1}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Business Address"
                    value={formData.address}
                    onChange={handleInputChange('address')}
                    variant="outlined"
                    disabled={!editMode.panel1}
                    required
                  />
                </Grid>
              </Grid>
              
              <Box sx={{ 
                mt: 2, 
                display: 'flex', 
                gap: 1, 
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'flex-end'
              }}>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<SaveIcon />}
                  onClick={() => handleSave('basic-info')}
                  sx={{ minWidth: 100 }}
                  disabled={!editMode.panel1}
                >
                  Cancel
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  endIcon={<NextIcon />}
                  onClick={() => handleNext('basic-info')}
                  sx={{ minWidth: 100 }}
                >
                  Save
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* Accordion 2: Practice Details */}
          <Accordion 
            expanded={expanded === 'panel2'} 
            onChange={handleAccordionChange('panel2')}
            sx={{ mb: 1.5, borderRadius: 1, '&:before': { display: 'none' } }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ 
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                minHeight: 48,
                '&.Mui-expanded': {
                  backgroundColor: 'primary.dark',
                  minHeight: 48
                },
                '& .MuiAccordionSummary-content': {
                  margin: '8px 0'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  2. Practice Details
                </Typography>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit('panel2');
                  }}
                  sx={{ 
                    color: 'inherit',
                    mr: 1,
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                  }}
                >
                  {editMode.panel2 ? <CloseIcon /> : <EditIcon />}
                </IconButton>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 1.5 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Practice Type"
                    value={formData.practiceType}
                    onChange={handleInputChange('practiceType')}
                    variant="outlined"
                    placeholder="e.g., General Practice"
                    disabled={!editMode.panel2}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Years in Practice"
                    value={formData.yearsInPractice}
                    onChange={handleInputChange('yearsInPractice')}
                    type="number"
                    variant="outlined"
                    disabled={!editMode.panel2}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="# of Practitioners"
                    value={formData.numberOfPractitioners}
                    onChange={handleInputChange('numberOfPractitioners')}
                    type="number"
                    variant="outlined"
                    disabled={!editMode.panel2}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <FormControlLabel
                      control={
                        <Checkbox 
                          size="small"
                          checked={formData.acceptsInsurance}
                          onChange={(e) => setFormData(prev => ({ ...prev, acceptsInsurance: e.target.checked }))}
                          disabled={!editMode.panel2}
                        />
                      }
                      label="Accepts Insurance"
                      sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox 
                          size="small"
                          checked={formData.offersCashPay}
                          onChange={(e) => setFormData(prev => ({ ...prev, offersCashPay: e.target.checked }))}
                          disabled={!editMode.panel2}
                        />
                      }
                      label="Cash/Direct Pay"
                      sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
                    />
                  </Box>
                </Grid>
              </Grid>
              
              <Box sx={{ 
                mt: 2, 
                display: 'flex', 
                gap: 1, 
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'flex-end'
              }}>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<SaveIcon />}
                  onClick={() => handleSave('practice-details')}
                  sx={{ minWidth: 100 }}
                  disabled={!editMode.panel2}
                >
                  Cancel
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  endIcon={<NextIcon />}
                  onClick={() => handleNext('practice-details')}
                  sx={{ minWidth: 100 }}
                >
                  Save
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* Accordion 3: Additional Information */}
          <Accordion 
            expanded={expanded === 'panel3'} 
            onChange={handleAccordionChange('panel3')}
            sx={{ mb: 1.5, borderRadius: 1, '&:before': { display: 'none' } }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ 
                backgroundColor: 'info.main',
                color: 'info.contrastText',
                minHeight: 48,
                '&.Mui-expanded': {
                  backgroundColor: 'info.dark',
                  minHeight: 48
                },
                '& .MuiAccordionSummary-content': {
                  margin: '8px 0'
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  3. Additional Information
                </Typography>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit('panel3');
                  }}
                  sx={{ 
                    color: 'inherit',
                    mr: 1,
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                  }}
                >
                  {editMode.panel3 ? <CloseIcon /> : <EditIcon />}
                </IconButton>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 1.5 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="How did you hear about us?"
                    value={formData.hearAboutUs}
                    onChange={handleInputChange('hearAboutUs')}
                    variant="outlined"
                    disabled={!editMode.panel3}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Special Requirements"
                    value={formData.specialRequirements}
                    onChange={handleInputChange('specialRequirements')}
                    variant="outlined"
                    disabled={!editMode.panel3}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <FormControlLabel
                    control={
                      <Checkbox 
                        size="small"
                        checked={formData.agreeToTerms}
                        onChange={(e) => setFormData(prev => ({ ...prev, agreeToTerms: e.target.checked }))}
                        disabled={!editMode.panel3}
                      />
                    }
                    label="Agree to Terms"
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <FormControlLabel
                    control={
                      <Checkbox 
                        size="small"
                        checked={formData.receiveMarketing}
                        onChange={(e) => setFormData(prev => ({ ...prev, receiveMarketing: e.target.checked }))}
                        disabled={!editMode.panel3}
                      />
                    }
                    label="Marketing Communications"
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
                  />
                </Grid>
              </Grid>
              
              {/* Only Save button for last accordion */}
              <Box sx={{ 
                mt: 2, 
                display: 'flex', 
                gap: 1, 
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'flex-end'
              }}>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<SaveIcon />}
                  onClick={() => handleSave('additional-info')}
                  sx={{ minWidth: 100 }}
                  disabled={!editMode.panel3}
                >
                  Save
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>

        </Box>
      </Paper>
      
      {/* Next Step Button - Outside container, right aligned */}
      <Box sx={{ 
        mt: 3, 
        display: 'flex', 
        justifyContent: 'flex-end'
      }}>
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

export default AboutYouAndYourPractice;