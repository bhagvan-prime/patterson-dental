// src/pages/AboutYouAndYourPractice.tsx - REFACTORED
import React, { useState, useEffect } from 'react';
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
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';

// Import common components
import CommonSelect from '../components/commons/inputs/PRSelect';
import CommonCheckbox from '../components/commons/inputs/PRCheckbox';
import type {SelectOption} from '../components/commons/index';
import CommonInput from '../components/commons/inputs/PRInput';
import CommonButton from '../components/commons/buttons/PRButton';

const AboutYouAndYourPractice: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const [expanded, setExpanded] = useState<string | false>('panel1');
  const [editMode, setEditMode] = useState({
    panel1: true,
    panel2: true,
    panel3: true,
    panel4: true,
  });
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailId: '',
    legalPracticeName: '',
    typesOfBusiness: '',
    timeInBusiness: '',
    speciality: '',
    numberOfLocations: '',
    numberOfOperatories: '',
    billingAddressLine1: '',
    billingAddressLine2: '',
    billingCity: '',
    billingZipCode: '',
    billingLocationPhone: '',
    shippingSameAsBilling: false,
    shippingAddressLine1: '',
    shippingAddressLine2: '',
    shippingCity: '',
    shippingZipCode: '',
    shippingLocationPhone: '',
    addAnotherShippingAddress: false,
    sameAsPractitioner: false,
    onlineFirstName: '',
    onlineLastName: '',
    roleAtPractice: '',
    onlineEmail: '',
    password: '',
    stayUpToDate: false,
    workingWithSalesRep: false,
  });

  // Define options for select fields
  const businessTypeOptions: SelectOption[] = [
    { label: 'General Practice', value: 'General Practice' },
    { label: 'Specialty Practice', value: 'Specialty Practice' },
    { label: 'Multi-Specialty', value: 'Multi-Specialty' },
    { label: 'Hospital', value: 'Hospital' },
  ];

  const timeInBusinessOptions: SelectOption[] = [
    { label: 'Less than 1 year', value: 'Less than 1 year' },
    { label: '1-5 years', value: '1-5 years' },
    { label: '6-10 years', value: '6-10 years' },
    { label: '11-20 years', value: '11-20 years' },
    { label: 'More than 20 years', value: 'More than 20 years' },
  ];

  const specialityOptions: SelectOption[] = [
    { label: 'General Medicine', value: 'General Medicine' },
    { label: 'Cardiology', value: 'Cardiology' },
    { label: 'Dermatology', value: 'Dermatology' },
    { label: 'Orthopedics', value: 'Orthopedics' },
    { label: 'Pediatrics', value: 'Pediatrics' },
    { label: 'Other', value: 'Other' },
  ];

  const locationOptions: SelectOption[] = [
    { label: '1', value: '1' },
    { label: '2-5', value: '2-5' },
    { label: '6-10', value: '6-10' },
    { label: 'More than 10', value: 'More than 10' },
  ];

  const operatoriesOptions: SelectOption[] = [
    { label: '1-10', value: '1-10' },
    { label: '11-50', value: '11-50' },
    { label: '51-100', value: '51-100' },
    { label: 'More than 100', value: 'More than 100' },
  ];

  const roleOptions: SelectOption[] = [
    { label: 'Doctor', value: 'Doctor' },
    { label: 'Nurse', value: 'Nurse' },
    { label: 'Administrator', value: 'Administrator' },
    { label: 'Manager', value: 'Manager' },
    { label: 'Other', value: 'Other' },
  ];

  useEffect(() => {
    if (formData.sameAsPractitioner) {
      setFormData((prev) => ({
        ...prev,
        onlineFirstName: prev.firstName,
        onlineLastName: prev.lastName,
        onlineEmail: prev.emailId,
      }));
    }
  }, [
    formData.sameAsPractitioner,
    formData.firstName,
    formData.lastName,
    formData.emailId,
  ]);

  useEffect(() => {
    if (formData.shippingSameAsBilling) {
      setFormData((prev) => ({
        ...prev,
        shippingAddressLine1: prev.billingAddressLine1,
        shippingAddressLine2: prev.billingAddressLine2,
        shippingCity: prev.billingCity,
        shippingZipCode: prev.billingZipCode,
        shippingLocationPhone: prev.billingLocationPhone,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        shippingAddressLine1: '',
        shippingAddressLine2: '',
        shippingCity: '',
        shippingZipCode: '',
        shippingLocationPhone: '',
      }));
    }
  }, [
    formData.shippingSameAsBilling,
    formData.billingAddressLine1,
    formData.billingAddressLine2,
    formData.billingCity,
    formData.billingZipCode,
    formData.billingLocationPhone,
  ]);

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
    console.log(`Saving ${section}:`, formData);
    if (section === 'practitioner-info') {
      setEditMode((prev) => ({ ...prev, panel1: false }));
    } else if (section === 'practice-info') {
      setEditMode((prev) => ({ ...prev, panel2: false }));
    } else if (section === 'practice-address') {
      setEditMode((prev) => ({ ...prev, panel3: false }));
    } else if (section === 'online-user-info') {
      setEditMode((prev) => ({ ...prev, panel4: false }));
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
                Practitioner Information
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 1.5 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <CommonInput
                  label="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange('firstName')}
                  disabled={!editMode.panel1}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <CommonInput
                  label="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange('lastName')}
                  disabled={!editMode.panel1}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 12, md: 4 }}>
                <CommonInput
                  label="Email ID"
                  type="email"
                  value={formData.emailId}
                  onChange={handleInputChange('emailId')}
                  disabled={!editMode.panel1}
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
                variant="secondary"
                onClick={() => handleSave('practitioner-info')}
                disabled={!editMode.panel1}
                sx={{ minWidth: 100 }}
              >
                Cancel
              </CommonButton>
              <CommonButton
                variant="primary"
                onClick={() => handleNext('practitioner-info')}
                sx={{ minWidth: 100 }}
              >
                Save
              </CommonButton>
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
                Practice Information
              </Typography>
              
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 1.5 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <CommonInput
                  label="Legal Practice Name"
                  value={formData.legalPracticeName}
                  onChange={handleInputChange('legalPracticeName')}
                  disabled={!editMode.panel2}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <CommonSelect
                  label="Types of Business"
                  value={formData.typesOfBusiness}
                  onChange={handleInputChange('typesOfBusiness')}
                  options={businessTypeOptions}
                  disabled={!editMode.panel2}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <CommonSelect
                  label="Time in Business"
                  value={formData.timeInBusiness}
                  onChange={handleInputChange('timeInBusiness')}
                  options={timeInBusinessOptions}
                  disabled={!editMode.panel2}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <CommonSelect
                  label="Speciality"
                  value={formData.speciality}
                  onChange={handleInputChange('speciality')}
                  options={specialityOptions}
                  disabled={!editMode.panel2}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <CommonSelect
                  label="Number of Locations"
                  value={formData.numberOfLocations}
                  onChange={handleInputChange('numberOfLocations')}
                  options={locationOptions}
                  disabled={!editMode.panel2}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <CommonSelect
                  label="Number of Operatories"
                  value={formData.numberOfOperatories}
                  onChange={handleInputChange('numberOfOperatories')}
                  options={operatoriesOptions}
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
                variant="secondary"
                onClick={() => handleSave('practice-info')}
                disabled={!editMode.panel2}
                sx={{ minWidth: 100 }}
              >
                Cancel
              </CommonButton>
              <CommonButton
                variant="primary"
                onClick={() => handleNext('practice-info')}
                sx={{ minWidth: 100 }}
              >
                Save
              </CommonButton>
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
                Practice Address
              </Typography>
              
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 1.5 }}>
            <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
              Billing Address
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <CommonInput
                  label="Address Line 1"
                  value={formData.billingAddressLine1}
                  onChange={handleInputChange('billingAddressLine1')}
                  disabled={!editMode.panel3}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <CommonInput
                  label="Address Line 2"
                  value={formData.billingAddressLine2}
                  onChange={handleInputChange('billingAddressLine2')}
                  disabled={!editMode.panel3}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <CommonInput
                  label="City"
                  value={formData.billingCity}
                  onChange={handleInputChange('billingCity')}
                  disabled={!editMode.panel3}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <CommonInput
                  label="Zip Code"
                  value={formData.billingZipCode}
                  onChange={handleInputChange('billingZipCode')}
                  disabled={!editMode.panel3}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <CommonInput
                  label="Location Phone Number"
                  value={formData.billingLocationPhone}
                  onChange={handleInputChange('billingLocationPhone')}
                  disabled={!editMode.panel3}
                  size="small"
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 3 }}>
              <CommonCheckbox
                checked={formData.shippingSameAsBilling}
                onChange={handleInputChange('shippingSameAsBilling')}
                disabled={!editMode.panel3}
                label="Shipping address is same as billing address"
                checkboxProps={{ size: 'small' }}
                labelProps={{
                  sx: { '& .MuiFormControlLabel-label': { fontSize: '0.875rem', fontWeight: 600 } }
                }}
              />
            </Box>

            <Typography variant="subtitle2" sx={{ mt: 2, mb: 2, fontWeight: 600 }}>
              Shipping Address
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <CommonInput
                  label="Address Line 1"
                  value={formData.shippingAddressLine1}
                  onChange={handleInputChange('shippingAddressLine1')}
                  disabled={!editMode.panel3 || formData.shippingSameAsBilling}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <CommonInput
                  label="Address Line 2"
                  value={formData.shippingAddressLine2}
                  onChange={handleInputChange('shippingAddressLine2')}
                  disabled={!editMode.panel3 || formData.shippingSameAsBilling}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <CommonInput
                  label="City"
                  value={formData.shippingCity}
                  onChange={handleInputChange('shippingCity')}
                  disabled={!editMode.panel3 || formData.shippingSameAsBilling}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                <CommonInput
                  label="Zip Code"
                  value={formData.shippingZipCode}
                  onChange={handleInputChange('shippingZipCode')}
                  disabled={!editMode.panel3 || formData.shippingSameAsBilling}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 4 }}>
                <CommonInput
                  label="Location Phone Number"
                  value={formData.shippingLocationPhone}
                  onChange={handleInputChange('shippingLocationPhone')}
                  disabled={!editMode.panel3 || formData.shippingSameAsBilling}
                  size="small"
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 2 }}>
              <CommonCheckbox
                checked={formData.addAnotherShippingAddress}
                onChange={handleInputChange('addAnotherShippingAddress')}
                disabled={!editMode.panel3}
                label="Add Another Shipping Address"
                checkboxProps={{ size: 'small' }}
                labelProps={{
                  sx: { '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }
                }}
              />
            </Box>

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
                onClick={() => handleSave('practice-address')}
                disabled={!editMode.panel3}
                sx={{ minWidth: 100 }}
              >
                Cancel
              </CommonButton>
              <CommonButton
                variant="primary"
                onClick={() => handleNext('practice-address')}
                sx={{ minWidth: 100 }}
              >
                Save
              </CommonButton>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Accordion 4: Online User Information */}
        <Accordion
          expanded={expanded === 'panel4'}
          onChange={handleAccordionChange('panel4')}
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
                Online User Information
              </Typography>
              
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 1.5 }}>
            <Box sx={{ mb: 2 }}>
              <CommonCheckbox
                checked={formData.sameAsPractitioner}
                onChange={handleInputChange('sameAsPractitioner')}
                disabled={!editMode.panel4}
                label="Same as Practitioner"
                checkboxProps={{ size: 'small' }}
                labelProps={{
                  sx: { '& .MuiFormControlLabel-label': { fontSize: '0.875rem', fontWeight: 600 } }
                }}
              />
            </Box>

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <CommonInput
                  label="First Name"
                  value={formData.onlineFirstName}
                  onChange={handleInputChange('onlineFirstName')}
                  disabled={!editMode.panel4 || formData.sameAsPractitioner}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <CommonInput
                  label="Last Name"
                  value={formData.onlineLastName}
                  onChange={handleInputChange('onlineLastName')}
                  disabled={!editMode.panel4 || formData.sameAsPractitioner}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <CommonSelect
                  label="Role at Practice"
                  value={formData.roleAtPractice}
                  onChange={handleInputChange('roleAtPractice')}
                  options={roleOptions}
                  disabled={!editMode.panel4}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <CommonInput
                  label="Email"
                  type="email"
                  value={formData.onlineEmail}
                  onChange={handleInputChange('onlineEmail')}
                  disabled={!editMode.panel4 || formData.sameAsPractitioner}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                <CommonInput
                  label="Password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  disabled={!editMode.panel4}
                  size="small"
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 6 }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
                  <CommonCheckbox
                    checked={formData.stayUpToDate}
                    onChange={handleInputChange('stayUpToDate')}
                    disabled={!editMode.panel4}
                    label="I would like to stay up to date on Patterson news"
                    checkboxProps={{ size: 'small' }}
                    labelProps={{
                      sx: { '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }
                    }}
                  />
                  <CommonCheckbox
                    checked={formData.workingWithSalesRep}
                    onChange={handleInputChange('workingWithSalesRep')}
                    disabled={!editMode.panel4}
                    label="I am working with a Patterson sales rep"
                    checkboxProps={{ size: 'small' }}
                    labelProps={{
                      sx: { '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }
                    }}
                  />
                </Box>
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
                onClick={() => handleSave('online-user-info')}
                disabled={!editMode.panel4}
                sx={{ minWidth: 100 }}
              >
                Save
              </CommonButton>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Paper>

    {/* Next Step Button */}
    <Box
      sx={{
        mt: 3,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
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
      </CommonButton>
    </Box>
  </Container>
);
};

export default AboutYouAndYourPractice;