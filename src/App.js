import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import Home from './pages';
import Score from './pages/score';
import SignUp from './pages/signup';
import Admin from './pages/admin';
import Form from './pages/form';
import Registration from './pages/registration';
import Edit from './pages/edit';
import Login from './pages/login';
import Test from './pages/test';



import { UserAuthContextProvider } from "./services/UserAuthContext";

function App() {
    return (
        <Router>
            <UserAuthContextProvider>
                <Navbar />
                <Routes basename="2022/react">
                    {/* <Route path='/' exact element={<Home />} />
        <Route path='/leaderboard' exact element={<Home />} />
        <Route path='/score' element={<Score/>} />
        <Route path='/admin' element={<Admin/>} />
        <Route path='/sign-up' element={<SignUp/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/form' element={<Form/>} />
        <Route path='/about' element={<BasicModal/>} /> */}
                    <Route path='2022/react/' exact element={<Home />} />
                    <Route path='2022/react/leaderboard' exact element={<Home />} />
                    <Route path='2022/react/score' element={<Score />} />

                    <Route path='2022/react/sign-up' element={<SignUp />} />
                    <Route path='2022/react/form' element={<Form />} />
                    <Route path='2022/react/registration' element={<Registration />} />
                    <Route path='2022/react/edit/:id' element={<Edit />} />
                    <Route path='2022/react/login' element={<Login />} />
                    <Route path='2022/react/test' element={<Test />} />
                    <Route path='2022/react/admin' element={<Admin />} />


                </Routes>
            </UserAuthContextProvider>
        </Router >

    );
}

export default App;
