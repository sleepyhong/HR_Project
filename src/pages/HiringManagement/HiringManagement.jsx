import { useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import NewHiringForm from './NewHiringForm';
import HiringApplicationReviewForms from './HiringApplicationReviewForms';

const HiringManagement = () => {

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