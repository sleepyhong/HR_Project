import { Accordion } from 'react-bootstrap';

function Documents({user}){
    return (
        <Accordion.Item eventKey="7">
            <Accordion.Header>Documents</Accordion.Header>
            <Accordion.Body>
                <p>
                    <a href={`../document/driver_license/${user._id}.pdf`} download>Driver License</a>
                </p>
                <p>
                    <a href={`../document/oct/${user._id}.pdf`} download>OCT Receipt</a>
                </p>
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default Documents;