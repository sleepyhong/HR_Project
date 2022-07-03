import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
import axios from "axios";
import store from "../../redux/store";
import { setUser } from "../../redux/userAction";

export default function Report() {
    const user = sessionStorage.getItem('user');
    if (!user) {
        window.location.replace("/login");
    }
    else {
        setUser(JSON.parse(user));
    }

    const { reportId } = useParams();
    const [report, setReport] = useState({});
    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios
            .post('/get-reports', { userId: store.getState()._id })
            .then((result) => {
                for (const otherReport of result.data.reports) {
                    if (otherReport._id === reportId) {
                        setReport(otherReport);
                    }
                }
            })
            .catch((error) => {
                console.log(error);
            });
        axios
            .post('/get-comments', { reportId: reportId })
            .then((result) => {
                setComments(result.data.comments);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const onComment = (event) => {
        event.preventDefault();

        const inputs = {
            reportId: reportId,
            userId: store.getState()._id
        }
        for (const element of event.target.elements) {
            inputs[element.name] = element.value;
        }

        axios
            .post('/comment', inputs)
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <>
            <h3>Report</h3>
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
                    <tr>
                        <td>{report.title}</td>
                        <td>{report.description}</td>
                        <td>{report.username}</td>
                        <td>{report.date}</td>
                        <td>{report.status}</td>
                    </tr>
                </tbody>
            </table>
            <h3>Comments</h3>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Created By</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        comments.map((comment) => {
                            console.log(comments)
                            return (
                                <tr>
                                    <td>{comment.description}</td>
                                    <td>{comment.username}</td>
                                    <td>{comment.date}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
            <form action="/comment" method="POST" onSubmit={onComment}>
                <textarea id="description" name="description" placeholder="Leave a comment..."></textarea>
                <button type="submit">Comment</button>
            </form>
        </>
    );
}