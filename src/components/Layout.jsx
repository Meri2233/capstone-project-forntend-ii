import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <div className='layout'>
            <div className="header">
                <p>DocSeek</p>
                <button className='signinlayout'><Link style={{ textDecoration: 'none', color: "white" }} to="/signinpatient">Sign Out</Link></button>
            </div>
            <Outlet />
        </div>
    )
}
