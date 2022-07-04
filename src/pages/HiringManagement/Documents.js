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
                    <a href={`../document/opt/opt_receipt/${user._id}.pdf`} download>OCT Receipt</a>
                </p>
                <p>
                    <a href={`../document/opt/opt_ead/${user._id}.pdf`} download>OCT EAD</a>
                </p>
                <p>
                    <a href={`../document/opt/i_983/${user._id}.pdf`} download>I 983</a>
                </p>
                <p>
                    <a href={`../document/opt/i_20/${user._id}.pdf`} download>I 20</a>
                </p>
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default Documents;