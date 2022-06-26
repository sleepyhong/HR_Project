import React, { useState } from "react";
import UserNavbar from "./UserNavbar";
import HRNavbar from "./HRNavbar";

export default function Navbar() {
    const [employeeView, setEmployeeView] = useState(false);

    return (
        <div>
            <UserNavbar />
            <HRNavbar />
        </div>
    );
}