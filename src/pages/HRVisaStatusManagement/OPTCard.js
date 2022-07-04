import { useState } from 'react';
import {Accordion, Form, Button } from 'react-bootstrap';

function OPTCard({user, setShowI983}){

    const {opt} = user.visa

    const [OPTCardStatus,SetOPTCardStatus] = useState(opt.opt_ead)
    const [OPTRejectMessage, SetOPTRejectMessage] = useState("")
    const [showRejectedForm, setShowRejectedForm] = useState(false)

    function handleSubmit(e){
        e.preventDefault();
        if(OPTCardStatus === "Rejected"){
            const optEAD = {
                status: OPTCardStatus,
                message: OPTRejectMessage,
            }

            fetch(`/visa/${user._id}/update-opt-ead`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(optEAD)
            })
            .then(setShowRejectedForm(!showRejectedForm))

        } else if (OPTCardStatus === "Approved") {
            const optEAD = {
                status: OPTCardStatus,
                message: "Approved, Next Step: Please upload your I-983 form"
            }
            fetch(`/visa/${user._id}/update-opt-ead`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(optEAD)
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
                .then(setShowI983(true))
        }
        SetOPTCardStatus("")
        SetOPTRejectMessage("")

    }

    return (
        <Accordion.Item eventKey={2}>
            <Accordion.Header>OPT EAD</Accordion.Header>
                <Accordion.Body>
                    <p>OPT EAD Status: {opt.opt_ead.status}</p>
                    <p>Action: {opt.opt_ead.message}</p>
                    <p>OPT EAD Document</p>

                    <Form onSubmit={handleSubmit} className="mt-3">
                        <Form.Control as="select" value={OPTCardStatus} onChange={e => SetOPTCardStatus(e.target.value)}>
                            <option>Status: {opt.opt_ead.status}</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                        </Form.Control>

                        {OPTCardStatus === "Rejected" ? (
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

export default OPTCard;