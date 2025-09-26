import React, { useState, useEffect } from 'react';
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
    panel1: true,
    panel2: true,
    panel3: true,
    panel4: true
  });
  const [formData, setFormData] = useState({
    // Practitioner Information
    firstName: '',
    lastName: '',
    emailId: '',
    
    // Practice Information
    legalPracticeName: '',
    typesOfBusiness: '',
    timeInBusiness: '',
    speciality: '',
    numberOfLocations: '',
    numberOfOperatories: '',
    
    // Practice Address - Billing
    billingAddressLine1: '',
    billingAddressLine2: '',
    billingCity: '',
    billingZipCode: '',
    billingLocationPhone: '',
    
    // Practice Address - Shipping
    shippingSameAsBilling: false,
    shippingAddressLine1: '',
    shippingAddressLine2: '',
    shippingCity: '',
    shippingZipCode: '',
    shippingLocationPhone: '',
    addAnotherShippingAddress: false,
    
    // Online User Information
    sameAsPractitioner: false,
    onlineFirstName: '',
    onlineLastName: '',
    roleAtPractice: '',
    onlineEmail: '',
    password: '',
    stayUpToDate: false,
    workingWithSalesRep: false
  });

  // Auto-populate online user info when "Same as Practitioner" is checked
  useEffect(() => {
    if (formData.sameAsPractitioner) {
      setFormData(prev => ({
        ...prev,
        onlineFirstName: prev.firstName,
        onlineLastName: prev.lastName,
        onlineEmail: prev.emailId
      }));
    }
  }, [formData.sameAsPractitioner, formData.firstName, formData.lastName, formData.emailId]);

  // Auto-populate shipping address when "Same as Billing" is checked
  useEffect(() => {
    if (formData.shippingSameAsBilling) {
      setFormData(prev => ({
        ...prev,
        shippingAddressLine1: prev.billingAddressLine1,
        shippingAddressLine2: prev.billingAddressLine2,
        shippingCity: prev.billingCity,
        shippingZipCode: prev.billingZipCode,
        shippingLocationPhone: prev.billingLocationPhone
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        shippingAddressLine1: '',
        shippingAddressLine2: '',
        shippingCity: '',
        shippingZipCode: '',
        shippingLocationPhone: ''
      }));
    }
  }, [formData.shippingSameAsBilling, formData.billingAddressLine1, formData.billingAddressLine2, formData.billingCity, formData.billingZipCode, formData.billingLocationPhone]);

  const handleAccordionChange = (panel: string) => (
    event: React.SyntheticEvent, 
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleInputChange = (field: string) => (
    event: React.ChangeEvent<HTMLInputElement> | { target: { value: unknown } }
  ) => {
    let value: any;
    if ('target' in event) {
      if ('type' in event.target && event.target.type === 'checkbox') {
        value = (event.target as HTMLInputElement).checked;
      } else {
        value = event.target.value;
      }
    }
    setFormData(prev => ({
      ...prev,
      [field]: value
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
    if (section === 'practitioner-info') {
      setEditMode(prev => ({ ...prev, panel1: false }));
    } else if (section === 'practice-info') {
      setEditMode(prev => ({ ...prev, panel2: false }));
    } else if (section === 'practice-address') {
      setEditMode(prev => ({ ...prev, panel3: false }));
    } else if (section === 'online-user-info') {
      setEditMode(prev => ({ ...prev, panel4: false }));
    }
  };

  const handleNext = (section: string) => {
    console.log(`Next from ${section}:`, formData);
    if (section === 'practitioner-info') {
      setExpanded('panel2');
    } else if (section === 'practice-info') {
      setExpanded('panel3');
    } else if (section === 'practice-address') {
      setExpanded('panel4');
    }
  };

  const handleNextStep = () => {
    console.log('Moving to next step (Licensing):', formData);
    navigate('/step2');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 1 }}>
      <Paper elevation={1} sx={{ p: { xs: 1.5, md: 2 }, borderRadius: 2 }}>
        <Box sx={{ width: '100%' }}>
          
          {/* Accordion 1: Practitioner Information */}
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
                  Practitioner Information
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
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange('firstName')}
                    variant="outlined"
                    disabled={!editMode.panel1}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange('lastName')}
                    variant="outlined"
                    disabled={!editMode.panel1}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Email ID"
                    type="email"
                    value={formData.emailId}
                    onChange={handleInputChange('emailId')}
                    variant="outlined"
                    disabled={!editMode.panel1}
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
                  onClick={() => handleSave('practitioner-info')}
                  sx={{ minWidth: 100 }}
                  disabled={!editMode.panel1}
                >
                  Cancel
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  endIcon={<NextIcon />}
                  onClick={() => handleNext('practitioner-info')}
                  sx={{ minWidth: 100 }}
                >
                  Save
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* Accordion 2: Practice Information */}
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
                  Practice Information
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
                    label="Legal Practice Name"
                    value={formData.legalPracticeName}
                    onChange={handleInputChange('legalPracticeName')}
                    variant="outlined"
                    disabled={!editMode.panel2}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <FormControl fullWidth size="small" disabled={!editMode.panel2}>
                    <InputLabel>Types of Business</InputLabel>
                    <Select
                      value={formData.typesOfBusiness}
                      label="Types of Business"
                      onChange={handleInputChange('typesOfBusiness')}
                    >
                      <MenuItem value="General Practice">General Practice</MenuItem>
                      <MenuItem value="Specialty Practice">Specialty Practice</MenuItem>
                      <MenuItem value="Multi-Specialty">Multi-Specialty</MenuItem>
                      <MenuItem value="Hospital">Hospital</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <FormControl fullWidth size="small" disabled={!editMode.panel2}>
                    <InputLabel>Time in Business</InputLabel>
                    <Select
                      value={formData.timeInBusiness}
                      label="Time in Business"
                      onChange={handleInputChange('timeInBusiness')}
                    >
                      <MenuItem value="Less than 1 year">Less than 1 year</MenuItem>
                      <MenuItem value="1-5 years">1-5 years</MenuItem>
                      <MenuItem value="6-10 years">6-10 years</MenuItem>
                      <MenuItem value="11-20 years">11-20 years</MenuItem>
                      <MenuItem value="More than 20 years">More than 20 years</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <FormControl fullWidth size="small" disabled={!editMode.panel2}>
                    <InputLabel>Speciality</InputLabel>
                    <Select
                      value={formData.speciality}
                      label="Speciality"
                      onChange={handleInputChange('speciality')}
                    >
                      <MenuItem value="General Medicine">General Medicine</MenuItem>
                      <MenuItem value="Cardiology">Cardiology</MenuItem>
                      <MenuItem value="Dermatology">Dermatology</MenuItem>
                      <MenuItem value="Orthopedics">Orthopedics</MenuItem>
                      <MenuItem value="Pediatrics">Pediatrics</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <FormControl fullWidth size="small" disabled={!editMode.panel2}>
                    <InputLabel>Number of Locations</InputLabel>
                    <Select
                      value={formData.numberOfLocations}
                      label="Number of Locations"
                      onChange={handleInputChange('numberOfLocations')}
                    >
                      <MenuItem value="1">1</MenuItem>
                      <MenuItem value="2-5">2-5</MenuItem>
                      <MenuItem value="6-10">6-10</MenuItem>
                      <MenuItem value="More than 10">More than 10</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <FormControl fullWidth size="small" disabled={!editMode.panel2}>
                    <InputLabel>Number of Operatories</InputLabel>
                    <Select
                      value={formData.numberOfOperatories}
                      label="Number of Operatories"
                      onChange={handleInputChange('numberOfOperatories')}
                    >
                      <MenuItem value="1-10">1-10</MenuItem>
                      <MenuItem value="11-50">11-50</MenuItem>
                      <MenuItem value="51-100">51-100</MenuItem>
                      <MenuItem value="More than 100">More than 100</MenuItem>
                    </Select>
                  </FormControl>
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
                  onClick={() => handleSave('practice-info')}
                  sx={{ minWidth: 100 }}
                  disabled={!editMode.panel2}
                >
                  Cancel
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  endIcon={<NextIcon />}
                  onClick={() => handleNext('practice-info')}
                  sx={{ minWidth: 100 }}
                >
                  Save
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* Accordion 3: Practice Address */}
          <Accordion 
            expanded={expanded === 'panel3'} 
            onChange={handleAccordionChange('panel3')}
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
                  Practice Address
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
              {/* Billing Address */}
              <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                Billing Address
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Address Line 1"
                    value={formData.billingAddressLine1}
                    onChange={handleInputChange('billingAddressLine1')}
                    variant="outlined"
                    disabled={!editMode.panel3}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Address Line 2"
                    value={formData.billingAddressLine2}
                    onChange={handleInputChange('billingAddressLine2')}
                    variant="outlined"
                    disabled={!editMode.panel3}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="City"
                    value={formData.billingCity}
                    onChange={handleInputChange('billingCity')}
                    variant="outlined"
                    disabled={!editMode.panel3}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Zip Code"
                    value={formData.billingZipCode}
                    onChange={handleInputChange('billingZipCode')}
                    variant="outlined"
                    disabled={!editMode.panel3}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Location Phone Number"
                    value={formData.billingLocationPhone}
                    onChange={handleInputChange('billingLocationPhone')}
                    variant="outlined"
                    disabled={!editMode.panel3}
                  />
                </Grid>
              </Grid>

              {/* Shipping Address */}
              <Box sx={{ mt: 3 }}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      size="small"
                      checked={formData.shippingSameAsBilling}
                      onChange={handleInputChange('shippingSameAsBilling')}
                      disabled={!editMode.panel3}
                    />
                  }
                  label="Shipping address is same as billing address"
                  sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem', fontWeight: 600 } }}
                />
              </Box>

              <Typography variant="subtitle2" sx={{ mt: 2, mb: 2, fontWeight: 600 }}>
                Shipping Address
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Address Line 1"
                    value={formData.shippingAddressLine1}
                    onChange={handleInputChange('shippingAddressLine1')}
                    variant="outlined"
                    disabled={!editMode.panel3 || formData.shippingSameAsBilling}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Address Line 2"
                    value={formData.shippingAddressLine2}
                    onChange={handleInputChange('shippingAddressLine2')}
                    variant="outlined"
                    disabled={!editMode.panel3 || formData.shippingSameAsBilling}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="City"
                    value={formData.shippingCity}
                    onChange={handleInputChange('shippingCity')}
                    variant="outlined"
                    disabled={!editMode.panel3 || formData.shippingSameAsBilling}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Zip Code"
                    value={formData.shippingZipCode}
                    onChange={handleInputChange('shippingZipCode')}
                    variant="outlined"
                    disabled={!editMode.panel3 || formData.shippingSameAsBilling}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Location Phone Number"
                    value={formData.shippingLocationPhone}
                    onChange={handleInputChange('shippingLocationPhone')}
                    variant="outlined"
                    disabled={!editMode.panel3 || formData.shippingSameAsBilling}
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      size="small"
                      checked={formData.addAnotherShippingAddress}
                      onChange={handleInputChange('addAnotherShippingAddress')}
                      disabled={!editMode.panel3}
                    />
                  }
                  label="Add Another Shipping Address"
                  sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
                />
              </Box>
              
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
                  onClick={() => handleSave('practice-address')}
                  sx={{ minWidth: 100 }}
                  disabled={!editMode.panel3}
                >
                  Cancel
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  endIcon={<NextIcon />}
                  onClick={() => handleNext('practice-address')}
                  sx={{ minWidth: 100 }}
                >
                  Save
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* Accordion 4: Online User Information */}
          <Accordion 
            expanded={expanded === 'panel4'} 
            onChange={handleAccordionChange('panel4')}
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
                  Online User Information
                </Typography>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit('panel4');
                  }}
                  sx={{ 
                    color: 'inherit',
                    mr: 1,
                    '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' }
                  }}
                >
                  {editMode.panel4 ? <CloseIcon /> : <EditIcon />}
                </IconButton>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 1.5 }}>
              <Box sx={{ mb: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox 
                      size="small"
                      checked={formData.sameAsPractitioner}
                      onChange={handleInputChange('sameAsPractitioner')}
                      disabled={!editMode.panel4}
                    />
                  }
                  label="Same as Practitioner"
                  sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem', fontWeight: 600 } }}
                />
              </Box>
              
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="First Name"
                    value={formData.onlineFirstName}
                    onChange={handleInputChange('onlineFirstName')}
                    variant="outlined"
                    disabled={!editMode.panel4 || formData.sameAsPractitioner}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Last Name"
                    value={formData.onlineLastName}
                    onChange={handleInputChange('onlineLastName')}
                    variant="outlined"
                    disabled={!editMode.panel4 || formData.sameAsPractitioner}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <FormControl fullWidth size="small" disabled={!editMode.panel4}>
                    <InputLabel>Role at Practice</InputLabel>
                    <Select
                      value={formData.roleAtPractice}
                      label="Role at Practice"
                      onChange={handleInputChange('roleAtPractice')}
                    >
                      <MenuItem value="Doctor">Doctor</MenuItem>
                      <MenuItem value="Nurse">Nurse</MenuItem>
                      <MenuItem value="Administrator">Administrator</MenuItem>
                      <MenuItem value="Manager">Manager</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Email"
                    type="email"
                    value={formData.onlineEmail}
                    onChange={handleInputChange('onlineEmail')}
                    variant="outlined"
                    disabled={!editMode.panel4 || formData.sameAsPractitioner}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange('password')}
                    variant="outlined"
                    disabled={!editMode.panel4}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
                    <FormControlLabel
                      control={
                        <Checkbox 
                          size="small"
                          checked={formData.stayUpToDate}
                          onChange={handleInputChange('stayUpToDate')}
                          disabled={!editMode.panel4}
                        />
                      }
                      label="I would like to stay up to date on Patterson news"
                      sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox 
                          size="small"
                          checked={formData.workingWithSalesRep}
                          onChange={handleInputChange('workingWithSalesRep')}
                          disabled={!editMode.panel4}
                        />
                      }
                      label="I am working with a Patterson sales rep"
                      sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
                    />
                  </Box>
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
                  onClick={() => handleSave('online-user-info')}
                  sx={{ minWidth: 100 }}
                  disabled={!editMode.panel4}
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