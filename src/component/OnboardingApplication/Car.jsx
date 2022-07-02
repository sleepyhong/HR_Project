import React, { useState } from "react";
import store from "../../redux/store";
import Accordion from 'react-bootstrap/Accordion'

export default function Car() {
    return (
        <Accordion.Item eventKey="4">
            <Accordion.Header>Car Information</Accordion.Header>
            <Accordion.Body>
                <label htmlFor="brand" className="form-label">Brand</label>
                <input type="text" id="brand" name="brand" className="form-control" defaultValue={store.getState().car.brand} disabled={store.getState().applicationStatus === "Pending"} />
                <label htmlFor="model" className="form-label">Model</label>
                <input type="text" id="model" name="model" className="form-control" defaultValue={store.getState().car.model} disabled={store.getState().applicationStatus === "Pending"} />
                <label htmlFor="color" className="form-label">Color</label>
                <input type="text" id="color" name="color" className="form-control" defaultValue={store.getState().car.color} disabled={store.getState().applicationStatus === "Pending"} />
            </Accordion.Body>
        </Accordion.Item>
    )
}