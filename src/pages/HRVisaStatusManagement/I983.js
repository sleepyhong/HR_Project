import { useState } from 'react';
import { Accordion, Form, Button } from 'react-bootstrap';

function I983({ user, setShowI20 }) {

    const { opt } = user.visa

    const [I983Status, SetI983Status] = useState(opt.i_983)
    const [RejectMessage, SetRejectMessage] = useState("")
    const [showRejectedForm, setShowRejectedForm] = useState(false)

    function handleSubmit(e) {
        e.preventDefault();
        if (I983Status === "Rejected") {
            const I983 = {
                status: I983Status,
                message: RejectMessage,
            }

            fetch(`/visa/${user._id}/update-i983`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(I983)
            })
                .then(setShowRejectedForm(!showRejectedForm))

        } else if (I983Status === "Approved") {
            const I983 = {
                status: I983Status,
                message: "Approved, Next Step: Please upload your I20"
            }
            fetch(`/visa/${user._id}/update-i983`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(I983)
            })
                .then(
                    fetch(`/visa/${user._id}/send-update`,{
                        method:"POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({
                            userEmail: user.email,
                            status: "Approved",
                            message: "Approved, Next Step: Please upload your OPT EAD"
                        })
                    })
                )
                .then(setShowI20(true))
        }
        SetI983Status("")
        SetRejectMessage("")

    }

    return (
        <Accordion.Item eventKey={3}>
            <Accordion.Header>I 983 Form</Accordion.Header>
            <Accordion.Body>
                <p>I-983 Status: {opt.i_983.status}</p>
                <p>Action: {opt.i_983.message}</p>
                <p>I-983 Document</p>

                <Form onSubmit={handleSubmit} className="mt-3">
                    <Form.Control as="select" defaultValue={I983Status} onChange={e => SetI983Status(e.target.value)}>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                    </Form.Control>

                    {I983Status === "Rejected" ? (
                        <Form.Group className="mt-3" controlId="textarea">
                            <Form.Label>Rejected Reason</Form.Label>
                            <Form.Control value={RejectMessage} onChange={e => SetRejectMessage(e.target.value)} as="textarea" rows={3} />
                        </Form.Group>
                    ) : null}

                    <Button type="submit" className="btn btn-sm mt-3" variant="outline-dark">Submit</Button>
                </Form>
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default I983;