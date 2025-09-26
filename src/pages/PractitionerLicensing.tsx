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
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Save as SaveIcon,
  NavigateNext as NextIcon,
  NavigateBefore as BackIcon,
  Edit as EditIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';

const PractitionerLicensing: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  
  const [expanded, setExpanded] = useState<string | false>('panel1');
  const [editMode, setEditMode] = useState({
    panel1: true,
    panel2: true
  });
  const [formData, setFormData] = useState({
    // Practitioner Licensing
    nameOnLicense: '',
    licenseNumber: '',
    licenseExpirationDate: '',
    selectedAddress: '',
    hasAdditionalLicensing: false,
    
    // TDDDD
    basedOnShippingAddress: '',
    tddLicenseExpiration: '',
    
    // Validation checkbox
    understandValidationRequirements: false
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

  const handleSelectChange = (field: string) => (
    event: any
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleCheckboxChange = (field: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.checked
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
    if (section === 'practitioner-licensing') {
      setEditMode(prev => ({ ...prev, panel1: false }));
    } else if (section === 'tdddd-info') {
      setEditMode(prev => ({ ...prev, panel2: false }));
    }
  };

  const handleNext = (section: string) => {
    console.log(`Next from ${section}:`, formData);
    if (section === 'practitioner-licensing') {
      setExpanded('panel2');
    }
  };

  const handleBackStep = () => {
    console.log('Going back to previous step');
    navigate('/step1');
  };

  const handleNextStep = () => {
    console.log('Moving to next step:', formData);
    navigate('/step3');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 1 }}>
      <Paper elevation={1} sx={{ p: { xs: 1.5, md: 2 }, borderRadius: 2 }}>
        
        {/* Header Text */}
        <Typography 
          variant="body1" 
          sx={{ 
            mb: 3, 
            fontWeight: 'bold',
            textAlign: 'left'
          }}
        >
          Please provide your practitioner license to be added to your account to enable ordering of prescription and other regulated materials
        </Typography>

        <Box sx={{ width: '100%' }}>
          
          {/* Accordion 1: Practitioner Licensing */}
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
                  Practitioner Licensing
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
                <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Name as appears on license"
                    value={formData.nameOnLicense}
                    onChange={handleInputChange('nameOnLicense')}
                    variant="outlined"
                    disabled={!editMode.panel1}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="License Number"
                    value={formData.licenseNumber}
                    onChange={handleInputChange('licenseNumber')}
                    variant="outlined"
                    disabled={!editMode.panel1}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="License Expiration Date"
                    type="date"
                    value={formData.licenseExpirationDate}
                    onChange={handleInputChange('licenseExpirationDate')}
                    variant="outlined"
                    disabled={!editMode.panel1}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                  <FormControl fullWidth size="small" disabled={!editMode.panel1}>
                    <InputLabel>Select address license applies to</InputLabel>
                    <Select
                      value={formData.selectedAddress}
                      label="Select address license applies to"
                      onChange={handleSelectChange('selectedAddress')}
                    >
                      <MenuItem value="address1">123 Main St, City, State 12345</MenuItem>
                      <MenuItem value="address2">456 Oak Ave, City, State 67890</MenuItem>
                      <MenuItem value="address3">789 Pine Rd, City, State 54321</MenuItem>
                      <MenuItem value="other">Other Address</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <FormControlLabel
                    control={
                      <Checkbox 
                        size="small"
                        checked={formData.hasAdditionalLicensing}
                        onChange={handleCheckboxChange('hasAdditionalLicensing')}
                        disabled={!editMode.panel1}
                      />
                    }
                    label="I have additional licensing I would like to add my account"
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
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
                  onClick={() => handleSave('practitioner-licensing')}
                  sx={{ minWidth: 100 }}
                  disabled={!editMode.panel1}
                >
                  Cancel
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  endIcon={<NextIcon />}
                  onClick={() => handleNext('practitioner-licensing')}
                  sx={{ minWidth: 100 }}
                >
                  Save
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* Accordion 2: TDDDD */}
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
                  TDDDD
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
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Based on shipping address"
                    value={formData.basedOnShippingAddress}
                    onChange={handleInputChange('basedOnShippingAddress')}
                    variant="outlined"
                    disabled={!editMode.panel2}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="TDD license expiration"
                    type="date"
                    value={formData.tddLicenseExpiration}
                    onChange={handleInputChange('tddLicenseExpiration')}
                    variant="outlined"
                    disabled={!editMode.panel2}
                    InputLabelProps={{ shrink: true }}
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
                  onClick={() => handleSave('tdddd-info')}
                  sx={{ minWidth: 100 }}
                  disabled={!editMode.panel2}
                >
                  Save
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>

        </Box>

        {/* Footer Text */}
        <Typography 
          variant="body1" 
          sx={{ 
            mt: 3, 
            mb: 2,
            fontWeight: 'bold',
            textAlign: 'left'
          }}
        >
          Validation of licensing information will take up to 1-2 business days. Ordering of prescription or other regulated materials will not be allowed until validation is complete.
        </Typography>

        {/* Validation Requirements Checkbox */}
        <Box sx={{ mb: 2 }}>
          <FormControlLabel
            control={
              <Checkbox 
                size="small"
                checked={formData.understandValidationRequirements}
                onChange={handleCheckboxChange('understandValidationRequirements')}
              />
            }
            label="I understand the validation requirements prior to ordering regulated materials"
            sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
          />
        </Box>

      </Paper>
      
      {/* Navigation Buttons - Outside container */}
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

export default PractitionerLicensing;