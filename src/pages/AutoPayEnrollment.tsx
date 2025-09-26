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
  Close as CloseIcon,
  AccountBalance as BankIcon,
  CreditCard as CardIcon
} from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';

// Define the shape of the form data for this step
interface AutoPayFormData {
  paymentMethodType: 'ACH' | 'CreditCard' | '';
  bankName: string;
  routingNumber: string;
  accountNumber: string;
  accountType: 'Checking' | 'Savings' | '';
  cardHolderName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  billingZip: string;
  enrollmentConsent: boolean;
  isPrimaryMethod: boolean;
}

const AutoPayEnrollment: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  
  const [expanded, setExpanded] = useState<string | false>('panel1');
  const [editMode, setEditMode] = useState({
    panel1: true,
    panel2: false,
  });
  const [formData, setFormData] = useState<AutoPayFormData>({
    paymentMethodType: '',
    bankName: '',
    routingNumber: '',
    accountNumber: '',
    accountType: '',
    cardHolderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingZip: '',
    enrollmentConsent: false,
    isPrimaryMethod: true,
  });

  const handleAccordionChange = (panel: string) => (
    event: React.SyntheticEvent, 
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleInputChange = (field: keyof AutoPayFormData) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSelectChange = (field: keyof AutoPayFormData) => (
    event: any // Adjust type if needed
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    if (field === 'paymentMethodType') {
        // Reset specific fields when method type changes
        setFormData(prev => ({
            ...prev,
            bankName: '', routingNumber: '', accountNumber: '', accountType: '',
            cardHolderName: '', cardNumber: '', expiryDate: '', cvv: '', billingZip: ''
        }));
    }
  };

  const handleCheckboxChange = (field: keyof AutoPayFormData) => (
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
    navigate('/step3');
  };

  const handleNextStep = () => {
    console.log('Moving to next step:', formData);
    navigate('/step5');
  };

  const isACH = formData.paymentMethodType === 'ACH';
  const isCreditCard = formData.paymentMethodType === 'CreditCard';
  const isFormValid = formData.enrollmentConsent && formData.paymentMethodType && (
    (isACH && formData.bankName && formData.routingNumber && formData.accountNumber && formData.accountType) ||
    (isCreditCard && formData.cardHolderName && formData.cardNumber && formData.expiryDate && formData.cvv)
  );

  return (
    <Container maxWidth="lg" sx={{ py: 1 }}>
      <Paper elevation={1} sx={{ p: { xs: 1.5, md: 2 }, borderRadius: 2 }}>
        <Box sx={{ width: '100%' }}>
          
          {/* Accordion 1: Select Payment Method */}
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
                  1. Payment Method Selection
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
                    <InputLabel>Auto Pay Method</InputLabel>
                    <Select
                      value={formData.paymentMethodType}
                      label="Auto Pay Method"
                      onChange={handleSelectChange('paymentMethodType')}
                    >
                      <MenuItem value="ACH">
                          <BankIcon fontSize="small" sx={{ mr: 1 }} />
                          ACH / Bank Transfer
                      </MenuItem>
                      <MenuItem value="CreditCard">
                          <CardIcon fontSize="small" sx={{ mr: 1 }} />
                          Credit Card
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <FormControlLabel
                        control={
                        <Checkbox 
                            size="small"
                            checked={formData.isPrimaryMethod}
                            onChange={handleCheckboxChange('isPrimaryMethod')}
                            disabled={!editMode.panel1}
                        />
                        }
                        label="Set as Primary Payment Method"
                        sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
                    />
                </Grid>
              </Grid>

              {/* Dynamic Payment Details Section */}
              {isACH && (
                <Box sx={{ mt: 3, p: 2, border: '1px solid #ccc', borderRadius: 1 }}>
                    <Typography variant="h6" gutterBottom>ACH (Bank) Details</Typography>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Bank Name"
                                value={formData.bankName}
                                onChange={handleInputChange('bankName')}
                                variant="outlined"
                                disabled={!editMode.panel1}
                                required
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Routing Number"
                                value={formData.routingNumber}
                                onChange={handleInputChange('routingNumber')}
                                variant="outlined"
                                disabled={!editMode.panel1}
                                required
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Account Number"
                                value={formData.accountNumber}
                                onChange={handleInputChange('accountNumber')}
                                variant="outlined"
                                disabled={!editMode.panel1}
                                required
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <FormControl fullWidth size="small" disabled={!editMode.panel1} required>
                                <InputLabel>Account Type</InputLabel>
                                <Select
                                    value={formData.accountType}
                                    label="Account Type"
                                    onChange={handleSelectChange('accountType')}
                                >
                                    <MenuItem value="Checking">Checking</MenuItem>
                                    <MenuItem value="Savings">Savings</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
              )}

              {isCreditCard && (
                <Box sx={{ mt: 3, p: 2, border: '1px solid #ccc', borderRadius: 1 }}>
                    <Typography variant="h6" gutterBottom>Credit Card Details</Typography>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Cardholder Name"
                                value={formData.cardHolderName}
                                onChange={handleInputChange('cardHolderName')}
                                variant="outlined"
                                disabled={!editMode.panel1}
                                required
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Card Number"
                                value={formData.cardNumber}
                                onChange={handleInputChange('cardNumber')}
                                variant="outlined"
                                disabled={!editMode.panel1}
                                required
                                placeholder="XXXX XXXX XXXX XXXX"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Expiry Date (MM/YY)"
                                value={formData.expiryDate}
                                onChange={handleInputChange('expiryDate')}
                                variant="outlined"
                                disabled={!editMode.panel1}
                                required
                                placeholder="MM/YY"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <TextField
                                fullWidth
                                size="small"
                                label="CVV"
                                value={formData.cvv}
                                onChange={handleInputChange('cvv')}
                                variant="outlined"
                                disabled={!editMode.panel1}
                                required
                                type="password"
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Billing Zip/Postal Code"
                                value={formData.billingZip}
                                onChange={handleInputChange('billingZip')}
                                variant="outlined"
                                disabled={!editMode.panel1}
                                required
                            />
                        </Grid>
                    </Grid>
                </Box>
              )}
              
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
                  disabled={!formData.paymentMethodType}
                >
                  Save
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* Accordion 2: Authorization */}
          <Accordion 
            expanded={expanded === 'panel2'} 
            onChange={handleAccordionChange('panel2')}
            sx={{ mb: 1.5, borderRadius: 1, '&:before': { display: 'none' } }}
            disabled={!formData.paymentMethodType}
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
                  2. Auto Pay Authorization
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
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    By checking the box below, you authorize [Company Name] to automatically charge the provided 
                    {isACH ? ' bank account' : isCreditCard ? ' credit card' : ' payment method'} for all amounts due, 
                    including but not limited to, monthly invoices and credit line payments, on the due date.
                </Typography>
                <FormControlLabel
                    control={
                    <Checkbox 
                        size="small"
                        checked={formData.enrollmentConsent}
                        onChange={handleCheckboxChange('enrollmentConsent')}
                        disabled={!editMode.panel2}
                        required
                    />
                    }
                    label="I authorize automatic payments using the details provided above."
                    sx={{ my: 2, '& .MuiFormControlLabel-label': { fontSize: '0.875rem' } }}
                />
              
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

export default AutoPayEnrollment;