import { Accordion, ListGroup, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function EmployeeProfile({user}) {
    return (
        <Accordion.Item key={user._id} eventKey={user._id}>
            <Accordion.Header>Username: {user.username} - Full Name: {user.firstName + ' ' + user.lastName}</Accordion.Header>
            <Accordion.Body>
                <ListGroup variant="flush">
                    <p className="text-success">Summary Personal Information</p>
                    <Row>
                        <Col>
                            <ListGroup.Item>First name: {user.firstName}</ListGroup.Item>
                            <ListGroup.Item>Last name: {user.lastName}</ListGroup.Item>
                            <ListGroup.Item>Preferred name: {user.preferredName}</ListGroup.Item>
                        </Col>
                        <Col>
                            <ListGroup.Item>Cell Phone: {user.phoneNumber.cell}</ListGroup.Item>
                            <ListGroup.Item>Work Phone : {user.phoneNumber.work}</ListGroup.Item>
                            <ListGroup.Item>Email: {user.email}</ListGroup.Item>
                        </Col>
                        <Col>
                            <ListGroup.Item>Position Type: {user.type}</ListGroup.Item>
                            <ListGroup.Item>SSN: {user.ssn}</ListGroup.Item>
                            <ListGroup.Item>Work Authorization Title: {user.visa.type}</ListGroup.Item>
                        </Col>
                    </Row>
                </ListGroup>

                <Link to={user._id} state={{ user }}>Detail</Link>

            </Accordion.Body>
        </Accordion.Item>
    )
}

export default EmployeeProfile;