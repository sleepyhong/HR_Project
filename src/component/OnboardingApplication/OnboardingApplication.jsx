import React, { useState } from "react";
import store from "../../redux/store";
import { setUser } from "../../redux/userAction";
import axios from "axios";
import Accordion from 'react-bootstrap/Accordion'
import Name from "./Name";
import ProfilePicture from "./ProfilePicture";
import Address from "./Address";
import PhoneNumber from "./PhoneNumber";
import Car from "./Car";
import Email from "./Email";
import Personal from "./Personal";
import Citizenship from "./Citizenship";
import DriverLicense from "./DriverLicense";
import Reference from "./Reference";
import Emergency from "./Emergency";

export default function Navbar() {
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

    function submitApplication(event) {
        event.preventDefault();
        const inputs = {
            userId: userInfo._id
        };

        for (let element of event.target.elements) {
            inputs[element.name] = element.value;
        }

        axios
            .post("/application", inputs)
            .then((result) => {
                setUser(result.data.user);
                setUserInfo({
                    ...store.getState(),
                    msg: null
                });
            })
            .catch((error) => {
                const newUserInfo = {
                    ...userInfo
                }
                newUserInfo.msg = error.response.data.msg

                setUserInfo(newUserInfo);
            });
    }

    switch (userInfo.applicationStatus) {
        case "Never_Submitted":
            return (
                <Accordion defaultActiveKey="0" alwaysOpen>
                    <form action="/application" method="POST" onSubmit={submitApplication}>
                        <Name />
                        <ProfilePicture />
                        <Address />
                        <PhoneNumber />
                        <Car />
                        <Email />
                        <Personal />
                        <Citizenship />
                        <DriverLicense />
                        <Reference />
                        <Emergency />
                        <button type="submit">Submit</button>
                    </form>
                    <p>{userInfo.msg}</p>
                </Accordion>
            );
        case "Pending":
            return (
                <>
                    <h3>Please wait for HR to review your application</h3>
                    <Accordion defaultActiveKey="0" alwaysOpen>
                        <form action="/application" method="POST" onSubmit={submitApplication}>
                            <Name />
                            <ProfilePicture />
                            <Address />
                            <PhoneNumber />
                            <Car />
                            <Email />
                            <Personal />
                            <Citizenship />
                            <DriverLicense />
                            <Reference />
                            <Emergency />
                            {
                                store.getState().applicationStatus === "Pending" ?
                                    <>
                                    </> :
                                    <button type="submit">Submit</button>
                            }
                        </form>
                        <p>{userInfo.msg}</p>
                    </Accordion>
                </>
            )
        default:
            break;
    }
}