import { useEffect, useState } from 'react';
import  { Accordion, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { setUser } from "../../redux/userAction";

const HRVisaStatusManagement = () => {

    const user = sessionStorage.getItem('user');
    if (!user) {
        window.location.replace("/login");
    }
    else {
        setUser(JSON.parse(user));
    }

    const [users, setUsers] = useState([]);
    useEffect(() => {
        async function fetchUsers() {
            const res = await fetch('/profiles')
            res.json().then(data => setUsers(data))
        }
        fetchUsers()
    }, [])

    return (
        <div className="mt-3">
            <h3>Visa Status Management</h3>
                {users.map(user => (
                    <Accordion key={user._id}>
                        <Accordion.Item className="my-3">
                            <Accordion.Header>Name: {user.firstName + ' ' + user.lastName}</Accordion.Header>
                            <Accordion.Body>
                                <p>Status: {user.applicationStatus}</p>
                                <p>Name: {user.firstName + ' ' + user.lastName}</p>
                                <p>Visa: {user.visa.type}</p>
                                <p>Start Date: {user.visa.startDate ? user.visa.startDate.substr(0,10) : "" }</p>
                                <p>End Date: {user.visa.endDate ? user.visa.endDate.substr(0,10) : ""}</p>
                                <Button as={Link} to={`/visa/${user._id}`} state={{ user }} variant="outline-dark" className="btn-sm mb-3 ms-auto" >View Visa Status</Button>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                ))}
        </div>
    );
};

export default HRVisaStatusManagement;