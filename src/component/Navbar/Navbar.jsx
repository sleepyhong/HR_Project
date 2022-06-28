import React, { useState } from "react";
import { useSelector } from 'react-redux';
import UserNavbar from "./UserNavbar";
import HRNavbar from "./HRNavbar";
import store from "../../redux/store";
import selectorUserType from '../../redux/selectors';

export default function Navbar() {
    const [employeeView, setEmployeeView] = useState(store.getState().type === "employee");

    store.subscribe(() => {
        changeEmployeeView();
    });

    const changeEmployeeView = () => {
        setEmployeeView(store.getState().type === "employee");
    }

    return (
        <>
            {employeeView ? <UserNavbar /> : <HRNavbar />}
        </>
    );
}