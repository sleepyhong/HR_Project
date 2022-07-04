import { Route, Routes } from "react-router-dom";
import { Container } from 'react-bootstrap';

// Components
import Navbar from './component/Navbar/Navbar';
import { setUser } from "./redux/userAction";

// Pages
import HRAdminHome from './pages/HRAdminHome';
import EmployeeProfiles from "./pages/EmployeeProfiles/EmployeeProfiles";
import EmployeeDetail from "./pages/EmployeeProfiles/EmployeeDetail";
import HRHousingManagement from "./pages/HRHousingManagement/HRHousingManagement";
import NewHouseForm from "./pages/HRHousingManagement/NewHouseForm";
import VisaStatusManagement from "./pages/VisaStatusManagement";
import EmployeeVisaStatusManagement from "./pages/EmployeeVisaStatusManagement";
import EmployeeHousingManagement from "./pages/EmployeeHousingManagement";
import HiringManagement from './pages/HiringManagement';
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import OnboardingApplication from "./pages/OnboardingApplication";
import Report from "./pages/Report";
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
          <Route path="application" element={<OnboardingApplication />} />
          <Route path="information" element={<EmployeeProfiles />} />
          <Route path="visa" element={<VisaStatusManagement />} />
          <Route path="hr-housing" element={<HRHousingManagement />} />
          <Route path="housing/new" element={<NewHouseForm />} />
          <Route path="employee-visa" element={<EmployeeVisaStatusManagement />} />
          <Route path="employee-housing" element={<EmployeeHousingManagement />} />
          <Route path="report/:reportId" element={<Report />} />
          <Route path="hiring" element={<HiringManagement />} />
          <Route path="application/:id" element={<ApplicationReviewDetail />} />
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
          <Route path="register/:token" element={<Register />} />
        </Route>
      </Routes>
    </Container>
  )
};

export default App;
