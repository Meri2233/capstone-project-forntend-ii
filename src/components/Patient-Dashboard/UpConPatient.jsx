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
    <div className='w-5/6'>
      {upcomingConsultations.length !== 0 ?
        <div className='consultations flex flex-col gap-3'>
          <h1 className='text-3xl font-bold'>Upcoming Consultations</h1>
          {upcomingConsultations.map((el, index) => {
            return <div key={index} className="consultation border-2 border-black p-3 rounded">
              <p>Consultation With: {el.docname}</p>
              <p>Consultation Time: {el.date}({el.time})</p>
              <p>Consultation Cost: Rs. {el.price}</p>
            </div>
          })}
        </div> :
        <div className='w-5/6 flex justify-center items-center'>
          <p>No consultations scheduled. Schedule one now.</p>
        </div>

      }
    </div>
  )
}
