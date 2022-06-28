import { Route, Routes } from "react-router-dom";
import { Container } from 'react-bootstrap';

// Components
import Navbar from './component/Navbar/Navbar';
import Login from "./component/Login/Login";

// Pages
import HRAdminHome from './pages/HRAdminHome';
import EmployeeProfiles from "./pages/EmployeeProfiles";
import VisaStatusManagement from "./pages/VisaStatusManagement";
import HousingManagement from "./pages/HousingManagement";
import HiringManagement from './pages/HiringManagement';

import Logout from "./pages/Logout";

function App() {
  return (
    <Container>
      <Navbar />
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
  )
};

export default App;
