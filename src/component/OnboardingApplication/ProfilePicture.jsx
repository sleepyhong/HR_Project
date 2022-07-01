import React, { useState } from "react";
import store from "../../redux/store";
import { setUser } from "../../redux/userAction";
import Accordion from 'react-bootstrap/Accordion'

export default function ProfilePicture() {
    return (
        <Accordion.Item eventKey="1">
            <Accordion.Header>Profile Picture</Accordion.Header>
            <Accordion.Body>
                {
                    store.getState().applicationStatus === "Pending" ?
                        <img src={`./document/profile_pictures/${store.getState()._id}.png`} /> :
                        <>
                            <label for="profilePicture" class="form-label">Profile Picture</label>
                            <input type="file" id="profilePicture" name="profilePicture" class="form-control" accept="image/*" disabled={store.getState().applicationStatus === "Pending" || store.getState().applicationStatus === "Approved"} />
                        </>
                }
            </Accordion.Body>
        </Accordion.Item>
    )
}