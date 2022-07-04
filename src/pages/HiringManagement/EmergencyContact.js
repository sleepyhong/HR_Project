import { Accordion } from 'react-bootstrap';

function EmergencyContact({user}){
    return (
        <Accordion.Item eventKey="6">
            <Accordion.Header>Emergency Contact</Accordion.Header>
            <Accordion.Body>
                {user.emergencyContact.map(contact => {
                    // const {firstName, lastName, middleName, phone, email, relationship } = contact;
                    <ul key={contact._id}>
                        <li>First Name: {contact.firstName}</li>
                        <li>Last Name: {contact.lastName}</li>
                        <li>Middle Name: {contact.middleName}</li>
                        <li>Phone: {contact.phone}</li>
                        <li>Email: {contact.email}</li>
                        <li>Relationship: {contact.relationship}</li>
                    </ul>
                })}
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default EmergencyContact;