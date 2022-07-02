import { useEffect, useState } from 'react';
import { Accordion, Button, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import HouseList from './HouseList';

const HRHousingManagement = () => {
    const [houses, setHouses] = useState([]);

    useEffect(() => {
        async function fetchHouses() {
            const res = await fetch('/houses')
            res.json().then(data => setHouses(data))
        }
        fetchHouses();
    }, [])

    return (
        <div>
            <h3 className="text-center mt-3">Housing Management</h3>
            <Stack direction="horizontal">
                <p className="text-secondary">Number of houses: {houses.length}</p>
                <Button as={Link} to="/housing/new" variant="outline-dark" className="btn-sm mb-3 ms-auto" >Add New House</Button>
            </Stack>
            
            <Accordion>
                {houses.map(house => < HouseList key={house._id} house={house} houses={houses} setHouses={setHouses} />)}
            </Accordion>
        </div>
    );
};

export default HRHousingManagement;
