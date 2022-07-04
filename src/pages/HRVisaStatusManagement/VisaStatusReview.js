import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { Container, Stack, Button, Accordion } from 'react-bootstrap';
import { setUser } from "../../redux/userAction";
import OPTReceipt from './OPTReceipt';
import OPTCard from './OPTCard';
import I983 from './I983';
import I20 from './I20';

function VisaStatusReview(){

    const loggedInUser = sessionStorage.getItem('user');
    if (!loggedInUser) {
        window.location.replace("/login");
    }
    else {
        setUser(JSON.parse(loggedInUser));
    }

    const navigate = useNavigate();
    const location = useLocation()
    const { user } = location.state

    const [showOPTCard, setShowOPTCard] = useState(user.visa.opt.opt_receipt.status === "Approved")
    const [showI983, setShowI983] = useState(user.visa.opt.opt_ead.status === "Approved")
    const [showI20, setShowI20] = useState(user.visa.opt.i_983.status === "Approved")
    
    return (
        <Container className="my-3">
            <Stack direction="horizontal">
                <Button className="mt-2 btn-sm" onClick={() => navigate(-1)} variant="outline-dark">Back</Button>
                <p className="text-danger ms-auto"> Status: {user.applicationStatus}</p>
            </Stack>
            <h3 className="text-dark text-center">Visa Status: {user.firstName + ' ' + user.lastName}</h3>
            <Accordion>
                <OPTReceipt user={user} setShowOPTCard={setShowOPTCard} showOPTCard={showOPTCard}/>
                {showOPTCard ? <OPTCard user={user} setShowI983={setShowI983}/> : null}
                {showI983 ? <I983 user={user} setShowI20={setShowI20}  /> : null}
                {showI20 ? <I20 user={user} /> : null}
            </Accordion>
        </Container>
    )
}

export default VisaStatusReview;