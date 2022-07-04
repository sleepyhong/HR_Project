import { Accordion } from 'react-bootstrap';

function DiverLicense({user}){

    const {haveLicense,  number, expirationDate} = user.DriverLicense;
    const {brand, model, color} = user.car;

    return (
        <Accordion.Item eventKey="4">
            <Accordion.Header>Driver License & Car</Accordion.Header>
            <Accordion.Body>
                <p>Driver License: {haveLicense ? "YES" : "NO"}</p>
                <p>Number: {number}</p>
                <p>Expiration Date: {expirationDate ? expirationDate.substr(0,10) : ""}</p>
                <p>Car: {brand} {model} {color}</p>
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default DiverLicense;