import { Accordion, Row, Col, Form, Figure } from 'react-bootstrap';

function Name({ user }) {
    return (
        <Accordion.Item eventKey="0">
            <Accordion.Header>Name</Accordion.Header>
            <Accordion.Body>
                <Row>
                    <Col className="d-flex justify-content-center">
                        <Figure className="m-auto">
                            <Figure.Image
                                width={400}
                                height={400}
                                alt="Avatar"
                                src={`../document/profile_pictures/${user._id}.png`} />
                            <Figure.Caption>{user.firstName + ' ' + user.lastName}</Figure.Caption>
                        </Figure>
                    </Col>
                    <Col xs={7}>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" value={user.firstName} readOnly />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control text="text" value={user.lastName} readOnly />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Middle Name</Form.Label>
                                <Form.Control text="text" value={user.middleName} readOnly />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Preferred Name</Form.Label>
                                <Form.Control text="text" value={user.preferredName} readOnly />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control text="text" value={user.email} readOnly />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control text="text" value={user.dateOfBirth} readOnly />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Preferred Name</Form.Label>
                                <Form.Control text="text" value={user.ssn} readOnly />
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Accordion.Body>
        </Accordion.Item>
    )
}
export default Name;