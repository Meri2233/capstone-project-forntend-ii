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
        <div className="flex justify-between items-center w-full h-full">

            <div className="flex flex-col justify-center items-center gap-5 bg-doc-page bg-no-repeat bg-center bg-cover h-full w-2/3">
                <div className='text-black p-3 flex flex-col gap-3  rounded shadow-xl bg-clear'>
                    <h1 className='text-4xl font-bold'>Sign In</h1>
                    <p>Select your signing in methods from the following:</p>
                    <div className="flex gap-8">
                        <Link style={{ textDecoration: 'none', color: "black", fontWeight: "bold" }} to="/">
                            <div className="flex flex-col justify-center items-center border-2 border-solid border-black p-4 w-150 h-28 rounded-md hover:bg-gainsboro hover:text-black hover:border-transparent">
                                <p>Patient</p>
                                <p>Sign In</p>
                            </div>
                        </Link>
                        <Link style={{ textDecoration: 'none', color: "black", fontWeight: "bold" }} to="/signindoctor">
                            <div className="flex flex-col justify-center items-center border-2 border-solid border-black p-4 w-150 h-28 rounded-md hover:bg-gainsboro hover:text-black hover:border-transparent">
                                <p>Doctor</p>
                                <p>Sign In</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="flex flex-col p-6 gap-3 w-96 pr-9 h-full w-1/3">
                <div className="flex bg-slate-700 justify-between h-1/8">
                    <p className='text-teal font-bold text-xl'>DocSeek</p>
                    <button className='bg-teal p-2 rounded hover:bg-teal-700'><Link style={{ textDecoration: 'none', color: "white" }} to="/signinpatient">Sign In</Link></button>
                </div>
                <div className='flex h-full flex-col gap-3 justify-center'>
                    <h1 className='text-4xl font-bold'>Patient Sign In</h1>
                    <form className='flex flex-col gap-2' onSubmit={(e) => {
                        e.preventDefault();
                        patientSignIn(e)
                    }}>
                        <div className="formsection flex flex-col">
                            <label className='tag' htmlFor="email">Email*</label>
                            <input type="email" name='email' className='email border-silver border-2 rounded p-2' placeholder='Email' />
                        </div>
                        <div className="formsection flex flex-col">
                            <label className='tag' htmlFor="password">Password*</label>
                            <input type="password" name='password' className='password border-silver border-2 rounded p-2' placeholder='password' />
                        </div>
                        <p> <Link style={{ textDecoration: 'none', color: "rgb(1,160,172)" }} to="/resetpassword">Forgot your Password?</Link></p>
                        <button className='signinsubmit bg-teal p-2 rounded text-white' type='submit'>Sign In</button>
                    </form>
                    <div className="message flex justify-between">
                        <div className="registertext flex flex-col justify-center items-center w-80 text-center">
                            <h3 className='text-xl font-bold'>Register as a Patient?</h3>
                            <p>Fill your information in order to get started</p>
                        </div>
                        <button><Link style={{ textDecoration: 'none', color: "rgb(1,160,172)" }} to="/register">Start</Link></button>
                    </div>
                </div>
            </div>

        </div>

    )
}
