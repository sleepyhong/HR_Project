import React, { useState, useEffect } from "react";
import Accordion from 'react-bootstrap/Accordion';
import axios from "axios";
import store from "../../redux/store";
import { setUser } from "../../redux/userAction";

import OPTReceipt from "./OPTReceipt";
import OPTEAD from "./OPTEAD";
import I_983 from "./I_983";
import I_20 from "./I_20";

export default function EmployeeVisaStatusManagement() {
    const user = sessionStorage.getItem('user');
    if (!user) {
        window.location.replace("/login");
    }
    else {
        setUser(JSON.parse(user));
    }
    
    return (
        <Accordion defaultActiveKey="0">
            <OPTReceipt />
            {
                store.getState().visa.opt.opt_ead.status !== "Never_Submitted" ?
                    <OPTEAD /> :
                    <></>
            }
            {
                store.getState().visa.opt.i_983.status !== "Never_Submitted" ?
                    <I_983 /> :
                    <></>
            }
            {
                store.getState().visa.opt.i_20.status !== "Never_Submitted" ?
                    <I_20 /> :
                    <></>
            }
        </Accordion>
    );
}