import React from 'react'

export default function PasswordReset() {

  function sendResetLink(e) {
    let email = document.querySelector('#email').value;

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "email": email
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:7000/reset/link", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  return (
    <div className='passwordreset-container'>
      <p>Reset your password</p>
      <form className='passwordreset' onSubmit={(e) => {
        e.preventDefault();
        sendResetLink(e)
      }}>
        <div className="formsection">
          <label htmlFor="email">Enter your Email</label><br/>
          <input type="email" name="email" id="email" />
        </div>
        <button>Send</button>
      </form>
    </div>
  )
}
