import React, { useState } from "react";
import Accordion from 'react-bootstrap/Accordion'

export default function Address() {
    return (
        <Accordion.Item eventKey="2">
            <Accordion.Header>Current Address</Accordion.Header>
            <Accordion.Body>
                <label for="building" class="form-label">Building/Apt #</label>
                <input type="text" id="building" name="building" class="form-control" />
                <label for="street" class="form-label">Street</label>
                <input type="text" id="street" name="street" class="form-control" required />
                <label for="city" class="form-label">City</label>
                <input type="text" id="city" name="city" class="form-control" required />
                <label for="state" class="form-label">State</label>
                <select id="state" name="state" class="form-control" required>
                    <option value="AL" select>Alabama</option>
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
                </select>
                <label for="zip" class="form-label">Zip Code</label>
                <input type="text" id="zip" name="zip" class="form-control" pattern="^(?(^00000(|-0000))|(\d{5}(|-\d{4})))$" placeholder="12345" required />
            </Accordion.Body>
        </Accordion.Item>
    )
}