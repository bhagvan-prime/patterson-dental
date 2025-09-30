// src/pages/PractitionerLicensing.tsx - REFACTORED
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  NavigateNext as NextIcon,
  NavigateBefore as BackIcon,
  
} from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';

// Import common components
import CommonSelect from '../components/commons/inputs/PRSelect';
import CommonDatePicker from '../components/commons/inputs/PRDatePicker';
import CommonCheckbox from '../components/commons/inputs/PRCheckbox';
import type {SelectOption} from '../components/commons/index';
import CommonInput from '../components/commons/inputs/PRInput';
import CommonButton from '../components/commons/buttons/PRButton';

const PractitionerLicensing: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const [expanded, setExpanded] = useState<string | false>('panel1');
  const [editMode, setEditMode] = useState({
    panel1: true,
    panel2: true,
  });
  const [formData, setFormData] = useState({
    nameOnLicense: '',
    licenseNumber: '',
    licenseExpirationDate: '',
    selectedAddress: '',
    hasAdditionalLicensing: false,
    basedOnShippingAddress: '',
    tddLicenseExpiration: '',
    understandValidationRequirements: false,
  });

  // Define address options
  const addressOptions: SelectOption[] = [
    { label: '123 Main St, City, State 12345', value: 'address1' },
    { label: '456 Oak Ave, City, State 67890', value: 'address2' },
    { label: '789 Pine Rd, City, State 54321', value: 'address3' },
    { label: 'Other Address', value: 'other' },
  ];

  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
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
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = (section: string) => {
    if (section === 'practitioner-licensing') {
      setEditMode((prev) => ({ ...prev, panel1: false }));
    } else if (section === 'tdddd-info') {
      setEditMode((prev) => ({ ...prev, panel2: false }));
    }
  };

  const handleNext = (section: string) => {
    if (section === 'practitioner-licensing') {
      setExpanded('panel2');
    }
  };

  const handleBackStep = () => {
    navigate('/step1');
  };

  const handleNextStep = () => {
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
            textAlign: 'left',
          }}
        >
          Please provide your practitioner license to be added to your account
          to enable ordering of prescription and other regulated materials
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
                  minHeight: 48,
                },
                '& .MuiAccordionSummary-content': {
                  margin: '8px 0',
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Practitioner Licensing
                </Typography>
                
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 1.5 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                  <CommonInput
                    label="Name as appears on license"
                    value={formData.nameOnLicense}
                    onChange={handleInputChange('nameOnLicense')}
                    disabled={!editMode.panel1}
                    size="small"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                  <CommonInput
                    label="License Number"
                    value={formData.licenseNumber}
                    onChange={handleInputChange('licenseNumber')}
                    disabled={!editMode.panel1}
                    size="small"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                  <CommonDatePicker
                    label="License Expiration Date"
                    value={formData.licenseExpirationDate}
                    onChange={handleInputChange('licenseExpirationDate')}
                    disabled={!editMode.panel1}
                    size="small"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                  <CommonSelect
                    label="Select address license applies to"
                    value={formData.selectedAddress}
                    onChange={handleInputChange('selectedAddress')}
                    options={addressOptions}
                    disabled={!editMode.panel1}
                    size="small"
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <CommonCheckbox
                    checked={formData.hasAdditionalLicensing}
                    onChange={handleInputChange('hasAdditionalLicensing')}
                    disabled={!editMode.panel1}
                    label="I have additional licensing I would like to add my account"
                    checkboxProps={{ size: 'small' }}
                    labelProps={{
                      sx: {
                        '& .MuiFormControlLabel-label': {
                          fontSize: '0.875rem',
                        },
                      },
                    }}
                  />
                </Grid>
              </Grid>

              <Box
                sx={{
                  mt: 2,
                  display: 'flex',
                  gap: 1,
                  flexDirection: isMobile ? 'column' : 'row',
                  justifyContent: 'flex-end',
                }}
              >
                <CommonButton
                  variant="secondary"
                  onClick={() => handleSave('practitioner-licensing')}
                  disabled={!editMode.panel1}
                  sx={{ minWidth: 100 }}
                >
                  Cancel
                </CommonButton>
                <CommonButton
                  variant="primary"
                  onClick={() => handleNext('practitioner-licensing')}
                  sx={{ minWidth: 100 }}
                >
                  Save
                </CommonButton>
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* Accordion 2: TDDDD */}
          <Accordion
            expanded={expanded === 'panel2'}
            onChange={handleAccordionChange('panel2')}
            sx={{ mb: 0, borderRadius: 1, '&:before': { display: 'none' } }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                backgroundColor: 'primary.main',
                color: 'primary.contrastText',
                minHeight: 48,
                '&.Mui-expanded': {
                  backgroundColor: 'primary.dark',
                  minHeight: 48,
                },
                '& .MuiAccordionSummary-content': {
                  margin: '8px 0',
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  TDDDD
                </Typography>
                
              </Box>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 1.5 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <CommonInput
                    label="Based on shipping address"
                    value={formData.basedOnShippingAddress}
                    onChange={handleInputChange('basedOnShippingAddress')}
                    disabled={!editMode.panel2}
                    size="small"
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <CommonDatePicker
                    label="TDD license expiration"
                    value={formData.tddLicenseExpiration}
                    onChange={handleInputChange('tddLicenseExpiration')}
                    disabled={!editMode.panel2}
                    size="small"
                  />
                </Grid>
              </Grid>

              <Box
                sx={{
                  mt: 2,
                  display: 'flex',
                  gap: 1,
                  flexDirection: isMobile ? 'column' : 'row',
                  justifyContent: 'flex-end',
                }}
              >
                <CommonButton
                  variant="primary"
                  onClick={() => handleSave('tdddd-info')}
                  disabled={!editMode.panel2}
                  sx={{ minWidth: 100 }}
                >
                  Save
                </CommonButton>
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
            textAlign: 'left',
          }}
        >
          Validation of licensing information will take up to 1-2 business days.
          Ordering of prescription or other regulated materials will not be
          allowed until validation is complete.
        </Typography>

        {/* Validation Requirements Checkbox */}
        <Box sx={{ mb: 2 }}>
          <CommonCheckbox
            checked={formData.understandValidationRequirements}
            onChange={handleInputChange('understandValidationRequirements')}
            label="I understand the validation requirements prior to ordering regulated materials"
            checkboxProps={{ size: 'small' }}
            labelProps={{
              sx: {
                '& .MuiFormControlLabel-label': { fontSize: '0.875rem' },
              },
            }}
          />
        </Box>
      </Paper>

      {/* Navigation Buttons */}
      <Box
        sx={{
          mt: 3,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <CommonButton
          variant="secondary"
          onClick={handleBackStep}
          sx={{
            minWidth: 140,
            py: 1,
            fontSize: '0.95rem',
            fontWeight: 600,
          }}
        >
          <BackIcon sx={{ mr: 0.5 }} />
          Back
        </CommonButton>
        <CommonButton
          variant="primary"
          onClick={handleNextStep}
          sx={{
            minWidth: 140,
            py: 1,
            fontSize: '0.95rem',
            fontWeight: 600,
          }}
        >
          Next Step
          <NextIcon sx={{ ml: 0.5 }} />
        </CommonButton>
      </Box>
    </Container>
  );
};

export default PractitionerLicensing;