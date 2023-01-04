import * as React from 'react';
import { NavLink } from "../components/Navbar/NavbarElements";



export default function Footer() {
    return (
        <div className="container-fluid">
                <div className="row footer-div">
                    <div className="col-lg-12 col-md-12">
                        <div className="text-center" style={{ color: '#FFF', marginTop: '6vh' }}>
                            <NavLink to="/2022/react/registration" className="dashboard-btn ">Registration</NavLink>
                            <NavLink to="/2022/react/score" className="dashboard-btn ">Score</NavLink>
                            <NavLink to="/2022/react/leaderboard" className="dashboard-btn">Leaderboard</NavLink>
                            <NavLink to="/2022/react/admin" className="dashboard-btn ">Dashboard</NavLink>
                        </div>
                    </div>
                </div>
            </div>
    );
}
