import { useEffect, useState } from 'react';
import  { Accordion, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function HiringApplicationReviewForms(){
    const [users, setUsers] = useState([]);
    useEffect(() => {
        async function fetchUsers() {
            const res = await fetch('/profiles')
            res.json().then(data => setUsers(data))
        }
        fetchUsers()
    }, [])


    // console.log(users);

    return (
        <div className="mt-3">
                {users.map(user => (
                    <Accordion key={user._id}>
                        <Accordion.Item className="my-3">
                            <Accordion.Header>Name: {user.firstName + ' ' + user.lastName}</Accordion.Header>
                            <Accordion.Body>
                                <p>Status: {user.applicationStatus}</p>
                                <p>Name: {user.firstName + ' ' + user.lastName}</p>
                                <p>email: {user.email}</p>
                                <Button as={Link} to={`/application/${user._id}`} state={{ user }} variant="outline-dark" className="btn-sm mb-3 ms-auto" >View Application</Button>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                ))}
        </div>
    )
}

export default HiringApplicationReviewForms;