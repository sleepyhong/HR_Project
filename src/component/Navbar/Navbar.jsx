import React, { useState } from "react";
import { useSelector } from 'react-redux';
import UserNavbar from "./UserNavbar";
import HRNavbar from "./HRNavbar";
import store from "../../redux/store";
import selectorUserType from '../../redux/selectors';

export default function Navbar() {
    const employeeType = useSelector(selectorUserType);
    const [employeeView, setEmployeeView] = useState(employeeType === "employee");

    return (
        <>
            {employeeView ? <UserNavbar /> : <HRNavbar />}
        </>
    );
}