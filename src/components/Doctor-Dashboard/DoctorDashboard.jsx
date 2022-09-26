import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import axiosDoctor from '../../apiConfigDoctor'
import ProfileEdit from './ProfileEdit'

export default function DoctorDashboard() {

  function displayEdit(e) {
    let profileeditEl = document.querySelector('.profileedit')
    let myappointmentsEl = document.querySelector('.myappointments')
    profileeditEl.style.display = "flex"
    myappointmentsEl.style.filter = "blur(20px)"
  }

  function closeEdit(e) {

    let data = new FormData(e.target);

    axiosDoctor({
      method: "post",
      url: "/doc/adddetail",
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        console.log(response);
        let profileeditEl = document.querySelector('.profileedit')
        let myappointmentsEl = document.querySelector('.myappointments')
        profileeditEl.style.display = "none"
        myappointmentsEl.style.filter = "none"
      })
      .catch(function (response) {
        console.log(response);
      });
  }

  return (
    <div className='doctordashboard-container'>
      <div className="myappointments">
        <button onClick={(e) => displayEdit(e)} className="upcoming">Update profile</button>
        <p className="upcoming"><Link style={{ textDecoration: 'none', color: "black" }} to="/doctor">Today's Consultations</Link></p>
        <p className="upcoming"><Link style={{ textDecoration: 'none', color: "black" }} to="/doctor/upcomingconsultations">Upcoming Consultations</Link></p>
        <p className="upcoming"><Link style={{ textDecoration: 'none', color: "black" }} to="/doctor/pastconsultations">Past Consultations</Link></p>
        <p className="upcoming"><Link style={{ textDecoration: 'none', color: "black" }} to="/doctor/myappointments">Manage Schedule</Link></p>
      </div>
      <ProfileEdit closeEdit={closeEdit} />
      <Outlet />
    </div>
  )
}
