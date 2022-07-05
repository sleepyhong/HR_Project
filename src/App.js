import { Route, Routes } from "react-router-dom";
import { Container } from 'react-bootstrap';

// Pages
import EmployeeProfiles from "./pages/EmployeeProfiles/EmployeeProfiles";
import EmployeeDetail from "./pages/EmployeeProfiles/EmployeeDetail";
import HRHousingManagement from "./pages/HRHousingManagement/HRHousingManagement";
import NewHouseForm from "./pages/HRHousingManagement/NewHouseForm";
import HRVisaStatusManagement from "./pages/HRVisaStatusManagement/HRVisaStatusManagement";
import VisaStatusReview from './pages/HRVisaStatusManagement/VisaStatusReview';
import EmployeeVisaStatusManagement from "./pages/EmployeeVisaStatusManagement";
import EmployeeHousingManagement from "./pages/EmployeeHousingManagement";
import HiringManagement from './pages/HiringManagement/HiringManagement';
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import OnboardingApplication from "./pages/OnboardingApplication";
import Report from "./pages/Report";
import PersonalInformation from "./pages/PersonalInformation";
import ApplicationReviewDetail from "./pages/HiringManagement/ApplicationReviewDetail";
import NotFound from "./pages/NotFound";
import './App.css';

function App() {
  if (!sessionStorage.getItem("user") && window.location.href !== "http://localhost:3001/login" && !window.location.href.includes("register")) {
    window.location.replace("/login");
  }

  return (
    <Container>
      <Routes>
        <Route path="/">
          <Route path="application" element={<OnboardingApplication />} />
          <Route path="information" element={<PersonalInformation />} />
          <Route path="employee-visa" element={<EmployeeVisaStatusManagement />} />
          <Route path="employee-housing" element={<EmployeeHousingManagement />} />

          <Route path="profiles" element={<EmployeeProfiles />} />
          <Route path="profiles/:userId" element={<EmployeeDetail />} />
          <Route path="visa" element={<HRVisaStatusManagement />} />
          <Route path="visa/:userId" element={<VisaStatusReview />} />
          <Route path="hr-housing" element={<HRHousingManagement />} />
          <Route path="housing/new" element={<NewHouseForm />} />
          <Route path="report/:reportId" element={<Report />} />
          <Route path="hiring" element={<HiringManagement />} />
          <Route path="application/:id" element={<ApplicationReviewDetail />} />

          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
          <Route path="register/:token" element={<Register />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Container>
  )
};

export default App;