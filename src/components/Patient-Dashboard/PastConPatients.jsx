import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axiosPatient from '../../apiConfigPatient';
import { addPastConsultation } from '../../slices/pastSlice';

export default function PastConPatients() {
  let dispatch = useDispatch();
  let pastConsultations = useSelector(state => state.past.pastconsultations)

  useEffect(() => {
    axiosPatient.get('/consultation/patient/past/list').then(resp => {
      let consultation = resp.data;
      console.log(consultation);
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
              <p>Consultation With: {el.docname}</p>
              <p>Consultation Time: {el.date}({el.time})</p>
              <p>Consultation Cost: {el.price}</p>
              <button>Rate Doctor</button>
            </div>
          })}
        </div> :
        <p>No consultations.</p>
      }
    </div>
  )
}
