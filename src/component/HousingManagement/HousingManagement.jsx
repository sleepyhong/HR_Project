import React, { useState } from "react";
import Accordion from 'react-bootstrap/Accordion';
import store from "../../redux/store";
import { setUser } from "../../redux/userAction";
import FacilityReport from "./FacilityReport";
import HouseDetail from "./HouseDetail";

export default function HousingManagement() {
    const user = sessionStorage.getItem('user');
    if (!user) {
        window.location.replace("/login");
    }
    else {
        setUser(JSON.parse(user));
    }

    return (
        <Accordion defaultActiveKey="0" alwaysOpen>
            <HouseDetail />
            <FacilityReport />
        </Accordion>
    );
}