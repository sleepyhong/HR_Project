import { Accordion } from 'react-bootstrap';

function AddressAndContactInfo({user}){
    const {building, street, city, state, zip} = user.address;
    const {cell,work} = user.phoneNumber;
    return (
        <Accordion.Item eventKey="2">
            <Accordion.Header>Address and Contact Information</Accordion.Header>
            <Accordion.Body>
                <p>Address: {building+" "+street+" "+city+" "+state+" "+zip}</p>
                <p>Phone:
                    <li>Cell: {cell}</li>
                    <li>work {work}</li>
                </p>
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default AddressAndContactInfo;