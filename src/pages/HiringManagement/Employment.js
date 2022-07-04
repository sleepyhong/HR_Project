import { Accordion } from 'react-bootstrap';

function Employment({user}){

    const {title, startDate, endDate} = user.employment;
    return (
        <Accordion.Item eventKey="3">
            <Accordion.Header>Employment</Accordion.Header>
            <Accordion.Body>
                <p>Title: {title}</p>
                <p>Start Date: {startDate}</p>
                <p>End Date: {endDate}</p>
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default Employment;