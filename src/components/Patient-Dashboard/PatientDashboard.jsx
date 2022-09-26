import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function PatientDashboard() {
  return (
    <div className='patientdashboard-container'>
      <div className="myappointments">
        <p className="upcoming"><Link style={{ textDecoration: 'none', color: "black" }} to="/patient/bookappointments">Book Appointments</Link></p>
        <p className="upcoming"><Link style={{ textDecoration: 'none', color: "black" }} to="/patient">Upcoming Consultations</Link></p>
        <p className="upcoming"><Link style={{ textDecoration: 'none', color: "black" }} to="/patient/pastconsultations">Past Consultations</Link></p>
      </div>
      <Outlet/>
    </div>
  )
}
