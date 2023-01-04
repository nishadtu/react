import * as React from 'react';
import logo from '../images/logo.png';



export default function Header() {
    return (
        <div className="container-fluid" style={{ padding: 0 }}>
            <div className="header-div">
                <div className="row header-heading row-eq-height">
                    <div className="col-md-12 text-left bg-blue" style={{ width: "100%" }}>
                        <a href="/2022/react/registration"><img src={logo} className="home-logo" alt="AIG Women's Open" /></a>
                    </div>
                </div>
            </div>
        </div>
    );
}
