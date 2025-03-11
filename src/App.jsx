import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import EcommerceTemplate from './templates/ecommerce/page';
import PortfolioTemplate from './templates/portfolio/page';
import TemplatesPage from './pages/Template';
import ProfilePage from './pages/Profile';
import SettingsPage from './pages/Setting';


const App = () => {
 
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/setting" element={<SettingsPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/templates/ecommerce" element={<EcommerceTemplate />} />
          <Route path="/templates/portfolio" element={<PortfolioTemplate />} />
        </Routes>
    </Router>
  );
};

export default App;
