import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EcommerceTemplate from './templates/ecommerce/page';
import PortfolioTemplate from './templates/portfolio/page';
import TemplatesPage from './pages/Template';
import ProfilePage from './pages/Profile';
import SettingsPage from './pages/Setting';
import DashboardPage from './dashboard/page';
import OtpVerification from './components/OtpVerification';
import ResetPassword from './components/ResetPassword';
import Editor from './pages/Editor';
// import Editor from './pages/Editor'; 


const App = () => {
 
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgotPassword" element={<OtpVerification />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/setting" element={<SettingsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/editor/:template?" element={<Editor />} />
          <Route path="/templates/ecommerce" element={<EcommerceTemplate />} />
          <Route path="/templates/portfolio" element={<PortfolioTemplate />} />
        </Routes>
    </Router>
  );
};

export default App;
