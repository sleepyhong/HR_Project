import React, { useState } from "react";
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';

import store from "../../redux/store";

export default function Address() {
    const preUser = { ...store.getState() };
    const [disabled, setDisabled] = useState(true);
    const [address, setAddress] = useState(preUser.address);

    const onInputChange = (event) => {
        const newAddress = { ...preUser.address };
        newAddress[event.target.name] = event.target.value;
        setAddress({ ...newAddress });
    }

    const onEdit = () => {
        setDisabled(false);
    }

    const onCancel = () => {
        if (window.confirm("Do you want to discard all the changes?")) {
            setAddress({ ...preUser.address });
            setDisabled(true);
        }
    }

    return (
        <Accordion.Item eventKey="1">
            <Accordion.Header>Address</Accordion.Header>
            <Accordion.Body>
                <Form.Label htmlFor="building">Building/Apt #</Form.Label>
                <Form.Control type="text" id="building" name="building" value={address.building} disabled={disabled} onChange={onInputChange} />
                <Form.Label htmlFor="street">Street Name</Form.Label>
                <Form.Control type="text" id="street" name="street" value={address.street} disabled={disabled} onChange={onInputChange} />
                <Form.Label htmlFor="city">City</Form.Label>
                <Form.Control type="text" id="city" name="city" value={address.city} disabled={disabled} onChange={onInputChange} />
                <Form.Label htmlFor="state">State</Form.Label>
                <Form.Select id="state" name="state" value={address.state} disabled={disabled} onChange={onInputChange}>
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="DC">District Of Columbia</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                </Form.Select>
                <Form.Label htmlFor="zip">Zip</Form.Label>
                <Form.Control type="number" id="zip" name="zip" value={address.zip} disabled={disabled} onChange={onInputChange} />
                {
                    disabled ?
                        <button type="button" onClick={onEdit}>Edit</button> :
                        <>
                            <button type="button" onClick={onCancel}>Cancel</button>
                            <button type="submit">Save</button>
                        </>
                }
            </Accordion.Body>
        </Accordion.Item>
    );
}