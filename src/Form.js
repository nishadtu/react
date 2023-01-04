import React, {Component} from "react";
import {useState} from 'react';
import db from './firebase';
import './css/Main.css'
import './css/Style.css'
import logo from './images/logo.png';

class Form extends Component{
    constructor(props){
      super(props);
      this.state = {
        first_name : "",
        last_name : "",
        email : "",
        steps : ""
      }
    }



    inputSet = (e) => {
        this.setState( { [e.target.name] : e.target.value} )
    }

    register = (e) => {
      e.preventDefault();
      const d = new Date();
      var user = d.getTime();
      db.ref(user).set({
        first_name : this.state.first_name,
        last_name : this.state.last_name,
        email : this.state.email,
        steps : this.state.steps
      }).catch(alert);


  }

    render(){
      return(
              <div>
                <div className="container-fluid" style={{padding: 0}}>
                  <div className="header-div">
                    <div className="row header-heading row-eq-height">
                      <div className="col-md-12 text-left bg-blue">
                        <a href="#"><img src={logo} className="home-logo" alt="AIG Women's Open" /></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container">
                  <div className="row">
                    <div className="col-lg-10 col-lg-offset-1 col-md-12">
                      <div className="row center-div">
                        <div className="col-md-12 center-sub-div">
                          <form method="post" id="sentForm">
                            <div className="row">
                              <div className="col-md-12">
                                <h1 className="heading" style={{color: '#012751', marginBottom: '30px'}}>Registration</h1>
                              </div>
                              <div className="form-group col-md-12 ">
                                <label htmlFor="first_name">First Name*</label>
                                <input type="text" onChange={this.inputSet} className="form-control" id="first_name" name="first_name" placeholder=" " required />
                              </div>
                              <div className="form-group col-md-12 ">
                                <label htmlFor="last_name">Last Name*</label>
                                <input type="text" onChange={this.inputSet} className="form-control" id="last_name" name="last_name" placeholder=" " required />
                              </div>
                              <div className="form-group col-md-12 ">
                                <label htmlFor="email">Email*</label>
                                <input type="email" onChange={this.inputSet} className="form-control" id="email" name="email" placeholder=" " required />
                              </div>
                              <div className="form-group col-md-12 ">
                                <label htmlFor="initial">Number of steps taken*</label>
                                <input type="number" onChange={this.inputSet} className="form-control" id="initial" name="initial" placeholder=" " required />
                              </div>
                              <div className="col-md-12 ">
                                <button type="submit" onClick={ this.register } className="btn btn-theme ">Register </button>
                              </div>

                              <p>{this.state.first_name}</p>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container-fluid">
                  <div className="row footer-div">
                    <div className="col-lg-12 col-md-12">
                      <div className="text-center" style={{color: '#FFF', marginTop: '6vh'}}>
                        <a href="../register" className="dashboard-btn active">Registration</a> |
                        <a href="../register/score.html" className="dashboard-btn ">Score</a> |
                        <a href="../" className="dashboard-btn">Leaderboard</a> |
                        <a href="../admin" className="dashboard-btn ">Dashboard</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
}

export default Form;
