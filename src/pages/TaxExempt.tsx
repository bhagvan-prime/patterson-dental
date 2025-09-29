// src/pages/TaxExempt.tsx - REFACTORED
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  NavigateNext as NextIcon,
  NavigateBefore as BackIcon,
  CloudUpload as UploadIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Import common components
import {RadioOption} from '../components/commons/index';
import CommonRadioGroup from '../components/commons/inputs/CommonRadioGroup';
import CommonCheckbox from '../components/commons/inputs/CommonCheckbox';
import CommonInput from '../components/commons/inputs/CommonInput';
import CommonButton from '../components/commons/buttons/CommonButton';


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
    selectedFile: null,
  });

  // Define options
  const exemptionStatusOptions: RadioOption[] = [
    {
      label:
        'Not exempt from sales tax. I acknowledge that applicable sales tax will be charged on all invoices.',
      value: 'not-exempt',
    },
    {
      label: 'Exempt from Sales Tax.',
      value: 'exempt',
    },
  ];

  const handleInputChange = (field: keyof TaxExemptFormData) => (
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        selectedFile: event.target.files![0],
      }));
    }
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
            color: 'text.primary',
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
            color: 'text.secondary',
          }}
        >
          Please note this is only applicable for materials that are taxed by
          federal and state regulations. If a material is not taxed in your
          state, you will not be taxed and you do not need to set up any exempt
          certifications.
        </Typography>

        {/* Tax Exemption Radio Buttons */}
        <CommonRadioGroup
          label=""
          value={formData.exemptionStatus}
          onChange={handleInputChange('exemptionStatus')}
          options={exemptionStatusOptions}
          direction="column"
          sx={{ mb: 2 }}
        />

        {/* Show exemption fields only if exempt is selected */}
        {isExempt && (
          <Box>
            {/* Certificate Number Input */}
            <CommonInput
              label="Exemption certificate number"
              value={formData.exemptionCertificateNumber}
              onChange={handleInputChange('exemptionCertificateNumber')}
              size="small"
              sx={{ mb: 2, minWidth: 300, maxWidth: 500 }}
            />

            {/* Different Certificate Checkbox */}
            <CommonCheckbox
              checked={formData.hasDifferentCertificates}
              onChange={handleInputChange('hasDifferentCertificates')}
              label="I have different certificate per shipping location"
              labelProps={{ sx: { mb: 4, display: 'block' } }}
            />

            {/* Tax Exemption Types Heading */}
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                fontWeight: 600,
                color: 'text.primary',
              }}
            >
              Please select the taxes you are exempt from
            </Typography>

            {/* First 5 checkboxes in one line */}
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 3,
                mb: 2,
                '& .MuiFormControlLabel-label': {
                  mt: '10px'
                }
              }}
            >
              <CommonCheckbox
                checked={formData.exemptFromAll}
                onChange={handleInputChange('exemptFromAll')}
                label="All"
              />
              <CommonCheckbox
                checked={formData.exemptFromStateTax}
                onChange={handleInputChange('exemptFromStateTax')}
                label="State Tax"
              />
              <CommonCheckbox
                checked={formData.exemptFromLocalTax}
                onChange={handleInputChange('exemptFromLocalTax')}
                label="Local Tax"
              />
              <CommonCheckbox
                checked={formData.exemptFromFederalTax}
                onChange={handleInputChange('exemptFromFederalTax')}
                label="Federal Tax"
              />
              <CommonCheckbox
                checked={formData.exemptFromSpecificMaterials}
                onChange={handleInputChange('exemptFromSpecificMaterials')}
                label="Limit exempt from taxes on specific materials"
              />
            </Box>

            {/* 6th checkbox on separate line */}
            <Box sx={{ mb: 4 }}>
              <CommonCheckbox
                checked={formData.washingtonStateExemption}
                onChange={handleInputChange('washingtonStateExemption')}
                label="Washington state prosthetic exemption"
              />
            </Box>

            {/* File Upload Section */}
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                mb: 3,
                flexDirection: isMobile ? 'column' : 'row',
                alignItems: isMobile ? 'stretch' : 'center',
              }}
            >
              <CommonButton
                variant="primary"
                component="label"
                sx={{
                  minWidth: 140,
                  py: 1,
                  fontSize: '0.95rem',
                  fontWeight: 600,
                }}
              >
                <UploadIcon sx={{ mr: 0.5 }} />
                Attach File
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                  accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                />
              </CommonButton>

              <CommonInput
                value={formData.selectedFile ? formData.selectedFile.name : ''}
                placeholder="No file selected"
                size="small"
                slotProps={{
                  input:{
                    readOnly: true,
                  }
                }}
                sx={{
                  minWidth: isMobile ? 'auto' : 300,
                  flex: 1,
                }}
              />
            </Box>

            {/* Certificate Requirements Text */}
            <Typography
              variant="body2"
              sx={{
                mb: 2,
                color: 'text.secondary',
                lineHeight: 1.5,
              }}
            >
              All applicable exemption certificate files must be attached for
              your local or state requirements.
            </Typography>

            <Typography
              variant="body2"
              sx={{
                mb: 3,
                color: 'warning.main',
                lineHeight: 1.5,
                fontWeight: 500,
              }}
            >
              If your exemption certificate files are not attached or not valid,
              you will be charged applicable sales tax at a known tax status.
            </Typography>
          </Box>
        )}
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

export default TaxExempt;