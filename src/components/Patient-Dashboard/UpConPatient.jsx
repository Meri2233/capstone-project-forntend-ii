import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axiosPatient from '../../apiConfigPatient';
import { addUpcomingConsultation } from '../../slices/upcomingSlice';

export default function UpConPatient() {
  let dispatch = useDispatch();
  let upcomingConsultations = useSelector(state => state.upcoming.upcomingconsultations);
  console.log(upcomingConsultations);

  useEffect(() => {
    axiosPatient.get('/consultation/patient/upcoming/list').then(resp => {
      let consultation = resp.data;
      console.log(consultation);
      dispatch(addUpcomingConsultation(consultation));
    });
  }, [])

  return (
    <div className='consultations-container'>
      {upcomingConsultations.length !== 0 ?
        <div className='consultations'>
          <h1>Upcoming Consultations</h1>
          {upcomingConsultations.map((el, index) => {
            return <div key={index} className="consultation">
              <p>Consultation With: {el.docname}</p>
              <p>Consultation Time: {el.date}({el.time})</p>
              <p>Consultation Cost: {el.price}</p>
            </div>
          })}
        </div> :
        <p>No consultations scheduled. Schedule one now.</p>
      }
    </div>
  )
}
