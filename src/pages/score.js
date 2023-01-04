import React, { useState } from 'react';
import { Button, Alert } from '@mui/material';
import UserDataService from '../services/services'
import Header from './header';
import Footer from './footer';

const scoreUser = () => {
    const [email, setEmail] = useState('');
    const [score, setScore] = useState('');
    const [message, setMessage] = useState({ error: false, msg: "" });

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage("");
        // UserDataService.emailUser(email);
        const docSnap = await UserDataService.getUser(email);
        console.log(docSnap.data());

        if (!docSnap.data()) {
            setMessage({ error: true, msg: "The email is not exist" });
            setEmail("");
            return;
        }
        const first_name = (docSnap.data().first_name);
        const last_name = (docSnap.data().last_name);
        const steps = (docSnap.data().steps);
        if (email === "" || score === "") {
            setMessage({ error: true, msg: "All fields are mandatory!" });
            return;
        }
        if (!isValidEmail(email)) {
            setMessage({ error: true, msg: "Please enter correct email" });
            return;
        }

        const existUser = {
            email,
            score
        }



        console.log(existUser);

        try {
            await UserDataService.updateUser(email, existUser);
            setMessage({ error: false, msg: "User updated successfully" });

           
            const xhr = new XMLHttpRequest();
            //Get a callback when server response

            xhr.addEventListener('lod', () => {
                console.log(xhr.responseText);
                // setMessage({ error: false, msg: "Send email" });
                // Update the response
            });

            xhr.open('GET', 'https://provisionevents.co.uk/2022/react/email/index.php?first_name=' + first_name + '&last_name=' + last_name + '&email=' + email + '&steps=' + steps + '&score=' + score );
            // send the request

            xhr.send();
            console.log("email sending");

        } catch (err) {
            setMessage({ error: true, msg: err.message });
        }

        setEmail("");
        setScore("");
    };

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    return (

        <div>

            <Header/>
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 col-lg-offset-1 col-md-12">
                        <div className="row center-div">
                            <div className="col-md-12 center-sub-div">
                                <form method="post" id="sentForm">
                                    <div className="row">

                                        <div className="col-md-12">
                                            <h1 className="heading" style={{ color: '#012751', marginBottom: '30px' }}>Score</h1>
                                        </div>
                                        <div className="form-group col-md-12 ">
                                            <label htmlFor="email">Email*</label>
                                            <input type="email" onChange={event => setEmail(event.target.value)} className="form-control" id="email" value={email} name="email" placeholder=" " required />
                                        </div>
                                        <div className="form-group col-md-12 ">
                                            <label htmlFor="score">Score*</label>
                                            <input type="number" onChange={event => setScore(event.target.value)} className="form-control" id="score" value={score} name="score" placeholder=" " required />
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
            <Footer/>


        </div >
    );
}

export default scoreUser;