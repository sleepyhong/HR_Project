
import { Accordion, ListGroup, Button } from 'react-bootstrap';

function HouseList({house, houses, setHouses}) {
    function handleDelete(){
        console.log(house._id)
        fetch(`/delete-house/${house._id}`, {
            method: 'DELETE',
        }).then(r => {
            if(r.ok){
                r.json().then(setHouses(houses.filter(h => h._id !== house._id)))
            }
        })
    }

    console.log(house)
    return (
        <Accordion.Item key={house._id} eventKey={house._id}>
            <Accordion.Header>{house.address} - id: {house._id}</Accordion.Header>
            <Accordion.Body>
                <p>House Information: </p>
                <ListGroup variant="flush">
                    <ListGroup.Item>Address: {house.address}</ListGroup.Item>
                    <ListGroup.Item>Land Lord: {house.landlord.fullName} - Email: {house.landlord.email}</ListGroup.Item>
                    <ListGroup.Item>Bedroom: {house.facility.bed} - Bathroom: {house.facility.bathroom}</ListGroup.Item>
                    <ListGroup.Item>Chair: {house.facility.chair} - Table: {house.facility.table} - Mattress: {house.facility.mattress}</ListGroup.Item>
                </ListGroup>
                
                <p className="mt-3">Residents: </p>
                <ListGroup variant="flush">
                    {house.residents.map(resident => (
                        <div key={resident._id}>  
                            <ListGroup.Item className="mb-3">
                                <ListGroup variant="flush">
                                    <ListGroup.Item>Full Name: {resident.userId.firstName + " " + resident.userId.firstName}</ListGroup.Item>
                                    <ListGroup.Item>Cell Phone Name: {resident.userId.phoneNumber.cell}</ListGroup.Item>
                                    <ListGroup.Item>Email: {resident.userId.email}</ListGroup.Item>
                                </ListGroup>
                            </ListGroup.Item>
                        </div>
                    ))}
                </ListGroup>
                <p className="mt-3">Reports: </p>
                <ListGroup variant="flush">
                        {house.reports.map(report => (
                            <div key={report._id}>
                                <ListGroup.Item>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>Title: {report.reportId.title}</ListGroup.Item>
                                        <ListGroup.Item>Description: {report.reportId.description}</ListGroup.Item>
                                        <ListGroup.Item>Status: {report.reportId.status}</ListGroup.Item>
                                        <ListGroup.Item>Date: {report.reportId.date}</ListGroup.Item>
                                        <ListGroup.Item>Comments: {report.reportId.comments.map(comment => (<li key={comment._id}>{comment.description}</li>))}</ListGroup.Item>
                                    </ListGroup>
                                </ListGroup.Item>
                            </div>
                        ))}
                </ListGroup>



            <Button onClick={handleDelete} className="btn-sm mt-3" variant="outline-danger">Delete</Button>
            </Accordion.Body>
        </Accordion.Item>
    )
}
export default HouseList;