import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

function NewHiringForm({setShowForm}){

    const [email, setEmail ] = useState("")

    function handleSubmit(e){
        e.preventDefault();
        fetch('/create-register-token', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ userEmail: email })
        }).then(r => {
            if(r.ok){
                r.json().then(setShowForm(false))
            }else{
                r.json().then(err => console.log(err))
            }
        })
    }

    return (
        <Form className="mt-3" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                    id="email" 
                    type="email" 
                    autoComplete="off"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </Form.Group>
            <Button type="submit" variant="outline-dark" className="btn-sm">Send</Button>
        </Form>
    )
}

export default NewHiringForm;