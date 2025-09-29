// src/pages/ReviewAndFinalize.tsx - REFACTORED
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
  Divider,
  Modal,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  NavigateBefore as BackIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';

// Import common components
import CommonCheckbox from '../components/commons/inputs/CommonCheckbox';
import CommonInput from '../components/commons/inputs/CommonInput';
import CommonButton from '../components/commons/buttons/CommonButton';

interface AllFormData {
  step1: { practiceName: string; practiceType: string };
  step2: { licenseNumber: string; npiNumber: string };
  step3: { creditLimitRequested: string; creditApplicationStatus: string };
  step4: { paymentMethodType: string; isPrimaryMethod: boolean };
  step5: { enrollmentDecision: string; preferredRewardType: string };
  step6: { isTaxExempt: string; documentFileName: string };
}

const mockFetchAllData = (): AllFormData => ({
  step1: { practiceName: 'Smith Dermatology PC', practiceType: 'Dermatology' },
  step2: { licenseNumber: 'MED12345', npiNumber: '1234567890' },
  step3: { creditLimitRequested: '$50,000', creditApplicationStatus: 'New' },
  step4: { paymentMethodType: 'ACH', isPrimaryMethod: true },
  step5: {
    enrollmentDecision: 'Enroll',
    preferredRewardType: 'Product Discounts',
  },
  step6: { isTaxExempt: 'Yes', documentFileName: 'TaxCert_10_2025.pdf' },
});

const ReviewAndFinalize: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const [expanded, setExpanded] = useState<string | false>('step1');
  const [formData] = useState<AllFormData>(mockFetchAllData());
  const [finalConsent, setFinalConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [electronicSignature, setElectronicSignature] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const steps = [
    {
      label: '1. About You and your Practice',
      stepKey: 'step1',
      path: '/step1',
    },
    { label: '2. Practitioner Licensing', stepKey: 'step2', path: '/step2' },
    { label: '3. Credit Account', stepKey: 'step3', path: '/step3' },
    { label: '4. Patterson Advantage', stepKey: 'step5', path: '/step5' },
    { label: '5. Tax Exemption Status', stepKey: 'step6', path: '/step6' },
  ];

  const handleAccordionChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleFinalSubmit = () => {
    setIsSubmitting(true);
    console.log('Final Data Submission:', formData);
    console.log('Electronic Signature:', electronicSignature);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessModal(true);
    }, 2000);
  };

  const handleBackStep = () => {
    console.log('Going back to previous step');
    navigate('/step6');
  };

  const renderStepContent = (stepKey: keyof AllFormData) => {
    const data = formData[stepKey];
    return (
      <Grid container spacing={2}>
        {Object.entries(data).map(([key, value]) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={key}>
            <Typography variant="caption" color="text.secondary" display="block">
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
            </Typography>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 1 }}>
      <Paper elevation={1} sx={{ p: { xs: 1.5, md: 2 }, borderRadius: 2 }}>
        <Box sx={{ width: '100%' }}>
          <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
            Review and Finalize Application
          </Typography>

          {steps.map((step, index) => (
            <Accordion
              key={step.stepKey}
              expanded={expanded === step.stepKey}
              onChange={handleAccordionChange(step.stepKey)}
              sx={{
                mb: index === steps.length - 1 ? 0 : 1.5,
                borderRadius: 1,
                '&:before': { display: 'none' },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  backgroundColor: 'grey.100',
                  color: 'text.primary',
                  minHeight: 48,
                  '&.Mui-expanded': {
                    backgroundColor: 'primary.light',
                    minHeight: 48,
                  },
                  '& .MuiAccordionSummary-content': { margin: '8px 0' },
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
                    {step.label}
                  </Typography>
                  <CommonButton
                    variant="secondary"
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(step.path);
                    }}
                    sx={{ ml: 2 }}
                  >
                    <EditIcon sx={{ mr: 0.5, fontSize: 18 }} />
                    Edit
                  </CommonButton>
                </Box>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 1.5 }}>
                {renderStepContent(step.stepKey as keyof AllFormData)}
              </AccordionDetails>
            </Accordion>
          ))}

          <Divider sx={{ my: 3 }} />

          <Box
            sx={{
              p: 2,
              border: '1px solid',
              borderColor: 'warning.main',
              borderRadius: 1,
            }}
          >
            <Typography variant="h6" color="warning.dark" gutterBottom>
              Final Submission Declaration
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              I, the authorized representative, certify that all information
              provided across all steps of this customer boarding process is
              accurate and complete to the best of my knowledge. I understand
              that submitting this application constitutes a formal request for
              business partnership and acceptance of all applicable terms and
              conditions.
            </Typography>
            <CommonCheckbox
              checked={finalConsent}
              onChange={(e) => setFinalConsent(e.target.checked)}
              label={
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  I agree to the final declaration and authorize submission.
                </Typography>
              }
              checkboxProps={{ size: 'small', color: 'success' }}
              labelProps={{
                sx: {
                  mb: 3,
                  '& .MuiFormControlLabel-label': { fontSize: '1rem' },
                },
              }}
            />

            {/* Electronic Signature Field */}
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
                Electronic Signature
              </Typography>
              <CommonInput
                placeholder="Electronic Signature"
                value={electronicSignature}
                onChange={(e) => setElectronicSignature(e.target.value)}
                size="small"
                sx={{ maxWidth: 600 }}
              />
            </Box>
          </Box>

          {/* Success Modal */}
          <Modal
            open={showSuccessModal}
            onClose={() => setShowSuccessModal(false)}
            closeAfterTransition
            slotProps={{
                backdrop: {
                timeout: 500,
                },
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: isMobile ? '90%' : '80%',
                maxWidth: 600,
                bgcolor: 'background.paper',
                borderRadius: 3,
                boxShadow: 24,
                p: 6,
                textAlign: 'center',
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  mb: 4,
                  fontWeight: 'bold',
                  color: 'success.main',
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                }}
              >
                Thank You!
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  mb: 4,
                  color: 'text.secondary',
                  lineHeight: 1.6,
                }}
              >
                Application has been sent for Processing.
              </Typography>
            </Box>
          </Modal>
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
          onClick={handleFinalSubmit}
          disabled={!finalConsent || !electronicSignature}
          loading={isSubmitting}
          sx={{
            minWidth: 140,
            py: 1,
            fontSize: '0.95rem',
            fontWeight: 600,
          }}
        >
          Submit
        </CommonButton>
      </Box>
    </Container>
  );
};

export default ReviewAndFinalize;