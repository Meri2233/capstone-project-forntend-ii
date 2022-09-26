import React from 'react'
import { Routes, Route } from 'react-router-dom'
import DoctorDashboard from './Doctor-Dashboard/DoctorDashboard'
import Layout from './Layout'
import PasswordReset from './PasswordReset'
import PatientDashboard from './Patient-Dashboard/PatientDashboard'
import RegisterPatient from './RegisterPatient'
import SignInDoctor from './SignInDoctor'
import SignInPatient from './SignInPatient'
import Signup from './SignUp'
import UpConDoctor from "./Doctor-Dashboard/UpConDoctor"
import PastConDoctor from "./Doctor-Dashboard/PastConDoctor"
import Appointments from './Patient-Dashboard/Appointments'
import UpConPatient from './Patient-Dashboard/UpConPatient'
import PastConPatients from './Patient-Dashboard/PastConPatients'
import Doctor from './Patient-Dashboard/Doctor'
import MyAppointments from './Doctor-Dashboard/MyAppointments'
import TodayConDoctor from './Doctor-Dashboard/TodayConDoctor'
import ResetPagePatient from './ResetPagePatient'
import ResetPageDoctor from './ResetPageDoctor'

export default function Main() {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route path='/signindoctor' element={<SignInDoctor />} />
                <Route index element={<SignInPatient />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/register' element={<RegisterPatient />} />
                <Route path='/resetpassword' element={<PasswordReset />} />
                <Route path='/resetpage/patient/:id' element={<ResetPagePatient />}/>
                <Route path='/resetpage/doctor/:id' element={<ResetPageDoctor />}/>
                <Route path='/doctor' element={<DoctorDashboard />} >
                    <Route index element={<TodayConDoctor />} />
                    <Route path="/doctor/upcomingconsultations" element={<UpConDoctor />} />
                    <Route path="/doctor/pastconsultations" element={<PastConDoctor />} />
                    <Route path="/doctor/myappointments" element={<MyAppointments />} />
                </Route>
                <Route path='/patient' element={<PatientDashboard />} >
                    <Route index element={<UpConPatient />} />
                    <Route path="/patient/bookappointments" element={<Appointments />} />
                    <Route path="/patient/pastconsultations" element={<PastConPatients />} />
                    <Route path="/patient/booking/:id" element={<Doctor />} />
                </Route>
            </Route>
        </Routes>
    )
}
