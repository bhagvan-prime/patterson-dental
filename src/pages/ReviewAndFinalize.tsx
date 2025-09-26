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
  FormControlLabel,
  Checkbox,
  useTheme,
  useMediaQuery,
  FormHelperText,
  Divider,
  Chip
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  CheckCircle as FinalizeIcon,
  NavigateBefore as BackIcon,
  Edit as EditIcon,
  Visibility as ViewIcon
} from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';

// Placeholder for data types from all previous steps (you'd replace this with actual types or a global context)
interface AllFormData {
    step1: { practiceName: string; practiceType: string; }; // Mock data structure for Step 1
    step2: { licenseNumber: string; npiNumber: string; }; // Mock data structure for Step 2
    step3: { creditLimitRequested: string; creditApplicationStatus: string; };
    step4: { paymentMethodType: string; isPrimaryMethod: boolean; };
    step5: { enrollmentDecision: string; preferredRewardType: string; };
    step6: { isTaxExempt: string; documentFileName: string; };
}

// Mock function to simulate fetching all stored data
const mockFetchAllData = (): AllFormData => ({
    step1: { practiceName: 'Smith Dermatology PC', practiceType: 'Dermatology' },
    step2: { licenseNumber: 'MED12345', npiNumber: '1234567890' },
    step3: { creditLimitRequested: '$50,000', creditApplicationStatus: 'New' },
    step4: { paymentMethodType: 'ACH', isPrimaryMethod: true },
    step5: { enrollmentDecision: 'Enroll', preferredRewardType: 'Product Discounts' },
    step6: { isTaxExempt: 'Yes', documentFileName: 'TaxCert_10_2025.pdf' },
});

const ReviewAndFinalize: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  
  const [expanded, setExpanded] = useState<string | false>('step1');
  const [formData, setFormData] = useState<AllFormData>(mockFetchAllData());
  const [finalConsent, setFinalConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const steps = [
    { label: '1. About You and your Practice', stepKey: 'step1', path: '/step1' },
    { label: '2. Practitioner Licensing', stepKey: 'step2', path: '/step2' },
    { label: '3. Customer Line of Credit', stepKey: 'step3', path: '/step3' },
    { label: '4. Auto Pay Enrollment', stepKey: 'step4', path: '/step4' },
    { label: '5. Loyalty Enrollment', stepKey: 'step5', path: '/step5' },
    { label: '6. Tax Exempt', stepKey: 'step6', path: '/step6' },
  ];

  const handleAccordionChange = (panel: string) => (
    event: React.SyntheticEvent, 
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleFinalSubmit = () => {
    setIsSubmitting(true);
    // Simulate API call to finalize submission
    console.log('Final Data Submission:', formData);
    setTimeout(() => {
        setIsSubmitting(false);
        alert('Customer Boarding Complete!');
        // Navigate to a success page or dashboard
        navigate('/'); 
    }, 2000);
  };

  const handleBackStep = () => {
    console.log('Going back to previous step');
    navigate('/step6');
  };

  const renderStepContent = (stepKey: keyof AllFormData) => {
    // A simplified display for brevity. In a real app, you'd map complex data.
    const data = formData[stepKey];
    return (
        <Grid container spacing={2}>
            {Object.entries(data).map(([key, value]) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={key}>
                    <Typography variant="caption" color="text.secondary" display="block">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
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
                    sx={{ mb: 1.5, borderRadius: 1, '&:before': { display: 'none' } }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        sx={{ 
                            backgroundColor: 'grey.100',
                            color: 'text.primary',
                            minHeight: 48,
                            '&.Mui-expanded': { backgroundColor: 'primary.light', minHeight: 48 },
                            '& .MuiAccordionSummary-content': { margin: '8px 0' }
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                {step.label}
                            </Typography>
                            <Button
                                size="small"
                                variant="outlined"
                                startIcon={<EditIcon />}
                                onClick={(e) => { e.stopPropagation(); navigate(step.path); }}
                                sx={{ ml: 2 }}
                            >
                                Edit
                            </Button>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails sx={{ p: 1.5 }}>
                        {renderStepContent(step.stepKey as keyof AllFormData)}
                    </AccordionDetails>
                </Accordion>
            ))}

            <Divider sx={{ my: 3 }} />

            <Box sx={{ p: 2, border: '1px solid', borderColor: 'warning.main', borderRadius: 1 }}>
                <Typography variant="h6" color="warning.dark" gutterBottom>
                    Final Submission Declaration
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    I, the authorized representative, certify that all information provided across all steps of this customer boarding process is accurate and complete to the best of my knowledge. I understand that submitting this application constitutes a formal request for business partnership and acceptance of all applicable terms and conditions.
                </Typography>
                <FormControlLabel
                    control={
                        <Checkbox 
                            size="small"
                            checked={finalConsent}
                            onChange={(e) => setFinalConsent(e.target.checked)}
                            color="success"
                        />
                    }
                    label={<Typography variant="body1" sx={{ fontWeight: 600 }}>I agree to the final declaration and authorize submission.</Typography>}
                    sx={{ my: 2, '& .MuiFormControlLabel-label': { fontSize: '1rem' } }}
                />

                <Box sx={{ 
                    mt: 3, 
                    display: 'flex', 
                    justifyContent: 'flex-end'
                }}>
                    <Button
                        size="large"
                        variant="contained"
                        color="success"
                        endIcon={<FinalizeIcon />}
                        onClick={handleFinalSubmit}
                        disabled={!finalConsent || isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Final Application'}
                    </Button>
                </Box>
            </Box>

        </Box>
      </Paper>
      
      {/* Navigation Buttons - Outside container, only Back button */}
      <Box sx={{ 
        mt: 3, 
        display: 'flex', 
        justifyContent: 'flex-start'
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
      </Box>
    </Container>
  );
};

export default ReviewAndFinalize;