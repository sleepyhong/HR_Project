import React, { useState } from "react";
import EmployeeNavbar from "./EmployeeNavbar";
import HRNavbar from "./HRNavbar";
import store from "../../redux/store";
import { setUser } from "../../redux/userAction";

export default function Navbar() {
    const user = sessionStorage.getItem("user");
    const [viewState, setViewState] = useState({
        employeeView: !user || JSON.parse(user).type === "employee",
        loggedIn: sessionStorage.getItem("user") ? true : false
    });

    store.subscribe(() => {
        changeViewState();
    });

    const changeViewState = () => {
        setViewState({
            employeeView: JSON.parse(sessionStorage.getItem("user")).type === "employee",
            loggedIn: sessionStorage.getItem("user") ? true : false
        });
    }

    return (
        <>
            {viewState.employeeView ? <EmployeeNavbar /> : <HRNavbar />}
        </>
    );
}