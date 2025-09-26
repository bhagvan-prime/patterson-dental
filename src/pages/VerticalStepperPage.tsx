import React, { useState } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const steps = [
  {
    label: 'About You and your Practice',
    description: 'Basic information about your practice',
  },
  {
    label: 'Practitioner Licensing',
    description: 'Optional licensing information',
  },
  {
    label: 'Customer Line of Credit',
    description: 'Credit line setup',
  },
  {
    label: 'Auto Pay Enrollment',
    description: 'Set up automatic payments',
  },
  {
    label: 'Loyalty Enrollment',
    description: 'Loyalty program setup',
  },
  {
    label: 'Tax Exempt',
    description: 'Tax exemption details',
  },
  {
    label: 'Review and Finalize',
    description: 'Review all information',
  },
];

const StepperPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const renderStepContent = (step: number) => {
    return (
      <Box sx={{ mt: 2 }}>
        {/* Accordion 1 */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Section 1 - Basic Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                label="Business Name"
                variant="outlined"
                size="small"
              />
              <TextField
                fullWidth
                label="Contact Person"
                variant="outlined"
                size="small"
              />
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Accordion 2 */}
        <Accordion sx={{ mt: 1 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Section 2 - Address Information</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                label="Street Address"
                variant="outlined"
                size="small"
              />
              <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                <TextField
                  label="City"
                  variant="outlined"
                  size="small"
                  sx={{ flex: 1 }}
                />
                <TextField
                  label="State"
                  variant="outlined"
                  size="small"
                  sx={{ flex: 1 }}
                />
              </Box>
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* Accordion 3 */}
        <Accordion sx={{ mt: 1 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Section 3 - Additional Information</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                label="Phone Number"
                variant="outlined"
                size="small"
              />
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                size="small"
              />
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    );
  };

  return (
    <Box sx={{ 
      maxWidth: { xs: '100%', sm: 800, md: 1000 }, 
      mx: 'auto', 
      p: { xs: 2, sm: 3 } 
    }}>
      <Typography variant="h4" gutterBottom align="center">
        Practice Registration
      </Typography>
      
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>
              <Typography variant="h6">{step.label}</Typography>
              <Typography variant="body2" color="text.secondary">
                {step.description}
              </Typography>
            </StepLabel>
            <StepContent>
              {renderStepContent(index)}
              
              <Box sx={{ mb: 2, mt: 3 }}>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 1,
                  justifyContent: 'space-between'
                }}>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                    variant="outlined"
                  >
                    Back
                  </Button>
                  <Box sx={{ display: 'flex', gap: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
                    <Button variant="outlined" color="secondary">
                      Save Progress
                    </Button>
                    <Button
                      variant="contained"
                      onClick={handleNext}
                    >
                      {index === steps.length - 1 ? 'Finish' : 'Next Step'}
                    </Button>
                  </Box>
                </Box>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3, mt: 2 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default StepperPage;