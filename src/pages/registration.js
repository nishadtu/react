import React, { useState, useEffect } from 'react';

import { Button, Alert, Box, Typography, Modal } from '@mui/material';

import UserDataService from '../services/services'
import axios from 'axios';
import Header from './header';
import Footer from './footer';
// import WelcomeModal from "../components/WelcomeModal";
// import TermsModal from "../components/TermsAndCondition";


const styleModal = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#012b53',
    border: '2px solid #012b53',
    boxShadow: 24,
    p: 4,
    outline: 'none',
    color: '#FFF',
};

const styleTerms = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    maxWidth: '90%',
    bgcolor: '#FFF',
    border: '2px solid #FFF',
    boxShadow: 24,
    p: 4,
    outline: 'none',
    color: '#012b53',
    maxHeight: '80vh',
    overflowY: 'auto',
};


const AddUser = () => {
    const [first_name, setFirstname] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [steps, setSteps] = useState('');
    const [file, setFile] = useState();
    const [clientName, setClientName] = useState('');
    const [clientEmail, setClientEmail] = useState('');
    const [message, setMessage] = useState({ error: false, msg: "" });
    const [modalmessage, setModalMessage] = useState({ errorModal: false, modalText: "", modalHead: "" });
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [openTerms, setOpenTerms] = React.useState(true);
    const handleOpenTerms = () => setOpenTerms(true);
    const handleCloseTerms = () => setOpenTerms(false);
    const [openTermsEmail, setOpenTermsEmail] = React.useState(false);
    const handleOpenTermsEmail = () => setOpenTermsEmail(true);
    const handleCloseTermsEmail = () => setOpenTermsEmail(false);

    useEffect(() => {

        // getUsers();


    }, []);


    const handleSubmitAgree = () => {
        handleCloseTerms();
    }
    const handleSubmitDisagree = () => {
        handleCloseTerms();
        handleOpenTerms();
    }
    const handleSubmitEmail = () => {
        handleCloseTerms();
        handleOpenTermsEmail();
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage("");

        const url = 'https://provisionevents.co.uk/2022/react/uploadFile';

        if (first_name === "" || last_name === "" || email === "" || steps === "") {
            setMessage({ error: true, msg: "All fields are mandatory!" });
            handleOpen();
            setModalMessage({ errorModal: true, modalText: "All fields are mandatory!", modalHead: "SORRY" });
            return;
        }
        if (!isValidEmail(email)) {
            setMessage({ error: true, msg: "Please enter correct email" });
            handleOpen();
            setModalMessage({ errorModal: true, modalText: "Please enter correct email", modalHead: "SORRY" });
            return;
        }

        // UserDataService.emailUser(email);
        const docSnap = await UserDataService.getUser(email);
        console.log(docSnap.data());
        if (docSnap.data()) {
            setMessage({ error: true, msg: "The email is already exist" });
            handleOpen();
            setModalMessage({ errorModal: true, modalText: "The email is already exist", modalHead: "SORRY" });
            setEmail("");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', file.name);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        axios.post(url, formData, config).then((response) => {
            console.log(response.data);
        });


        const score = "";
        const newUser = {
            first_name,
            last_name,
            email,
            steps,
            score
        }

        console.log(newUser);

        try {
            await UserDataService.addUser(newUser);
            setMessage({ error: false, msg: "New user added successfully" });
            handleOpen();
            setModalMessage({ errorModal: false, modalText: "New user added successfully", modalHead: "SUCCESS" });

        } catch (err) {
            setMessage({ error: true, msg: err.message });
        }

        setFirstname("");
        setLastName("");
        setEmail("");
        setSteps("");
    };

    const handleChange = (event) => {
        setFile(event.target.files[0]);
    }

    const handleSubmitTerms = async (event) => {
        event.preventDefault();
        setMessage("");


        const clientUser = {
            clientName,
            clientEmail
        }



        console.log(clientUser);

        try {

            const xhr = new XMLHttpRequest();
            //Get a callback when server response

            xhr.addEventListener('lod', () => {
                console.log(xhr.responseText);
                // setMessage({ error: false, msg: "Send email" });
                // Update the response
            });

            xhr.open('GET', 'https://provisionevents.co.uk/2022/react/email/terms.php?clientName=' + clientName + '&clientEmail=' + clientEmail);
            // send the request

            xhr.send();
            // setMessage({ error: true, msg: "The email is sent to the inbox.." });
            console.log("email sending");
            handleCloseTermsEmail();
            handleOpenTerms();

        } catch (err) {
            setMessage({ error: true, msg: err.message });
        }

        setClientName("");
        setClientEmail("");
    };

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    return (

        <div>
            <Header />
            {/* <Header/> */}
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 col-lg-offset-1 col-md-12">
                        <div className="row center-div">
                            <div className="col-md-12 center-sub-div">
                                <form method="post" id="sentForm">
                                    <div className="row">

                                        <div className="col-md-12">
                                            <h1 className="heading" style={{ color: '#012751', marginBottom: '30px' }}>Registration</h1>
                                        </div>
                                        <div className="form-group col-md-12 ">
                                            <label htmlFor="first_name">First Name*</label>
                                            <input type="text" onChange={event => setFirstname(event.target.value)} className="form-control" value={first_name} id="first_name" name="first_name" placeholder=" " required />
                                        </div>
                                        <div className="form-group col-md-12 ">
                                            <label htmlFor="last_name">Last Name*</label>
                                            <input type="text" onChange={event => setLastName(event.target.value)} className="form-control" value={last_name} id="last_name" name="last_name" placeholder=" " required />
                                        </div>
                                        <div className="form-group col-md-12 ">
                                            <label htmlFor="email">Email*</label>
                                            <input type="email" onChange={event => setEmail(event.target.value)} className="form-control" id="email" value={email} name="email" placeholder=" " required />
                                        </div>
                                        <div className="form-group col-md-12 ">
                                            <label htmlFor="steps">Number of steps taken*</label>
                                            <input type="number" onChange={event => setSteps(event.target.value)} className="form-control" id="steps" value={steps} name="steps" placeholder=" " required />
                                        </div>
                                        <div className="form-group col-md-12 ">
                                            <label htmlFor="file">Number of steps taken*</label>
                                            <input type="file" onChange={handleChange} className="form-control" id="file" name="file" placeholder=" " required />
                                        </div>
                                        <div className="col-md-12 " style={{ marginBottom: "30px" }}>
                                            <Button type="submit" variant="contained" onClick={handleSubmit} className="btn btn-theme ">Submit</Button>
                                        </div>

                                        {message.msg && (
                                            <Alert severity={message.error ? "error" : "success"} sx={{
                                                fontSize: '16px',
                                                margin: '15px',
                                                "& .MuiAlert-icon": {
                                                }
                                                //backgroundColor: "green"
                                            }} onClose={() => setMessage("")}>{message.msg}</Alert>
                                        )}
                                        {message.error}


                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <Footer />                               

            {modalmessage.modalText && (

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={styleModal}>
                        <Typography id="modal-modal-title" className='modalHeader' variant="h2" component="h2">
                            {modalmessage.modalHead}
                        </Typography>
                        <Typography id="modal-modal-description" className='modalPara' sx={{ mt: 4, fontSize: 14, }}>
                            {modalmessage.modalText}
                        </Typography>
                        <Button type="button" variant="contained" onClick={handleClose} className="modalBtn btn btn-theme text-center " style={{ padding: 5, marginTop: 20 }}>ok</Button>
                    </Box>
                </Modal>


            )}
            {modalmessage.errorModal}
            <Modal
                open={openTermsEmail}
                onClose={handleCloseTermsEmail}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleModal}>
                    <Typography id="modal-modal-title" className='modalHeader' variant="h2" component="h2">
                        Receive Terms by Email
                    </Typography>
                    <Typography id="modal-modal-description" className='modalPara' sx={{ mt: 4, fontSize: 14, }}>
                        <form method="post" id="sentFormEmail">
                            <div className="row">


                                <div className="form-group col-md-12 ">
                                    <label htmlFor="clientName" style={{ color: '#FFF' }}>Name*</label>
                                    <input type="text" onChange={event => setClientName(event.target.value)} className="form-control" value={clientName} id="clientName" name="clientName" placeholder=" " required />
                                </div>
                                <div className="form-group col-md-12 ">
                                    <label htmlFor="clientEmail" style={{ color: '#FFF' }}>Email*</label>
                                    <input type="email" onChange={event => setClientEmail(event.target.value)} className="form-control" id="clientEmail" value={clientEmail} name="clientEmail" placeholder=" " required />
                                </div>

                                <div className="col-md-12 " style={{ marginBottom: "30px" }}>
                                    <Button type="submit" variant="contained" onClick={handleSubmitTerms} className="btn btn-theme ">Submit</Button>
                                </div>

                                {message.msg && (
                                    <Alert severity={message.error ? "error" : "success"} sx={{
                                        fontSize: '16px',
                                        margin: '15px',
                                        "& .MuiAlert-icon": {
                                        }
                                        //backgroundColor: "green"
                                    }} onClose={() => setMessage("")}>{message.msg}</Alert>
                                )}
                                {message.error}


                            </div>
                        </form>
                    </Typography>
                </Box>
            </Modal>


            <Modal
                open={openTerms}
                onClose={handleCloseTerms}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={styleTerms}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <h3>Terms and conditions</h3>
                        <h6>Introduction </h6>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <table className="disclaimer-table">
                            <tbody valign="top">
                                <tr><td width={25}>1. </td><td>These terms and conditions for the AIG Women’s Open Health Zone Steps Challenge apply to you, so please read them carefully. </td></tr>
                                <tr><td>2. </td><td>The  AIG Women’s Open Health Zone Steps Challenge is operated on behalf of R&amp;A Championships Limited (“The R&amp;A”) by Provision Events Ltd (07136878) whose registered office is at First Floor, 129 High Street, Guildford, Surrey, United Kingdom, GU1 3AA (the “Operator”).</td></tr>
                                <tr><td>3. </td><td>If you participate in any activity in the AIG Women’s Open Health Zone Steps Challenge you do so at your own risk, so you should always act in a safe and responsible manner.</td></tr>
                                <tr><td>4. </td><td>It is your responsibility to supervise any children under the age of 16 in your care, and to look after your belongings.</td></tr>
                                <tr><td>5. </td><td>Any instructions given by the Operator or its staff must be followed in the interests of safety and security.</td></tr>
                            </tbody>
                        </table>
                        <h6>Entrance</h6>
                        <table className="disclaimer-table">
                            <tbody valign="top">
                                <tr><td width={25}>6. </td><td>Entry to the AIG Women’s Open Health Zone Steps Challenge is free of charge.</td></tr>
                            </tbody>
                        </table>
                        <h6>Rules of the AIG Women’s Open Health Zone Steps Challenge</h6>
                        <table className="disclaimer-table">
                            <tbody valign="top">
                                <tr><td width={25}>7. </td><td>The AIG Women’s Open Health Zone Steps Challenge is open to all visitors during the AIG Women’s Open however entrance is subject to availability and is not guaranteed. </td></tr>
                                <tr><td>8. </td><td>All children under the age of 16 must be accompanied by an adult to enter the AIG Women’s Open Health Zone Steps Challenge and at all times while in the AIG Women’s Open Health Zone Steps Challenge area.</td></tr>
                                <tr><td>9. </td><td>The purpose of the AIG Women’s Open Health Zone Steps Challenge is for fans at the event to demonstrate and compare the amount of steps they have completed, whist at the event.</td></tr>
                                <tr><td>10. </td><td>The Operator’s staff reserve the right to refuse entry or to ask you to leave the AIG Women’s Open Health Zone Steps Challenge or any activity within it.</td></tr>
                                <tr><td>11. </td><td>Nothing may be removed from the AIG Women’s Open Bunker Shot Challenge unless given by an authorised member of staff as a free gift.</td></tr>
                            </tbody>
                        </table>
                        <h6>Activities and Promotions within the AIG Women’s Open Health Zone Steps Challenge</h6>
                        <table className="disclaimer-table">
                            <tbody valign="top">
                                <tr><td width={25}>12. </td><td>The Operator reserves the right to change these Terms and Conditions or cancel any activities within the AIG Women’s Open Health Zone Steps Challenge without specifying reasons and without incurring liability as a result. The decision of the Operator is final, and binding and no correspondence will be entered into. The Operator and its contractors are not responsible or liable if for any reason the AIG Women’s Open Health Zone Steps Challenge does not open as planned or for any other cause beyond the control of the Operator.</td></tr>
                            </tbody>
                        </table>
                        <h6>Operator's Responsibility for the AIG Women’s Open Health Zone Steps Challenge</h6>
                        <table className="disclaimer-table">
                            <tbody valign="top">
                                <tr><td width={25}>13. </td><td>In clauses 14 to 16 a reference to "we", "us" and "our" refers to the Operator, its Group companies and its contractors and a reference to "you" refers to you. </td></tr>
                                <tr><td>14. </td><td>Subject to clauses 15 and 16, if we fail to comply with these Terms and Conditions, we shall not be responsible for any losses that you suffer as a result.  Except for those losses which we could reasonably foresee, which result from the failure to comply with these Terms and Conditions and shall not prevent claims for foreseeable loss of, or damage to, your physical property. </td></tr>
                                <tr><td>15. </td><td>Clauses 14 and 16 do not exclude or limit in any way our liability for: (a) death or personal injury caused by our negligence, (b) fraud or fraudulent misrepresentation, and/or (c) any other matter for which it would be unlawful for us to exclude or attempt to exclude our liability. </td></tr>
                                <tr><td>16. </td><td>We shall not be responsible (to the extent permitted by law) for any losses or injury that arise as a result of your redemption, use or enjoyment of any prizes won as a result of your participation in activities and competitions within the AIG Women’s Open Health Zone Steps Challenge.</td></tr>
                                <tr><td>17. </td><td>Participants release The R&amp;A for all claims and liabilities arising in respect of the AIG Women’s Open Health Zone Steps Challenge.</td></tr>
                                <tr><td>18. </td><td>These Terms and Conditions and any disputes arising from these Terms and Conditions are governed by the laws of England and the exclusive jurisdiction of the English Courts.</td></tr>
                            </tbody>
                        </table>
                        <h6>Leader board process and data capture use</h6>
                        <table className="disclaimer-table">
                            <tbody valign="top">
                                <tr><td width={25}>19. </td><td>During participation in the AIG Women’s Open Health Zone Steps Challenge, participants can enter their name and email address as their unique ID. The email address is only used to create a unique ID profile for the participant, and will not be used for any other purposes.</td></tr>
                                <tr><td>21. </td><td>The participant can then input the number of steps they have done, using pedometer wristbands, phones or any other device which provides a step count based on their movements.</td></tr>
                                <tr><td>22. </td><td>The participant can input their step count multiple times throughout the day, with the leaderboard reflecting the updated number against their name.</td></tr>
                                <tr><td>23. </td><td>Once the event is over, the Operator will immediately delete the data captured for all participants and no data will be used for any purpose.</td></tr>
                            </tbody>
                        </table>

                        <div className='modalFooter'>
                            <div className="col-md-5 text-left">
                                <button type="button" onClick={handleSubmitEmail} className="btn btn-reverse email-btn" data-dismiss="modal" style={{ background: '#FFF', color: '#000', marginBottom: '10px' }}>Email me</button>
                            </div>
                            <div className="col-7  col-md-7 text-right">
                                <button type="button" onClick={handleSubmitDisagree} className="btn btn-reverse disagree-btn" data-dismiss="modal" style={{ background: '#FFF', color: '#000', marginRight: '10px', }}><i className="fa fa-close" style={{ color: '#c9982c' }} /> Disagree</button>
                                <button type="button" onClick={handleSubmitAgree} className="btn btn-theme agree-btn" data-dismiss="modal"><i className="fa fa-check" />  Agree</button>
                            </div>
                        </div>
                    </Typography>
                </Box>
            </Modal>


        </div >
    );
}

export default AddUser;