import { useState } from 'react';
import {Form, Button, Alert, Container, Row, Col} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function NewHouseForm(){
    const navigate = useNavigate();
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [ formData, setFormData ] = useState({
        address:"",
        name:"",
        phone:"",
        email:"",
        bedroom:"",
        bathroom:"",
        table:"",
        chair:"",
        mattress:""
    })
    
    function handleChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        const newHouse = {
            address: formData.address,
            landlord: {
                fullName: formData.name,
                phoneNumber: formData.phone,
                email: formData.email
            },
            facility: {
                bed: formData.bedroom,
                bathroom: formData.bathroom,
                table: formData.table,
                chair: formData.chair,
                mattress: formData.mattress
            }
        }
        fetch("/add-house", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(newHouse)
        }).then(r => {
            setIsLoading(false);
            if(r.ok){
                r.json().then(navigate(-1))
            } else {
                r.json().then(err => setErrors(err.errors))
            }
        })

        setFormData({
            address:"",
            name:"",
            phone:"",
            email:"",
            bedroom:"",
            bathroom:"",
            table:"",
            chair:"",
            mattress:""
        })
    }

    return (
        <Container className="mt-3">
            <Row>
                <Col xs="auto"><Button className="mt-2 btn-sm" onClick={() => navigate(-1)} variant="outline-dark">Back</Button></Col>
                <Col><div className="text-center h3">Add New House</div></Col>
            </Row>
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control 
                    id="address" 
                    type="address" 
                    autoComplete="off"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Land Lord Name</Form.Label>
                <Form.Control 
                    id="name" 
                    type="text" 
                    autoComplete="off"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Land Lord Phone</Form.Label>
                <Form.Control 
                    id="phone" 
                    type="text" 
                    autoComplete="off"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Land Lord Email</Form.Label>
                <Form.Control 
                    id="email" 
                    type="email" 
                    autoComplete="off"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Number Of Bedroom</Form.Label>
                        <Form.Control 
                            id="bedroom" 
                            type="number" 
                            autoComplete="off"
                            name="bedroom"
                            value={formData.bedroom}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Number Of Bathroom</Form.Label>
                        <Form.Control 
                            id="bathroom" 
                            type="number" 
                            autoComplete="off"
                            name="bathroom"
                            value={formData.bathroom}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Number Of Table</Form.Label>
                        <Form.Control 
                            id="table" 
                            type="number" 
                            autoComplete="off"
                            name="table"
                            value={formData.table}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label>Number Of Chair</Form.Label>
                        <Form.Control 
                            id="chair" 
                            type="number" 
                            autoComplete="off"
                            name="chair"
                            value={formData.chair}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Number Of Mattress</Form.Label>
                        <Form.Control 
                            id="mattress" 
                            type="number" 
                            autoComplete="off"
                            name="mattress"
                            value={formData.mattress}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                </Col>
            </Row>
            <Button variant="dark" type="submit">{isLoading ? "Loading..." : "Add New House"}</Button>
            {errors.map(error => (
                <Alert className="mt-3" variant="danger" key={error}>{error}</Alert>
            ))}
        </Form>

        </Container>
    )
}

export default NewHouseForm;