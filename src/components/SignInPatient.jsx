import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function SignInPatient() {
    let navigate = useNavigate();

    let patientSignIn = (e) => {
        let data = new FormData(e.target);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "email": data.get('email'),
            "password": data.get('password')
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:7000/patientauth/login", requestOptions)
            .then(response => response.text())
            .then(result => {
                let tokens = JSON.parse(result);
                localStorage.setItem('access_token', tokens.accessToken);
                localStorage.setItem('refresh_token', tokens.refreshToken);
                console.log(tokens);
                navigate('/patient');
            })
            .catch(error => console.log('error', error));
    }

    return (
        <div className="signin-container">

            <div className="redirect">
                <h1>Sign In</h1>
                <p>Select your signing in methods from the following:</p>
                <div className="methods">
                    <Link style={{ textDecoration: 'none' ,color: "rgb(170,170,170)",fontWeight:"bold"}} to="/">
                        <div className="method">
                            <p>Patient</p>
                            <p>Sign In</p>
                        </div>
                    </Link>
                    <Link style={{ textDecoration: 'none', color: "rgb(170,170,170)",fontWeight:"bold" }} to="/signindoctor">
                        <div className="method">
                            <p>Doctor</p>
                            <p>Sign In</p>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="patientsignin">
                <h1 className='title'>Patient Sign In</h1>
                <form className='signin' onSubmit={(e) => {
                    e.preventDefault();
                    patientSignIn(e)
                }}>
                    <div className="formsection">
                        <label className='tag' htmlFor="email">Email*</label><br />
                        <input type="email" name='email' className='email' placeholder='Email'/>
                    </div>
                    <div className="formsection">
                        <label className='tag' htmlFor="password">Password*</label><br />
                        <input type="password" name='password' className='password' placeholder='password'/>
                    </div>
                    <p> <Link style={{ textDecoration: 'none', color: "rgb(1,160,172)" }} to="/resetpassword">Forgot your Password?</Link></p>
                    <button className='signinsubmit' type='submit'>Sign In</button>
                </form>
                <div className="message">
                    <div className="registertext">
                        <h3>Register as a Patient?</h3>
                        <p>Fill your information in order to get started</p>
                    </div>
                    <button><Link style={{ textDecoration: 'none', color: "rgb(1,160,172)" }} to="/register">Start</Link></button>
                </div>
            </div>

        </div>

    )
}
