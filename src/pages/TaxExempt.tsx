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
  CloudUpload as UploadIcon,
  Description as DocumentIcon
} from '@mui/icons-material';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';

// Define the shape of the form data for this step
interface TaxExemptFormData {
  isTaxExempt: 'Yes' | 'No' | '';
  exemptReason: string;
  exemptState: string;
  exemptionIDNumber: string;
  documentFileName: string;
  documentDate: string;
  reviewStatus: 'Pending' | 'Approved' | 'Denied' | 'N/A';
}

const TaxExempt: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  
  const [expanded, setExpanded] = useState<string | false>('panel1');
  const [editMode, setEditMode] = useState({
    panel1: true,
    panel2: false,
  });
  const [formData, setFormData] = useState<TaxExemptFormData>({
    isTaxExempt: '',
    exemptReason: '',
    exemptState: '',
    exemptionIDNumber: '',
    documentFileName: '',
    documentDate: '',
    reviewStatus: 'N/A',
  });

  const handleAccordionChange = (panel: string) => (
    event: React.SyntheticEvent, 
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleInputChange = (field: keyof TaxExemptFormData) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSelectChange = (field: keyof TaxExemptFormData) => (
    event: any // Adjust type if needed
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    if (field === 'isTaxExempt' && event.target.value === 'No') {
        setFormData(prev => ({...prev, exemptReason: '', exemptState: '', exemptionIDNumber: '', documentFileName: '', documentDate: '', reviewStatus: 'N/A'}));
    }
  };

  // Mock function for file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
        const file = event.target.files[0];
        setFormData(prev => ({
            ...prev,
            documentFileName: file.name,
            documentDate: new Date().toISOString().split('T')[0],
            reviewStatus: 'Pending'
        }));
    }
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
    navigate('/step5');
  };

  const handleNextStep = () => {
    console.log('Moving to next step:', formData);
    navigate('/step7');
  };

  const isExempt = formData.isTaxExempt === 'Yes';
  const isFormValid = formData.isTaxExempt === 'No' || (
      isExempt && 
      formData.exemptState && 
      formData.exemptionIDNumber && 
      formData.documentFileName &&
      formData.reviewStatus === 'Pending' // Assuming immediate upload sets to pending
  );

  return (
    <Container maxWidth="lg" sx={{ py: 1 }}>
      <Paper elevation={1} sx={{ p: { xs: 1.5, md: 2 }, borderRadius: 2 }}>
        <Box sx={{ width: '100%' }}>
          
          {/* Accordion 1: Exemption Status and Details */}
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
                  1. Tax Exemption Status
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
                    <InputLabel>Is the business tax exempt?</InputLabel>
                    <Select
                      value={formData.isTaxExempt}
                      label="Is the business tax exempt?"
                      onChange={handleSelectChange('isTaxExempt')}
                    >
                      <MenuItem value="Yes">Yes, we are tax exempt</MenuItem>
                      <MenuItem value="No">No, we are not tax exempt</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {isExempt && (
                    <>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Exemption ID / Certificate Number"
                                value={formData.exemptionIDNumber}
                                onChange={handleInputChange('exemptionIDNumber')}
                                variant="outlined"
                                disabled={!editMode.panel1}
                                required
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Exemption Reason / Type"
                                value={formData.exemptReason}
                                onChange={handleInputChange('exemptReason')}
                                variant="outlined"
                                disabled={!editMode.panel1}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <FormControl fullWidth size="small" disabled={!editMode.panel1} required>
                                <InputLabel>Issuing State of Exemption</InputLabel>
                                <Select
                                    value={formData.exemptState}
                                    label="Issuing State of Exemption"
                                    onChange={handleSelectChange('exemptState')}
                                >
                                    <MenuItem value="CA">California</MenuItem>
                                    <MenuItem value="TX">Texas</MenuItem>
                                    <MenuItem value="FL">Florida</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </>
                )}
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
                  disabled={!formData.isTaxExempt}
                >
                  Save
                </Button>
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* Accordion 2: Document Upload */}
          <Accordion 
            expanded={expanded === 'panel2'} 
            onChange={handleAccordionChange('panel2')}
            sx={{ mb: 1.5, borderRadius: 1, '&:before': { display: 'none' } }}
            disabled={!isExempt}
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
                  2. Upload Exemption Certificate
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
                    Please upload a copy of your current Tax Exemption Certificate (e.g., PDF or image file).
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                    <Button
                        variant="contained"
                        component="label"
                        startIcon={<UploadIcon />}
                        disabled={!editMode.panel2}
                    >
                        Upload File
                        <input
                            type="file"
                            hidden
                            onChange={handleFileUpload}
                            accept=".pdf,.png,.jpg,.jpeg"
                        />
                    </Button>
                    {formData.documentFileName && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <DocumentIcon color="primary" />
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                {formData.documentFileName}
                            </Typography>
                            <FormHelperText>
                                (Uploaded {formData.documentDate}) | Status: **{formData.reviewStatus}**
                            </FormHelperText>
                        </Box>
                    )}
                </Box>

              {/* Only Save button for last accordion */}
              <Box sx={{ 
                mt: 3, 
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

export default TaxExempt;