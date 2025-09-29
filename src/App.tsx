// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';

// Redux Store
import { store } from './store/store';

// Theme
import theme from './theme';

// Components
import Layout from './components/layout/Layout';
import StepperTabs from './components/StepperTabs';

// Pages - Auth
import RegistrationPage from './pages/RegistrationPage';
import CreatePasswordPage from './pages/CreatePasswordPage';
import LoginPage from './pages/LoginPage';

// Pages - Application Flow
import AboutYouAndYourPractice from './pages/AboutYouAndYourPractice';
import PractitionerLicensing from './pages/PractitionerLicensing';
import CreditLine from './pages/CreditLine';
import PattersonAdvantage from './pages/PattersonAdvantage';
import TaxExempt from './pages/TaxExempt';
import ReviewAndFinalize from './pages/ReviewAndFinalize';

/**
 * AppContent - Handles conditional layout rendering
 * 
 * Auth pages (/, /create-password, /login) - No layout
 * Application pages (/step1-7) - With layout and stepper
 */
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
          {/* Main application flow pages (with layout) */}
          <Route path="/step1" element={<AboutYouAndYourPractice />} />
          <Route path="/step2" element={<PractitionerLicensing />} />
          <Route path="/step3" element={<CreditLine />} />
          {/* <Route path="/step4" element={<AutoPayEnrollment />} /> */}
          <Route path="/step5" element={<PattersonAdvantage />} />
          <Route path="/step6" element={<TaxExempt />} />
          <Route path="/step7" element={<ReviewAndFinalize />} />
        </Routes>
      </Container>
    </Layout>
  );
};

/**
 * Main App Component
 * 
 * Wraps entire application with:
 * - Redux Provider
 * - MUI Theme Provider
 * - Router
 */
function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;