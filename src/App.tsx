import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';
import theme from './theme';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import StepperPage from './pages/StepperPage';
import VerticalStepperPage from './pages/VerticalStepperPage';
import RegistrationPage from './pages/RegistrationPage';
import CreatePasswordPage from './pages/CreatePasswordPage';
import LoginPage from './pages/LoginPage';
import NavigationTabs from './components/NavigationTabs';
import AboutYouAndYourPractice from './pages/AboutYouAndYourPractice';
import StepperTabs from './components/StepperTabs';
import PractitionerLicensing from './pages/PractitionerLicensing';
import CreditLine from './pages/CreditLine';
import AutoPayEnrollment from './pages/AutoPayEnrollment';
import LoyaltyEnrollment from './pages/LoyaltyEnrollment';
import TaxExempt from './pages/TaxExempt';
import ReviewAndFinalize from './pages/ReviewAndFinalize';

// Component to handle conditional layout
const AppContent: React.FC = () => {
  const location = useLocation();
  
  // Pages without layout (authentication flow)
  const authPages = ['/', '/create-password', '/login'];
  const isAuthPage = authPages.includes(location.pathname);

  if (isAuthPage) {
    // Authentication pages without layout
    return (
      <Routes>
        <Route path="/" element={<RegistrationPage />} />
        <Route path="/create-password" element={<CreatePasswordPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    );
  }

  // All other pages with layout (after authentication)
  return (
    <Layout>
      <StepperTabs />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Routes>
          {/* Uncomment these if needed
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/stepper" element={<StepperPage />} />
          <Route path="/vertical" element={<VerticalStepperPage />} /> */}
          
          {/* Main application flow pages (with layout) */}
          <Route path="/step1" element={<AboutYouAndYourPractice />} />
          <Route path="/step2" element={<PractitionerLicensing />} />
          <Route path="/step3" element={<CreditLine />} />
          <Route path="/step4" element={<AutoPayEnrollment />} />
          <Route path="/step5" element={<LoyaltyEnrollment />} />
          <Route path="/step6" element={<TaxExempt />} />
          <Route path="/step7" element={<ReviewAndFinalize />} />
        </Routes>
      </Container>
    </Layout>
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;