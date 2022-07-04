import { Accordion } from 'react-bootstrap';

function EmergencyContact({user}){
    return (
        <Accordion.Item eventKey="6">
            <Accordion.Header>Emergency Contact</Accordion.Header>
            <Accordion.Body>
                {user.emergencyContact.map(contact => (
                    <div key={user._id}>
                        <p>First Name: {contact.firstName}</p>
                        <p>Last Name: {contact.lastName}</p>
                        <p>Middle Name: {contact.middleName}</p>
                        <p>Phone: {contact.phone}</p>
                        <p>Email: {contact.email}</p>
                        <p>Relationship: {contact.relationship}</p>
                    </div>
                    ))}
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default EmergencyContact;