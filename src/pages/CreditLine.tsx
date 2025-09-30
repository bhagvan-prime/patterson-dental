// src/pages/CreditLine.tsx - REFACTORED
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
} from '@mui/material';
import {
  NavigateNext as NextIcon,
  NavigateBefore as BackIcon,
} from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';

// Import common components
import CommonSelect from '../components/commons/inputs/PRSelect';
import CommonRadioGroup from '../components/commons/inputs/PRRadioGroup';
import type {SelectOption, RadioOption} from '../components/commons/index';
import CommonInput from '../components/commons/inputs/PRInput';
import CommonButton from '../components/commons/buttons/PRButton';

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
    electronicSignature: '',
  });

  // Define options
  const yesNoOptions: RadioOption[] = [
    { label: 'Yes', value: 'yes' },
    { label: 'No', value: 'no' },
  ];

  const accountTypeOptions: RadioOption[] = [
    { label: 'Checking', value: 'checking' },
    { label: 'Savings', value: 'savings' },
  ];

  const autopayFrequencyOptions: SelectOption[] = [
    { label: 'Weekly', value: 'weekly' },
    { label: 'Bi-Weekly', value: 'bi-weekly' },
    { label: 'Monthly', value: 'monthly' },
    { label: 'Quarterly', value: 'quarterly' },
  ];

  const handleInputChange = (field: keyof CreditLineFormData) => (
    event: React.ChangeEvent<HTMLInputElement> | { target: { value: unknown } }
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleBackStep = () => {
    navigate('/step2');
  };

  const handleNextStep = () => {
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
            color: 'text.primary',
          }}
        >
          I would like to have line of credit account with Patterson that I'll
          be responsible to pay monthly
        </Typography>

        <CommonRadioGroup
          label=""
          value={formData.wantsCreditLine}
          onChange={handleInputChange('wantsCreditLine')}
          options={yesNoOptions}
          direction="column"
          sx={{ mb: 3 }}
        />

        {/* Show credit line form only if user selects "yes" */}
        {formData.wantsCreditLine === 'yes' && (
          <Box>
            {/* Tax ID Section */}
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontWeight: 'bold',
                color: 'text.primary',
              }}
            >
              Tax identification number or social security number
            </Typography>

            <CommonInput
              placeholder="TIN/SSN"
              value={formData.tinSSN}
              onChange={handleInputChange('tinSSN')}
              size="small"
              sx={{ mb: 2, maxWidth: 400 }}
            />

            <Typography
              variant="body2"
              sx={{
                mb: 4,
                color: 'text.secondary',
                lineHeight: 1.6,
              }}
            >
              Legal disclaimer here for credit...<br />
              I authorize and give permissions and my power of attorney to any
              agent, employee or representative of my business (collectively
              "Agent"), Whether or not such agents relationship to me...<br />
              [Additional legal text continues...]
            </Typography>

            {/* Auto-pay Section */}
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                fontWeight: 'bold',
                color: 'text.primary',
              }}
            >
              I would like to setup automatic payments for my account
            </Typography>

            <CommonRadioGroup
              label=""
              value={formData.wantsAutopay}
              onChange={handleInputChange('wantsAutopay')}
              options={yesNoOptions}
              direction="column"
              sx={{ mb: 3 }}
            />

            {/* Show autopay form only if user selects "yes" */}
            {formData.wantsAutopay === 'yes' && (
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    mb: 3,
                    color: 'text.secondary',
                    fontStyle: 'italic',
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
                      <CommonRadioGroup
                        label=""
                        value={formData.accountType}
                        onChange={handleInputChange('accountType')}
                        options={accountTypeOptions}
                        direction="row"
                      />
                    </Box>
                  </Grid>

                  {/* Row 2: All 4 fields in one row */}
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <CommonInput
                      label="Bank Name"
                      value={formData.bankName}
                      onChange={handleInputChange('bankName')}
                      size="small"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <CommonInput
                      label="Routing Number"
                      value={formData.routingNumber}
                      onChange={handleInputChange('routingNumber')}
                      size="small"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <CommonInput
                      label="Account Number"
                      value={formData.accountNumber}
                      onChange={handleInputChange('accountNumber')}
                      size="small"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <CommonSelect
                      label="Auto-pay Frequency"
                      value={formData.autopayFrequency}
                      onChange={handleInputChange('autopayFrequency')}
                      options={autopayFrequencyOptions}
                      size="small"
                    />
                  </Grid>

                  {/* Row 3: Electronic Signature */}
                  <Grid size={{ xs: 12 }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ mb: 1, mt: 2, fontWeight: 500 }}
                    >
                      Electronic Signature
                    </Typography>
                    <CommonInput
                      placeholder="Electronic Signature"
                      value={formData.electronicSignature}
                      onChange={handleInputChange('electronicSignature')}
                      size="small"
                      sx={{ maxWidth: 600 }}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}
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

export default CreditLine;