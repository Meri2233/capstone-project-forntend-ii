import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function PatientDashboard() {
  return (
    <div className='flex flex-col gap-3 p-12 h-full w-full'>
      <div className="flex bg-slate-700 justify-between h-1/8">
        <p className='text-teal font-bold text-xl'>DocSeek</p>
        <button className='bg-teal p-2 rounded hover:bg-teal-700'><Link style={{ textDecoration: 'none', color: "white" }} to="/signinpatient">Sign Out</Link></button>
      </div>
      <div className='flex gap-6 p-6 h-full w-full'>
        <div className="myappointments flex flex-col gap-4 border-r-2 border-gainsboro p-3 w-1/6 ">
          <p className="upcoming shadow-md h-10 text-center"><Link style={{ textDecoration: 'none', color: "black" }} to="/patient/bookappointments">Book Appointments</Link></p>
          <p className="upcoming shadow-md h-10 text-center"><Link style={{ textDecoration: 'none', color: "black" }} to="/patient">Upcoming Consultations</Link></p>
          <p className="upcoming shadow-md h-10 text-center"><Link style={{ textDecoration: 'none', color: "black" }} to="/patient/pastconsultations">Past Consultations</Link></p>
        </div>
        <Outlet />
      </div>

    </div>
  )
}
