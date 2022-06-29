import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Navbar from './component/Navbar/Navbar';
import HRAdminHome from './pages/HRAdminHome';
import EmployeeProfiles from "./pages/EmployeeProfiles";
import VisaStatusManagement from "./pages/VisaStatusManagement";
import HousingManagement from "./pages/HousingManagement";
import HiringManagement from './pages/HiringManagement';
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import './App.css';

function App() {
  return (
    <div className="App">
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
          <Route path="register/:token" element={<Register />} />
        </Route>
      </Routes>
    </div>
  )
};

export default App;
