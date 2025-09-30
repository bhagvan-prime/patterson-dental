// src/pages/TaxExempt.tsx - WITH i18n
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
import { useTranslation } from 'react-i18next';

// Import common components
import {RadioOption} from '../components/commons/index';
import CommonRadioGroup from '../components/commons/inputs/PRRadioGroup';
import CommonCheckbox from '../components/commons/inputs/PRCheckbox';
import CommonInput from '../components/commons/inputs/PRInput';
import CommonButton from '../components/commons/buttons/PRButton';

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
  const { t } = useTranslation();

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

  // Define options with translations
  const exemptionStatusOptions: RadioOption[] = [
    {
      label: t('taxexempt:exemptionStatus.notExempt'),
      value: 'not-exempt',
    },
    {
      label: t('taxexempt:exemptionStatus.exempt'),
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
    navigate('/step5');
  };

  const handleNextStep = () => {
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
          {t('taxexempt:header')}
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
          {t('taxexempt:disclaimer')}
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
              label={t('taxexempt:fields.certificateNumber')}
              value={formData.exemptionCertificateNumber}
              onChange={handleInputChange('exemptionCertificateNumber')}
              size="small"
              sx={{ mb: 2, minWidth: 300, maxWidth: 500 }}
            />

            {/* Different Certificate Checkbox */}
            <CommonCheckbox
              checked={formData.hasDifferentCertificates}
              onChange={handleInputChange('hasDifferentCertificates')}
              label={t('taxexempt:checkboxes.differentCertificates')}
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
              {t('taxexempt:taxExemptionHeading')}
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
                label={t('taxexempt:checkboxes.all')}
              />
              <CommonCheckbox
                checked={formData.exemptFromStateTax}
                onChange={handleInputChange('exemptFromStateTax')}
                label={t('taxexempt:checkboxes.stateTax')}
              />
              <CommonCheckbox
                checked={formData.exemptFromLocalTax}
                onChange={handleInputChange('exemptFromLocalTax')}
                label={t('taxexempt:checkboxes.localTax')}
              />
              <CommonCheckbox
                checked={formData.exemptFromFederalTax}
                onChange={handleInputChange('exemptFromFederalTax')}
                label={t('taxexempt:checkboxes.federalTax')}
              />
              <CommonCheckbox
                checked={formData.exemptFromSpecificMaterials}
                onChange={handleInputChange('exemptFromSpecificMaterials')}
                label={t('taxexempt:checkboxes.specificMaterials')}
              />
            </Box>

            {/* 6th checkbox on separate line */}
            <Box sx={{ mb: 4,
                '& .MuiFormControlLabel-label': {
                  mt: '10px'
                } }}>
              <CommonCheckbox
                checked={formData.washingtonStateExemption}
                onChange={handleInputChange('washingtonStateExemption')}
                label={t('taxexempt:checkboxes.washingtonState')}
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
                {t('taxexempt:fileUpload.attachButton')}
                <input
                  type="file"
                  hidden
                  onChange={handleFileChange}
                  accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                />
              </CommonButton>

              <CommonInput
                value={formData.selectedFile ? formData.selectedFile.name : ''}
                placeholder={t('taxexempt:fileUpload.noFileSelected')}
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
              {t('taxexempt:fileUpload.requirements')}
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
              {t('taxexempt:fileUpload.warning')}
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
          {t('common:buttons.back')}
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
          {t('aboutYou:buttons.nextStep')}
          <NextIcon sx={{ ml: 0.5 }} />
        </CommonButton>
      </Box>
    </Container>
  );
};

export default TaxExempt;