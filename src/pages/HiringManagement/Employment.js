import { Accordion } from 'react-bootstrap';

function Employment({user}){

    const {title, startDate, endDate} = user.employment;
    return (
        <Accordion.Item eventKey="3">
            <Accordion.Header>Employment</Accordion.Header>
            <Accordion.Body>
                <p>Title: {title}</p>
                <p>Start Date: {startDate ? startDate.substr(0,10) : ""}</p>
                <p>End Date: {endDate ? endDate.substr(0,10) : ""}</p>
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default Employment;