import { Route, Routes } from "react-router-dom";

// Pages
import HRAdminHome from './pages/HRAdminHome';
import EmployeeProfiles from "./pages/EmployeeProfiles";
import VisaStatusManagement from "./pages/VisaStatusManagement";
import HousingManagement from "./pages/HousingManagement";
import HiringManagement from './pages/HiringManagement';
import Login from "./pages/Login";
import Logout from "./pages/Logout";

// Bootstrap helper components
import {Container} from 'react-bootstrap';

// Components
import HRAdminNavBar from './components/NavBar/HRAdminNavBar';

function App() {
  return (
    <Container fluid="md" className="mt-3">

      {/* HR Admin NavBar */}
      <HRAdminNavBar />

      <Routes>
        <Route path="/">
        <Route index element={<HRAdminHome />} />
        <Route path="information" element={<EmployeeProfiles />} />
        <Route path="visa" element={<VisaStatusManagement />} />
        <Route path="housing" element={<HousingManagement />} />
        <Route path="hiring" element={<HiringManagement />} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
