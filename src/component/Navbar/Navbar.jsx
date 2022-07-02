import React, { useState } from "react";
import EmployeeNavbar from "./EmployeeNavbar";
import HRNavbar from "./HRNavbar";
import store from "../../redux/store";

export default function Navbar() {
    const accountType = store.getState().type;
    const [viewState, setViewState] = useState({
        employeeView: !accountType || accountType === "employee",
        loggedIn: sessionStorage.getItem("user") ? false : true
    });

    store.subscribe(() => {
        changeViewState();
    });

    const changeViewState = () => {
        setViewState({
            employeeView: store.getState().type === "employee",
            loggedIn: sessionStorage.getItem("user") ? false : true
        });
    }

    return (
        <>
            {/* {viewState.employeeView ? <EmployeeNavbar /> : <HRNavbar />} */}
            <HRNavbar />
        </>
    );
}