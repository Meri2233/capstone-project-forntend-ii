import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
    let navigate = useNavigate();

    let signUp = (e) => {
        let data = new FormData(e.target);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "name": data.get('firstname') + " " + data.get('lastname'),
            "email": data.get('email'),
            "password": data.get('password'),
            "confirmPassword": data.get('confirmpassword')
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:7000/docauth/signup", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                navigate('/signindoctor');
            })
            .catch(error => console.log('error', error));
    }
    
    return (
        <div className="signup-container">
            <div className="register">
                <h1>Register</h1>
                <p>Create an account first to register</p>
            </div>
            <div className="doctorsignup">
                <h3 className='title'>Create an account.</h3>
                <form className='signup' onSubmit={(e) => {
                    e.preventDefault();
                    signUp(e)
                }}>

                    <div className="formnamesection">
                        <div className="innerformsection">
                            <label className='tag' htmlFor="username">First Name*</label><br />
                            <input type="text" name='firstname' className='name' placeholder='Jake'/>
                        </div>
                        <div className="innerformsection">
                            <label className='tag' htmlFor="lastname">Last Name*</label><br />
                            <input type="text" name='lastname' className='name' placeholder="Holland" />
                        </div>
                    </div>

                    <div className="formsection">
                        <label className='tag' htmlFor="email"> Your Email*</label><br />
                        <input type="email" name='email' className='email' placeholder="holland4jake@gmail.com" />
                    </div>
                    <div className="formsection">
                        <label className='tag' htmlFor="password">Your Password*</label><br />
                        <input type="password" name='password' className='password' placeholder="********" />
                    </div>
                    <div className="error"></div>
                    <div className="formsection">
                        <label className='tag' htmlFor="confirmpassword">Confirm Your Password*</label><br />
                        <input type="password" name='confirmpassword' className='confirmpassword' placeholder="********" />
                    </div>
                    <div className="error"></div>
                    <button className='signupsubmit' type='submit'>Create your account</button>
                    <p>Already have an account? <Link style={{ textDecoration: 'none', color: "black" }} to="/signindoctor">Sign In</Link></p>
                </form>
            </div>
        </div>
    )
}
