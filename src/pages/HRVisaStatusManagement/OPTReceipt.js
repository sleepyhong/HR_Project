import { useState } from 'react';
import { Accordion, Form, Button } from 'react-bootstrap';

function OPTReceipt({ user, setShowOPTCard }) {
    const { opt } = user.visa

    const [OPTReceiptStatus, SetOPTReceiptStatus] = useState(opt.opt_receipt.status)
    const [OPTRejectMessage, SetOPTRejectMessage] = useState("")
    const [showRejectedForm, setShowRejectedForm] = useState(false)

    function handleSubmit(e) {
        e.preventDefault();
        if (OPTReceiptStatus === "Rejected") {
            const optReceipt = {
                status: OPTReceiptStatus,
                message: OPTRejectMessage,
            }

            fetch(`/visa/${user._id}/update-opt-receipt`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(optReceipt)
            })
                .then(setShowRejectedForm(!showRejectedForm))

        } else if (OPTReceiptStatus === "Approved") {
            const optReceipt = {
                status: OPTReceiptStatus,
                message: "Approved, Next Step: Please upload your OPT EAD"
            }
            fetch(`/visa/${user._id}/update-opt-receipt`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(optReceipt)
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
                .then(setShowOPTCard(true))
        }
        SetOPTReceiptStatus("")
        SetOPTRejectMessage("")
    }

    return (
        <Accordion.Item eventKey={1}>
            <Accordion.Header>OPT Receipt</Accordion.Header>
            <Accordion.Body>
                <p>OPT Status: {opt.opt_receipt.status}</p>
                <p>Action: {opt.opt_receipt.message}</p>
                <p>Document</p>

                <Form onSubmit={handleSubmit} className="mt-3">
                    <Form.Control as="select" defaultValue={OPTReceiptStatus} onChange={e => SetOPTReceiptStatus(e.target.value)}>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                    </Form.Control>

                    {OPTReceiptStatus === "Rejected" ? (
                        <Form.Group className="mt-3" controlId="textarea">
                            <Form.Label>Rejected Reason</Form.Label>
                            <Form.Control value={OPTRejectMessage} onChange={e => SetOPTRejectMessage(e.target.value)} as="textarea" rows={3} />
                        </Form.Group>
                    ) : null}

                    <Button type="submit" className="btn btn-sm mt-3" variant="outline-dark">Submit</Button>
                </Form>
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default OPTReceipt;