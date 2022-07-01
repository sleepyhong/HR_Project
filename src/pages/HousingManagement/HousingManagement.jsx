import { useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';

const Housing = () => {
    const [houses, setHouses] = useState([]);

    useEffect(() => {
        async function fetchHouses() {
            const res = await fetch('/houses')
            res.json().then(data => setHouses(data))
        }
        fetchHouses();
    }, [])

    console.log(houses)

    return (
        <div>
            <h3 className="text-center mt-3">Housing Management</h3>
            <p className="text-secondary">Number of houses: {houses.length}</p>
            <Accordion>
                
            </Accordion>
        </div>
    );
};

export default Housing;
