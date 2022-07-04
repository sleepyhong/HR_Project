import { Accordion } from 'react-bootstrap';

function Citizenship({user}){



    return (
        <Accordion.Item eventKey="1">
            <Accordion.Header>Work Authorization</Accordion.Header>
            <Accordion.Body>
                <p>Citizenship: {user.citizenship ? "YES" : "NO"}</p>
                <p>Visa:
                    <li>Type: {user.visa.type}</li>
                    <li>Start Date: {user.visa.startDate ? user.visa.startDate.substr(0,10) : ""}</li>
                    <li>End Date: {user.visa.endDate ? user.visa.endDate.substr(0,10) : ""}</li>
                </p>
                <p>Visa Status Management:
                    <li>OPT Receipt: {user.visa.opt.opt_receipt.status}</li>
                    <li>OPT EAD: {user.visa.opt.opt_ead.status}</li>
                    <li>I-983: {user.visa.opt.i_983.status}</li>
                    <li>I-20: {user.visa.opt.i_20.status}</li>
                </p>
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default Citizenship;