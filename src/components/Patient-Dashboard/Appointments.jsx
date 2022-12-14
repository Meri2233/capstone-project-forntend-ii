import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { specialities } from '../../speciality'
import axiosPatient from '../../apiConfigPatient';
import { addDoctors } from '../../slices/doctorSlice';
import { Link } from 'react-router-dom';

export default function Appointments() {
    let dispatch = useDispatch();
    let doctors = useSelector(state => state.doctor.doctors)

    useEffect(() => {
        axiosPatient.get('/doc/list').then(resp => {
            let doctors = resp.data;
            console.log(doctors);
            dispatch(addDoctors(doctors));
        });
    }, [])

    function filterDoctors() {
        let searchValue = document.querySelector('#search-doctors').value;
        let speciality = document.querySelector('#specialities').value;
        let rating = document.querySelector('#rating').value;
        let cost = document.querySelector('.cost:checked');

        axiosPatient.get('/doc/list').then(resp => {
            let doctors = resp.data;
            let result = [];

            if (cost === null) {
                result = doctors.filter(el => {
                    return el.name.toLowerCase().includes(searchValue.toLowerCase()) || el.speciality[0] === speciality || Math.floor(el.ratings) === parseInt(rating);
                })
            }
            if (cost !== null) {
                result = doctors.filter(el => {
                    if (cost.value === "Below 200") {
                        return el.name.toLowerCase().includes(searchValue.toLowerCase()) || el.speciality[0] === speciality || Math.floor(el.ratings) === parseInt(rating) || el.price < 200
                    }
                    if (cost.value === "200 - 500") {
                        return el.name.toLowerCase().includes(searchValue.toLowerCase()) || el.speciality[0] === speciality || Math.floor(el.ratings) === parseInt(rating) || (el.price >= 200 && el.price < 500)
                    }
                    if (cost.value === "Above 500") {
                        return el.name.toLowerCase().includes(searchValue.toLowerCase()) || el.speciality[0] === speciality || Math.floor(el.ratings) === parseInt(rating) || el.price >= 500
                    }
                    return;
                })
            }
            dispatch(addDoctors(result));
        });
    }

    return (
        <div className="w-5/6 flex flex-col gap-3">
            <div className="appointment-header">
                <h1 className='text-3xl font-bold'>Search Doctor and Make an Appointment</h1>
            </div>
            <div className="flex">
                <div className="filters">
                    <div className="filterssection">
                        <div className="label"><label htmlFor="search-doctors">Search</label></div>
                        <input onChange={(e) => filterDoctors(e)} type="text" name="search-doctors" className='border-silver border-2 rounded p-2' id="search-doctors" placeholder='Search' />
                    </div>
                    <div className="filterssection">
                        <div className="label"><label htmlFor="specialities">Speciality</label></div>
                        <select onChange={(e) => filterDoctors(e)} name="specialities" id="specialities" className='border-silver border-2 rounded p-2'>
                            <option className='speciality' value={null}></option>
                            {specialities.map((el, index) => <option className='speciality ' key={index} value={el}>{el}</option>)}
                        </select>
                    </div>
                    <div className="filterssection">
                        <div className="label"><label htmlFor="rating">Rating</label></div>
                        <input onChange={(e) => filterDoctors(e)} type="text" id='rating' className='border-silver border-2 rounded p-2' name='rating' />
                    </div>
                    <div className="filterssectioncost">
                        <div className="label"><label htmlFor="cost">Cost</label></div>
                        <input onChange={(e) => filterDoctors(e)} type="checkbox" className='cost' name='cost' value="Below 200" /> Below Rs. 200<br />
                        <input onChange={(e) => filterDoctors(e)} type="checkbox" className='cost' name='cost' value="200 - 500" /> Rs. 200 - Rs. 500<br />
                        <input onChange={(e) => filterDoctors(e)} type="checkbox" className='cost' name='cost' value="Above 500" /> Above Rs. 500<br />
                    </div>
                </div>
                <div className="doctors">
                    {doctors.map((el, index) =>
                        <Link key={index} style={{ textDecoration: 'none', color: "black" }} to={`/patient/booking/:${el.id}`} >
                            {el.imageUrl !== null ? <div className="doctor">
                                <img src={el.imageUrl} alt="profile-image" />
                                <p className='name'>Dr. {el.name}</p>
                                <p className='expert'>Expert at {el.speciality[0]}</p>
                                <p className='rating'>Rating: {el.ratings}</p>
                            </div> : null}
                        </Link>
                    )}
                </div>
            </div>
        </div>
    )
}
