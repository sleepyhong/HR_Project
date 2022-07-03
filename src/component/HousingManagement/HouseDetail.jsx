import React, { useState, useEffect } from "react";
import Accordion from 'react-bootstrap/Accordion';
import axios from "axios";
import store from "../../redux/store";

export default function HouseDetail() {
    const [address, setAddress] = useState('');
    const [residents, setResidents] = useState([]);

    useEffect(() => {
        const inputs = {
            userId: store.getState()._id,
            houseId: store.getState().house
        }
        axios
            .post("/house", inputs)
            .then((result) => {
                setAddress(result.data.house.address);
                setResidents(result.data.residents);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);


    return (
        <Accordion.Item eventKey="0">
            <Accordion.Header>House Details</Accordion.Header>
            <Accordion.Body>
                <p>Address: {address}</p>
                <p>Residents</p>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {residents.map((resident) => {
                            return (
                                <tr>
                                    <td>{resident.firstName}  {resident.middleName} {resident.lastName}</td>
                                    <td>{resident.email}</td>
                                    <td>{resident.phoneNumber}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Accordion.Body>
        </Accordion.Item>
    );
}