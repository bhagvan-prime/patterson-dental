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
    panel2: false,
    panel3: false
  });
  const [formData, setFormData] = useState({
    licenseNumber: '',
    licenseType: '',
    issuingState: '',
    issueDate: '',
    expirationDate: '',
    deaNumber: '',
    npiNumber: '',
    boardCertifications: '',
    malpracticeCarrier: '',
    policyNumber: '',
    coverageAmount: '',
    policyExpiration: '',
    additionalLicenses: '',
    specialPermits: '',
    hasRestrictions: false,
    restrictionDetails: ''
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

  const handleEdit = (panel: keyof typeof editMode) => {
    setEditMode(prev => ({
      ...prev,
      [panel]: !prev[panel]
    }));
  };

  const handleSave = (section: string) => {
    console.log(`Saving ${section}:`, formData);
    if (section === 'license-info') {
      setEditMode(prev => ({ ...prev, panel1: false }));
    } else if (section === 'insurance-info') {
      setEditMode(prev => ({ ...prev, panel2: false }));
    } else if (section === 'additional-info') {
      setEditMode(prev => ({ ...prev, panel3: false }));
    }
  };

  const handleNext = (section: string) => {
    console.log(`Next from ${section}:`, formData);
    if (section === 'license-info') {
      setExpanded('panel2');
      setEditMode(prev => ({ ...prev, panel1: false, panel2: true }));
    } else if (section === 'insurance-info') {
      setExpanded('panel3');
      setEditMode(prev => ({ ...prev, panel2: false, panel3: true }));
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
        <Box sx={{ width: '100%' }}>
          
          {/* Accordion 1: License Information */}
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
                  1. License Information
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
                    label="License Number"
                    value={formData.licenseNumber}
                    onChange={handleInputChange('licenseNumber')}
                    variant="outlined"
                    disabled={!editMode.panel1}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <FormControl fullWidth size="small" disabled={!editMode.panel1}>
                    <InputLabel>License Type</InputLabel>
                    <Select
                      value={formData.licenseType}
                      label="License Type"
                      onChange={handleSelectChange('licenseType')}
                    >
                      <MenuItem value="MD">Doctor of Medicine (MD)</MenuItem>
                      <MenuItem value="DO">Doctor of Osteopathy (DO)</MenuItem>
                      <MenuItem value="DDS">Doctor of Dental Surgery (DDS)</MenuItem>
                      <MenuItem value="DMD">Doctor of Dental Medicine (DMD)</MenuItem>
                      <MenuItem value="NP">Nurse Practitioner (NP)</MenuItem>
                      <MenuItem value="PA">Physician Assistant (PA)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <FormControl fullWidth size="small" disabled={!editMode.panel1}>
                    <InputLabel>Issuing State</InputLabel>
                    <Select
                      value={formData.issuingState}
                      label="Issuing State"
                      onChange={handleSelectChange('issuingState')}
                    >
                      <MenuItem value="CA">California</MenuItem>
                      <MenuItem value="TX">Texas</MenuItem>
                      <MenuItem value="FL">Florida</MenuItem>
                      <MenuItem value="NY">New York</MenuItem>
                      <MenuItem value="IL">Illinois</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Issue Date"
                    type="date"
                    value={formData.issueDate}
                    onChange={handleInputChange('issueDate')}
                    variant="outlined"
                    disabled={!editMode.panel1}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Expiration Date"
                    type="date"
                    value={formData.expirationDate}
                    onChange={handleInputChange('expirationDate')}
                    variant="outlined"
                    disabled={!editMode.panel1}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="DEA Number"
                    value={formData.deaNumber}
                    onChange={handleInputChange('deaNumber')}
                    variant="outlined"
                    disabled={!editMode.panel1}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="NPI Number"
                    value={formData.npiNumber}
                    onChange={handleInputChange('npiNumber')}
                    variant="outlined"
                    disabled={!editMode.panel1}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Board Certifications"
                    value={formData.boardCertifications}
                    onChange={handleInputChange('boardCertifications')}
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
                  onClick={() => handleSave('license-info')}
                  sx={{ minWidth: 100 }}
                  disabled={!editMode.panel1}
                >
                  Cancel
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  endIcon={<NextIcon />}
                  onClick={() => handleNext('license-info')}
                  sx={{ minWidth: 100 }}
                >
                  Save
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* Accordion 2: Malpractice Insurance */}
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
                  2. Malpractice Insurance
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
                    label="Insurance Carrier"
                    value={formData.malpracticeCarrier}
                    onChange={handleInputChange('malpracticeCarrier')}
                    variant="outlined"
                    disabled={!editMode.panel2}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Policy Number"
                    value={formData.policyNumber}
                    onChange={handleInputChange('policyNumber')}
                    variant="outlined"
                    disabled={!editMode.panel2}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Coverage Amount"
                    value={formData.coverageAmount}
                    onChange={handleInputChange('coverageAmount')}
                    variant="outlined"
                    placeholder="e.g., $1M/$3M"
                    disabled={!editMode.panel2}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Policy Expiration"
                    type="date"
                    value={formData.policyExpiration}
                    onChange={handleInputChange('policyExpiration')}
                    variant="outlined"
                    disabled={!editMode.panel2}
                    InputLabelProps={{ shrink: true }}
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
                  onClick={() => handleSave('insurance-info')}
                  sx={{ minWidth: 100 }}
                  disabled={!editMode.panel2}
                >
                  Cancel
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  endIcon={<NextIcon />}
                  onClick={() => handleNext('insurance-info')}
                  sx={{ minWidth: 100 }}
                >
                  Save
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* Accordion 3: Additional Credentials */}
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
                  3. Additional Credentials
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
                    label="Additional Licenses"
                    value={formData.additionalLicenses}
                    onChange={handleInputChange('additionalLicenses')}
                    variant="outlined"
                    placeholder="Other state licenses, etc."
                    disabled={!editMode.panel3}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Special Permits"
                    value={formData.specialPermits}
                    onChange={handleInputChange('specialPermits')}
                    variant="outlined"
                    placeholder="Controlled substances, etc."
                    disabled={!editMode.panel3}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                  <FormControlLabel
                    control={
                      <Checkbox 
                        size="small"
                        checked={formData.hasRestrictions}
                        onChange={(e) => setFormData(prev => ({ ...prev, hasRestrictions: e.target.checked }))}
                        disabled={!editMode.panel3}
                      />
                    }
                    label="License has restrictions or conditions"
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
                  />
                </Grid>
                {formData.hasRestrictions && (
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Restriction Details"
                      value={formData.restrictionDetails}
                      onChange={handleInputChange('restrictionDetails')}
                      variant="outlined"
                      multiline
                      rows={2}
                      disabled={!editMode.panel3}
                    />
                  </Grid>
                )}
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