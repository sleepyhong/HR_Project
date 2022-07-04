import { useState } from 'react';
import { Accordion, Form, Button } from 'react-bootstrap';

function I20({ user }) {

    const { opt } = user.visa

    const [I20Status, SetI20Status] = useState(opt.i_20)
    const [RejectMessage, SetRejectMessage] = useState("")
    const [showRejectedForm, setShowRejectedForm] = useState(false)

    function handleSubmit(e) {
        e.preventDefault();
        if (I20Status === "Rejected") {
            const I20 = {
                status: I20Status,
                message: RejectMessage,
            }

            fetch(`/visa/${user._id}/update-i20`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(I20)
            })
                .then(setShowRejectedForm(!showRejectedForm))

        } else if (I20Status === "Approved") {
            const I20 = {
                status: I20Status,
                message: "Approved, Your Visa Status Registration has been approved. Thank you"
            }
            fetch(`/visa/${user._id}/update-i20`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(I20)
            })
            // .then(
            //     fetch(`/visa/${user._id}/send-update`,{
            //         method:"POST",
            //         headers: {"Content-Type": "application/json"},
            //         body: JSON.stringify({
            //             userEmail: user.email,
            //             status: "Approved",
            //             message: "Approved, Next Step: Please upload your OPT EAD"
            //         })
            //     })
            // )
        }
        SetI20Status("")
        SetRejectMessage("")

    }

    return (
        <Accordion.Item eventKey={4}>
            <Accordion.Header>I20</Accordion.Header>
            <Accordion.Body>
                <p>I20 Status: {opt.i_20.status}</p>
                <p>Action: {opt.i_20.message}</p>
                <p>I-20 Document</p>

                <Form onSubmit={handleSubmit} className="mt-3">
                    <Form.Control as="select" defaultValue={I20Status} onChange={e => SetI20Status(e.target.value)}>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                    </Form.Control>

                    {I20Status === "Rejected" ? (
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

export default I20;