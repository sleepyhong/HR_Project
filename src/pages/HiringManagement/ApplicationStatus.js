import { Accordion } from 'react-bootstrap';

function ApplicationStatus({user}){

    return(
        <Accordion.Item eventKey="8">
            <Accordion.Header>Application Status</Accordion.Header>
            <Accordion.Body>
                <p>Application Status: {user.applicationStatus}</p>
                <p>{user.applicationStatus === "Rejected" ? `Rejected Reason: ${user.rejectedReason} `: null}</p>
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default ApplicationStatus;