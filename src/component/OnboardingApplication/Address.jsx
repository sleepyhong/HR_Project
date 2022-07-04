import React from "react";
import store from "../../redux/store";
import Accordion from 'react-bootstrap/Accordion'

export default function Address() {
    return (
        <Accordion.Item eventKey="2">
            <Accordion.Header>Current Address</Accordion.Header>
            <Accordion.Body>
                <label htmlFor="building" className="form-label">Building/Apt #</label>
                <input type="text" id="building" name="building" className="form-control" defaultValue={store.getState().address.building} disabled={store.getState().applicationStatus === "Pending"} />
                <label htmlFor="street" className="form-label">Street</label>
                <input type="text" id="street" name="street" className="form-control" required defaultValue={store.getState().address.street} disabled={store.getState().applicationStatus === "Pending"} />
                <label htmlFor="city" className="form-label">City</label>
                <input type="text" id="city" name="city" className="form-control" required defaultValue={store.getState().address.city} disabled={store.getState().applicationStatus === "Pending"} />
                <label htmlFor="state" className="form-label">State</label>
                <select id="state" name="state" className="form-control" required defaultValue={store.getState().address.state} disabled={store.getState().applicationStatus === "Pending"}>
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
                </select>
                <label htmlFor="zip" className="form-label">Zip Code</label>
                <input type="text" id="zip" name="zip" className="form-control" pattern="^(?(^00000(|-0000))|(\d{5}(|-\d{4})))$" placeholder="12345" required defaultValue={store.getState().address.zip} disabled={store.getState().applicationStatus === "Pending"} />
            </Accordion.Body>
        </Accordion.Item>
    )
}