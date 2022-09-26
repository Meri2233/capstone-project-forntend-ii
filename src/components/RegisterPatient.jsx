import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function RegisterPatient() {
    let navigate = useNavigate();

    function register(e) {
        let data = new FormData(e.target);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "name": data.get('firstname') + data.get('lastname'),
            "email": data.get('email'),
            "contact": data.get('phone'),
            "problem": data.get('problem'),
            "bloodgroup": data.get('bloodgroup'),
            "weight": data.get('weight'),
            "sex": data.get('sex'),
            "age": data.get('age'),
            "location": data.get('location'),
            "doctype": data.get('doctype'),
            "password": data.get('password'),
            "confirmPassword": data.get('confirmPassword')
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:7000/patientauth/signup", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                navigate('/signinpatient')
            })
            .catch(error => console.log('error', error));
    }

    return (
        <div className='patientregister-container'>
            <div className='patientregister'>
                <h3>Please fill the basic information.</h3>
                <p>Please fill the following form with your basic and medical information to register.</p>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    register(e)
                }} className='registerform' >
                    <div className="registerformfillsection">
                        <div className="formsectionregister">
                            <div className="registerlabel">
                                <label htmlFor="firstname">First Name*</label>
                            </div>
                            <input type="text" name='firstname' />
                        </div>
                        <div className="formsectionregister">
                            <div className="registerlabel">
                                <label htmlFor="lastname">Last Name*</label>
                            </div>
                            <input type="text" name='lastname' />
                        </div>
                        <div className="formsectionregister">
                            <div className="registerlabel">
                                <label htmlFor="email">Email*</label>
                            </div>
                            <input type="email" name='email' />
                        </div>
                        <div className="formsectionregister">
                            <div className="registerlabel">
                                <label htmlFor="phone">Phone</label>
                            </div>
                            <input type="text" name='phone' />
                        </div>
                        <div className="formsectionregister">
                            <div className="registerlabel">
                                <label htmlFor="problem">Disease or Discomforts*</label>
                            </div>
                            <input type="text" name='problem' />
                        </div>
                        <div className="formsectionregister">
                            <div className="registerlabel">
                                <label htmlFor="bloodgroup">Blood Group</label>
                            </div>
                            <input type="text" name='bloodgroup' />
                        </div>
                        <div className="formsectionregister">
                            <div className="registerlabel">
                                <label htmlFor="age">Age*</label>
                            </div>
                            <input type="text" name='age' />
                        </div>
                        <div className="formsectionregister">
                            <div className="registerlabel">
                                <label htmlFor="sex">Sex*</label>
                            </div>
                            <input type="text" name='sex' />
                        </div>
                        <div className="formsectionregister">
                            <div className="registerlabel">
                                <label htmlFor="weight">Weight</label>
                            </div>
                            <input type="text" name='weight' />
                        </div>
                        <div className="formsectionregister">
                            <div className="registerlabel">
                                <label htmlFor="location">Address</label>
                            </div>
                            <input type="text" name='location' />
                        </div>
                        <div className="formsectionregister">
                            <div className="registerlabel">
                                <label htmlFor="doctype">Seeking For*</label>
                            </div>
                            <input type="text" name='doctype' />
                        </div>
                        <div className="formsectionregister">
                            <div className="registerlabel">
                                <label htmlFor="pastrecords">Past Records</label>
                            </div>
                            <input type="text" name='pastrecords' />
                        </div>
                        <div className="formsectionregister">
                            <div className="registerlabel">
                                <label htmlFor="password">Password*</label>
                            </div>
                            <input type="password" name='password' />
                        </div>
                        <div className="formsectionregister">
                            <div className="registerlabel">
                                <label htmlFor="confirmPassword">Confirm Your Password*</label>
                            </div>
                            <input type="password" name='confirmPassword' />
                        </div>
                    </div>
                    <button type='submit'>Register</button>
                </form>
            </div>
        </div>
    )
}
