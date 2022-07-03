import React, { useState, useEffect } from "react";
import Accordion from 'react-bootstrap/Accordion';
import axios from "axios";
import store from "../../redux/store";

export default function FacilityReport() {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        axios
            .post('/get-reports', { userId: store.getState()._id })
            .then((result) => {
                setReports(result.data.reports);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const onReportSubmit = (event) => {
        event.preventDefault();

        const inputs = {
            userId: store.getState()._id
        };
        for (let element of event.target.elements) {
            inputs[element.name] = element.value;
        }

        axios
            .post('/report', inputs)
            .catch((error) => {
                console.log(error);
            })
    };

    return (
        <Accordion.Item eventKey="1">
            <Accordion.Header>Facility Report</Accordion.Header>
            <Accordion.Body>
                <Accordion defaultActiveKey="0" alwaysOpen>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Creating a Facility Report</Accordion.Header>
                        <Accordion.Body>
                            <form action="/report" method="POST" onSubmit={onReportSubmit}>
                                <div class="form-outline mb-4">
                                    <label for="title" class="form-label">Title</label>
                                    <input type="text" id="title" name="title" class="form-control" />
                                </div>
                                <div class="form-outline mb-4">
                                    <label for="description" class="form-label">Description</label>
                                    <textarea id="description" name="description" class="form-control" />
                                </div>
                                <button type="submit">Report</button>
                            </form>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Previous Reports</Accordion.Header>
                        <Accordion.Body>
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                        <th>Created By</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        reports.map((report) => {
                                            return (
                                                <tr>
                                                    <td><a href={`/report/${report._id}`}>{report.title}</a></td>
                                                    <td>{report.description}</td>
                                                    <td>{report.username}</td>
                                                    <td>{report.date}</td>
                                                    <td>{report.status}</td>
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Accordion.Body>
        </Accordion.Item>
    );
}