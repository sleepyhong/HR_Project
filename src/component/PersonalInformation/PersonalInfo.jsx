import React, { useState } from "react";
import store from "../../redux/store";
import { setUser } from "../../redux/userAction";
import axios from "axios";
import Accordion from 'react-bootstrap/Accordion'

import Name from './Name'
import ProfilePicture from "./ProfilePicture";
import Address from "./Address";
import PhoneNumber from "./PhoneNumber";
import Email from "./Email";
import Personal from "./Personal";
import Citizenship from "./Citizenship";
import DriverLicense from "./DriverLicense";
import Emergency from "./Emergency";

export default function PersonalInfo() {

    const user = sessionStorage.getItem('user');
    if (!user) {
        window.location.replace("/login");
    }
    else {
        setUser(JSON.parse(user));
    }

    const [userInfo, setUserInfo] = useState({ 
        ...store.getState(),
        msg: null
    });

    function updateInformation(event) {
        event.preventDefault();

        //

    }

    return (
        <Accordion defaultActiveKey="0" alwaysOpen>
            <form action="/personalinformation" method="POST" onSubmit={updateInformation}>

                <Name />
                <ProfilePicture />
                <Address />
                <PhoneNumber />
                <Email />
                <Personal />
                <Citizenship />
                <DriverLicense />
                <Emergency />
                
                <button type="submit">Submit</button>
            </form>
        </Accordion>
    )
}

//should have component links to all of the individual input field components

//should have an update/save (instead of submit) button to save all current fields into DB