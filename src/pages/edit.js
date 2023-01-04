import React, { useState, useEffect } from 'react';
import { Button, Alert } from '@mui/material';
import UserDataService from '../services/services'
import { useParams } from "react-router-dom";
import { useUserAuth } from "../services/UserAuthContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";
import Header from './header';
import Footer from './footer';

const EditUser = () => {
    const [first_name, setFirstname] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [steps, setSteps] = useState('');
    const [score, setScore] = useState('');
    const [message, setMessage] = useState({ error: false, msg: "" });
    const urlData = useParams();
    const id_data = urlData.id;
    const id = id_data.substring(3);
    const navigate = useNavigate();
    const { logOut } = useUserAuth();


    useEffect(() => {
        // eslint-disable-next-line
        getUser();
        console.log(auth.currentUser);
        if (!auth.currentUser) {
            navigate("/2022/react/login");
        }
    }, []);

    const getUser = async () => {
        const docSnap = await UserDataService.getUser(id);
        console.log(docSnap.data());
        setFirstname(docSnap.data().first_name);
        setLastName(docSnap.data().last_name);
        setEmail(docSnap.data().email);
        setSteps(docSnap.data().steps);
        setScore(docSnap.data().score);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage("");

        if (first_name === "" || last_name === "" || email === "" || steps === "") {
            setMessage({ error: true, msg: "All fields are mandatory!" });
            return;
        }
        if (!isValidEmail(email)) {
            setMessage({ error: true, msg: "Please enter correct email" });
            return;
        }

        const newUser = {
            first_name,
            last_name,
            email,
            steps,
            score
        }



        console.log(newUser);

        try {
            await UserDataService.updateUser(id, newUser);
            setMessage({ error: false, msg: "User updated successfully" });
        } catch (err) {
            setMessage({ error: true, msg: err.message });
        }

    };

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }
    const handleLogout = async () => {
        try {
            await logOut();
            navigate("/2022/react/login");
        } catch (error) {
            console.log(error.message);
        }
    };

    return (

        <div>

            <Header />
            <Button variant="contained" onClick={handleLogout} style={{ marginRight: 0, float: 'right', backgroundColor: '#012b53' }} >
                Log out
            </Button>
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
                                            <label htmlFor="score">Score*</label>
                                            <input type="number" onChange={event => setScore(event.target.value)} className="form-control" id="score" value={score} name="score" placeholder=" " />
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


        </div >
    );
}

export default EditUser;