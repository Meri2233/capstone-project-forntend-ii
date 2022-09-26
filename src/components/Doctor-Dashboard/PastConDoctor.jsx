import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axiosDoctor from '../../apiConfigDoctor';
import { addPastConsultation } from '../../slices/pastSlice';

export default function PastConDoctor() {
  let dispatch = useDispatch();
  let pastConsultations = useSelector(state => state.past.pastconsultations)
  console.log(pastConsultations);

  useEffect(() => {
    axiosDoctor.get('/consultation/doctor/past/list').then(resp => {
      let consultation = resp.data;
      dispatch(addPastConsultation(consultation));
    });
  }, [])

  return (
    <div className='consultations-container'>
      {pastConsultations.length !== 0 ?
        <div className='consultations'>
          <h1>Past Consultations</h1>
          {pastConsultations.map((el, index) => {
            return <div key={index} className="consultation">
              <p>Consultation With: {el.patientname}</p>
              <p>Consultation Time: {el.date}({el.time})</p>
              <p>Consultation Cost: {el.price}</p>
            </div>
          })}
        </div> :
        <p>No consultations.</p>
      }
    </div>
  )
}
