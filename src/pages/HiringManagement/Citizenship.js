import { Accordion } from 'react-bootstrap';

function Citizenship({user}){
    return (
        <Accordion.Item eventKey="1">
            <Accordion.Header>Work Authorization</Accordion.Header>
            <Accordion.Body>
                <p>Citizenship: {user.citizenship ? "YES" : "NO"}</p>
                <p>Visa:
                    <li>Type: {user.visa.type}</li>
                    <li>Start Date: {user.visa.startDate}</li>
                    <li>End Date: {user.visa.endDate}</li>
                </p>
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default Citizenship;