import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TemplatesPage from './pages/Template';
import ProfilePage from './pages/Profile';
import SettingsPage from './pages/Setting';
import DashboardPage from './dashboard/page';
import OtpVerification from './components/OtpVerification';
import ResetPassword from './components/ResetPassword';
import ConvertSite from './pages/ConvertSite';
import Dashboard from './pages/Dashboard';
import CreateWordPressModal from './components/CreateWordPressModal';
import { useState } from 'react';
import MainDashboard from './pages/MainDashboard';
import CreateWebsiteFlow from './components/CreateWebsite/CreateWebsiteFlow';
import Editor from './pages/Editor';
import PortfolioTemplate from './templates/portfolio/page';
import { Toaster } from 'react-hot-toast';
// import Editor from './pages/Editor'; 


const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <Router>
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route
          path="/"
          element={
            <>
              <Dashboard />
              <CreateWordPressModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </>
          }
        /> */}
        <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Home />} />
        <Route path="/main-dashboard" element={<MainDashboard />} />
        <Route path="/create-website" element={<CreateWebsiteFlow />} />
        <Route path="/convert-site" element={<ConvertSite />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgotPassword" element={<OtpVerification />} />
          <Route path="/reset-password" element={<ResetPassword />} />


          <Route path="/editor" element={<Editor />} />
          <Route path="/editor/:id" element={<Editor />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/setting" element={<SettingsPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/portfolioTemplate" element={<PortfolioTemplate />} />
        </Routes>
    </Router>
  );
};

export default App;
