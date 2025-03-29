import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TemplatesPage from './pages/Template';
import ProfilePage from './pages/Profile';
import SettingsPage from './pages/Setting';
import OtpVerification from './components/OtpVerification';
import ResetPassword from './components/ResetPassword';
import ConvertSite from './pages/ConvertSite';
import { useState } from 'react';
import MainDashboard from './pages/MainDashboard';
import CreateWebsiteFlow from './components/CreateWebsite/CreateWebsiteFlow';
import Editor from './pages/Editor';
import { Toaster } from 'react-hot-toast';
import SelectWebsite from './pages/SelectWebsite';
import TemplateDetails from './pages/TemplateDetails';
import Dashboardpreview from './components/Dashboardpreview';
import Templatepreview from './components/Templatepreview';
// import Editor from './pages/Editor'; 


const App = () => {
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
          <Route path="/" element={<Home />} />
        <Route path="/select-website" element={<SelectWebsite />} />
        <Route path="/main-dashboard" element={<MainDashboard />} />
        <Route path="/create-website" element={<CreateWebsiteFlow />} />
        <Route path="/convert-site" element={<ConvertSite />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgotPassword" element={<OtpVerification />} />
          <Route path="/reset-password" element={<ResetPassword />} />


          <Route path="/editor" element={<Editor />} />
          <Route path="/editor/:id" element={<Editor />} />
          <Route path="/dashboardpreview/:templateId/:pageId" element={<Dashboardpreview />} />
          <Route path="/templatepreview/:templateId/:pageId" element={<Templatepreview />} />
          <Route path="/templatedetails/:id" element={<TemplateDetails />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/setting" element={<SettingsPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
        </Routes>
    </Router>
  );
};

export default App;
