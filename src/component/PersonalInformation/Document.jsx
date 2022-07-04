import React, { useState, useEffect } from "react";
import Accordion from 'react-bootstrap/Accordion';
import store from "../../redux/store";

export default function Document() {
    const [previewDL, setPreviewDL] = useState(false);
    const [previewOR, setPreviewOR] = useState(false);
    const [previewOE, setPreviewOE] = useState(false);
    const [previewI983, setPreviewI983] = useState(false);
    const [previewI20, setPreviewI20] = useState(false);

    const onDL = () => {
        setPreviewDL(!previewDL);
    }
    const onOR = () => {
        setPreviewOR(!previewOR);
    }
    const onOE = () => {
        setPreviewOE(!previewOE);
    }
    const onI983 = () => {
        setPreviewI983(!previewI983);
    }
    const onI20 = () => {
        setPreviewI20(!previewI20);
    }

    return (
        <Accordion.Item eventKey="5">
            <Accordion.Header>Your Documents</Accordion.Header>
            <Accordion.Body>
                {
                    store.getState().driverLicense.haveLicense ?
                        <p>
                            <a href={`./document/driver_license/${store.getState()._id}.pdf`} download>Driver License</a>
                            <button onClick={onDL}>Preview</button>
                        </p> :
                        <></>
                }
                {
                    previewDL ?
                        <embed type="application/pdf" src={`./document/driver_license/${store.getState()._id}.pdf`} width="648" height="837" /> :
                        <></>
                }

                {
                    store.getState().visa.opt.opt_receipt.status === "Approved" ?
                        <p>
                            <a href={`./document/opt/opt_receipt/${store.getState()._id}.pdf`} download>OPT Receipt</a>
                            <button onClick={onOR}>Preview</button>
                        </p> :
                        <></>
                }
                {
                    previewOR ?
                        <embed type="application/pdf" src={`./document/opt/opt_receipt/${store.getState()._id}.pdf`} width="648" height="837" /> :
                        <></>
                }

                {
                    store.getState().visa.opt.opt_ead.status === "Approved" ?
                        <p>
                            <a href={`./document/opt/opt_ead/${store.getState()._id}.pdf`} download>OPT EAD</a>
                            <button onClick={onOE}>Preview</button>
                        </p> :
                        <></>
                }
                {
                    previewOE ?
                        <embed type="application/pdf" src={`./document/opt/opt_ead/${store.getState()._id}.pdf`} width="648" height="837" /> :
                        <></>
                }
                {
                    store.getState().visa.opt.i_983.status === "Approved" ?
                        <p>
                            <a href={`./document/opt/i_983/${store.getState()._id}.pdf`} download>I 983</a>
                            <button onClick={onI983}>Preview</button>
                        </p> :
                        <></>
                }
                {
                    previewI983 ?
                        <embed type="application/pdf" src={`./document/opt/i_983/${store.getState()._id}.pdf`} width="648" height="837" /> :
                        <></>
                }
                {
                    store.getState().visa.opt.i_20.status === "Approved" ?
                        <p>
                            <a href={`./document/opt/i_20/${store.getState()._id}.pdf`} download>I 20</a>
                            <button onClick={onI20}>Preview</button>
                        </p> :
                        <></>
                }
                {
                    previewI20 ?
                        <embed type="application/pdf" src={`./document/opt/i_20/${store.getState()._id}.pdf`} width="648" height="837" /> :
                        <></>
                }
            </Accordion.Body>
        </Accordion.Item>
    );
}