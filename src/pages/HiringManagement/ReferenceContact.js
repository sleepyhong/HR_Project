import { Accordion } from 'react-bootstrap';

function ReferenceContact({user}){
    const {firstName, lastName, middleName, phone, email, relationship} = user.referenceContact;
    
    return (
        <Accordion.Item eventKey="5">
            <Accordion.Header>Reference Contact</Accordion.Header>
            <Accordion.Body>
                <p>First Name: {firstName}</p>
                <p>Last Name: {lastName}</p>
                <p>Middle Name: {middleName}</p>
                <p>Phone: {phone}</p>
                <p>Email: {email}</p>
                <p>Relationship: {relationship}</p>
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default ReferenceContact;