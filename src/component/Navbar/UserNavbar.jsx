import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from '../../pages/Home';
import PersonalInformation from "../../pages/PersonalInformation";
import VisaStatusManagement from "../../pages/VisaStatusManagement";
import Housing from "../../pages/Housing";
import Login from "../../component/Login/Login";
import Logout from "../../pages/Logout";

export default function UserNavbar() {
    return (
        <>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/information">Personal Information</Link>
                <Link to="/visa">Visa Status Management</Link>
                <Link to="/housing">Housing</Link>
                <Link to="/login">Login</Link>
                <Link to="/logout">Logout</Link>
            </nav>
            <Routes>
                <Route path="/">
                    <Route index element={<Home />} />
                    <Route path="information" element={<PersonalInformation />} />
                    <Route path="visa" element={<VisaStatusManagement />} />
                    <Route path="housing" element={<Housing />} />
                    <Route path="login" element={<Login />} />
                    <Route path="logout" element={<Logout />} />
                </Route>
            </Routes>
        </>
    );
}