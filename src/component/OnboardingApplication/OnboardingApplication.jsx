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

export default function OnboardingApplication() {
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
        
        const files = new FormData();
        files.append('userId', userInfo._id);
        for (let element of event.target.elements) {
            if (element.type === "file") {
                files.append(element.name, element.files[0]);
            }
            else {
                inputs[element.name] = element.value;
            }
        }

        axios
            .post("/application/document", files)
            .then((result) => {
                console.log(result)
            })
            .catch((error) => {
                console.log(error)
            });

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
                    <h3>Please wait for HR to review your application.</h3>
                    <Accordion defaultActiveKey="0" alwaysOpen>
                        <form>
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
                        </form>
                        <p>{userInfo.msg}</p>
                    </Accordion>
                </>
            );
        case "Rejected":
            return (
                <>
                    <h3>Your application has been rejected.</h3>
                    <p>Reason: {userInfo.rejectedReason}</p>
                </>
            );
        case "Approved":
            window.location.replace('/home');
        default:
            break;
    }
}