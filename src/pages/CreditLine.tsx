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
  InputLabel,
  FormHelperText
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

// Define the shape of the form data for this step
interface CreditLineFormData {
  creditApplicationStatus: 'New' | 'Existing' | 'Declined';
  creditLimitRequested: string;
  businessTaxID: string;
  authorizedSignerName: string;
  authorizedSignerTitle: string;
  businessAddress: string;
  businessPhone: string;
  financialContactEmail: string;
  termsAndConditionsAgreed: boolean;
  creditCheckConsent: boolean;
}

const CreditLine: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  
  const [expanded, setExpanded] = useState<string | false>('panel1');
  const [editMode, setEditMode] = useState({
    panel1: true,
    panel2: false,
  });
  const [formData, setFormData] = useState<CreditLineFormData>({
    creditApplicationStatus: 'New',
    creditLimitRequested: '',
    businessTaxID: '',
    authorizedSignerName: '',
    authorizedSignerTitle: '',
    businessAddress: '',
    businessPhone: '',
    financialContactEmail: '',
    termsAndConditionsAgreed: false,
    creditCheckConsent: false,
  });

  const handleAccordionChange = (panel: string) => (
    event: React.SyntheticEvent, 
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleInputChange = (field: keyof CreditLineFormData) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSelectChange = (field: keyof CreditLineFormData) => (
    event: any // Adjust type if needed
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleCheckboxChange = (field: keyof CreditLineFormData) => (
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

  const handleSave = (panel: keyof typeof editMode) => {
    console.log(`Saving ${panel}:`, formData);
    setEditMode(prev => ({ ...prev, [panel]: false }));
  };

  const handleNext = (section: string) => {
    if (section === 'application-details') {
      setExpanded('panel2');
      setEditMode(prev => ({ ...prev, panel1: false, panel2: true }));
    }
  };

  const handleBackStep = () => {
    console.log('Going back to previous step');
    navigate('/step2');
  };

  const handleNextStep = () => {
    console.log('Moving to next step:', formData);
    navigate('/step4');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 1 }}>
      <Paper elevation={1} sx={{ p: { xs: 1.5, md: 2 }, borderRadius: 2 }}>
        <Box sx={{ width: '100%' }}>
          
          {/* Accordion 1: Credit Application Details */}
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
                '&.Mui-expanded': { backgroundColor: 'primary.main', minHeight: 48 },
                '& .MuiAccordionSummary-content': { margin: '8px 0' }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  1. Application Details
                </Typography>
                <IconButton
                  size="small"
                  onClick={(e) => { e.stopPropagation(); handleEdit('panel1'); }}
                  sx={{ color: 'inherit', mr: 1, '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
                >
                  {editMode.panel1 ? <CloseIcon /> : <EditIcon />}
                </IconButton>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 1.5 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <FormControl fullWidth size="small" disabled={!editMode.panel1} required>
                    <InputLabel>Application Status</InputLabel>
                    <Select
                      value={formData.creditApplicationStatus}
                      label="Application Status"
                      onChange={handleSelectChange('creditApplicationStatus')}
                    >
                      <MenuItem value="New">New Application</MenuItem>
                      <MenuItem value="Existing">Existing Account</MenuItem>
                      <MenuItem value="Declined">Pre-Declined (Information Only)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Credit Limit Requested ($)"
                    value={formData.creditLimitRequested}
                    onChange={handleInputChange('creditLimitRequested')}
                    variant="outlined"
                    disabled={!editMode.panel1}
                    required
                    placeholder="e.g., 25000"
                    type="number"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Business Tax ID (EIN)"
                    value={formData.businessTaxID}
                    onChange={handleInputChange('businessTaxID')}
                    variant="outlined"
                    disabled={!editMode.panel1}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Authorized Signer Full Name"
                    value={formData.authorizedSignerName}
                    onChange={handleInputChange('authorizedSignerName')}
                    variant="outlined"
                    disabled={!editMode.panel1}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Authorized Signer Title"
                    value={formData.authorizedSignerTitle}
                    onChange={handleInputChange('authorizedSignerTitle')}
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
                  onClick={() => handleSave('panel1')}
                  sx={{ minWidth: 100 }}
                  disabled={!editMode.panel1}
                >
                  Cancel
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  endIcon={<NextIcon />}
                  onClick={() => handleNext('application-details')}
                  sx={{ minWidth: 100 }}
                >
                  Save
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* Accordion 2: Contact and Consent */}
          <Accordion 
            expanded={expanded === 'panel2'} 
            onChange={handleAccordionChange('panel2')}
            sx={{ mb: 1.5, borderRadius: 1, '&:before': { display: 'none' } }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ 
                // Using primary color to keep it blue
                backgroundColor: 'primary.light',
                color: 'primary.contrastText',
                minHeight: 48,
                '&.Mui-expanded': { backgroundColor: 'primary.main', minHeight: 48 },
                '& .MuiAccordionSummary-content': { margin: '8px 0' }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  2. Contact Information and Consent
                </Typography>
                <IconButton
                  size="small"
                  onClick={(e) => { e.stopPropagation(); handleEdit('panel2'); }}
                  sx={{ color: 'inherit', mr: 1, '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } }}
                >
                  {editMode.panel2 ? <CloseIcon /> : <EditIcon />}
                </IconButton>
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 1.5 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Primary Business Address"
                    value={formData.businessAddress}
                    onChange={handleInputChange('businessAddress')}
                    variant="outlined"
                    multiline
                    rows={2}
                    disabled={!editMode.panel2}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Business Phone"
                    value={formData.businessPhone}
                    onChange={handleInputChange('businessPhone')}
                    variant="outlined"
                    disabled={!editMode.panel2}
                    required
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Financial Contact Email"
                    value={formData.financialContactEmail}
                    onChange={handleInputChange('financialContactEmail')}
                    variant="outlined"
                    disabled={!editMode.panel2}
                    required
                    type="email"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <FormControlLabel
                    control={
                      <Checkbox 
                        size="small"
                        checked={formData.creditCheckConsent}
                        onChange={handleCheckboxChange('creditCheckConsent')}
                        disabled={!editMode.panel2}
                      />
                    }
                    label={<Typography variant="body2">I authorize a credit inquiry for my business to establish a line of credit.</Typography>}
                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
                  />
                  <FormHelperText sx={{ ml: 4, mt: -1, mb: 1 }}>Required for application processing.</FormHelperText>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <FormControlLabel
                    control={
                      <Checkbox 
                        size="small"
                        checked={formData.termsAndConditionsAgreed}
                        onChange={handleCheckboxChange('termsAndConditionsAgreed')}
                        disabled={!editMode.panel2}
                      />
                    }
                    label={<Typography variant="body2">I have read and agree to the Credit Line Terms and Conditions.</Typography>}
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
                  onClick={() => handleSave('panel2')}
                  sx={{ minWidth: 100 }}
                  disabled={!editMode.panel2}
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

export default CreditLine;