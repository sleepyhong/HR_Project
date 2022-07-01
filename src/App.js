import { Route, Routes } from "react-router-dom";
import { Container } from 'react-bootstrap';

// Components
import Navbar from './component/Navbar/Navbar';

// Pages
import HRAdminHome from './pages/HRAdminHome';
import EmployeeProfiles from "./pages/EmployeeProfiles/EmployeeProfiles";
import EmployeeDetail from "./pages/EmployeeProfiles/EmployeeDetail";
import VisaStatusManagement from "./pages/VisaStatusManagement";
import HousingManagement from "./pages/HousingManagement";
import HiringManagement from './pages/HiringManagement';
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import OnboardingApplication from "./pages/OnboardingApplication";
import './App.css';

function App() {
  return (
    <Container>
      <Navbar />
      <Routes>
        <Route path="/">
          <Route index element={<HRAdminHome />} />
          <Route path="profiles" element={<EmployeeProfiles />} />
          <Route path="profiles/:userId" element={<EmployeeDetail />} />
          <Route path="application" element={<OnboardingApplication />}/>
          <Route path="information" element={<EmployeeProfiles />} />
          <Route path="visa" element={<VisaStatusManagement />} />
          <Route path="housing" element={<HousingManagement />} />
          <Route path="hiring" element={<HiringManagement />} />
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
          <Route path="register/:token" element={<Register />} />
        </Route>
      </Routes>
    </Container>
  )
};

export default App;
