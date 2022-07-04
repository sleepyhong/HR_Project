import { Route, Routes } from "react-router-dom";
import { Container } from 'react-bootstrap';

// Components
import Navbar from './component/Navbar/Navbar';
import { setUser } from "./redux/userAction";

// Pages
import EmployeeProfiles from "./pages/EmployeeProfiles/EmployeeProfiles";
import EmployeeDetail from "./pages/EmployeeProfiles/EmployeeDetail";
import HRHousingManagement from "./pages/HRHousingManagement/HRHousingManagement";
import NewHouseForm from "./pages/HRHousingManagement/NewHouseForm";
import EmployeeVisaStatusManagement from "./pages/EmployeeVisaStatusManagement";
import EmployeeHousingManagement from "./pages/EmployeeHousingManagement";
import HiringManagement from './pages/HiringManagement/HiringManagement';
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import OnboardingApplication from "./pages/OnboardingApplication";
import Report from "./pages/Report";
import PersonalInformation from "./pages/PersonalInformation";
import ApplicationReviewDetail from "./pages/HiringManagement/ApplicationReviewDetail"
import './App.css';

function App() {
  return (
    <Container>
      <Navbar />
      <Routes>
        <Route path="/">
          <Route path="application" element={<OnboardingApplication />} />
          <Route path="information" element={<PersonalInformation />} />
          <Route path="employee-visa" element={<EmployeeVisaStatusManagement />} />
          <Route path="employee-housing" element={<EmployeeHousingManagement />} />

          <Route path="profiles" element={<EmployeeProfiles />} />
          <Route path="profiles/:userId" element={<EmployeeDetail />} />
          <Route path="hr-housing" element={<HRHousingManagement />} />
          <Route path="housing/new" element={<NewHouseForm />} />
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
