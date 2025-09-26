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
  FormHelperText,
  Select,
  MenuItem,
  InputLabel,
  FormControl
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Save as SaveIcon,
  NavigateNext as NextIcon,
  NavigateBefore as BackIcon,
  Edit as EditIcon,
  Close as CloseIcon,
  CardGiftcard as RewardsIcon
} from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';

// Define the shape of the form data for this step
interface LoyaltyFormData {
  enrollmentDecision: 'Enroll' | 'Existing' | 'Decline';
  primaryContactName: string;
  primaryContactEmail: string;
  preferredRewardType: 'Discounts' | 'FreeProducts' | 'ConsultationTime' | 'Other' | '';
  communicationPreference: 'Email' | 'Mail' | 'Both' | '';
  referralCode: string;
  loyaltyProgramAgreed: boolean;
}

const LoyaltyEnrollment: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  
  const [expanded, setExpanded] = useState<string | false>('panel1');
  const [editMode, setEditMode] = useState({
    panel1: true,
    panel2: false,
  });
  const [formData, setFormData] = useState<LoyaltyFormData>({
    enrollmentDecision: 'Enroll',
    primaryContactName: '',
    primaryContactEmail: '',
    preferredRewardType: '',
    communicationPreference: 'Email',
    referralCode: '',
    loyaltyProgramAgreed: false,
  });

  const handleAccordionChange = (panel: string) => (
    event: React.SyntheticEvent, 
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleInputChange = (field: keyof LoyaltyFormData) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSelectChange = (field: keyof LoyaltyFormData) => (
    event: any // Adjust type if needed
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleCheckboxChange = (field: keyof LoyaltyFormData) => (
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

  const handleNext = () => {
    setExpanded('panel2');
    setEditMode(prev => ({...prev, panel1: false, panel2: true}));
  };

  const handleBackStep = () => {
    console.log('Going back to previous step');
    navigate('/step4');
  };

  const handleNextStep = () => {
    console.log('Moving to next step:', formData);
    navigate('/step6');
  };

  const isEnroll = formData.enrollmentDecision === 'Enroll';
  const isExisting = formData.enrollmentDecision === 'Existing';
  const isDecline = formData.enrollmentDecision === 'Decline';

  return (
    <Container maxWidth="lg" sx={{ py: 1 }}>
      <Paper elevation={1} sx={{ p: { xs: 1.5, md: 2 }, borderRadius: 2 }}>
        <Box sx={{ width: '100%' }}>
          
          {/* Accordion 1: Enrollment Status and Details */}
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
                  1. Enrollment Status and Contact
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
                    <InputLabel>Loyalty Enrollment</InputLabel>
                    <Select
                      value={formData.enrollmentDecision}
                      label="Loyalty Enrollment"
                      onChange={handleSelectChange('enrollmentDecision')}
                    >
                      <MenuItem value="Enroll">Enroll Now</MenuItem>
                      <MenuItem value="Existing">Link Existing Account</MenuItem>
                      <MenuItem value="Decline">Decline Enrollment</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {isExisting && (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Existing Loyalty ID / Number"
                            value={formData.primaryContactName} // Re-using a field name for simplicity, though a new one could be added
                            onChange={handleInputChange('primaryContactName')}
                            variant="outlined"
                            disabled={!editMode.panel1}
                            required
                        />
                    </Grid>
                )}
                {isEnroll && (
                    <>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Primary Loyalty Contact Name"
                                value={formData.primaryContactName}
                                onChange={handleInputChange('primaryContactName')}
                                variant="outlined"
                                disabled={!editMode.panel1}
                                required
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Primary Loyalty Contact Email"
                                value={formData.primaryContactEmail}
                                onChange={handleInputChange('primaryContactEmail')}
                                variant="outlined"
                                disabled={!editMode.panel1}
                                required
                                type="email"
                            />
                        </Grid>
                    </>
                )}
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <TextField
                        fullWidth
                        size="small"
                        label="Referral Code (Optional)"
                        value={formData.referralCode}
                        onChange={handleInputChange('referralCode')}
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
                  onClick={handleNext}
                  sx={{ minWidth: 100 }}
                >
                  Save
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* Accordion 2: Preferences and Consent (Visible for New Enrollment) */}
          <Accordion 
            expanded={expanded === 'panel2'} 
            onChange={handleAccordionChange('panel2')}
            sx={{ mb: 1.5, borderRadius: 1, '&:before': { display: 'none' } }}
            disabled={isDecline}
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
                  2. Reward Preferences and Terms
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
                  <FormControl fullWidth size="small" disabled={!editMode.panel2} required>
                    <InputLabel>Preferred Reward Type</InputLabel>
                    <Select
                      value={formData.preferredRewardType}
                      label="Preferred Reward Type"
                      onChange={handleSelectChange('preferredRewardType')}
                    >
                      <MenuItem value="Discounts">Product Discounts</MenuItem>
                      <MenuItem value="FreeProducts">Free Product Samples/Gifts</MenuItem>
                      <MenuItem value="ConsultationTime">Priority Consultation Time</MenuItem>
                      <MenuItem value="Other">Other/Not Sure Yet</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <FormControl fullWidth size="small" disabled={!editMode.panel2} required>
                    <InputLabel>Communication Preference</InputLabel>
                    <Select
                      value={formData.communicationPreference}
                      label="Communication Preference"
                      onChange={handleSelectChange('communicationPreference')}
                    >
                      <MenuItem value="Email">Email</MenuItem>
                      <MenuItem value="Mail">Physical Mail</MenuItem>
                      <MenuItem value="Both">Both Email and Mail</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                  <FormControlLabel
                    control={
                      <Checkbox 
                        size="small"
                        checked={formData.loyaltyProgramAgreed}
                        onChange={handleCheckboxChange('loyaltyProgramAgreed')}
                        disabled={!editMode.panel2}
                        required
                      />
                    }
                    label={<Typography variant="body2">I have read and agree to the Loyalty Program Terms and Conditions.</Typography>}
                    sx={{ my: 1, '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
                  />
                  <FormHelperText sx={{ ml: 4, mt: -1, mb: 1 }}>Required for new enrollment.</FormHelperText>
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

export default LoyaltyEnrollment