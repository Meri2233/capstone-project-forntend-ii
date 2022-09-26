import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function ResetPageDoctor() {
    let { id } = useParams();
    let navigate = useNavigate();

    function changePassword(e) {
        let data = new FormData(e.target);

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "password": data.get('password'),
            "confirmPassword": data.get('confirmPassword')
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`http://localhost:7000/reset/password/doc/:${id.substring(1)}`, requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result)
                navigate('/signindoctor')
            })
            .catch(error => console.log('error', error));
    }

    return (
        <div className='resetpage-container'>
            <h3>Please enter new password</h3>
            <form className='resetpage' onSubmit={(e) => {
                e.preventDefault(e)
                changePassword(e);
            }}>
                <div className="formsection">
                    <label htmlFor="password">Enter New Password</label><br/>
                    <input type="text" name='password' id='password' />
                </div>
                <div className="formsection">
                    <label htmlFor="password">Confirm Your Password</label><br/>
                    <input type="text" name='password' id='password' />
                </div>
                <button>Create New Password</button>
            </form>
        </div>
    )
}
