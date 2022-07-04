import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { Container, Stack, Button, Accordion, Form } from 'react-bootstrap';
import Name from './Name';
import Citizenship from './Citizenship';
import AddressAndContactInfo from './AddressAndContactInfo';
import Employment from './Employment';
import DiverLicense from './DiverLicense';
import ReferenceContact from './ReferenceContact';
import EmergencyContact from './EmergencyContact';
import Documents from './Documents';
import ApplicationStatus from './ApplicationStatus';

function ApplicationReviewDetail() {
    const navigate = useNavigate();
    const location = useLocation()
    const { user } = location.state

    const [applicationStatus, setApplicationStatus] = useState(user.visa.opt.opt_receipt.status)
    const [rejectedReason, setRejectedReason] = useState("")

    const [showRejectedForm, setShowRejectedForm] = useState(false)

    function handleSubmit(e) {
        e.preventDefault();

        if (applicationStatus === "Rejected") {
            const updateApplication = user;
            updateApplication.visa.opt.opt_receipt = {
                status: applicationStatus,
                message: rejectedReason
            }
            fetch(`/application/${user._id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updateApplication)
            })
                .then(setShowRejectedForm(!showRejectedForm))
                .then(navigate(-1))

        } else {
            const updateApplication = user;
            updateApplication.visa.opt.opt_receipt = {
                status: applicationStatus
            }
            fetch(`/application/${user._id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updateApplication)
            })
                .then(navigate(-1))
        }
        setApplicationStatus("")
        setRejectedReason("")
    }

    return (
        <Container className="my-3">
            <Stack direction="horizontal">
                <Button className="mt-2 btn-sm" onClick={() => navigate(-1)} variant="outline-dark">Back</Button>
                <p className="text-danger ms-auto"> Status: {user.applicationStatus}</p>
            </Stack>
            <h3 className="text-dark text-center">Application: {user.firstName + ' ' + user.lastName}</h3>
            <Accordion>
                <Name user={user} />
                <Employment user={user} />
                <Citizenship user={user} />
                <AddressAndContactInfo user={user} />
                <DiverLicense user={user} />
                <ReferenceContact user={user} />
                <EmergencyContact user={user} />
                <Documents user={user} />
                <ApplicationStatus user={user} />
            </Accordion>
            <Form onSubmit={handleSubmit} className="mt-3">
                <Form.Control as="select" value={applicationStatus} onChange={e => setApplicationStatus(e.target.value)}>
                    <option value="Never_Submitted">Never Submitted</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                </Form.Control>

                {applicationStatus === "Rejected" ? (
                    <Form.Group className="mt-3" controlId="textarea">
                        <Form.Label>Rejected Reason</Form.Label>
                        <Form.Control value={rejectedReason} onChange={e => setRejectedReason(e.target.value)} as="textarea" rows={3} />
                    </Form.Group>

                ) : null}

                <Button type="submit" className="btn btn-sm mt-3" variant="outline-dark">Submit</Button>
            </Form>
        </Container>
    )
}

export default ApplicationReviewDetail;