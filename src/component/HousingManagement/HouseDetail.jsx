import React, { useState, useEffect } from "react";
import Accordion from 'react-bootstrap/Accordion';
import axios from "axios";
import store from "../../redux/store";

export default function HouseDetail() {
    const [house, setHouse] = useState({});

    useEffect(() => {
        const inputs = {
            userId: store.getState()._id,
            houseId: store.getState().houseId
        }
        axios
            .post("/house", inputs)
            .then((result) => {
                setHouse(result.data.house);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    return (
        <Accordion.Item eventKey="0">
            <Accordion.Header>House Details</Accordion.Header>
            <Accordion.Body>
                <p>Address: {house.address}</p>
                <p>Residents</p>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            house.residents ?
                                house.residents.map((resident) => {
                                    return (
                                        <tr key={resident}>
                                            <td>{resident.userId.firstName}  {resident.userId.middleName} {resident.userId.lastName}</td>
                                            <td>{resident.userId.email}</td>
                                            <td>{resident.userId.phoneNumber.cell}</td>
                                        </tr>
                                    );
                                }) :
                                <>
                                </>
                        }
                    </tbody>
                </table>
            </Accordion.Body>
        </Accordion.Item>
    );
}