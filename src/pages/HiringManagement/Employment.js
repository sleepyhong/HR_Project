import { Accordion } from 'react-bootstrap';

function Employment({user}){

    const {type, startDate, endDate} = user.visa;
    return (
        <Accordion.Item eventKey="3">
            <Accordion.Header>Employment</Accordion.Header>
            <Accordion.Body>
                <p>Title: {type}</p>
                <p>Start Date: {startDate ? startDate.substr() : ""}</p>
                <p>End Date: {endDate ? endDate.substr() : ""}</p>
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default Employment;