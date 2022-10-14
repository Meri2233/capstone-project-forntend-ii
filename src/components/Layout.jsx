import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <div className='flex flex-col font-sans h-screen w-screen'>
            
            <Outlet />
        </div>
    )
}
