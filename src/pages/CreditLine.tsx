import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  TextField,
  FormControlLabel,
  RadioGroup,
  Radio,
  useTheme,
  useMediaQuery,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  NavigateNext as NextIcon,
  NavigateBefore as BackIcon
} from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';

interface CreditLineFormData {
  wantsCreditLine: string;
  tinSSN: string;
  wantsAutopay: string;
  accountType: string;
  bankName: string;
  routingNumber: string;
  accountNumber: string;
  autopayFrequency: string;
  electronicSignature: string;
}

const CreditLine: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<CreditLineFormData>({
    wantsCreditLine: '',
    tinSSN: '',
    wantsAutopay: '',
    accountType: '',
    bankName: '',
    routingNumber: '',
    accountNumber: '',
    autopayFrequency: '',
    electronicSignature: ''
  });

  const handleInputChange = (field: keyof CreditLineFormData) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSelectChange = (field: keyof CreditLineFormData) => (
    event: any
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleBackStep = () => {
    console.log('Going back to previous step');
    navigate('/step2');
  };

  const handleNextStep = () => {
    console.log('Moving to next step:', formData);
    navigate('/step5');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 1 }}>
      <Paper elevation={1} sx={{ p: { xs: 1.5, md: 2 }, borderRadius: 2 }}>
        
        {/* Main Credit Line Question */}
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 3, 
            fontWeight: 'bold',
            color: 'text.primary'
          }}
        >
          I would like to have line of credit account with Patterson that I'll be responsible to pay monthly
        </Typography>

        <RadioGroup
          value={formData.wantsCreditLine}
          onChange={handleInputChange('wantsCreditLine')}
          sx={{ mb: 3 }}
        >
          <FormControlLabel 
            value="yes" 
            control={<Radio />} 
            label="Yes" 
          />
          <FormControlLabel 
            value="no" 
            control={<Radio />} 
            label="No" 
          />
        </RadioGroup>

        {/* Show credit line form only if user selects "yes" */}
        {formData.wantsCreditLine === 'yes' && (
          <Box>
            {/* Tax ID Section */}
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 2, 
                fontWeight: 'bold',
                color: 'text.primary'
              }}
            >
              Tax identification number or social security number
            </Typography>

            <TextField
              fullWidth
              size="small"
              placeholder="TIN/SSN"
              value={formData.tinSSN}
              onChange={handleInputChange('tinSSN')}
              variant="outlined"
              sx={{ mb: 2, maxWidth: 400 }}
            />

            <Typography 
              variant="body2" 
              sx={{ 
                mb: 4,
                color: 'text.secondary',
                lineHeight: 1.6
              }}
            >
              Legal disclaimer here for credit...<br />
              I authorize and give permissions and my power of attorney to any agent, employee or representative of my business (collectively "Agent"), Whether or not such agents relationship to me...<br />
              [Additional legal text continues...]
            </Typography>

            {/* Auto-pay Section */}
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 3, 
                fontWeight: 'bold',
                color: 'text.primary'
              }}
            >
              I would like to setup automatic payments for my account
            </Typography>

            <RadioGroup
              value={formData.wantsAutopay}
              onChange={handleInputChange('wantsAutopay')}
              sx={{ mb: 3 }}
            >
              <FormControlLabel 
                value="yes" 
                control={<Radio />} 
                label="Yes" 
              />
              <FormControlLabel 
                value="no" 
                control={<Radio />} 
                label="No" 
              />
            </RadioGroup>

            {/* Show autopay form only if user selects "yes" */}
            {formData.wantsAutopay === 'yes' && (
              <Box>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    mb: 3,
                    color: 'text.secondary',
                    fontStyle: 'italic'
                  }}
                >
                  Legal language here regarding autopay if selected.
                </Typography>

                {/* Account Type and Bank Details Layout */}
                <Grid container spacing={2}>
                  {/* Row 1: Account Type */}
                  <Grid size={{ xs: 12 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Typography 
                        variant="subtitle1" 
                        sx={{ fontWeight: 500, minWidth: 'fit-content' }}
                      >
                        Account Type
                      </Typography>
                      <RadioGroup
                        value={formData.accountType}
                        onChange={handleInputChange('accountType')}
                        row
                      >
                        <FormControlLabel 
                          value="checking" 
                          control={<Radio />} 
                          label="Checking" 
                        />
                        <FormControlLabel 
                          value="savings" 
                          control={<Radio />} 
                          label="Savings" 
                        />
                      </RadioGroup>
                    </Box>
                  </Grid>

                  {/* Row 2: All 4 fields in one row */}
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Bank Name"
                      value={formData.bankName}
                      onChange={handleInputChange('bankName')}
                      variant="outlined"
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
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <FormControl fullWidth size="small">
                      <InputLabel>Auto-pay Frequency</InputLabel>
                      <Select
                        value={formData.autopayFrequency}
                        label="Auto-pay Frequency"
                        onChange={handleSelectChange('autopayFrequency')}
                      >
                        <MenuItem value="weekly">Weekly</MenuItem>
                        <MenuItem value="bi-weekly">Bi-Weekly</MenuItem>
                        <MenuItem value="monthly">Monthly</MenuItem>
                        <MenuItem value="quarterly">Quarterly</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  {/* Row 3: Electronic Signature */}
                  <Grid size={{ xs: 12 }}>
                    <Typography 
                      variant="subtitle1" 
                      sx={{ mb: 1, mt: 2, fontWeight: 500 }}
                    >
                      Electronic Signature
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Electronic Signature"
                      value={formData.electronicSignature}
                      onChange={handleInputChange('electronicSignature')}
                      variant="outlined"
                      sx={{ maxWidth: 600 }}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}
          </Box>
        )}

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