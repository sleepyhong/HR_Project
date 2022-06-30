import { useLocation } from 'react-router-dom'
import { Container, Accordion, Row, Col, Figure, ListGroup} from 'react-bootstrap';

function EmployeeDetail () {
    const location = useLocation()
    const { user } = location.state

    console.log(user)
    return (
        <Container className="my-3">
            <h4>{user.firstName + ' ' + user.lastName}</h4>
            <Accordion defaultActiveKey={['0', '1', '2', '3', '4']} alwaysOpen>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Personal Information</Accordion.Header>
                    <Accordion.Body>
                        <Row>
                            <Col className="d-flex justify-content-center">
                                <Figure>
                                    <Figure.Image
                                        width={400}
                                        height={400}
                                        alt="Avatar"
                                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                                    />
                                    <Figure.Caption>
                                        {user.firstName + ' ' + user.lastName}
                                    </Figure.Caption>
                                </Figure>
                            </Col>
                            <Col xs={7}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>First name: {user.firstName}</ListGroup.Item>
                                    <ListGroup.Item>Last name: {user.lastName}</ListGroup.Item>
                                    <ListGroup.Item>Middle name: {user.middleName ? user.middleName : 'no middle name'}</ListGroup.Item>
                                    <ListGroup.Item>Email: {user.email}</ListGroup.Item>
                                    <ListGroup.Item>SSN: {user.ssn}</ListGroup.Item>
                                    <ListGroup.Item>Date of Birth: {user.dateOfBirth}</ListGroup.Item>
                                    <ListGroup.Item>Gender: {user.gender}</ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row>
                    </Accordion.Body>   
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                    <Accordion.Header>Address and Contact Information</Accordion.Header>
                    <Accordion.Body>
                        <Row>
                            <Col>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>Address: {user.address.building}, {user.address.street}</ListGroup.Item>
                                    <ListGroup.Item>{user.address.city}, {user.address.state}, {user.address.zip}</ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>Cell Phone: {user.phoneNumber.cell}</ListGroup.Item>
                                    <ListGroup.Item>Work Phone: {user.phoneNumber.work}</ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row>
                    </Accordion.Body>   
                </Accordion.Item>

                <Accordion.Item eventKey="2">
                    <Accordion.Header>Employment</Accordion.Header>
                    <Accordion.Body>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Visa Status: {user.visa.type}</ListGroup.Item>
                            <ListGroup.Item>Start Date: {user.visa.startDate} - End Date: {user.visa.endDate}</ListGroup.Item>
                        </ListGroup>
                    </Accordion.Body>   
                </Accordion.Item>


                <Accordion.Item eventKey="3">
                    <Accordion.Header>Emergency contact</Accordion.Header>
                    <Accordion.Body>
                        <Row>
                            <Col>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>First Name: {user.referenceContact.firstName}</ListGroup.Item>
                                    <ListGroup.Item>Middle Name: {user.referenceContact.middleName}</ListGroup.Item>
                                    <ListGroup.Item>Last Name: {user.referenceContact.lastName}</ListGroup.Item>
                                </ListGroup>
                            </Col>
                            <Col>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>Email: {user.referenceContact.email}</ListGroup.Item>
                                    <ListGroup.Item>Phone: {user.referenceContact.phone}</ListGroup.Item>
                                    <ListGroup.Item>Relationship: {user.referenceContact.relationship}</ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row>
                    </Accordion.Body>   
                </Accordion.Item>

                <Accordion.Item eventKey="4">
                    <Accordion.Header>Documents</Accordion.Header>
                    <Accordion.Body>
                        <p>i. The list of uploaded documents (driver’s license, work authorization).</p>
                        <p>ii. They should be able to download each document.</p>
                        <p>iii. They should be able to open a preview of the document in the browser.</p>
                    </Accordion.Body>   
                </Accordion.Item>

            </Accordion>
        </Container>
    )
}

export default EmployeeDetail;