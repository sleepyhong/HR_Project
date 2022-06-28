import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from '../../pages/Home';
import EmployeeProfiles from '../../pages/EmployeeProfiles';
import HRVisaStatusManagement from '../../pages/HRVisaStatusManagement';
import HiringManagement from '../../pages/HiringManagement';
import HousingManagement from '../../pages/HousingManagement';
import Login from "../../component/Login/Login";
import Logout from "../../pages/Logout"

export default function HRNavbar() {
    return (
        <>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/employee">Employee Profiles</Link>
                <Link to="/hrvisa">Visa Status Management</Link>
                <Link to="/hiringmanagement"> Hiring Management</Link>
                <Link to="/housingmanagement">Housing Management</Link>
                {sessionStorage.getItem('user') ?
                    <Link to="/logout">Logout</Link> :
                    <Link to="/login">Login</Link>
                }
            </nav>
            <Routes>
                <Route path="/">
                    <Route index element={<Home />} />
                    <Route path="employee" element={<EmployeeProfiles />} />
                    <Route path="hrvisa" element={<HRVisaStatusManagement />} />
                    <Route path="hiringmanagement" element={<HiringManagement />} />
                    <Route path="housingmanagement" element={<HousingManagement />} />
                    <Route path="login" element={<Login />} />
                    <Route path="logout" element={<Logout />} />
                </Route>
            </Routes>
        </>
    );
}