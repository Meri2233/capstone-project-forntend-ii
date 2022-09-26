import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axiosDoctor from '../../apiConfigDoctor';
import { addTodaysConsultation } from '../../slices/todaySlice';

export default function TodayConDoctor() {
  let dispatch = useDispatch();
  let todayConsultation = useSelector(state => state.todays.todaysconsultations)

  useEffect(() => {
    axiosDoctor.get('/consultation/doctor/today/list').then(resp => {
      let consultation = resp.data;
      console.log(consultation);
      dispatch(addTodaysConsultation(consultation));
    });
  }, [])

  return (
    <div className='consultations-container'>
      {todayConsultation.length !== 0 ?
        <div className='consultations'>
          <h1>Today's Consultations</h1>
          {todayConsultation.map((el, index) => {
            return <div key={index} className="consultation">
              <p>Consultation With: {el.patientname}</p>
              <p>Consultation Time: {el.date}({el.time})</p>
              <p>Consultation Cost: {el.price}</p>
              <button>Start Consultation</button>
            </div>
          })}
        </div> :
        <p>No consultations.</p>
      }
    </div>
  )
}
