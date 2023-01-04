import React, { useState } from 'react';
import { Button, Alert } from '@mui/material';
import { useUserAuth } from "../services/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import Header from './header';
import Footer from './footer';

const scoreUser = () => {
    const [useremail, setUseremail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState({ error: false, msg: "" });
    const { logIn } = useUserAuth();
    const navigate = useNavigate();
    if (auth.currentUser) {
        navigate("/2022/react/admin");
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage("");

        if (useremail === "" || password === "") {
            setMessage({ error: true, msg: "All fields are mandatory!" });
            return;
        }
        if (!isValidEmail(useremail)) {
            setMessage({ error: true, msg: "Please enter correct email" });
            return;
        }

        const adminUser = {
            useremail,
            password
        }
        console.log(adminUser);
        try {
            await logIn(useremail, password);
            navigate("/2022/react/admin");
            setMessage({ error: true, msg: "Please enter correct email" });

        } catch (err) {
            setMessage({ error: true, msg: err.message });
            setMessage({ error: true, msg: "The username or password wrong.. Please try again" });
        }

        setUseremail("");
        setPassword("");
    };

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    return (

        <div>

<Header />
            <div className="container">
                <div className="row">
                    <div className="col-lg-10 col-lg-offset-1 col-md-12">
                        <div className="row center-div">
                            <div className="col-md-12 center-sub-div">
                                <form method="post" id="sentForm">
                                    <div className="row">

                                        <div className="col-md-12">
                                            <h1 className="heading" style={{ color: '#012751', marginBottom: '30px' }}>Login</h1>
                                        </div>
                                        <div className="form-group col-md-12 ">
                                            <label htmlFor="useremail">User Email*</label>
                                            <input type="email" onChange={event => setUseremail(event.target.value)} className="form-control" id="useremail" value={useremail} name="useremail" placeholder=" " required />
                                        </div>
                                        <div className="form-group col-md-12 ">
                                            <label htmlFor="password">Password*</label>
                                            <input type="password" onChange={event => setPassword(event.target.value)} className="form-control" id="password" value={password} name="password" placeholder=" " required />
                                        </div>
                                        <div className="col-md-12 " style={{ marginBottom: "30px" }}>
                                            <Button type="button" variant="contained" onClick={handleSubmit} className="btn btn-theme ">Submit</Button>
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


        </div >
    );
}

export default scoreUser;