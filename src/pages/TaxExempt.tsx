import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  TextField,
  FormControlLabel,
  Checkbox,
  useTheme,
  useMediaQuery,
  RadioGroup,
  Radio
} from '@mui/material';
import {
  NavigateNext as NextIcon,
  NavigateBefore as BackIcon,
  CloudUpload as UploadIcon
} from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';

interface TaxExemptFormData {
  exemptionStatus: string;
  exemptionCertificateNumber: string;
  hasDifferentCertificates: boolean;
  exemptFromAll: boolean;
  exemptFromStateTax: boolean;
  exemptFromLocalTax: boolean;
  exemptFromFederalTax: boolean;
  exemptFromSpecificMaterials: boolean;
  washingtonStateExemption: boolean;
  selectedFile: File | null;
}

const TaxExempt: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<TaxExemptFormData>({
    exemptionStatus: '',
    exemptionCertificateNumber: '',
    hasDifferentCertificates: false,
    exemptFromAll: false,
    exemptFromStateTax: false,
    exemptFromLocalTax: false,
    exemptFromFederalTax: false,
    exemptFromSpecificMaterials: false,
    washingtonStateExemption: false,
    selectedFile: null
  });

  const handleRadioChange = (field: keyof TaxExemptFormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleInputChange = (field: keyof TaxExemptFormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleCheckboxChange = (field: keyof TaxExemptFormData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.checked
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        selectedFile: event.target.files![0]
      }));
    }
  };

  const handleImportData = () => {
    console.log('Importing data from file:', formData.selectedFile);
    // Handle file import logic here
  };

  const handleBackStep = () => {
    console.log('Going back to previous step');
    navigate('/step5');
  };

  const handleNextStep = () => {
    console.log('Moving to next step:', formData);
    navigate('/step7');
  };

  const isExempt = formData.exemptionStatus === 'exempt';

  return (
    <Container maxWidth="lg" sx={{ py: 1 }}>
      <Paper elevation={1} sx={{ p: { xs: 2, md: 3 }, borderRadius: 2 }}>
        
        {/* Main Heading */}
        <Typography 
          variant="h5" 
          sx={{ 
            mb: 3, 
            fontWeight: 'bold',
            color: 'text.primary'
          }}
        >
          Select your tax exemption status
        </Typography>

        {/* Disclaimer Text */}
        <Typography 
          variant="body1" 
          sx={{ 
            mb: 4,
            lineHeight: 1.6,
            color: 'text.secondary'
          }}
        >
          Please note this is only applicable for materials that are taxed by federal and state regulations. 
          If a material is not taxed in your state, you will not be taxed and you do not need to set up any 
          exempt certifications.
        </Typography>

        {/* Tax Exemption Radio Buttons */}
        <RadioGroup
          value={formData.exemptionStatus}
          onChange={handleRadioChange('exemptionStatus')}
          sx={{ mb: 2 }}
        >
          <FormControlLabel 
            value="not-exempt" 
            control={<Radio />} 
            label="Not exempt from sales tax. I acknowledge that applicable sales tax will be charged on all invoices."
            sx={{ mb: 2 }}
          />
          <FormControlLabel 
            value="exempt" 
            control={<Radio />} 
            label="Exempt from Sales Tax."
            sx={{ mb: 1 }}
          />
        </RadioGroup>

        {/* Show exemption fields only if exempt is selected */}
        {isExempt && (
          <Box>
            {/* Certificate Number Input */}
            <TextField
              label="Exemption certificate number"
              value={formData.exemptionCertificateNumber}
              onChange={handleInputChange('exemptionCertificateNumber')}
              variant="outlined"
              size="small"
              sx={{ mb: 2, minWidth: 300, maxWidth: 500 }}
            />

            {/* Different Certificate Checkbox - below the text input */}
            <FormControlLabel
              control={
                <Checkbox 
                  checked={formData.hasDifferentCertificates}
                  onChange={handleCheckboxChange('hasDifferentCertificates')}
                />
              }
              label="I have different certificate per shipping location"
              sx={{ mb: 4, display: 'block' }}
            />

            {/* Tax Exemption Types Heading */}
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 3, 
                fontWeight: 600,
                color: 'text.primary'
              }}
            >
              Please select the taxes you are exempt from
            </Typography>

            {/* First 5 checkboxes in one line */}
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap',
              gap: 3,
              mb: 2
            }}>
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={formData.exemptFromAll}
                    onChange={handleCheckboxChange('exemptFromAll')}
                  />
                }
                label="All"
              />
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={formData.exemptFromStateTax}
                    onChange={handleCheckboxChange('exemptFromStateTax')}
                  />
                }
                label="State Tax"
              />
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={formData.exemptFromLocalTax}
                    onChange={handleCheckboxChange('exemptFromLocalTax')}
                  />
                }
                label="Local Tax"
              />
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={formData.exemptFromFederalTax}
                    onChange={handleCheckboxChange('exemptFromFederalTax')}
                  />
                }
                label="Federal Tax"
              />
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={formData.exemptFromSpecificMaterials}
                    onChange={handleCheckboxChange('exemptFromSpecificMaterials')}
                  />
                }
                label="Limit exempt from taxes on specific materials"
              />
            </Box>

            {/* 6th checkbox on separate line */}
            <Box sx={{ mb: 4 }}>
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={formData.washingtonStateExemption}
                    onChange={handleCheckboxChange('washingtonStateExemption')}
                  />
                }
                label="Washington state prosthetic exemption"
              />
            </Box>

            {/* File Upload Section - Import Data button first, then input */}
            <Box sx={{ 
              display: 'flex', 
              gap: 2, 
              mb: 3,
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: isMobile ? 'stretch' : 'center'
            }}>
              <Button
                variant="contained"
                component="label"
                startIcon={<UploadIcon />}
                sx={{ 
                  minWidth: 140,
                  py: 1,
                  fontSize: '0.95rem',
                  fontWeight: 600
                }}
              >
                Attach File
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                  accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                />
              </Button>

              <TextField
                value={formData.selectedFile ? formData.selectedFile.name : ''}
                placeholder="No file selected"
                variant="outlined"
                size="small"
                InputProps={{
                  readOnly: true,
                }}
                sx={{ 
                  minWidth: isMobile ? 'auto' : 300,
                  flex: 1
                }}
              />
            </Box>

            {/* Certificate Requirements Text */}
            <Typography 
              variant="body2" 
              sx={{ 
                mb: 2,
                color: 'text.secondary',
                lineHeight: 1.5
              }}
            >
              All applicable exemption certificate files must be attached for your local or state requirements.
            </Typography>

            <Typography 
              variant="body2" 
              sx={{ 
                mb: 3,
                color: 'warning.main',
                lineHeight: 1.5,
                fontWeight: 500
              }}
            >
              If your exemption certificate files are not attached or not valid, you will be charged applicable 
              sales tax at a known tax status.
            </Typography>
          </Box>
        )}

      </Paper>
      
      {/* Navigation Buttons */}
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

export default TaxExempt;