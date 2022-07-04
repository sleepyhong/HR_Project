import { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import NewHiringForm from './NewHiringForm';
import HiringApplicationReviewForms from './HiringApplicationReviewForms';
import { setUser } from "../../redux/userAction";

const HiringManagement = () => {

    const user = sessionStorage.getItem('user');
    if (!user) {
        window.location.replace("/login");
    }
    else {
        setUser(JSON.parse(user));
    }

    const [showForm, setShowForm] = useState(false)

    return (
        <Container className="mt-3">
            <Button onClick={() => setShowForm(!showForm)} variant="outline-dark" className="btn-sm">New Employee</Button>
            {showForm ? <NewHiringForm setShowForm={setShowForm} /> : null}
            <HiringApplicationReviewForms />
        </Container>
    )
};

export default HiringManagement;